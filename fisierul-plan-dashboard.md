# Plan implementare Dashboard CMS (builder legat direct de paginile site-ului)

## Obiectiv
Builder-ul din dashboard trebuie sa editeze paginile reale din site (create/edit/delete/publish), nu continut separat. Django devine sursa unica de adevar pentru continut, iar Next.js randeaza dinamic din API.

## Principiu de arhitectura
- Dashboard Admin (Next.js): construieste si editeaza block-uri per pagina.
- Backend Django (DRF + PostgreSQL): stocheaza pagini, block-uri, media, roluri, logs, setari.
- Site public Next.js: randeaza pagina pe baza slug-ului din CMS.

Flux:
1. Editorul modifica o pagina in builder.
2. Dashboard trimite JSON-ul de block-uri la Django.
3. Django salveaza versiunea publica/draft.
4. Next.js revalideaza ruta si afiseaza imediat continutul nou.

## Faza 1 - Fundatie (obligatorie)
1. Integrare layout admin existent din dash-mode in proiectul principal, sub rute /admin.
2. Backend Django separat cu DRF, JWT auth, CORS, PostgreSQL.
3. RBAC cu rolurile:
- Superadmin: acces total.
- Admin: aproape total, fara stergere utilizatori superadmin.
- SEO: pagini, SEO, media, sitemap, robots, setari SEO globale.
- Editor: pagini, media, meniuri, builder blocks.

## Faza 2 - Model de date orientat pe paginile reale
1. Model Page:
- title
- slug (unic per locale)
- locale
- status (draft/published)
- show_in_top_menu
- nav_label
- nav_order
- seo_title
- seo_description
- og_image
- blocks (JSONField ordonat)
- created_by / updated_by

2. Model Block:
- page (FK)
- type
- order
- props (JSON)
- style (JSON)
- animation (JSON)
- advanced_layout (JSON)

3. Model Media:
- foto/video, metadate, dimensiuni, mime, size, utilizari.

4. Model AuditLog:
- cine, ce, cand, entitate, payload minim.

## Faza 3 - API CMS (Django)
### Public API (site)
- GET /api/public/pages/{slug}
- GET /api/public/navigation
- GET /api/public/footer
- POST /api/public/forms/{id}/submit

### Admin API (dashboard)
- POST /api/auth/login
- POST /api/auth/refresh
- GET/POST/PATCH/DELETE /api/admin/pages
- GET/POST/PATCH/DELETE /api/admin/pages/{id}/blocks
- GET/POST/DELETE /api/admin/media
- GET/POST/PATCH /api/admin/users
- GET /api/admin/dashboard/stats
- GET /api/admin/logs
- GET/PATCH /api/admin/settings
- GET/PATCH /api/admin/seo/global
- GET/PATCH /api/admin/sitemap
- GET/PATCH /api/admin/robots

## Faza 4 - Randare dinamica pe site (Next.js)
1. Introducere ruta dinamica pentru pagini CMS:
- app/[...slug]/page.tsx

2. Introducere BlockRenderer unic:
- mapare type -> componenta React existenta.

3. Eliminare treptata a paginilor hardcodate dupa migrare:
- /, /servicii, /articole, /portofoliu, /cine-suntem devin pagini CMS.

4. Meniu si footer consumate din API CMS, nu hardcodate.

## Faza 5 - Builder conectat 1:1 cu paginile
1. Din lista de pagini (/admin/pages), buton Edit deschide builderul paginii respective.
2. Save in builder actualizeaza direct blocks pentru pagina tinta.
3. Publish in builder seteaza status=published si declanseaza revalidate pe ruta paginii.
4. Delete page sterge pagina din CMS si invalideaza ruta publica.
5. Create page noua genereaza imediat nou URL public dupa publish.

## Faza 6 - Module cerute in dashboard
1. Dashboard Superadmin:
- total pagini (draft/published)
- total media
- total utilizatori
- logs
- activitati recente (ultimele 5)
- analytics (provider-agnostic, apoi integrare concreta)

2. Users:
- creare/editare/dezactivare utilizatori
- roluri si permisiuni

3. GDPR:
- Cookies Policy
- Privacy Policy
- editabile din CMS

4. Formulare:
- creare/editare
- stocare submit-uri

5. LOG:
- erori platforma + audit administrativ

6. Setari:
- Captcha v3 pentru contact
- setari email avansate (SMTP, test send, retry)

7. Media:
- Foto
- Video

## Faza 7 - Migrare continut existent
1. Seed initial in Django cu continutul actual din paginile hardcodate.
2. Verificare paritate vizuala intre varianta hardcodata si varianta CMS.
3. Switch definitiv pe randare CMS.

## Faza 8 - Securitate, performanta, operare
1. JWT in cookie httpOnly.
2. Sanitizare stricta pentru blocul HTML.
3. Rate limiting pentru endpoint-uri publice.
4. Cache + ISR/on-demand revalidate pentru pagini publice.
5. Backup DB, retenție logs, monitorizare erori.

## Ordinea recomandata de implementare
1. Backend auth + RBAC + modele Page/Block/Media.
2. Endpoint-uri pages + blocks + navigation.
3. Ruta dinamica site + BlockRenderer.
4. Legare builder la endpoint-uri reale.
5. Migrare pagini existente.
6. Restul modulelor (forms, GDPR, settings, logs, analytics).

## Criterii de acceptanta
1. O pagina creata in builder devine accesibila la URL public dupa publish.
2. O modificare in builder se vede pe site fara deploy manual.
3. Stergerea unei pagini din CMS o face indisponibila public (404).
4. Rolurile blocheaza corect accesul UI si API.
5. Meniul public reflecta doar paginile marcate pentru meniu.
