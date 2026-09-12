# Prompt da arte do banner

> **A arte precisa ser regerada.** A competição se chamava *Corujão* e passou a se chamar
> **Dubai Experience 2.0** em 12/09/2026. A arte antiga tem `CORUJÃO` gravado nos pixels e
> foi movida para `assets/arquivo/`. Até a nova chegar, o banner mostra os quatro passos em
> texto real — funciona, só sem arte.

A página espera o arquivo em **`assets/banner-dubai-experience.jpg`**, em **1080 × 1350 px (4:5)**.

> **Leia antes:** gerador de imagem erra texto. Ele troca letras, come acentos e inventa
> palavras — e aqui o texto carrega datas e regras, onde errar é caro. Por isso existem dois
> prompts abaixo. O **B é o recomendado**: gera só o fundo, e o texto continua sendo HTML de
> verdade por cima — nítido em qualquer tela, corrigível sem regerar, e lido por leitor de tela.
> O A é o que foi pedido, com a arte inteira fechada.

---

## Prompt B — só o fundo (recomendado)

```
Crie uma imagem de 1080 x 1350 px (proporção 4:5), sem nenhum texto, letra ou número.

Cenário: fundo noturno abstrato para um material de competição de trading.
Gradiente diagonal de #111a2b no canto superior esquerdo para #04070f no canto
inferior direito. Sobre ele, um brilho quente e discreto de pôr do sol no deserto
vindo do canto superior direito, em tons #f6b83c e #F47133, com no máximo 15% de
intensidade — insinuado, quase imperceptível, jamais dominante.

No terço inferior, um halo azul frio em #2389e6 a cerca de 20% de opacidade,
saindo da borda de baixo para cima e dissolvendo antes do meio.

Textura: grão fino de filme, uniforme, sutil. Sem ruído pesado.

Deixe o centro da imagem limpo e escuro o bastante para receber texto branco por
cima com contraste alto. Nada de formas geométricas fortes, ícones, molduras,
logotipos, pessoas, carros, prédios ou silhuetas no centro.

Estilo: sóbrio, noturno, corporativo premium. Sem brilho neon, sem lens flare
exagerado, sem estética de cassino.
```

Depois de gerar, é só salvar como `assets/banner-dubai-experience.jpg`. Me avise que eu troco o
banner para desenhar o texto por cima da imagem em vez de escondê-lo.

---

## Prompt A — arte fechada, com o texto dentro

```
Crie uma imagem de 1080 x 1350 px (proporção 4:5) para o banner de uma competição
chamada DUBAI EXPERIENCE 2.0, da corretora Safirion. Estética noturna, sóbria, corporativa premium.

FUNDO
Gradiente diagonal de #111a2b (topo esquerdo) para #04070f (base direita). Um brilho
quente de pôr do sol no deserto no canto superior direito, em #f6b83c, a no máximo 15%
de intensidade. Grão de filme fino e uniforme.

MARGEM
Margem de segurança de 72 px em todos os lados. Nada de conteúdo fora dela.

COMPOSIÇÃO, de cima para baixo

1. Espaço vazio de 130 px de altura no topo, reservado para o logo. Deixe limpo.

2. Sobretítulo em duas linhas:
   DUBAI
   EXPERIENCE 2.0
   Caixa alta, grotesca condensada pesada, entrelinha apertada, corpo grande.
   DUBAI e EXPERIENCE em branco #ffffff; o "2.0" em azul #7cc0ff.

3. Título: COMO PARTICIPAR
   Caixa alta, mesma família condensada pesada, branco, logo abaixo do sobretítulo,
   corpo um pouco menor.

4. Linha de apoio: Quatro passos, até 31 de dezembro.
   Caixa baixa, sans geométrica, cor #a1b8c3, corpo pequeno.

5. Um fio horizontal de 1 px em #a1b8c3 a 16% de opacidade, largura total útil.

6. Quatro blocos empilhados, com espaçamento igual entre eles. Cada bloco tem
   um número à esquerda, em coluna própria de 60 px, e o texto à direita:

   01   ESCOLHA SUAS DISPUTAS
        Entre em quantas quiser. As cinco são independentes.

   02   BATA A QUALIFICAÇÃO
        Cada disputa tem um mínimo. Abaixo dele você sai da contagem.

   03   PRODUZA DENTRO DA JANELA
        18/09 às 18h até 31/12 às 23:59, horário de Brasília.

   04   GUARDE A COMPROVAÇÃO
        Prints, links e relatórios para a apuração.

   Os números 01 a 04 em #7cc0ff, sans geométrica seminegrito, alinhados à esquerda.
   Os títulos em caixa alta, branco #ffffff, seminegrito, com leve espaçamento entre
   letras. As descrições em caixa baixa, #a1b8c3, corpo menor.
   Entre um bloco e o seguinte, um fio de 1 px em #a1b8c3 a 9% de opacidade.

7. Rodapé: 18/09, 18:00 — 31/12, 23:59 · horário de Brasília
   Corpo pequeno, #7a8f9b, alinhado à esquerda.

REGRAS DE TEXTO
Escreva exatamente as palavras acima, em português do Brasil, com todos os acentos:
Dubai Experience 2.0, participar, disputas, qualificação, mínimo, você, horário,
Brasília, relatórios, apuração. Não traduza, não reescreva, não abrevie, não invente linhas
novas. Nenhuma outra palavra na imagem.

NÃO INCLUIR
Nenhum logotipo, marca, touro, ícone, emoji, pessoa, carro, prédio, moldura de
celular, mockup, marca-d'água ou assinatura. Nenhuma promessa de ganho, valor de
prêmio ou porcentagem de retorno.

Estilo: alto contraste, muito respiro, hierarquia clara. Sem neon, sem 3D, sem
gradiente arco-íris, sem estética de cassino.
```

### Depois de gerar com o prompt A

1. Confira letra por letra os acentos e as datas — é onde o gerador erra.
2. Salve em `assets/banner-dubai-experience.jpg`.
3. Componha o logo real por cima, no espaço de 130 px do topo. Use
   `assets/safirion-logo-horizontal.svg`, que é vetor — nunca deixe o gerador
   desenhar o touro, ele sai deformado.

---

## Paleta e tipografia, para referência

| Papel | Valor |
|---|---|
| Fundo escuro | `#04070f` · `#0a1120` · `#111a2b` |
| Azul da marca | `#2389e6` · `#7cc0ff` |
| Texto secundário | `#a1b8c3` · `#7a8f9b` |
| Âmbar (pendência) | `#f6b83c` |
| Branco | `#ffffff` |

Display: grotesca condensada pesada (a página usa **Archivo**, eixo de largura em 62–74).
Corpo: sans geométrica humanista (a página usa **Manrope**).
A fonte da marca Safirion é a Mazzard, proprietária — não está no projeto.
