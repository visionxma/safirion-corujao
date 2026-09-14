# Dubai Experience 2.0

Landing page da competição **Dubai Experience 2.0**, da Safirion — de 18/09 às 18h a
31/12 às 23:59 (horário de Brasília), com cinco disputas simultâneas.

Histórico: chamava **Corujão** e era um evento de 24 horas (18/09 18h → 19/09 18h).
Em 12/09/2026 mudou de nome; em seguida o prazo foi estendido até 31 de dezembro. Com isso
saiu o trilho de 24 horas ("a janela") e todo o vocabulário de virada de noite.

Página estática: um `index.html` sem build, sem dependências de runtime.

## Páginas

| Rota | Arquivo | O que é |
|---|---|---|
| `/` | `index.html` | A competição: cinco disputas, mínimos, como participar |
| `/lead/` | `lead/index.html` | Captura de lead: cadastro que segue para o WhatsApp |

**Duas divergências herdadas da copy, de propósito não resolvidas por mim:**

1. **Nome.** A raiz usa *Safirion Experience 2.0*; a `/lead` usa *Dubai Experience 2.0*,
   que é como a copy foi entregue.
2. **Datas.** A raiz diz **18/09 às 18h** a 31/12; a `/lead` diz **12 de setembro** a 31/12.

Alinhar as duas é decisão de campanha, não de código.

## Paleta: ouro nas duas páginas

Vem do cartaz de campanha: ouro (`#ffe9a8` · `#f5c542` · `#e0a62a` · `#a96f0c`) sobre o
pôr do sol da foto. O azul da marca ficou onde ele é insubstituível — o logo, os carros
da imagem e os pontos do mapa, que sozinhos dão a tensão fria contra o dourado.

O acento sai dos tokens `--ac` / `--ac-hi` / `--ac-claro`, e o `.cromo` usa gradiente
dourado. Trocar a campanha de cor é mexer nesses valores.

**O alerta precisou de cor nova.** A pendência da Live no TikTok era âmbar `#f6b83c`,
que some no meio de uma página dourada. Passou para o laranja `#f47133`, também da
paleta do safirion.com, que se distingue do ouro sem introduzir um matiz estranho.

A hero é o mesmo cartaz em dois arranjos, os dois vindos das peças de campanha —
não é o layout de celular esticado:

| | Celular | Computador (≥900px) |
|---|---|---|
| Alinhamento | centralizado | coluna à esquerda |
| Lista `viagem / luxo / liberdade / oportunidades` | escondida | coluna lateral direita |
| Chamarizes | centralizados, ícone em cima | alinhados à esquerda, sob o botão |
| "Dubai te espera." | caixa alta espaçada, com fios | serifada em itálico dourado, canto inferior direito |

Uma grade de áreas (`marca / lado / col / espera`) faz a troca; o conteúdo é o mesmo
nos dois, sem duplicar marcação.

A barra do topo fica escondida até 260px de rolagem: a hero já assina a marca, e o
logo dela batia no `SAFIRION` do cartaz.

## O vídeo de fundo

A seção "Imagine viver Dubai de verdade" tem vídeo no fundo:
`assets/dubai-fundo.mp4` (buggy nas dunas ao pôr do sol).

O arquivo entregue tinha 8,7 MB com áudio. Foi reencodado sem áudio, em 1600px
e CRF 27, com `faststart`: **1,8 MB**, cinco vezes menor. `dubai-fundo.jpg` é o
frame 18, usado como `poster`.

Três cuidados no player:

- `preload="none"` e play só quando a seção entra em cena (IntersectionObserver,
  margem de 250px). Ninguém baixa 1,8 MB para uma seção que talvez não veja.
- Pausa ao sair de cena.
- Com `prefers-reduced-motion: reduce`, o vídeo nunca roda — fica no frame do
  poster, que é uma imagem perfeitamente boa.

O véu escuro dessa seção é mais leve que o das outras: calibrado para foto
parada, ele engolia o movimento. O texto ganhou `text-shadow` própria em troca.

## Contadores

