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

**Quase tudo está em [`lib/site.ts`](lib/site.ts).** Textos, preços, serviços, projetos, FAQ e depoimentos saem daí — não precisa mexer em componente para mudar conteúdo.

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
  layout.tsx      metadados, fonte, SEO
  page.tsx        monta as seções + JSON-LD (ProfessionalService + FAQPage)
  globals.css     tema, tokens e classes utilitárias (.card, .btn-primary, .field...)
components/
  Header          menu fixo com versão mobile
  Hero            headline, foto e números
  Nichos          esteira de segmentos atendidos
  Servicos        4 frentes de trabalho
  Portfolio       projetos reais com link
  Processo        4 etapas do atendimento
  Planos          R$ 29 / R$ 79 / R$ 149 por mês
  Depoimentos     provas sociais
  Faq             perguntas frequentes (accordion nativo)
  Briefing        formulário que monta a mensagem do WhatsApp
  Footer          contatos e navegação
  BotaoFlutuante  WhatsApp fixo no canto
lib/site.ts       ⬅ todo o conteúdo
```

## Publicar na Vercel

```bash
npx vercel        # prévia
npx vercel --prod # produção
```

Ou suba o repositório no GitHub e importe em vercel.com — o Next.js é detectado automaticamente, sem configuração extra.

## Paleta

| Token | Uso |
| --- | --- |
| `ink-950` → `ink-700` | fundos, do mais escuro ao card |
| `moss-300` → `moss-600` | verde de destaque, botões e ícones |
| `sand` | texto principal (`#f2ede4`) |

Para trocar o verde por outra cor, edite `moss` em [`tailwind.config.ts`](tailwind.config.ts) — o site inteiro acompanha.
