# Placar ao vivo na landing

A seção **Placar ao vivo** já está pronta e desenhada. Ela está no estado *"ainda não abriu"*
porque **falta uma rota pública no repositório de membros** — não por falta de código aqui.

## Por que não dá para ler direto

Testei as rotas do `safirion-members` em 14/09/2026:

| Rota | Resultado | Serve? |
|---|---|---|
| `/api/corujao-preview` | **401** — *"Entre na sua conta para ver o Corujao"* | Não: exige sessão |
| `/api/genesis-ranking` | 200, mas **sem cabeçalho CORS** | Não: é outra competição, e o navegador bloquearia |

São dois impedimentos distintos:

1. **Sessão.** O `corujao-preview` passa por `verifyToken` e devolve 401 sem cookie de membro.
2. **CORS.** Nenhuma das rotas manda `Access-Control-Allow-Origin`. Um navegador em
   `safirion-corujao.pages.dev` não consegue ler resposta de `members.partnersafirion.com`.

## O que já está feito deste lado

`functions/api/ranking.js` — uma Cloudflare Pages Function no domínio da própria landing.
**CORS é restrição de navegador; chamada servidor-a-servidor não esbarra nela.** Ela busca no
servidor e devolve same-origin, então o segundo impedimento já está resolvido.

Ela lê duas variáveis em **Pages → Settings → Environment variables**:

| Variável | Para quê |
|---|---|
| `RANKING_ORIGEM` | URL pública do placar na área de membros |
| `RANKING_TOKEN` | Opcional. Vai como `Authorization: Bearer` |

Sem `RANKING_ORIGEM`, ela devolve `{"ok":false,"motivo":"sem-origem"}` e a página fica no
estado fechado — que é a verdade, e melhor que número inventado.

## O que falta: a rota pública no repo de membros

Crie `functions/api/corujao-publico.js` no **safirion-members**:

```javascript
/**
 * Placar do Corujao em versao publica, para a landing.
 * Sem sessao e sem dado pessoal: so nome, valor e se qualificou.
 */
import { buildBoard } from "../_lib/corujao-engine.js";

const ORIGENS = new Set([
  "https://safirion-corujao.pages.dev",
  // acrescente aqui o dominio final da landing quando existir
]);

export async function onRequest(context) {
  const { request } = context;
  const origem = request.headers.get("Origin") || "";
  const libera = ORIGENS.has(origem) ? origem : "";

  const cab = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=60",
  };
  if (libera) {
    cab["access-control-allow-origin"] = libera;
    cab["vary"] = "Origin";
  }

  if (request.method === "OPTIONS") {
    cab["access-control-allow-methods"] = "GET, OPTIONS";
    return new Response(null, { status: 204, headers: cab });
  }

  try {
    // TODO: montar a partir do mesmo KV/cfg que o corujao-preview usa.
    // O formato de saida e o que a landing espera:
    const placares = []; // [{ chave, titulo, unidade, linhas: [{nome, valor, qualificado}] }]

    return new Response(JSON.stringify({ ok: true, placares }), { headers: cab });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 200, headers: cab });
  }
}
```

O `TODO` é a única parte que não consigo escrever sem ver como o `corujao-preview` monta os
placares a partir do KV — ele tem 570 linhas e depende de config de edição que muda no painel.
Quem mexe nesse repo resolve em minutos reaproveitando o mesmo `buildBoard`.

### Formato esperado

```json
{
  "ok": true,
  "placares": [
    {
      "chave": "pnl",
      "titulo": "PNL",
      "unidade": "dinheiro",
      "linhas": [
        { "nome": "Fulano de Tal", "valor": 48200, "qualificado": true }
      ]
    }
  ]
}
```

`unidade` aceita `dinheiro` (vira `R$ 48.200`), `horas` (recebe **minutos**, vira `12h22`) ou
qualquer outro valor, que cai no formato numérico padrão. Quem tem `qualificado:false` aparece
em cinza, para mostrar quanto falta para o mínimo.

## Duas decisões de privacidade

A Function da landing **recorta** o que repassa: no máximo 8 placares, 5 linhas cada, e só
`nome`, `valor` e `qualificado`. Id, e-mail e telefone não passam, mesmo que a origem mande.

Vale decidir se o nome completo deve aparecer numa página pública. Mascarar para
*"Marina A."* é uma linha na rota de membros, e evita expor a base de afiliados.
