# Salvar os cadastros numa planilha

A `/lead` é estática — não tem servidor. O caminho para gravar numa planilha sem contratar
nada é um **Google Apps Script** publicado como app da web: a página manda os dados, o
script escreve a linha na planilha.

Tudo abaixo acontece **dentro da sua conta Google**. Eu não tenho acesso a ela, então esses
seis passos são seus. Levam uns cinco minutos.

---

## 1. Crie a planilha

Em [sheets.new](https://sheets.new), crie uma planilha e dê um nome — por exemplo
**Dubai Experience 2.0 — Leads**. Não precisa criar colunas: o script cria o cabeçalho
sozinho na primeira vez que alguém se cadastrar.

## 2. Abra o editor de script

Na planilha: menu **Extensões → Apps Script**.

## 3. Cole o código

Apague o que estiver lá e cole isto:

```javascript
const ABA = 'Leads';

function doPost(e) {
  const trava = LockService.getScriptLock();
  trava.waitLock(30000);
  try {
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    let aba = planilha.getSheetByName(ABA);

    if (!aba) {
      aba = planilha.insertSheet(ABA);
      aba.appendRow([
        'Data/hora', 'Nome', 'E-mail', 'Telefone',
        'Origem', 'utm_source', 'utm_medium', 'utm_campaign'
      ]);
      aba.setFrozenRows(1);
      aba.getRange('A1:H1').setFontWeight('bold');
    }

    const d = JSON.parse(e.postData.contents);

    aba.appendRow([
      new Date(),
      d.nome         || '',
      d.email        || '',
      d.telefone     || '',
      d.origem       || '',
      d.utm_source   || '',
      d.utm_medium   || '',
      d.utm_campaign || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: String(erro) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    trava.releaseLock();
  }
}
```

Salve (⌘S).

> O `LockService` existe por um motivo: se duas pessoas se cadastrarem no mesmo segundo,
> sem ele as duas escrevem na mesma linha e um lead se perde.

## 4. Publique como app da web

Botão **Implantar → Nova implantação**:

| Campo | Valor |
|---|---|
| Tipo | **App da Web** (clique na engrenagem ao lado de "Selecionar tipo") |
| Descrição | Leads Dubai Experience |
| Executar como | **Eu** |
| Quem pode acessar | **Qualquer pessoa** |

Clique em **Implantar**. O Google vai pedir autorização — aceite. Na tela de aviso
("O Google não verificou este app"), clique em **Avançado → Acessar [nome do projeto]**.
É o seu próprio script; o aviso aparece porque ele não passou por revisão pública.

Copie a **URL do app da Web**. Ela termina em `/exec`.

## 5. Cole a URL na página

Em `lead/index.html`, procure a linha:

```javascript
var PLANILHA = "";
```

E cole a URL entre as aspas:

```javascript
var PLANILHA = "https://script.google.com/macros/s/AKfy.../exec";
```

## 6. Publique e teste

Faça o commit, espere o Cloudflare Pages rebuildar, e preencha o formulário com dados de
teste. A linha deve aparecer na aba **Leads** em segundos.

---

## O que é gravado

| Coluna | De onde vem |
|---|---|
| Data/hora | Relógio do servidor do Google |
| Nome, E-mail, Telefone | Os três campos do formulário |
| Origem | Caminho da página (`/lead/`) |
| utm_source, utm_medium, utm_campaign | Da URL, quando existirem |

As três últimas colunas valem ouro se você rodar anúncio: chamando a página como
`…/lead/?utm_source=instagram&utm_campaign=stories-set`, cada lead chega sabendo de onde
veio, e dá para comparar canais por conversão em vez de por achismo.

---

## Duas limitações, ditas na cara

**O envio é sem confirmação.** Apps Script não devolve cabeçalho CORS num POST vindo de
outro domínio. A página usa `navigator.sendBeacon`, que enfileira o envio no navegador e
sobrevive à navegação para o WhatsApp — é o mecanismo certo para isso — mas **não dá para
ler a resposta**. Se o script cair, a página não fica sabendo e mostra sucesso mesmo assim.

Por isso o fluxo do WhatsApp continua: ele é a segunda via. Se a planilha falhar, o lead
ainda chega pela conversa.

**Enquanto `PLANILHA` estiver vazio, nada é gravado.** A página funciona normalmente e leva
ao WhatsApp, sem erro visível — mas não existe lista nenhuma. É o estado atual.

---

## Se precisar de confirmação de verdade

Aí o caminho é outro: um endpoint próprio (uma Cloudflare Function no mesmo Pages, por
exemplo) que responde com CORS e devolve sucesso ou erro. Dá para fazer, é mais trabalho,
e só vale se perder lead silenciosamente for inaceitável. Me diga se for o caso.
