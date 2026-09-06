# Corujão Safirion

Landing page da competição **Corujão** — 24 horas corridas, do dia 18 às 18h ao dia 19 às 18h
(horário de Brasília), com cinco disputas simultâneas.

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
assets/safirion-logo-horizontal.svg logo oficial, de safirion.com/_ext/icons/
assets/safirion-icon.svg            marca isolada (touro no círculo), não usada
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
