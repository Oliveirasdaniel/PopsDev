# Popsdev — site institucional

Landing page da Popsdev (Daniel Oliveira): sites e ferramentas para restaurantes, barbearias, salões de beleza e negócios que vivem de agendamento e delivery.

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:3000

## Onde editar

**Quase tudo está em [`lib/site.ts`](lib/site.ts).** Textos e projetos saem daí — não precisa mexer em componente para mudar conteúdo.

**O que a Popsdev oferece e quanto custa fica em [`lib/planos.ts`](lib/planos.ts)** e aparece numa seção só, a de Planos da home (`/planos` redireciona para ela).

### Antes de publicar, faça isto:

1. **Instagram** — troque a URL em `site.instagram` (o WhatsApp já está configurado: `5521971552321`).
2. **Sua foto** — salve o recorte com fundo removido como `public/daniel.jpeg` (proporção retrato, ~720×900).
3. **Prints do portfólio** — salve em `public/portfolio/`:
   - `florae.jpg`, `kelly.jpg`, `crepe.jpg` (~1200×800, print do topo de cada site).
   - Enquanto não existirem, os cards mostram um placeholder com o nome do projeto.
4. **Domínio** — atualize `site.url` com o domínio final (usado no SEO e no Open Graph).

## Estrutura

```
app/
  layout.tsx      metadados, fontes (Archivo + IBM Plex Mono), SEO
  page.tsx        monta as seções + JSON-LD (ProfessionalService + FAQPage)
  globals.css     tema, tokens e utilitários (.wrap, .label-mono, .btn-solid, .field...)
components/
  FundoReativo    canvas do fundo: trilha de pixels + onda ao clicar
  Header          menu fixo com versão mobile
  Hero            manchete, foto e números
  Nichos          esteira de segmentos atendidos
  Planos          o que oferecemos + preço + checkout, em lista com fios
  Portfolio       projetos reais com link
  Processo        4 etapas do atendimento
  Faq             perguntas frequentes (accordion nativo)
  Briefing        formulário que monta a mensagem do WhatsApp
  Footer          contatos e navegação
  BotaoFlutuante  WhatsApp fixo no canto
lib/site.ts       ⬅ todo o conteúdo
lib/planos.ts     ⬅ planos, adesão e mensalidade (em centavos)
lib/syncpay.ts    cliente da API da SyncPay (só servidor)
app/api/checkout/ cria o Pix da adesão ou a assinatura (POST) e consulta o status (GET /[id])
app/api/syncpay/webhook/  aviso de pagamento da SyncPay
```

## Pagamentos (SyncPay)

Doc oficial: https://syncpay.apidog.io (API partner v1).

Sem credenciais, a seção de planos funciona normalmente e todo botão leva ao WhatsApp. Com credenciais, os planos que têm `preco` em `lib/planos.ts` ganham o botão **Assinar**:

1. **Adesão** (se o plano tiver): Pix único, por `POST /cash-in`.
2. **Mensalidade**: assim que a adesão cai, o cliente é matriculado num plano recorrente da SyncPay (`POST /subscription-plans/{token}/enroll`), que devolve o Pix da 1ª mensalidade. Daí em diante a SyncPay gera e manda por e-mail o Pix de cada ciclo de 30 dias (ou debita sozinha, com `SYNCPAY_COBRANCA=pix_automatico`).

Os planos recorrentes são criados na SyncPay sozinhos, na primeira assinatura, com o nome `Popsdev · <título>` e o valor de `lib/planos.ts`. Mudou o preço, nasce um plano novo lá; quem já assina continua no antigo.

### Configurar

1. Copie `.env.example` para `.env.local` e preencha `SYNCPAY_CLIENT_ID`, `SYNCPAY_CLIENT_SECRET` e `SYNCPAY_WEBHOOK_TOKEN`.
2. Cadastre as mesmas variáveis na Vercel e faça um novo deploy (os botões só mudam no build).
3. Cadastre os webhooks de assinatura: `node --env-file=.env.local scripts/syncpay-webhooks.mjs`.
4. Faça uma assinatura de teste e confira em **Vercel › Logs** as linhas `[checkout]` e `[syncpay:webhook]`.

O webhook não confia no corpo do aviso: pega o ID e confirma o status direto na API.

### Área do cliente

`/entrar` pede o e-mail da assinatura e manda um link de acesso (sem senha, 15 min, uso único); `/conta` mostra as assinaturas, a próxima cobrança, reenvia o Pix e cancela. Fica escondida até existirem `DATABASE_URL` (Neon) e `RESEND_API_KEY`. O banco guarda só nome, e-mail, telefone, assinaturas e sessões (hash); CPF fica só na SyncPay.

### Diferenças entre a doc da SyncPay e a API real (out/2026)

- `enroll` devolve o copia e cola em `payment.qr_code_pix`, não em `pix_code`.
- `GET /subscriptions/{token}` devolve a assinatura solta, sem o envelope `data`.

## Publicar na Vercel

```bash
npx vercel        # prévia
npx vercel --prod # produção
```

Ou suba o repositório no GitHub e importe em vercel.com — o Next.js é detectado automaticamente, sem configuração extra.

## Direção visual

Preto neutro, tipografia como estrutura e uma única cor de acento. Nada de gradiente colorido, brilho ou pílula — o movimento vem do fundo reativo, não da decoração.

| Token | Uso |
| --- | --- |
| `base-950` → `base-800` | fundos, do mais escuro ao elevado |
| `bone` (`#ece9e2`) | texto principal e blocos invertidos |
| `muted` (`#8b8b85`) | texto secundário |
| `acid` (`#a3e635`) | acento, usado com parcimônia |
| `line` | fios de 1px que separam tudo |

Fontes: **Archivo** (texto e manchetes) e **IBM Plex Mono** (rótulos, números e etiquetas).

### Fundo reativo

[`components/FundoReativo.tsx`](components/FundoReativo.tsx) é um canvas único, `pointer-events-none`, montado uma vez em `app/layout.tsx`:

- **trilha de pixels** — células acendem sob o cursor e apagam sozinhas;
- **onda ao clicar** — anel que se expande e acende a grade na borda;
- só anima quando há algo acontecendo (sem rAF rodando à toa);
- respeita `prefers-reduced-motion`: quem pede menos movimento não recebe nenhum.

Para trocar pelos componentes do Originkit (`pixel-trail` e `clickeffects`), basta substituir o conteúdo desse arquivo — nada mais no projeto depende da implementação.
