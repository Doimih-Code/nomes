# NOMES

Website de prezentare pentru agentia NOMES, construit pe Next.js App Router, cu formulare de contact, integrare Stripe Checkout pentru cursuri si endpoint de webhook.

## Stack tehnic

- Framework: Next.js 16 (App Router)
- UI: React 19
- Styling: Tailwind CSS v4 + tw-animate-css
- Componente: Radix UI + colectie de componente in `components/ui`
- Form handling: react-hook-form + zod
- Animatii: motion
- Email: Nodemailer (SMTP custom)
- Payments: Stripe Checkout + Stripe Webhook
- Analytics: @vercel/analytics
- Language: TypeScript 5 (strict)
- Runtime package manager: pnpm

## Cerinte

- Node.js 22 LTS (recomandat)
- pnpm (prin Corepack sau instalat global)

Verificare rapida:

```powershell
node -v
pnpm -v
```

## Instalare locala

```powershell
pnpm install
```

## Configurare variabile de mediu

Foloseste doua fisiere diferite:

- `.env.local` pentru dezvoltare locala
- `.env.production` pentru productie pe VPS/Docker

Pentru dezvoltare, porneste din `.env.example`:

```powershell
cp .env.example .env.local
```

Pentru productie, porneste din `.env.production.example`:

```powershell
cp .env.production.example .env.production
```

Exemplu pentru dezvoltare locala:

```dotenv
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_CHECKOUT_TEST_MODE=false

# Stripe
STRIPE_SECRET_KEY=replace_with_stripe_secret_key
STRIPE_WEBHOOK_SECRET=replace_with_webhook_secret
STRIPE_PRICE_ID_MARKETING_DIGITAL_APLICAT=replace_with_price_id

# Course access
COURSE_ACCESS_TOKEN_SECRET=replace_with_long_random_secret
COURSE_ACCESS_LINK_TTL_HOURS=72
COURSE_MATERIALS_URL_MARKETING_DIGITAL_APLICAT=https://example.com/materiale-marketing

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=replace_with_recaptcha_site_key
RECAPTCHA_SECRET_KEY=replace_with_recaptcha_secret_key
RECAPTCHA_THRESHOLD=0.5

# SMTP / Email
SMTP_HOST=mail.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=replace_with_smtp_user
SMTP_PASSWORD=replace_with_smtp_password
EMAIL_FROM=noreply@example.com
EMAIL_FROM_NAME=NOMES
CONTACT_RECIPIENT_EMAIL=contact@example.com
EMAIL_REPLY_TO=contact@example.com
```

### Variabile folosite in proiect

