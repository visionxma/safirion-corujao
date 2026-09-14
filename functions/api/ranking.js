/**
 * Placar do Safirion Experience 2.0 para a landing.
 *
 * Existe por um motivo especifico: a rota do placar na area de membros
 * (`/api/corujao-preview`) exige sessao e NAO manda cabecalho CORS, entao o
 * navegador da landing nunca conseguiria le-la. CORS e restricao de navegador;
 * chamada servidor-a-servidor nao esbarra nela. Esta Function roda no mesmo
 * dominio da landing, busca no servidor e devolve same-origin.
 *
 * Configurar em Pages -> Settings -> Environment variables:
 *   RANKING_ORIGEM  URL publica do placar na area de membros
 *                   (ex.: https://members.partnersafirion.com/api/corujao-publico)
 *   RANKING_TOKEN   opcional, mandado como Authorization: Bearer
 *
 * Enquanto RANKING_ORIGEM nao existir, devolve {ok:false, motivo:"sem-origem"}
 * e a pagina mostra o estado de "placar ainda fechado" — que e a verdade.
 */

const CACHE_S = 60;   // o placar da area de membros tambem nao e instantaneo

function json(dados, status, segundos) {
  return new Response(JSON.stringify(dados), {
    status: status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=" + (segundos == null ? CACHE_S : segundos),
    },
  });
}

export async function onRequestGet(context) {
  const origem = (context.env && context.env.RANKING_ORIGEM) || "";
  if (!origem) return json({ ok: false, motivo: "sem-origem" }, 200, 30);

  try {
    const cab = { accept: "application/json" };
    if (context.env && context.env.RANKING_TOKEN) {
      cab.authorization = "Bearer " + context.env.RANKING_TOKEN;
    }

    const r = await fetch(origem, {
      headers: cab,
      cf: { cacheTtl: CACHE_S, cacheEverything: true },
    });

    if (!r.ok) return json({ ok: false, motivo: "origem-" + r.status }, 200, 30);

    const dados = await r.json();
    // repassa so o que a landing desenha; nada de id, e-mail ou telefone
    const placares = Array.isArray(dados && dados.placares) ? dados.placares : [];
    return json({
      ok: true,
      atualizado: Date.now(),
      placares: placares.slice(0, 8).map(function (p) {
        return {
          chave: String((p && p.chave) || ""),
          titulo: String((p && p.titulo) || ""),
          unidade: String((p && p.unidade) || ""),
          linhas: (Array.isArray(p && p.linhas) ? p.linhas : []).slice(0, 5).map(function (l) {
            return {
              nome: String((l && l.nome) || "").slice(0, 40),
              valor: Number((l && l.valor) || 0),
              qualificado: !!(l && l.qualificado),
            };
          }),
        };
      }),
    });
  } catch (e) {
    return json({ ok: false, motivo: "falha" }, 200, 15);
  }
}
