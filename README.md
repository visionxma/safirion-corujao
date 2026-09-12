# Dubai Experience 2.0

Landing page da competição **Dubai Experience 2.0**, da Safirion — 24 horas corridas, de
18/09 às 18h a 19/09 às 18h (horário de Brasília), com cinco disputas simultâneas.

A competição chamava **Corujão** até 12/09/2026. O nome mudou, mas a janela de 24 horas
continua atravessando a madrugada — por isso a página mantém o vocabulário noturno
("a noite é de quem não dorme", a madrugada hachurada no trilho).

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
assets/hero-dubai.jpg               hero, 1920×730 — recorte da arte original
assets/hero-dubai-original.png      arte-fonte 1920×1080, com o lockup gravado
assets/banner-dubai-experience.jpg  arte do banner, 1080×1350 — A GERAR
assets/safirion-logo-horizontal.svg logo oficial, de safirion.com/_ext/icons/
assets/safirion-icon.svg            marca isolada (touro no círculo), não usada
assets/arquivo/                     arte do banner com o nome antigo (Corujão)
```

O hero é um recorte dos 730px superiores da arte original: os 350px de baixo trazem o
lockup *SAFIRION EXPERIENCE DUBAI* gravado nos pixels, que competia com o título da página.

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
var END   = new Date("2026-09-19T18:00:00-03:00").getTime();
```

Elas alimentam o contador, o relógio do topo e o trilho de 24h, que troca de estado
sozinho entre *faltam para a largada*, *ao vivo* e *encerrado*.

## Pendência

A qualificação da disputa **Live no TikTok** ainda não foi definida. Está marcada em
âmbar na página, em `.bout--tbd` e na linha correspondente das regras gerais.
