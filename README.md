# Dubai Experience 2.0

Landing page da competição **Dubai Experience 2.0**, da Safirion — de 18/09 às 18h a
31/12 às 23:59 (horário de Brasília), com cinco disputas simultâneas.

Histórico: chamava **Corujão** e era um evento de 24 horas (18/09 18h → 19/09 18h).
Em 12/09/2026 mudou de nome; em seguida o prazo foi estendido até 31 de dezembro. Com isso
saiu o trilho de 24 horas ("a janela") e todo o vocabulário de virada de noite.

Página estática: um `index.html` sem build, sem dependências de runtime.

## Rodar

```sh
python3 -m http.server 4321
# http://127.0.0.1:4321/index.html
```

Precisa de servidor local (não abrir o arquivo direto por `file://`) porque os assets
são referenciados por caminho absoluto a partir da raiz do projeto.

## Estrutura

```
index.html                          página inteira: markup, CSS e o contador
assets/hero-dubai-skyline.jpg       hero — skyline, carros azuis e o touro na areia
assets/cards-deserto.jpg            fundo dos cards do carrossel (5 recortes)
assets/banner-dubai-experience.jpg  arte do banner, 1080×1350 — A GERAR
assets/mapa-mundi.svg               mapa pontilhado, de safirion.com/_ext/icons/
assets/safirion-logo-horizontal.svg logo oficial, de safirion.com/_ext/icons/
assets/safirion-icon.svg            marca isolada (touro no círculo), não usada
assets/arquivo/                     arte substituída (hero antigo, banner "Corujão")
```

O `mapa-mundi.svg` é o mesmo da área de membros (`members.partnersafirion.com`): 6.240
círculos de raio 2,4 em `#4B8FD6`. Entra como fundo ambiente só no bloco de fechamento,
a 18% e com máscara radial, para não competir com as fotos.

## Contato

O CTA de conversão é um link `wa.me` com mensagem pré-preenchida, para **+55 87 99201-3884**.
Ele aparece duas vezes: no botão da barra fixa e no fechamento. Se o número mudar, são duas
ocorrências do mesmo link no `index.html` — a mensagem vai codificada na query `?text=`.

## Identidade

Derivada de [safirion.com](https://safirion.com):

| Papel | Valor |
|---|---|
| Fundos | `#04070f` `#060b18` `#0a1120` `#111a2b` |
| Azul da marca | `#2389e6` → `#7cc0ff` |
| Texto secundário | `#a1b8c3` `#7a8f9b` |
| Âmbar (regra em definição) | `#f6b83c` |

A fonte da marca (Mazzard) é proprietária; a página usa **Archivo** no display e
**Manrope** no corpo, via Google Fonts.

## Disputas: tabela no desktop, carrossel no mobile

A partir de 880px as cinco disputas são uma tabela com cabeçalho de coluna — a comparação
lado a lado dos mínimos (20K em PNL, 100K em vendas, 20 afiliados) é o que faz o
competidor escolher onde entrar.

Abaixo disso vira carrossel com `scroll-snap` nativo, sem biblioteca. O JS só lê a posição
do scroll para acender o ponto correspondente; quem arrasta é o navegador. Se o JS não
rodar, o carrossel continua deslizando — só os pontos não aparecem.

## Datas

A janela vive em duas constantes no `<script>` ao final do `index.html`:

```js
var START = new Date("2026-09-18T18:00:00-03:00").getTime();
var END   = new Date("2026-12-31T23:59:59-03:00").getTime();
```

Elas alimentam o contador e o relógio do topo, que trocam de estado sozinhos entre
*faltam para a largada*, *ao vivo* e *encerrado*.

O horário de encerramento — **23:59 do dia 31/12** — foi assumido a partir de "acaba dia 31
de dezembro". Se for outro horário, é a constante `END`.

## Pendência

A qualificação da disputa **Live no TikTok** ainda não foi definida. Está marcada em
âmbar na página, em `.bout--tbd` e na linha correspondente das regras gerais.
