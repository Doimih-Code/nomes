# NOMES v0

Landing website pentru o agenție de marketing ("NOMÉS"), construit cu Next.js (App Router), React 19, Tailwind CSS v4 și componente UI de tip Radix/shadcn.

## Ce este în proiect

- Framework: Next.js 16
- UI: React 19 + Tailwind CSS 4
- Routing: App Router (`app/`)
- Stil: paletă custom de brand în `app/globals.css`
- Componente: `components/` + `components/ui/`

## Structură relevantă

- `app/page.tsx` - pagina principală (hero)
- `app/cine-suntem/page.tsx` - pagina "Cine suntem"
- `app/servicii/page.tsx` - pagina "Servicii"
- `components/hero-section.tsx` - hero principal cu meniul de navigație
- `components/navigation.tsx` - header/nav reutilizabil

## Cerințe

- Node.js 20+
- pnpm (recomandat, există `pnpm-lock.yaml`)

## Instalare și rulare locală (Windows)

Deschide PowerShell în folderul proiectului și rulează:

```powershell
pnpm install
pnpm dev
```

Apoi deschide în browser:

```text
http://localhost:3000
```

## Comenzi utile

```powershell
pnpm dev     # pornește serverul de dezvoltare
pnpm build   # build de producție
pnpm start   # pornește build-ul de producție
pnpm lint    # linting
```

## Observații

- În navigație există linkuri către pagini care nu sunt încă implementate în `app/` (ex: `/cursuri`, `/portofoliu`, `/articole`, `/about`).
- În `next.config.mjs`, `typescript.ignoreBuildErrors` este activ, deci build-ul poate trece peste erori TypeScript.

## Alternative dacă nu ai pnpm

Poți folosi și npm:

```powershell
npm install
npm run dev
```
