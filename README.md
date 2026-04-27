# NOMES v0

Website de prezentare pentru o agenție de marketing (NOMES), construit cu Next.js App Router, React 19 și Tailwind CSS 4.

## Stack tehnic

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript 5
- Componente UI pe baza Radix/shadcn

## Structură proiect

- app/ - rute și layout-uri Next.js (App Router)
- components/ - componente reutilizabile pentru secțiuni și pagini
- components/ui/ - librăria de componente UI
- public/ - asset-uri statice (imagini, fonturi, icon-uri)
- styles/ - stiluri globale suplimentare

Rute disponibile în acest moment:

- / (acasă)
- /cine-suntem
- /servicii
- /portofoliu
- /articole

## Cerințe

- Node.js 20+
- pnpm recomandat (există fișierul pnpm-lock.yaml)

## Rulare locală

1. Instalează dependențele:

```powershell
pnpm install
```

2. Pornește serverul de dezvoltare:

```powershell
pnpm dev
```

3. Deschide aplicația în browser la:

```text
http://localhost:3000
```

## Scripturi disponibile

```powershell
pnpm dev     # dezvoltare locală
pnpm build   # build de producție
pnpm start   # rulează build-ul de producție
```

## Build și deploy

- Build local:

```powershell
pnpm build
```

- Pentru deploy recomandat: Vercel (compatibil nativ cu Next.js).

## Note

- În next.config.mjs este activată opțiunea typescript.ignoreBuildErrors.
- Dacă vrei verificare strictă TypeScript la build, setează această opțiune pe false.

## Variantă cu npm

```powershell
npm install
npm run dev
```