Cada página conta uma coisa diferente, porque as janelas são diferentes:

| Página | Conta até | Rótulo |
|---|---|---|
| `/` | 18/09 18h, depois 31/12 23:59 | troca sozinho entre *faltam para a largada*, *ao vivo* e *encerrada* |
| `/lead/` | 31/12 23:59 | *falta para o encerramento* (a campanha começou em 12/09) |

O rótulo existe porque um contador sem legenda não diz o que está contando — era o caso
da faixa antes.

## O cadastro da /lead

Valida nome, e-mail e telefone no navegador, grava numa planilha do Google e abre o WhatsApp
com os três campos já escritos na mensagem. O WhatsApp é a segunda via: se a planilha falhar,
o lead ainda chega pela conversa.

**Está ligado e testado** (14/09/2026 — o endpoint respondeu `{"ok":true}`). A URL do app
da Web fica na constante `PLANILHA`, no fim de `lead/index.html`. Se o script for
republicado, a URL muda e precisa ser atualizada ali.

O passo a passo — criar a planilha, publicar o Apps Script, colar a URL — está em
**[PLANILHA.md](PLANILHA.md)**, caso precise refazer.

Além dos três campos, cada linha grava data/hora, a página de origem e os parâmetros
`utm_source`, `utm_medium` e `utm_campaign` da URL — para saber de qual anúncio veio o lead.

O formulário tem armadilha para robô (campo escondido fora da viewport e fora da tabulação) e
usa `navigator.sendBeacon`, que enfileira o envio no navegador e sobrevive à navegação para o
WhatsApp.

## Responsividade

Auditado nas duas páginas em **13 larguras** — 320, 360, 390, 412, 430, 540, 768, 834,
900, 1024, 1280, 1440 e 1920px — checando quatro coisas por vez:

| O que se mede | Critério |
|---|---|
| Rolagem horizontal | `scrollWidth === innerWidth` |
| Alvos de toque | nenhum link ou botão abaixo de 32px |
| Texto miúdo | nenhum `font-size` abaixo de 10px |
| `alt` e `id` duplicado | zero ocorrências |

**26 de 26 combinações limpas.** O script da auditoria não ficou no repo; ele roda um
iframe por largura e lê o DOM renderizado, e vale recriar antes de qualquer mudança grande
de layout — chutar responsividade olhando print não funciona.

Três correções que só apareceram medindo:

- Os pontos do carrossel tinham **8×8px**. O ponto continua com 8px, mas o botão virou
  40×40 com o círculo desenhado em `::before`.
- 17 tamanhos de fonte entre **8,3 e 9,5px** foram elevados ao piso de 10px.
- `.faixa__datas span` pegava também o `<span>` que embrulha o par, e a caixa alta vazava
  para dentro do valor: a data saía como *"18/09, 18H"*.

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
assets/mapa-mundi.svg               mapa pontilhado, de safirion.com/_ext/icons/
assets/safirion-logo-horizontal.svg logo oficial, de safirion.com/_ext/icons/
assets/safirion-icon.svg            marca isolada (touro no círculo), não usada
assets/arquivo/                     arte substituída (hero antigo, banner "Corujão")
```

O `mapa-mundi.svg` é o mesmo da área de membros (`members.partnersafirion.com`): 6.240
círculos de raio 2,4 em `#4B8FD6`. Entra como fundo ambiente só no bloco de fechamento,
a 18% e com máscara radial, para não competir com as fotos.

## O banner do passo a passo

Abre uma vez por sessão quando o scroll passa de 55% da altura do herói. O cabeçalho é a arte
enquadrada no lockup cromado; os quatro passos abaixo são HTML, ligados por um fio vertical,
com o botão do WhatsApp dentro do passo 01 — que é onde a conversão acontece.

A arte completa **não** é usada inteira aqui de propósito: as quatro colunas de texto dela,
reduzidas à largura do modal, ficam com cerca de 5px e são ilegíveis. Ela serve inteira como
peça de divulgação — 1122×1402 é 4:5, formato de feed.