- `NEXT_PUBLIC_APP_URL`: URL-ul public al aplicatiei (obligatoriu in productie pentru Stripe redirects)
- `NEXT_PUBLIC_STRIPE_CHECKOUT_TEST_MODE`: activeaza fluxul fake de checkout in frontend (`true` doar in test local)
- `STRIPE_SECRET_KEY`: cheia server-side Stripe
- `STRIPE_WEBHOOK_SECRET`: secret pentru validarea semnaturii webhook Stripe
- `STRIPE_PRICE_ID_MARKETING_DIGITAL_APLICAT`: Price ID Stripe pentru cursul disponibil
- `COURSE_ACCESS_TOKEN_SECRET`: secret pentru semnarea linkurilor de acces la materiale
- `COURSE_ACCESS_LINK_TTL_HOURS`: durata de valabilitate (ore) a linkurilor de acces
- `COURSE_MATERIALS_URL_MARKETING_DIGITAL_APLICAT`: URL-ul destinatie pentru materialele cursului
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: cheia publica reCAPTCHA
- `RECAPTCHA_SECRET_KEY`: cheia privata reCAPTCHA
- `RECAPTCHA_THRESHOLD`: prag scor anti-bot (default 0.5)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`: configuratie SMTP
- `EMAIL_FROM`, `EMAIL_FROM_NAME`, `CONTACT_RECIPIENT_EMAIL`, `EMAIL_REPLY_TO`: configuratie expeditor/destinatar email

Note:

- In productie, valorile reale trebuie puse in `.env.production`.
- In dezvoltare, `.env.local` ramane fisierul principal si nu se comite in git.
- Pentru update pe serverul de productie, foloseste [deploy/update-production.sh](deploy/update-production.sh) sau un proces echivalent care pastreaza `.env.production` separat de cod.

## Rulare in development

```powershell
pnpm dev
```

Aplicatia va fi disponibila la adresa:

```text
http://localhost:3000
```

## Scripturi disponibile

```powershell
pnpm dev    # porneste serverul Next.js in development
pnpm type-check  # verifica TypeScript fara emit
pnpm build  # build de productie
pnpm start  # ruleaza build-ul de productie
```

## API routes

- `POST /api/contact`
	- primeste formularul de contact
	- valideaza campurile + email + telefon
	- valideaza token reCAPTCHA (daca este trimis)
	- trimite email intern + email de confirmare client

- `POST /api/stripe/checkout`
	- creeaza sesiune Stripe Checkout pentru un curs
	- foloseste rate limiting in memorie pe IP
	- suporta idempotency key prin header `x-idempotency-key`

- `GET /api/stripe/checkout/verify-session?session_id=...`
	- verifica statusul unei sesiuni Stripe
	- intoarce `verified: true` daca plata este confirmata
	- intoarce optional un `accessUrl` semnat pentru acces rapid la materiale

- `POST /api/stripe/webhook`
	- valideaza semnatura Stripe webhook
	- gestioneaza evenimente principale (`checkout.session.completed`, `payment_intent.payment_failed`, `charge.refunded`)
	- la plata confirmata trimite email de fulfillment cu link securizat de acces materiale

- `GET /api/cursuri/access?token=...&course=...`
	- valideaza tokenul de acces semnat
	- redirectioneaza catre URL-ul de materiale configurat in env

## Build si productie

```powershell
pnpm build
pnpm start
```

Observatii de configurare:

- `next.config.mjs` foloseste `output: 'standalone'` si `distDir: '.next-build'`
- `pnpm build` include `pnpm type-check` inainte de build
- `images.unoptimized` este activ
- in development este folosit `next dev --webpack` pentru stabilitate pe Windows
- In productie, `STRIPE_SECRET_KEY` trebuie sa fie `sk_live_*`, `STRIPE_WEBHOOK_SECRET` trebuie sa fie `whsec_*`, iar `NEXT_PUBLIC_STRIPE_CHECKOUT_TEST_MODE` trebuie sa ramana `false`.

## Docker

Proiectul include `Dockerfile` multi-stage pe Node 22 Alpine.

Build imagine:

```powershell
docker build -t nomes-v0 .
```

Run container:

```powershell
docker run --rm -p 3000:3000 --env-file .env.local nomes-v0
```

## Structura proiect (high-level)

- `app/` - pagini, layout global si API routes (App Router)
- `components/` - componente custom de UI/sectiuni
- `components/ui/` - biblioteca de componente reutilizabile
- `lib/` - utilitare server-side (email, Stripe, reCAPTCHA, rate limit)
- `public/` - asset-uri statice
- `styles/` - stiluri globale suplimentare
- `dash-mode/` - aplicatie separata, exclusa din `tsconfig` principal

## Troubleshooting rapid

- Daca `pnpm` nu este disponibil:

```powershell
corepack enable
corepack prepare pnpm@latest --activate
```

- Daca Stripe checkout returneaza eroare 503:
	- verifica `STRIPE_PRICE_ID_MARKETING_DIGITAL_APLICAT`
	- verifica `COURSE_MATERIALS_URL_MARKETING_DIGITAL_APLICAT`

- Daca formularul de contact esueaza:
	- verifica `SMTP_*`, `EMAIL_*` si cheile reCAPTCHA

- Daca email-ul de fulfillment nu ajunge dupa plata:
	- verifica `COURSE_ACCESS_TOKEN_SECRET` si `STRIPE_WEBHOOK_SECRET`
	- verifica livrarea webhook catre `/api/stripe/webhook`
