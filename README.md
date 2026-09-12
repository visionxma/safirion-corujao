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

## Pendência

A qualificação da disputa **Live no TikTok** ainda não foi definida. Está marcada em
âmbar na página, em `.bout--tbd` e na linha correspondente das regras gerais.
