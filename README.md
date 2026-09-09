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
  layout.tsx      metadados, fontes (Archivo + IBM Plex Mono), SEO
  page.tsx        monta as seções + JSON-LD (ProfessionalService + FAQPage)
  globals.css     tema, tokens e utilitários (.wrap, .label-mono, .btn-solid, .field...)
components/
  FundoReativo    canvas do fundo: trilha de pixels + onda ao clicar
  Header          menu fixo com versão mobile
  Hero            manchete, foto e números
  Nichos          esteira de segmentos atendidos
  Servicos        4 frentes, em lista com fios
  Portfolio       projetos reais com link
  Processo        4 etapas do atendimento
  Planos          R$ 29 / R$ 79 / R$ 149 por mês
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