Fecha no X, no Esc, no clique fora e no "Ver a página". Prende o foco do teclado enquanto
aberto, trava o scroll do corpo e devolve o foco ao sair.

## Contato

O CTA de conversão é um link `wa.me` com mensagem pré-preenchida, para **+55 87 99201-3884**.
Ele aparece duas vezes: no botão da barra fixa e no fechamento. Se o número mudar, são duas
ocorrências do mesmo link no `index.html` — a mensagem vai codificada na query `?text=`.

## A pegada visual

Vem da arte do banner (`assets/banner-dubai-experience.jpg`), gerada pelo prompt em
`PROMPT-BANNER.md`. Três assinatura dela foram levadas para a página inteira:

- **Tipografia cromada** — gradiente prata com brilho no meio, via `background-clip: text`
  na classe `.cromo`. Aplicada ao título do herói, aos títulos de seção e aos números-limiar.
  Há um `@supports not` que devolve branco sólido onde `background-clip: text` não pega.
- **Composição centralizada** nos títulos e no herói. As linhas de dados das disputas seguem
  alinhadas à esquerda — centralizar tabela prejudica a leitura.
- **Mapa pontilhado bem mais presente**, com véu radial atrás dos blocos de texto para os
  pontos não comerem o parágrafo.

Mais os fios finos ladeando os títulos (`.fios`) e separando as colunas dos passos.

## A hero em dois arranjos

A foto é 16:9 e a tela do celular é perto de 1:2. Com `object-fit: cover` preenchendo a
altura, só cabem **27% da largura** da imagem — os dois carros e o touro ficam de fora e
sobra só o skyline. Não é questão de ajustar `object-position`: é geometria.

Por isso os arranjos são estruturalmente diferentes:

- **Computador** — foto sangrando no fundo, título e botão sobrepostos ao centro.
- **Celular (≤819px)** — título no escuro, **foto como faixa 16:9 de borda a borda** com
  o assunto inteiro visível, botão embaixo. A ordem vem de `order` no flex, sem duplicar
  marcação.

No celular o botão dourado da faixa inferior some: ele repetiria um segundo dourado a
200px do primeiro.

## A ideia da página

**O limiar é o herói.** Numa competição o que decide tudo é o mínimo que te coloca na
contagem — então esse número é o sistema visual: `20K`, `5min`, `20`, `100K` em corpo
gigante abrindo cada linha, e `?` em âmbar na única disputa cujo mínimo ainda não saiu.

Decorre daí o resto:

- **Herói sangrando**, com a tipografia dentro da cena, e não um painel dividido
  tipo-à-esquerda / foto-à-direita. Barra do topo transparente sobre a foto, sólida depois.
- **Faixa de informação** no rodapé da foto — largada, encerramento, contador e CTA numa
  linha só, como placa de dia de prova.
- **Uma segunda voz tipográfica.** Instrument Serif em itálico aparece em três momentos
  (subtítulo do herói, apoio dos passos, título do fecho) contra a condensada pesada.
  Sem ela a página era caixa alta condensada do começo ao fim.
- **Aberturas de seção variadas.** O padrão "rótulo pequeno + título grande" repetido em
  toda seção é assinatura de template; aqui cada seção entra de um jeito.
- **Os passos correm na horizontal**, com marcadores ligados por um fio — as disputas já
  são linhas empilhadas, repetir o mesmo recurso achataria a hierarquia.

## Identidade
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

## Pendências de conteúdo

**Duas disputas sem regra.** `FTD` e `Live no TikTok` aparecem com `?` em laranja
(`.ficha--aberta`). A `Live no TikTok` tem critério mas não tem mínimo; a `FTD` não tem
nenhum dos dois — ela foi incluída porque a hero diz "6 chances" e a área de membros
(`members.partnersafirion.com`) lista seis métricas, mas a regra nunca foi passada.
O texto dela é deliberadamente vago para não afirmar o que não foi definido.

**O prêmio não está escrito em lugar nenhum.** A hero diz "6 chances para ir para Dubai"
e o fecho diz "o ano termina em Dubai", mas a página nunca declara o que o vencedor de
cada disputa leva.
