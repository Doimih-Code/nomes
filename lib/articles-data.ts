export type ArticleContentBlock =
  | { type: 'lead'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'faq'; items: { question: string; answer: string }[] }

export type ArticleCoverIcon =
  | 'orbit'
  | 'podcast'
  | 'shapes'
  | 'cycle'
  | 'curve'
  | 'ring'
  | 'growth'
  | 'converge'
  | 'funnel'
  | 'retarget'
  | 'gauge'
  | 'calendar'
  | 'bars'
  | 'play-growth'
  | 'chat'
  | 'hashtag'
  | 'checklist'
  | 'network'
  | 'chart-axis'
  | 'format-compare'
  | 'video-play'
  | 'clapperboard'

export interface Article {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  articleNumber: string
  coverIcon: ArticleCoverIcon
  content: ArticleContentBlock[]
}

export const articles: Article[] = [
  {
    slug: 'ce-este-brand-positioning-si-cum-iti-diferentiezi-afacerea-de-competitie',
    category: 'Brand Strategy',
    title: 'Ce este brand positioning și cum îți diferențiezi afacerea de competiție',
    excerpt:
      'Poziționarea e locul pe care brandul tău îl ocupă în mintea clientului — răspunsul instant la „de ce tu și nu altcineva?”. Cadrul Ries & Trout, cele patru elemente ale unei poziționări clare și template-ul positioning statement, explicate pas cu pas.',
    date: '13 IUL 2026',
    readTime: '9 MIN',
    articleNumber: '06',
    coverIcon: 'orbit',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** poziționarea (brand positioning) e locul pe care îl ocupă brandul tău în mintea clientului, răspunsul instant la „de ce tu și nu altcineva?”. Conceptul vine de la Al Ries și Jack Trout (*Positioning: The Battle for Your Mind*, 1981): nu e ceva ce faci produsului, ci ceva ce faci minții clientului. O poziționare clară se construiește din patru elemente (public, categorie, diferențiator, dovadă), se exprimă printr-un *positioning statement* și se validează prin felul în care te descriu clienții reali.',
      },
      { type: 'heading', text: 'Ce este brand positioning' },
      {
        type: 'paragraph',
        text: 'Poziționarea nu e logo-ul, sloganul sau paleta de culori, acelea sunt identitate vizuală. Poziționarea e percepția: pentru cine ești, ce problemă rezolvi mai bine decât oricine și de ce ar trebui să te creadă.',
      },
      {
        type: 'paragraph',
        text: 'Ideea fondatoare îi aparține lui Ries și Trout: poziționarea nu pornește din ce vrei tu să spui, ci din ce gândește deja clientul, abordarea de bază nu e să creezi ceva nou, ci să te „legi” de ceea ce există deja în mintea lui. Cu alte cuvinte, poziționarea nu se întâmplă pe site-ul tău; se întâmplă în capul clientului. Tu doar o influențezi prin tot ce comunici.',
      },
      {
        type: 'paragraph',
        text: 'Tot Ries și Trout introduc două principii pe care le ignoră majoritatea: a cuceri o poziție pe care o deține deja altcineva e aproape imposibil, mai bine ocolești obstacolul decât să-l ataci frontal; iar o poziționare prea largă devine pufoasă și ușor de uitat. Brandurile mari care au câștigat au „deținut” un singur atribut clar: Volvo s-a poziționat pe siguranță, FedEx pe livrarea peste noapte.',
      },
      { type: 'heading', text: 'De ce brandurile slabe pierd aici' },
      {
        type: 'paragraph',
        text: '**Greșeala 1: „pentru toată lumea”.** Sună incluziv, dar în practică înseamnă memorabil pentru nimeni. Cu cât targetezi mai larg, cu atât mesajul devine mai generic. Un brand puternic alege pe cine vrea și, la fel de important, pe cine nu vrea.',
      },
      {
        type: 'paragraph',
        text: '**Greșeala 2: diferențiatori falși.** „Calitate”, „servicii bune”, „prețuri corecte” nu sunt diferențiatori, sunt *points of parity* (puncte de paritate): așteptări minime de intrare în categorie, pe care le promit toți. Nimeni nu-și vinde produsul ca fiind slab și scump. Diferențiatorul real e un *point of difference*: un motiv de a te alege pe tine pe care concurența nu îl poate revendica credibil.',
      },
      { type: 'heading', text: 'Cele patru elemente ale unei poziționări clare' },
      {
        type: 'paragraph',
        text: '**Publicul țintă.** Pentru cine exact ești? Cu cât mai specific, cu atât mai puternic. „Antreprenori la început de drum care nu-și permit o agenție mare” e o poziție; „toți cei care vor marketing” nu e.',
      },
      {
        type: 'paragraph',
        text: '**Cadrul de referință (categoria).** În ce categorie concurezi și cu cine te compară clientul? Te poziționezi ca alternativă la o agenție tradițională sau ca alternativă la „a face singur”? Cadrul schimbă complet judecata.',
      },
      {
        type: 'paragraph',
        text: '**Diferențiatorul.** Ce faci vizibil diferit sau mai bine? Trebuie să fie real, relevant pentru client și greu de copiat.',
      },
      {
        type: 'paragraph',
        text: '**Dovada (reason to believe).** De ce ar trebui clientul să creadă? Rezultate, experiență, metodologie, studii de caz. Fără dovadă, diferențiatorul e doar o promisiune.',
      },
      { type: 'heading', text: 'Exercițiul: positioning statement (șablonul lui Geoffrey Moore)' },
      {
        type: 'paragraph',
        text: 'Cel mai folosit cadru pentru a pune cele patru elemente într-o singură frază vine din *Crossing the Chasm* (Geoffrey Moore, 1991). Important: are o clauză pe care varianta „de manual” o omite des, „Spre deosebire de [concurent]…”:',
      },
      {
        type: 'quote',
        text: 'Pentru [public-țintă] care [are nevoia X], [brandul tău] este [categoria] care [diferențiatorul/beneficiul]. Spre deosebire de [concurent], [brandul tău] [diferențierea-cheie].',
      },
      {
        type: 'paragraph',
        text: 'Această clauză „spre deosebire de” forțează o decizie reală: dacă nu o poți completa, nu ai diferențiere, ai doar o speranță. Dacă fraza sună la fel ca a oricărui concurent, mai ai de lucru. Pentru o versiune contemporană, mai aplicată pe software/B2B, merită și *Obviously Awesome* (April Dunford, 2019), un playbook modern de poziționare.',
      },
      { type: 'heading', text: 'Diferențiere vs. distinctivitate: dezbaterea pe care trebuie să o cunoști' },
      {
        type: 'paragraph',
        text: 'Aici e nuanța care separă un brand strateg de un copywriter. La începutul anilor 2000, marketingul s-a scindat în două școli: școala tradițională (Ries, Trout, Kotler, Aaker), care vede diferențierea ca scop suprem, și școala „științei marketingului” condusă de Byron Sharp și Ehrenberg-Bass, care consideră diferențierea în mare parte un mit și pledează pentru distinctivitate. În *How Brands Grow* (2010), Byron Sharp arată că majoritatea consumatorilor nu percep brandurile dintr-o categorie ca fiind fundamental diferite.',
      },
      {
        type: 'paragraph',
        text: '**Pe scurt:** diferențierea = un motiv unic de a cumpăra; distinctivitatea = a fi instant recognoscibil (culori, logo, sunet, mascotă, „distinctive brand assets”). Sinteza pragmatică, formulată de Mark Ritson, e „bothism”, nu alegi între ele, le faci pe amândouă: deții o diferență relevantă ȘI construiești active distinctive care te fac ușor de recunoscut și de reamintit. Pentru un brand mic, concluzia practică e dublă: găsește un *point of difference* real (poziționarea), dar investește și în elemente vizuale/verbale consecvente care te fac recognoscibil chiar și fără logo.',
      },
      { type: 'heading', text: 'Cum testezi dacă poziționarea ta funcționează' },
      {
        type: 'paragraph',
        text: '**Metoda rapidă:** întreabă cinci clienți de ce te-au ales pe tine și nu pe altcineva. Dacă răspund toți același lucru, și acel lucru e exact ce vrei să fii cunoscut, ai o poziționare clară. Dacă fiecare spune altceva sau răspund vag, percepția din piață nu e încă cea dorită.',
      },
      {
        type: 'paragraph',
        text: '**Metoda riguroasă:** harta perceptuală (*perceptual map*). E, de altfel, tehnica pe care o descriu chiar Ries și Trout, „maparea minții clientului” prin diferențial semantic, în care prospecții notează fiecare concurent pe o scală de atribute. Plasezi brandurile pe două axe relevante pentru client (de ex. preț vs. specializare) și vezi unde există un spațiu liber pe care îl poți ocupa.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Care e diferența dintre poziționare și branding?',
            answer:
              'Poziționarea e strategia (ce loc ocupi în mintea clientului și de ce). Brandingul/identitatea vizuală (logo, culori) e expresia acelei strategii. Poziționarea vine prima.',
          },
          {
            question: 'Care e diferența dintre diferențiere și distinctivitate?',
            answer:
              'Diferențierea e un motiv unic de a cumpăra; distinctivitatea e a fi instant recognoscibil. Brandurile sănătoase fac ambele.',
          },
          {
            question: 'Pot să fiu „pentru toată lumea”?',
            answer:
              'Nu eficient. Cu cât targetezi mai larg, cu atât poziționarea devine mai generică și mai ușor de uitat. Alege un public și un atribut clar.',
          },
          {
            question: 'Cum scriu un positioning statement?',
            answer:
              'Folosește șablonul lui Geoffrey Moore: „Pentru [public] care [nevoie], [brand] este [categoria] care [diferențiator]. Spre deosebire de [concurent], [diferențierea-cheie].”',
          },
        ],
      },
    ],
  },
  {
    slug: 'tone-of-voice-cum-definesti-tonul-vocii-brandului-tau',
    category: 'Brand Strategy',
    title: 'Tone of voice: cum definești tonul vocii brandului tău (cu exemple)',
    excerpt:
      'Vocea e constantă, tonul se modulează. Cadrul Nielsen Norman Group cu cele patru dimensiuni măsurabile ale tonului, plus pașii ca să-ți transformi personalitatea de brand într-un ghid folosibil de toată echipa.',
    date: '10 IUL 2026',
    readTime: '8 MIN',
    articleNumber: '07',
    coverIcon: 'podcast',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** tonul vocii e personalitatea brandului exprimată prin felul în care comunici. Două lucruri îl fac profesionist, nu o chestiune de gust: distincția dintre **voce** (constantă, cine ești) și **ton** (variabil, cum suni în funcție de context), și cadrul de cercetare al Nielsen Norman Group, care descompune orice ton pe patru dimensiuni măsurabile. Cercetarea arată că tonul chiar afectează cât de demn de încredere pari, dar doar dacă se potrivește cu subiectul.',
      },
      { type: 'heading', text: 'Voce vs. ton: distincția care lipsește din majoritatea ghidurilor' },
      { type: 'paragraph', text: 'Termenul „tone of voice” ascunde de fapt două lucruri diferite:' },
      {
        type: 'list',
        items: [
          '**Vocea** e constantă. E personalitatea brandului, derivată din identitate și public. Nu se schimbă.',
          '**Tonul** se modulează după context. Vocea o definești pornind de la identitatea și publicul brandului, apoi adaptezi tonul ca să întâlnești utilizatorul potrivit pentru situația în care se află.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Analogie: o persoană are aceeași personalitate (voce) la o înmormântare și la o petrecere, dar vorbește diferit (ton). Un brand jucăuș rămâne jucăuș, dar nu glumește într-un mesaj de scuze.',
      },
      { type: 'heading', text: 'De ce contează, ce arată cercetarea' },
      {
        type: 'paragraph',
        text: 'Tonul nu e cosmetică. Un studiu Nielsen Norman Group a măsurat efectul direct al tonului asupra percepției: tonuri diferite pe un site afectează semnificativ cât de prietenos, demn de încredere și dezirabil pare un brand. Concret, în faza cantitativă, banca cu tonul mai relaxat a fost percepută ca mai prietenoasă (+0,7 pe o scală de 5 puncte) și mai demnă de încredere (+0,3) decât varianta serioasă.',
      },
      {
        type: 'paragraph',
        text: 'Dar, și aici e lecția, **tonul greșit pentru context strică tot**. În același studiu, o companie de asigurări auto cu ton glumeț și prea „de gașcă” și-a subminat credibilitatea: participanții au spus că familiaritatea excesivă scade din încredere, fiindcă oamenii nu se așteaptă ca asigurarea auto să fie distractivă. Morala pentru cei care cer mereu „mai vesel, mai cu glume”: un ton entuziast/iconoclast nu e potrivit pentru orice brand sau orice subiect.',
      },
      { type: 'heading', text: 'Cele patru dimensiuni ale tonului (cadrul Nielsen Norman Group)' },
      {
        type: 'paragraph',
        text: 'În loc de adjective vagi, NN/g a redus tonul la patru dimensiuni măsurabile, fiecare un **spectru**, nu o alegere binară, poți sta oriunde între extreme:',
      },
      {
        type: 'table',
        headers: ['Dimensiune', 'Spectru'],
        rows: [
          ['Umor', 'Serios ↔ Amuzant'],
          ['Formalitate', 'Formal ↔ Relaxat (casual)'],
          ['Respect', 'Respectuos ↔ Iconoclast (irreverent)'],
          ['Entuziasm', 'Sobru (matter-of-fact) ↔ Entuziast'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Avantajul modelului e că nu e binar: brandul tău nu trebuie să fie exclusiv amuzant sau exclusiv serios, poate sta undeva la mijloc. O notă utilă despre iconoclasm: tonul iconoclast vizează de obicei subiectul, ca să diferențieze brandul de competiție, nu e menit să fie ofensator față de cititor.',
      },
      {
        type: 'paragraph',
        text: "Cum arată dimensiunile în branduri reale: Duke Health comunică foarte formal, serios, respectuos și sobru; Progressive Insurance e relaxat, ușor entuziast, ușor iconoclast și încearcă umorul. Sau, pe scurt: un scor mare la „amuzant” se potrivește unor branduri jucăușe precum Old Spice; unul serios se potrivește unor servicii profesionale ca IBM; Apple e minimalist, Wendy's spiritual și iconoclast.",
      },
      { type: 'heading', text: 'Pasul 1: definește vocea (3-4 atribute)' },
      {
        type: 'paragraph',
        text: 'Descrie brandul ca pe o persoană, în 3-4 cuvinte: „prietenos, direct, sigur pe el, ușor jucăuș” sau „cald, atent, răbdător, încurajator”. Aceste atribute devin filtrul prin care trece tot ce scrii. Un exercițiu practic de echipă: un „card sort” al trăsăturilor de personalitate sau o listă de tip „așa, nu așa” (vezi pasul următor).',
      },
      { type: 'heading', text: 'Pasul 2: definește prin contraste („așa, nu așa”)' },
      { type: 'paragraph', text: 'Cel mai util instrument pentru a fixa granițe e perechea „așa, dar nu așa”:' },
      {
        type: 'list',
        items: [
          '„Suntem siguri pe noi, dar nu aroganți.”',
          '„Suntem prietenoși, dar nu copilăroși.”',
          '„Suntem clari, dar nu seci.”',
        ],
      },
      {
        type: 'paragraph',
        text: 'Contrastele transformă atributele abstracte în reguli pe care echipa le poate aplica. „Prietenos” singur e interpretabil; „prietenos, dar nu copilăros” e o instrucțiune.',
      },
      { type: 'heading', text: 'Pasul 3: modulează tonul după context, păstrând vocea' },
      {
        type: 'paragraph',
        text: 'Folosind cele patru dimensiuni, ajustezi **intensitatea** în funcție de situație, fără a schimba personalitatea. Un mesaj de eroare, un caption pe Instagram și un email către un client nemulțumit cer registre diferite. Regula derivată din cercetare: cu cât miza emoțională a momentului e mai mare (o problemă, o reclamație), cu atât cobori umorul și iconoclasmul și urci respectul și sobrietatea, exact ca să nu păți ce a pățit asigurarea „prea de gașcă”.',
      },
      { type: 'heading', text: 'Exemple: aceeași idee, tonuri diferite' },
      { type: 'paragraph', text: 'Mesajul: „Comanda ta a fost expediată.”' },
      {
        type: 'list',
        items: [
          '**Formal, sobru, respectuos:** „Vă informăm că plasarea comenzii dumneavoastră a fost procesată cu succes și se află în curs de livrare.”',
          '**Relaxat, entuziast:** „Gata! Comanda ta tocmai a pornit spre tine. Îți ținem pumnii să ajungă repede.”',
          '**Relaxat, sobru, minimalist:** „Comanda ta e pe drum. Te anunțăm când ajunge.”',
        ],
      },
      {
        type: 'paragraph',
        text: 'Niciun ton nu e „corect” în absolut, corect e cel care se potrivește cu cine ești, cu cine vrei să atragi și cu subiectul.',
      },
      { type: 'heading', text: 'Cum îl transformi într-un instrument folosibil' },
      {
        type: 'paragraph',
        text: 'Un ton care trăiește doar în capul fondatorului nu ajută. Pune-l într-un ghid scurt: cele 3-4 atribute, poziția pe cele patru dimensiuni (cu un scor orientativ pe fiecare), perechile „așa/nu așa” și câteva exemple de fraze bune și rele pentru situații tipice (mesaj de eroare, confirmare, scuze, promovare). Modelul de referință în industrie e ghidul public „Voice and Tone” al Mailchimp, concret, cu exemple pe context. Cu un astfel de document, oricine scrie pentru brand, angajat, freelancer sau agenție, sună la fel. Consecvența vine din document, nu din noroc (iar consecvența contează: rapoartele din industrie estimează că o prezentare de brand consecventă poate crește veniturile cu până la ~20%).',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Care e diferența dintre voce și ton?',
            answer:
              'Vocea e personalitatea constantă a brandului; tonul e modul în care o exprimi în funcție de context. Vocea nu se schimbă, tonul se modulează.',
          },
          {
            question: 'Cum aleg tonul potrivit?',
            answer:
              'Pleacă de la identitate și public, fixează 3-4 atribute și poziționează-te pe cele patru dimensiuni NN/g (umor, formalitate, respect, entuziasm). Verifică mereu că tonul se potrivește cu subiectul, un ton glumeț pe un subiect serios scade încrederea.',
          },
          {
            question: 'Tonul chiar influențează vânzările?',
            answer:
              'Cercetarea NN/g arată că tonul afectează măsurabil percepția de încredere și prietenie. Iar un ton consecvent, aplicat peste tot, construiește familiaritate, care construiește încredere.',
          },
          {
            question: 'Cum documentez tonul?',
            answer: 'Într-un ghid scurt: atribute, poziția pe cele patru dimensiuni, perechi „așa/nu așa” și exemple pe situații concrete.',
          },
        ],
      },
    ],
  },
  {
    slug: 'identitate-vizuala-logo-culori-si-tipografie-coerente',
    category: 'Brand Strategy',
    title: 'Identitate vizuală: cum construiești un sistem coerent de logo, culori și tipografie',
    excerpt:
      'Identitatea vizuală nu e logo-ul, e sistemul: logo în variante, paletă de culori cu valori exacte, tipografie și reguli de folosire. Cum construiești un sistem coerent, recognoscibil chiar și cu logo-ul acoperit.',
    date: '06 IUL 2026',
    readTime: '8 MIN',
    articleNumber: '19',
    coverIcon: 'shapes',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** identitatea vizuală nu e logo-ul, e **sistemul** prin care brandul tău devine recognoscibil: logo (în variante), o paletă de culori cu valori exacte, tipografie, stil de imagine și reguli de folosire. Scopul nu e „să arate frumos”, ci recunoașterea rapidă și consecventă. Logica modernă: construiești active vizuale distinctive, suficient de stricte cât să fie unitare și suficient de flexibile cât să funcționeze pe orice ecran. Testul real: te recunoaște cineva chiar și cu logo-ul acoperit?',
      },
      { type: 'heading', text: 'Ce este (de fapt) identitatea vizuală' },
      {
        type: 'paragraph',
        text: 'Identitatea vizuală nu e un singur element, ci un set. Un logo e o singură piesă; un sistem complet de identitate include logo-ul, paleta de culori, tipografia, stilul de imagine, vocea de brand și ghidul de utilizare, tot ce-ți trebuie ca să te prezinți consecvent în orice context. Logo-ul e fața; identitatea vizuală e întreaga ținută.',
      },
      { type: 'heading', text: 'De ce contează: recunoaștere, nu „frumusețe”' },
      {
        type: 'paragraph',
        text: 'Rolul identității vizuale e să te facă **recognoscibil instant** într-un feed aglomerat. Primele impresii se formează rapid: logo-ul e „strângerea de mână” a brandului, consumatorii își formează prima impresie în câteva secunde, dar recunoașterea reală cere 5–7 expuneri repetate înainte ca un logo să devină familiar. De aici și principiul: consecvența nu e estetică, e cea care transformă expunerile în memorie.',
      },
      {
        type: 'paragraph',
        text: 'Despre cifrele celebre, le citez cu rezervă, fiindcă sunt repetate peste tot, dar provin din studii cu metodologie discutabilă: se spune frecvent că culoarea singură poate crește recunoașterea brandului cu până la 80% și că o prezentare consecventă a brandului pe toate canalele crește veniturile cu până la ~33% (studiul Lucidpress). Tratează-le ca direcție („consecvența și culoarea contează mult”), nu ca legi precise. Ce e solid e mecanismul din spate: un activ vizual distinctiv (o culoare, o formă) îți permite să fii recunoscut chiar fără nume sau logo, gândește-te la teal-ul Perplexity sau galbenul Mailchimp, culori care au devenit brandul.',
      },
      { type: 'heading', text: 'Logo: un sistem, nu un fișier' },
      {
        type: 'paragraph',
        text: 'Greșeala clasică e să comanzi „un logo” și să primești un singur fișier. Profesionist înseamnă un **sistem de logo**: variante, principal, orizontal, doar iconiță și monocrom, plus reguli de spațiu liber în jur. Un logo bun e simplu, distinctiv, memorabil și **scalabil**, funcționează la fel de bine pe un favicon de 16px și pe o fațadă. Testul practic: dacă rămâne lizibil în alb-negru și la dimensiune mică, e bun.',
      },
      {
        type: 'paragraph',
        text: 'Tendința actuală e simplificarea: la rebranding-ul Slack, Pentagram a redus logo-ul de la unsprezece culori la patru, păstrând accentul distinctiv, ca să asigure reproducere consecventă pe orice platformă și dimensiune. Mai puține elemente = mai ușor de recunoscut și de aplicat oriunde.',
      },
      { type: 'heading', text: 'Culorile: cel mai rapid semnal pe care îl procesează creierul' },
      {
        type: 'paragraph',
        text: 'Culoarea e prima informație percepută, înainte de orice text. Construiește o paletă structurată: culori primare, secundare și de accent, plus neutre, definite prin valori exacte, HEX și RGB pentru digital, CMYK și Pantone pentru print, ca să fie identice peste tot. Reguli de folosire: dominante pentru fundaluri, secundare pentru accente, neutre pentru text și spațiu.',
      },
      { type: 'paragraph', text: 'Câteva repere strategice:' },
      {
        type: 'list',
        items: [
          '**Convenții de industrie.** Finanțele și sănătatea folosesc albastru, gri și verde pentru încredere și stabilitate; tehnologia merge pe minimalism cu accente îndrăznețe; moda experimentează. Le respecți (ca să pari „de încredere” în categoria ta) sau le încalci deliberat (ca să ieși în evidență), dar conștient.',
          '**Spațiu de culoare neocupat.** Analizează culorile concurenților și caută un teritoriu liber pe care îl poți „deține”.',
          '**Marcă înregistrată.** O culoare poate deveni proprietate: Tiffany Blue și Cadbury Purple sunt mărci înregistrate, dar cererile de marcă doar pe culoare reușesc în ~12% din cazuri, adăugarea unei forme/logo crește mult șansele.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Despre „psihologia culorilor” (albastru = încredere, roșu = urgență): e reală ca tendință, dar puternic dependentă de cultură și context, folosește-o ca ghid, nu ca rețetă rigidă.',
      },
      { type: 'heading', text: 'Tipografia: personalitate înainte de primul cuvânt' },
      {
        type: 'paragraph',
        text: 'Fontul comunică personalitate independent de ce scrie. Tipografia transmite caracterul brandului înainte ca un singur cuvânt să fie citit, un brand de lux folosește alt tip de literă decât un startup, exact din acest motiv. Reguli practice: 1–2 familii tipografice (una pentru titluri, una pentru text), o ierarhie clară (dimensiuni și greutăți pentru titlu/subtitlu/corp) și consecvență. Un font custom poate deveni el însuși un activ distinctiv.',
      },
      { type: 'heading', text: 'Accesibilitatea: partea pe care majoritatea o sare' },
      {
        type: 'paragraph',
        text: 'Aici se vede profesionistul. O identitate vizuală bună e și utilizabilă de toți: standardele de accesibilitate cer testarea raporturilor de contrast, mai ales pentru text și elemente de UI, ca totul să fie lizibil pentru toți utilizatorii (referința e WCAG). Regulă suplimentară: nu transmite informație doar prin culoare (10% dintre bărbați au o formă de daltonism), dublează mereu cu text, formă sau iconiță.',
      },
      { type: 'heading', text: 'Consecvența: unde se câștigă de fapt jocul' },
      {
        type: 'paragraph',
        text: 'Un sistem frumos care nu e aplicat consecvent nu valorează nimic. Soluția e un **ghid de brand** (brand book) cu reguli, exemple corecte și exemple greșite. Iar în 2026 a apărut un motiv în plus: sistemele de căutare AI (Google AI Overviews, ChatGPT Search) folosesc recunoașterea de entități, un brand cu semnale consecvente (nume, descriere, identitate vizuală, prezență) e tratat ca o entitate de încredere; brandurile inconsecvente sunt mai greu de verificat și de citat. Consecvența vizuală nu mai construiește doar recunoaștere umană, ci și „încredere algoritmică”.',
      },
      { type: 'heading', text: 'Cum construiești un sistem coerent' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Pleacă de la poziționare (cui te adresezi, ce vrei să transmiți), vizualul exprimă strategia, nu invers.',
          'Definește sistemul de logo (principal + variante + spațiu liber).',
          'Construiește paleta (primare/secundare/accent/neutre) cu valori exacte HEX/RGB/CMYK/Pantone și verifică contrastul.',
          'Alege 1–2 familii tipografice și o ierarhie.',
          'Stabilește stilul de imagine (candid vs. regizat, luminos vs. întunecat, oameni vs. produs).',
          'Pune totul într-un ghid de o pagină (minim) cu reguli de folosire.',
          'Fă **testul logo-ului acoperit**: dacă acoperi numele și logo-ul, te mai recunoaște cineva după culoare, font și stil? Dacă da, ai active distinctive reale.',
        ],
      },
      { type: 'heading', text: 'Greșeli de evitat' },
      {
        type: 'list',
        items: [
          'Un singur fișier de logo, fără variante (se rupe la dimensiuni mici sau pe fundal închis).',
          'Prea multe culori sau fonturi, diluează recunoașterea.',
          'Culori/fonturi care se schimbă de la o postare la alta (inconsecvența ucide recunoașterea).',
          'Ignorarea contrastului/accesibilității.',
          'Identitate aleasă „pe gust”, deconectată de poziționare și de public.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Care e diferența dintre logo și identitate vizuală?',
            answer:
              'Logo-ul e un singur element. Identitatea vizuală e sistemul complet: logo (în variante), culori, tipografie, stil de imagine și reguli de folosire.',
          },
          {
            question: 'De câte culori și fonturi am nevoie?',
            answer: 'O paletă cu primare, secundare, accent și neutre; 1–2 familii tipografice. Mai puțin și mai consecvent bate mult și haotic.',
          },
          {
            question: 'Chiar crește culoarea recunoașterea cu 80%?',
            answer:
              'E o cifră larg citată, dar provine din studii cu metodologie discutabilă. Ideea de fond e validă (culoarea consecventă ajută mult recunoașterea); tratează procentul ca reper, nu ca exactitate.',
          },
          {
            question: 'Pot să-mi înregistrez o culoare ca marcă?',
            answer: 'Greu doar culoarea (succes ~12%), dar mult mai ușor împreună cu un logo/o formă. Exemple: Tiffany Blue, Cadbury Purple.',
          },
          {
            question: 'De unde încep?',
            answer: 'De la poziționare. Vizualul e expresia strategiei, întâi decizi cine ești și cui te adresezi, apoi construiești sistemul.',
          },
        ],
      },
    ],
  },
  {
    slug: 'rebranding-cand-are-sens-si-cand-e-doar-bani-aruncati',
    category: 'Brand Strategy',
    title: 'Rebranding: când are sens și când e doar bani aruncați',
    excerpt:
      '~75% dintre campaniile de rebranding nu își ating obiectivele. Când are sens un rebrand complet, când ai nevoie doar de un refresh, și lecțiile din eșecurile Tropicana, Gap și New Coke.',
    date: '02 IUL 2026',
    readTime: '8 MIN',
    articleNumber: '20',
    coverIcon: 'cycle',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** rebranding-ul e una dintre cele mai riscante decizii pe care le poate lua o afacere, studiile estimează că aproximativ 75% dintre campaniile de rebranding nu își ating obiectivele strategice. Are sens când brandul nu mai reflectă ce a devenit afacerea, când îți confuzează publicul sau îți limitează creșterea. Nu are sens când e plictiseală, un CMO nou care vrea „să-și pună amprenta”, sau o încercare de a fugi de o problemă reală (de produs, serviciu, reputație) pe care un logo nou n-o rezolvă. Și aproape întotdeauna, ce-ți trebuie e un *refresh* (evoluție), nu un *rebrand* complet (revoluție).',
      },
      { type: 'heading', text: 'Refresh vs. rebrand complet: distincția care previne dezastrele' },
      {
        type: 'paragraph',
        text: 'Prima întrebare nu e „ce logo nou facem”, ci „cât de mult trebuie, de fapt, schimbat”. Majoritatea companiilor descoperă că au nevoie de evoluție, nu de revoluție, modernizarea identității vizuale păstrând echitatea deja construită e adesea alegerea mai inteligentă. Modelul de urmat e Mastercard: la evoluția din 2016 și-a simplificat cele două cercuri suprapuse și a scos cuvântul „Mastercard” din logo, dar a păstrat schema distinctivă roșu-galben, recunoașterea a rămas ridicată, în timp ce identitatea s-a modernizat. Asta e diferența: schimbi ce e îmbătrânit, păstrezi ce te face recognoscibil.',
      },
      { type: 'heading', text: 'Când ARE sens să faci rebranding' },
      {
        type: 'paragraph',
        text: 'Există declanșatoare legitime. Merită să iei în calcul un rebranding când brandul actual nu mai reflectă afacerea care ai devenit, când îți confuzează publicul, când îți limitează creșterea sau când e vizibil în pas greșit cu piața, dar doar cu obiective clare și research în spate. În practică, motivele bune sunt:',
      },
      {
        type: 'list',
        items: [
          'Ai depășit poziționarea inițială (faci alt lucru decât la început).',
          'Fuziune sau achiziție care cere o identitate unificată.',
          'Intri pe piețe noi/internaționale unde numele sau simbolurile nu funcționează.',
          'Probleme legale (marcă, copiere).',
          'Reputație serios deteriorată, care cere o repoziționare reală (nu doar cosmetică).',
        ],
      },
      { type: 'heading', text: 'Când NU are sens' },
      {
        type: 'list',
        items: [
          '**„Logo-ul arată vechi.”** Dacă singurul motiv e că logo-ul pare demodat, ai nevoie de un refresh, nu de un rebrand.',
          '**Plictiseală internă sau un lider nou care vrea „să schimbe ceva”.** Echipa se plictisește de logo cu mult înainte ca publicul s-o facă.',
          '**Ca să fugi de o problemă pe care designul n-o rezolvă.** Companiile folosesc rebranding-ul ca plasture când ar trebui să rezolve eșecuri operaționale, de calitate a produsului sau de servicii, dacă afacerea ta pierde pentru că produsul nu satisface nevoia clientului, niciun retuș vizual n-o salvează. Un logo nou nu repară o problemă veche.',
          '**În plină criză, fără strategie.** Un rebrand făcut într-o perioadă proastă arată mai degrabă a panică decât a strategie.',
        ],
      },
      { type: 'heading', text: 'Lecția de 30 de milioane: Tropicana' },
      {
        type: 'paragraph',
        text: 'Cel mai citat eșec de rebranding din istoria bunurilor de larg consum. În 2009, Tropicana și-a redesenat ambalajul ca să pară „mai proaspăt și mai modern”; în câteva luni, vânzările s-au prăbușit și brandul a pierdut milioane. Cifrele: o scădere de ~20% a vânzărilor în două luni, ~30 de milioane de dolari pierderi, după care s-a revenit la ambalajul original. De ce a eșuat? Nu din cauza esteticii, ci pentru că a distrus un activ distinctiv. A înlocuit imaginea iconică a portocalei cu paiul printr-un design minimalist cu un pahar de suc, a eliminat fix elementul vizual pe care milioane de clienți îl foloseau ca să identifice produsul într-o scanare de 3 secunde pe raft. Portocala cu paiul nu era „un logo”, era un instrument de navigare pe raft. Și mai instructiv e **eșecul de research**: aprobarea unui design privit izolat nu prezice performanța de recunoaștere într-un context real, competitiv, de raft, Tropicana a testat preferința, nu recunoașterea la viteză. Lecția de aur: nu redesena niciodată elementul după care te recunosc oamenii „în sălbăticie”.',
      },
      { type: 'heading', text: 'Alte eșecuri celebre și ce te învață fiecare' },
      {
        type: 'list',
        items: [
          '**Gap (2010).** A înlocuit logo-ul cu pătrat albastru, vechi de peste 20 de ani, cu „Gap” în Helvetica și un mic gradient, backlash imediat, logo-uri parodie, revenire în doar 6 zile. Lecție: 20 de ani de atașament emoțional nu se înlocuiesc într-o zi.',
          '**Cracker Barrel (2025).** Și-a scos personajul „Uncle Herschel” și a trecut la o insignă plată, ca parte dintr-un efort de modernizare de 700 de milioane de dolari sub un CEO nou — reacția a fost brutală („fără suflet”), iar designul „curat” a șters personalitatea americana care definea experiența. Lecție: patrimoniul (heritage) e un activ; tratează-l cu aceeași grijă ca veniturile.',
          '**Pepsi (2008) și British Airways (1997).** Pepsi a cheltuit 1,2 miliarde de dolari pe un refresh de logo pe care majoritatea consumatorilor abia l-au observat; British Airways a scos Union Jack de pe avioane și a revenit după backlash.',
          '**New Coke (1985).** Coca-Cola a schimbat formula ca să concureze cu Pepsi, și-a alienat clienții loiali și a fost forțată să revină la „Coca-Cola Classic”. Lecție: cunoaște-ți clientul înainte de schimbări drastice.',
        ],
      },
      { type: 'heading', text: 'Cele trei tipare de eșec și cele trei întrebări înainte să începi' },
      {
        type: 'paragraph',
        text: 'Toate eșecurile de mai sus împărtășesc același ADN. Rebrand-urile eșuează în trei feluri previzibile: fără research pe clienți înainte de lansare, schimbând prea mult prea repede (rupând recunoașterea), sau rezolvând o problemă de design în loc de una de business. De aceea, înainte să începi, răspunde la trei întrebări cu date: Ce problemă de business rezolvăm prin rebranding? (dacă răspunsul e „logo-ul pare vechi”, e un refresh) Ce suntem dispuși să pierdem? (orice rebrand schimbă recunoașterea existentă pe o echitate viitoare, incertă.) Dacă nu poți răspunde cu date, nu ești pregătit.',
      },
      { type: 'heading', text: 'Cum faci un rebranding corect' },
      {
        type: 'list',
        items: [
          '**Diagnostic înainte de prescripție.** Auditează echitatea de brand, percepțiile clienților și golurile de poziționare.',
          '**Identifică activele distinctive intangibile** (culoare, formă, simbol) și **nu le atinge**, sunt mecanismul prin care te recunoaște lumea (testul logo-ului acoperit).',
          '**Testează recunoașterea, nu preferința.** Costul testării (tipic 10.000–30.000 $) e neglijabil față de costul reversării unei lansări publice eșuate.',
          '**Implică echipe inter-funcționale devreme** (marketing, vânzări, suport, produs) și **stabilește metrici de succes** înainte de start.',
          '**Etapizează lansarea** și **comunică „de ce”-ul**, un brand cu istorie trebuie să-și onoreze moștenirea; oamenii simt repede dacă schimbarea reflectă o repoziționare reală sau doar cosmetică.',
          '**Dacă apare backlash, reacționează rapid.** Companiile care și-au revenit cel mai repede au ascultat reacțiile în câteva zile, au dat înapoi și au încadrat revenirea ca „v-am auzit”, viteza de răspuns contează mai mult decât să nimerești din prima.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Care e diferența dintre refresh și rebrand?',
            answer:
              'Refresh = evoluție (modernizezi păstrând elementele recognoscibile, ca Mastercard). Rebrand = revoluție (schimbi identitatea de bază). Majoritatea afacerilor au nevoie de refresh, nu de rebrand.',
          },
          {
            question: 'Cât de des ar trebui să fac rebranding?',
            answer: 'Cât mai rar. Echipa se plictisește de identitate înaintea publicului. Schimbă doar când există un motiv strategic real, nu estetic.',
          },
          {
            question: 'Un logo nou îmi rezolvă scăderea vânzărilor?',
            answer: 'De obicei nu. Dacă problema e produsul, serviciul sau reputația, rebranding-ul e un plasture scump. Rezolvă întâi cauza reală.',
          },
          {
            question: 'Care e cea mai mare greșeală de rebranding?',
            answer:
              'Să distrugi elementul după care te recunosc clienții (ca Tropicana cu portocala și paiul) și să testezi preferința în loc de recunoaștere.',
          },
          {
            question: 'Cât costă un rebranding greșit?',
            answer:
              'Tropicana a pierdut ~30 de milioane de dolari în două luni. Costul nu e doar designul, ci recunoașterea și încrederea construite în ani, care pot dispărea peste noapte.',
          },
        ],
      },
    ],
  },
  {
    slug: 'brand-storytelling-cum-spui-povestea-brandului-tau-ca-sa-vanda',
    category: 'Brand Strategy',
    title: 'Brand storytelling: cum spui povestea brandului tău ca să vândă',
    excerpt:
      'Clientul e eroul, brandul tău e ghidul. Cadrul StoryBrand (SB7) al lui Donald Miller, explicat pas cu pas: cele șapte elemente, testul „grunt” și de ce poveștile bat listele de caracteristici.',
    date: '29 IUN 2026',
    readTime: '8 MIN',
    articleNumber: '21',
    coverIcon: 'curve',
    content: [
      {
        type: 'lead',
        text: 'Brand storytelling-ul nu înseamnă să povestești despre tine, ci să-ți așezi clientul în centrul unei povești în care el e eroul, iar tu ești ghidul. E cea mai contraintuitivă, și mai importantă, lecție a domeniului: brandurile care se pun pe ele în rolul de erou pierd; cele care se pun în rolul de ghid câștigă. Poveștile funcționează pentru că declanșează chimie reală în creier (oxitocină = încredere) și sunt mult mai memorabile decât listele de caracteristici. Cadrul cel mai folosit pentru a face asta operațional e StoryBrand (SB7) al lui Donald Miller.',
      },
      { type: 'heading', text: 'Greșeala nr. 1: brandul tău nu e eroul' },
      {
        type: 'paragraph',
        text: 'Aici greșesc aproape toți. Brandul tău nu e Luke Skywalker, e Yoda. Clientul e eroul aflat în călătorie, cu o problemă; tu ești ghidul cu planul și uneltele. Asta e ideea centrală a cadrului StoryBrand al lui Donald Miller: oamenii nu rețin brandurile care vorbesc despre ele însele, ci brandurile care îi ajută să-și spună propria poveste. Sună evident, până auditezi un site obișnuit: titlul anunță misiunea companiei, a doua secțiune descrie fondatorii, iar butonul spune „Află mai multe despre noi”, copy-ul de tip brand-erou e starea implicită a site-urilor, iar StoryBrand există tocmai ca s-o întrerupă. Regula: nu e despre tine, e despre el. Tu ești Gandalf, Dumbledore, Haymitch, mentorul, nu protagonistul.',
      },
      { type: 'heading', text: 'De ce funcționează poveștile: ce arată creierul' },
      {
        type: 'paragraph',
        text: 'Nu e poezie, e neurochimie. Cercetarea lui Paul Zak arată că conținutul narativ declanșează oxitocina, neurochimicul asociat cu empatia și încrederea: subiecții cu oxitocină ridicată după o reclamă-poveste au fost cu 56% mai dispuși să acționeze și au avut o reamintire a brandului cu 57% mai mare decât cei care au văzut o prezentare bazată pe fapte. Mecanismul de fond e „cuplarea neuronală”, creierul ascultătorului oglindește tiparele creierului celui care spune povestea. Iar motorul care pornește totul e tensiunea: fără tensiune nu există poveste — campania Dove „Real Beauty Sketches” a funcționat tocmai datorită golului dintre cum se percep femeile și cum le percep alții; rezolvarea acelui gol eliberează oxitocină.',
      },
      {
        type: 'paragraph',
        text: 'Despre cifra celebră, o citez cu rezervă: se spune frecvent, pe baza unor cercetări de la Stanford, că poveștile sunt de ~22 de ori mai memorabile decât faptele. Tratează procentul ca pe o direcție (poveștile se rețin mult mai bine), nu ca pe o măsurătoare exactă.',
      },
      { type: 'heading', text: 'Cadrul StoryBrand (SB7): cele șapte elemente' },
      {
        type: 'paragraph',
        text: "Miller a luat **monomitul lui Joseph Campbell** (Hero's Journey, din *The Hero with a Thousand Faces*) și l-a simplificat de la cei 17 pași ai lui Campbell la 7, aplicați specific pe marketing, sprijinindu-se și pe principiile de scenaristică ale lui Robert McKee. Formula, pe scurt: un personaj are o problemă și întâlnește un ghid, care îi dă un plan și îl cheamă la acțiune, ceea ce îl ajută să evite eșecul și se termină cu succes.",
      },
      {
        type: 'list',
        ordered: true,
        items: [
          '**Un personaj** (clientul) care vrea ceva.',
          '**Are o problemă** (motivul pentru care e atent).',
          '**Întâlnește un ghid** (brandul tău).',
          '**Care îi dă un plan.**',
          '**Care îl cheamă la acțiune.**',
          '**Care îl ajută să evite eșecul** (ce pierde dacă nu acționează).',
          '**Și se termină cu succes** (transformarea).',
        ],
      },
      { type: 'heading', text: 'Cele trei niveluri ale problemei (profunzimea care vinde)' },
      {
        type: 'paragraph',
        text: 'Detaliul care separă o poveste bună de un slogan: problema are trei straturi. Companiile vând soluții la probleme externe, dar clienții cumpără soluții la probleme interne, externul (ce e stricat), internul (cum îl face să se simtă) și filozoficul (de ce e nedrept). Exemplu: cineva nu cumpără doar un curs de marketing (extern: „nu știu să fac reclame”), ci scăparea de frustrarea de a irosi bani (intern) și convingerea că un antreprenor mic merită aceleași unelte ca un corporatist (filozofic). Numește straturile interne, nu doar caracteristicile.',
      },
      { type: 'heading', text: 'Ghidul credibil: empatie + autoritate' },
      {
        type: 'paragraph',
        text: 'Ca să fii acceptat în rolul de ghid, ai nevoie de două lucruri. Credibilitatea ghidului = empatie („te înțelegem”) plus autoritate („am mai făcut asta”), iar ordinea contează: arată întâi că înțelegi, apoi că ești competent. Empatia fără autoritate pare slabă; autoritatea fără empatie pare aroganță.',
      },
      { type: 'heading', text: 'De la cadru la copy: BrandScript și testul „grunt”' },
      {
        type: 'paragraph',
        text: 'Cadrul devine util printr-un artefact concret. BrandScript-ul e o singură pagină (disponibilă gratuit la mystorybrand.com) care captează răspunsurile la cele șapte întrebări SB7 și devine documentul-sursă pentru titluri, secțiuni hero, copy de reclame, secvențe de email și scripturi de vânzări. Testul de claritate al cadrului e celebru: „testul grunt”, ar putea un om al cavernelor să se uite la site-ul tău și să mormăie imediat ce oferi, cum îi îmbunătățește viața și ce trebuie să facă? Dacă nu, ai prea mult zgomot. Principiul de bază al lui Miller: dacă-i confuzezi, îi pierzi, claritatea bate inteligența. Și o reamintire utilă chiar și pentru designeri: site-urile frumoase nu vând; cuvintele vând.',
      },
      { type: 'heading', text: 'Transformarea: ce cumpără de fapt clientul' },
      {
        type: 'paragraph',
        text: 'Capătul poveștii nu e produsul, ci omul devenit altcineva. Oamenii sunt atrași de transformare, când o văd la alții, o vor pentru ei; cu cât evidențiezi mai mult călătoria de transformare a clienților tăi, cu atât crește afacerea. De aceea testimonialele de tip „înainte/după” și poveștile de client convertesc: arată eroul ieșit învingător, nu lista de funcții.',
      },
      { type: 'heading', text: 'Cum aplici, concret' },
      {
        type: 'list',
        items: [
          '**Homepage.** Pune sus o frază scurtă + o imagine care explică ce oferi și cum ajută; fă butoanele de acțiune imposibil de ratat; folosește imagini cu oameni mulțumiți care folosesc produsul (transformarea). Trece testul grunt în 5 secunde.',
          '**Reclame.** Arată un personaj cu o problemă, descoperirea soluției și transformarea, nu „produsul nostru face X”.',
          '**Pagina „Despre”.** Aici e capcana: nu te face pe tine eroul. Povestea de origine a brandului se folosește ca **dovadă de autoritate a ghidului** („am trecut prin asta, de-aia te putem ghida”), nu ca autocelebrare.',
        ],
      },
      { type: 'heading', text: 'Alte cadre utile (când StoryBrand e prea mult)' },
      {
        type: 'paragraph',
        text: 'StoryBrand nu e singurul. Există și „Problem-Agitate-Solve” (popular în copy de vânzări), „Magic Formula” a lui Dale Carnegie și „Story Spine” dezvoltat de dramaturgul Kenn Adams, adică structura Pixar: „A fost odată… În fiecare zi… Până într-o zi… Din cauza asta… Până la final…”. Pentru o reclamă scurtă, deseori e suficient Before-After-Bridge (cum e acum → cum ar putea fi → produsul ca punte). Alege cadrul după lungime și canal, dar păstrează regula de aur: clientul e eroul.',
      },
      { type: 'heading', text: 'Greșeli de evitat' },
      {
        type: 'list',
        items: [
          'Să te faci pe tine eroul (cea mai frecventă și mai costisitoare).',
          'Să vinzi doar problema externă, ignorând-o pe cea internă.',
          'Cleverness în loc de claritate, dacă nu trece testul grunt, rescrie.',
          'Autoritate fără empatie (sau invers).',
          'Să spui caracteristici în loc să arăți transformarea.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Care e cea mai mare greșeală în brand storytelling?',
            answer: 'Să-ți faci brandul eroul. Clientul e eroul; tu ești ghidul (Yoda, nu Luke).',
          },
          {
            question: 'De ce funcționează poveștile mai bine decât caracteristicile?',
            answer:
              'Pentru că declanșează oxitocină (încredere/empatie) și „cuplare neuronală”, și se rețin mult mai bine decât listele de fapte. Tensiunea și transformarea sunt motorul.',
          },
          {
            question: 'Ce e cadrul StoryBrand (SB7)?',
            answer:
              "Un model în 7 pași al lui Donald Miller, derivat din Hero's Journey: un personaj cu o problemă întâlnește un ghid, primește un plan, e chemat la acțiune, evită eșecul și ajunge la succes.",
          },
          {
            question: 'Cum folosesc povestea fondatorului?',
            answer: 'Ca dovadă de autoritate a ghidului („am trecut prin problema ta”), nu ca să te pui pe tine în centru. Eroul rămâne clientul.',
          },
          {
            question: 'Cum știu dacă mesajul meu e clar?',
            answer: 'Aplică testul „grunt”: în 5 secunde, poate cineva spune ce oferi, cum îl ajută și ce să facă? Dacă nu, simplifică.',
          },
        ],
      },
    ],
  },
  {
    slug: 'cat-costa-publicitatea-pe-facebook-si-instagram-in-romania-in-2026',
    category: 'Performance Ads',
    title: 'Cât costă publicitatea pe Facebook și Instagram în România în 2026',
    excerpt:
      'Publicitatea pe Facebook nu are preț fix — plătești pe licitație. Formula bugetului minim viabil, pragul de învățare al algoritmului și cum decizi cât să cheltui pornind de la CAC și LTV.',
    date: '26 IUN 2026',
    readTime: '9 MIN',
    articleNumber: '01',
    coverIcon: 'ring',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** publicitatea pe Facebook și Instagram nu are un preț fix. Plătești pe bază de licitație, iar costul real se măsoară în **cost pe rezultat** (CPA), nu în buget. În piața românească, un buget de pornire funcțional pentru o campanie de conversie începe, orientativ, de la 40–70 lei/zi per set de reclame, dar suma minimă corectă se calculează din costul tău pe rezultat și din pragul de învățare al algoritmului (≈50 de conversii în 7 zile). Mai jos ai mecanismul complet și formulele.',
      },
      { type: 'heading', text: 'Cum se stabilește costul: licitația Meta' },
      {
        type: 'paragraph',
        text: 'Meta nu vinde afișări la tarif fix. De fiecare dată când o reclamă poate fi afișată unui utilizator, rulează o licitație. Câștigătorul nu e cel care licitează cel mai mult, ci reclama cu cea mai mare **valoare totală**, calculată astfel:',
      },
      { type: 'quote', text: 'Valoare totală = Licitație × Rata estimată de acțiune + Calitatea reclamei' },
      { type: 'paragraph', text: 'Cele trei componente:' },
      {
        type: 'list',
        items: [
          '**Licitația** — cât ești dispus să plătești pentru rezultatul pe care l-ai ales (click, conversie, lead).',
          '**Rata estimată de acțiune (eAR)** — probabilitatea, calculată de Meta, ca utilizatorul respectiv să facă acțiunea dorită.',
          '**Calitatea reclamei** — semnale de feedback pozitiv/negativ, relevanță și experiența după click.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Consecința practică e cea care contează: o reclamă bine optimizată, cu engagement bun, poate câștiga afișări mai ieftin decât un concurent care licitează mai mult. Cu alte cuvinte, relevanța nu e o chestiune estetică, e o pârghie directă de cost. Două branduri pot ținti aceeași audiență, iar cel cu creativul mai relevant plătește mai puțin pe același rezultat.',
      },
      { type: 'heading', text: 'CPM și CPC: ce înseamnă și de ce nu sunt indicatorul principal' },
      {
        type: 'list',
        items: ['**CPM** = costul pentru 1.000 de afișări.', '**CPC** = costul pe click.'],
      },
      {
        type: 'paragraph',
        text: 'În România, pentru campanii structurate corect, CPM-ul se situează orientativ între 15 și 60 lei, în funcție de industrie, audiență, calitatea creativelor și perioadă. În ferestrele aglomerate, Black Friday, sărbători, costurile cresc pentru că presiunea pe licitație crește.',
      },
      {
        type: 'paragraph',
        text: 'Atenție însă: CPM și CPC sunt indicatori intermediari. Un CPM mic nu înseamnă nimic dacă nu se transformă în vânzări. **Indicatorul care decide profitabilitatea e costul pe rezultat (CPA)**, cât te costă o conversie reală (achiziție, lead). Optimizează și raportează pe CPA, nu pe CPM.',
      },
      { type: 'heading', text: 'Bugetul minim viabil: cum îl calculezi exact' },
      {
        type: 'paragraph',
        text: 'Aici e diferența dintre un buget „din burtă” și unul corect. Algoritmul Meta are nevoie de date ca să livreze eficient. Conform Meta Business Help Center, un set de reclame are nevoie de aproximativ 50 de evenimente de optimizare într-o fereastră de 7 zile ca să iasă din faza de învățare, iar acele 50 trebuie să fie exact evenimentul pentru care optimizezi (achiziție, lead etc.).',
      },
      {
        type: 'paragraph',
        text: 'Sub acest prag, setul rămâne în „Learning Limited”: livrare instabilă, costuri mai mari și rezultate care fluctuează zilnic. De aici derivă o regulă pe care o poți aplica imediat:',
      },
      { type: 'quote', text: 'Buget zilnic minim ≈ (50 × costul tău pe rezultat) ÷ 7' },
      {
        type: 'paragraph',
        text: 'Exemplu: dacă o conversie te costă 35 lei, ai nevoie orientativ de (50 × 35) ÷ 7 ≈ **250 lei/zi** per set de reclame ca acel set să poată ieși din învățare într-o săptămână. Dacă bugetul tău e mult sub acest prag, matematic nu vei aduna niciodată 50 de conversii în 7 zile și campania va rămâne blocată în învățare la nesfârșit.',
      },
      {
        type: 'paragraph',
        text: 'Ca regulă de echilibru, Meta recomandă un buget zilnic de cel puțin 5 ori costul-țintă pe rezultat. Dacă produsul tău nu poate genera 50 de achiziții pe săptămână la bugetul disponibil, soluția nu e să aștepți, ci să optimizezi pentru un eveniment mai frecvent din pâlnie (Add to Cart, Initiate Checkout) și să consolidezi seturile de reclame, ca evenimentele să se adune mai repede.',
      },
      { type: 'heading', text: 'Scalarea: cum crești fără să resetezi învățarea' },
      {
        type: 'paragraph',
        text: 'Odată ce ai o combinație profitabilă de audiență + creativ + mesaj, bugetul devine o pârghie, dar creșterea trebuie făcută controlat, ca să nu trimiți algoritmul înapoi în învățare. Două repere concrete:',
      },
      {
        type: 'list',
        items: [
          'Modificările de buget sub 20% de regulă nu resetează faza de învățare.',
          'Scalează cu 10–20% la fiecare 3–4 zile, după ce setul a ieșit din învățare, nu brusc.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Schimbările care **resetează** învățarea (și pe care le eviți în timpul ei): modificarea targetării, a strategiei de licitare sau a evenimentului de optimizare.',
      },
      { type: 'heading', text: 'Cum decizi cât poți cheltui: CAC vs. LTV' },
      {
        type: 'paragraph',
        text: 'Întrebarea „cât costă reclama?” e greșit pusă. Întrebarea corectă: **cât valorează un client și cât îmi permit să plătesc ca să-l câștig?** Doi indicatori dau răspunsul:',
      },
      {
        type: 'list',
        items: [
          '**CAC** (Customer Acquisition Cost) — cât te costă să câștigi un client nou.',
          '**LTV** (Lifetime Value) — profitul total adus de un client pe durata relației.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Exemplu de decizie: dacă un client îți aduce în medie 300 lei profit (LTV) și accepți să plătești maximum 60 lei ca să-l câștigi (CAC-țintă), ai un cadru clar. Bugetul lunar devine o consecință a câți clienți vrei să aduci: 100 de clienți × 60 lei = 6.000 lei. Raportul LTV/CAC (aici 5:1) îți spune cât de agresiv poți scala.',
      },
      {
        type: 'paragraph',
        text: 'Pentru e-commerce, aceeași logică se exprimă prin **ROAS-ul de prag**: break-even ROAS = 1 ÷ marja de profit. La o marjă de 25%, ai nevoie de un ROAS de minimum 4x doar ca să ieși pe zero; orice peste e profit.',
      },
      { type: 'heading', text: 'Costurile care nu apar în „bugetul de ads”' },
      { type: 'paragraph', text: 'Suma plătită către Meta e doar o parte. Ce decide dacă acel buget produce profit sau pierdere:' },
      {
        type: 'list',
        items: [
          '**Creativele** — un creativ slab scade rata estimată de acțiune și calitatea reclamei, deci urcă direct costul pe rezultat în licitație.',
          '**Pagina de destinație** — trafic plătit pe o pagină care convertește prost = bani irosiți.',
          '**Tracking-ul** — fără Meta Pixel și Conversions API configurate corect (cu deduplicare), optimizezi pe date incomplete și raportezi cifre nesigure. În plus, evenimentele server-side din CAPI contează și ele la pragul de 50 din faza de învățare.',
          '**Managementul** — testare sistematică de creative și audiențe, tăierea a ce nu performează, realocarea bugetului.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Care e bugetul minim ca să faci reclame pe Facebook în România?',
            answer:
              'Tehnic, poți porni de la câțiva lei pe zi, dar sub pragul care permite ≈50 de conversii în 7 zile campania nu iese din învățare. Orientativ, 40–70 lei/zi e un minim de testare; bugetul corect se calculează din costul tău pe rezultat (≈ 50 × CPA ÷ 7 pe zi/set).',
          },
          {
            question: 'De ce a crescut costul reclamelor mele fără să schimb nimic?',
            answer:
              'Cel mai des, din cauza presiunii de licitație (sezon, mai mulți concurenți pe aceeași audiență) sau a scăderii relevanței (creativ obosit → rata estimată de acțiune mai mică → cost mai mare).',
          },
          {
            question: 'Plătesc suma pe care o licitez?',
            answer: 'Nu neapărat. Licitarea ta e o limită; câștigi pe baza valorii totale, iar relevanța mai bună îți permite să obții afișări sub cât licitezi.',
          },
          {
            question: 'CPM mic înseamnă campanie bună?',
            answer: 'Nu. CPM-ul mic e irelevant dacă nu se transformă în conversii. Indicatorul de profitabilitate e costul pe rezultat (CPA), citit prin marja ta.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ce-este-roas-si-cum-il-calculezi-corect-pentru-campaniile-tale',
    category: 'Performance Ads',
    title: 'Ce este ROAS și cum îl calculezi corect pentru campaniile tale',
    excerpt:
      'ROAS măsoară venituri, nu profit — un ROAS de 4x poate fi pierdere. Formulele pentru break-even ROAS, target ROAS și de ce campania-vedetă de retargeting minte.',
    date: '23 IUN 2026',
    readTime: '8 MIN',
    articleNumber: '02',
    coverIcon: 'growth',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** ROAS (Return On Ad Spend) = venituri din reclame ÷ cheltuieli cu reclamele. Măsoară **venituri**, nu profit, de aceea un ROAS „mare” poate însemna pierdere. Pragul de la care ieși pe profit se calculează din marja ta: **break-even ROAS = 1 ÷ marja de contribuție**. Tot ce e peste prag e profit; tot ce e sub e pierdere, indiferent cât de impresionant arată cifra.',
      },
      { type: 'heading', text: 'Definiție și formulă' },
      { type: 'paragraph', text: 'ROAS este raportul dintre veniturile atribuite unei campanii și banii cheltuiți pe acea campanie:' },
      { type: 'quote', text: 'ROAS = Venituri din reclame ÷ Cheltuieli cu reclamele' },
      {
        type: 'paragraph',
        text: 'Exemplu: 1.000 lei cheltuiți, 4.000 lei vânzări generate → ROAS = 4 (sau 4x, sau 400%). Fiecare leu investit a adus 4 lei în **venituri** (cifră de afaceri, nu profit).',
      },
      { type: 'heading', text: 'ROAS ≠ ROI ≠ POAS' },
      { type: 'paragraph', text: 'Trei indicatori confundați frecvent:' },
      {
        type: 'list',
        items: [
          '**ROAS** — venituri ÷ cheltuieli cu reclamele. Ignoră costul produsului. Util pentru a măsura eficiența livrării, nu profitabilitatea.',
          '**ROI** — randamentul net: (profit atribuit − cost marketing) ÷ cost marketing. Ține cont de toate costurile.',
          '**POAS (Profit On Ad Spend)** — profit ÷ cheltuieli cu reclamele. Indicatorul care chiar contează pentru un magazin, pentru că include marja.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Relația dintre ele e directă: **POAS = ROAS × marja de contribuție**. Când POAS = 1, ești pe break-even; sub 1 pierzi, peste 1 faci profit. Acesta e motivul pentru care ROAS nu poate fi citit niciodată izolat.',
      },
      { type: 'heading', text: 'De ce un ROAS de 4x poate fi pierdere' },
      { type: 'paragraph', text: 'ROAS măsoară venituri, nu profit. Hai pe cifre, la o marjă de contribuție de 20%:' },
      {
        type: 'table',
        headers: ['Indicator', 'Valoare'],
        rows: [
          ['Venituri din ads', '4.000 lei'],
          ['Marjă de contribuție (20%)', '800 lei'],
          ['Cheltuieli cu ads', '1.000 lei'],
          ['Rezultat', '−200 lei'],
        ],
      },
      {
        type: 'paragraph',
        text: 'ROAS-ul de 4x „arată” excelent, dar la o marjă de 20% ai pierdut 200 lei. POAS aici = 4 × 0,20 = 0,8 (sub 1 = pierdere). Cifra de vanitate spune o poveste; economia produsului spune alta.',
      },
      { type: 'heading', text: 'Pragul de rentabilitate: break-even ROAS' },
      {
        type: 'paragraph',
        text: 'Se calculează direct din marja de contribuție (preț minus costuri variabile, ca procent din preț):',
      },
      { type: 'quote', text: 'Break-even ROAS = 1 ÷ marja de contribuție' },
      {
        type: 'table',
        headers: ['Marjă de contribuție', 'Break-even ROAS'],
        rows: [
          ['50%', '2x'],
          ['33%', '3x'],
          ['25%', '4x'],
          ['20%', '5x'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Sub prag pierzi, peste prag faci profit. Nu există un ROAS „bun” universal: un brand de software cu marjă de 90% e profitabil la 2x; un magazin cu marjă de 20% are nevoie de minimum 5x doar ca să nu piardă.',
      },
      { type: 'heading', text: 'Target ROAS: cifra spre care optimizezi de fapt' },
      {
        type: 'paragraph',
        text: 'Break-even-ul te ține pe zero. Ca să atingi un **profit-țintă**, ai nevoie de un ROAS mai mare. Formula:',
      },
      { type: 'quote', text: 'Target ROAS = 1 ÷ (marja de contribuție − profit-țintă dorit)' },
      {
        type: 'paragraph',
        text: 'Exemplu: marjă de contribuție 50%, vrei 20% profit net pe venituri → Target ROAS = 1 ÷ (0,50 − 0,20) = 1 ÷ 0,30 ≈ **3,3x**. Verificare: la 3,3x, costul cu ads = 30% din venituri; 50% marjă − 30% ads = 20% profit.',
      },
      {
        type: 'paragraph',
        text: 'Aceasta e cifra pe care o setezi în strategiile de licitare „Target ROAS” din Meta și Google, nu break-even-ul, ci pragul care îți lasă profitul dorit.',
      },
      { type: 'heading', text: 'ROAS pe campanie vs. ROAS pe cont (și capcana incrementalității)' },
      {
        type: 'paragraph',
        text: 'ROAS-ul unei campanii de retargeting poate fi spectaculos (10x+), pentru că targetează oameni deja aproape de cumpărare. Dar o mare parte dintre acele vânzări **s-ar fi întâmplat oricum**, campania își atribuie merite pentru conversii pe care nu le-a generat. Acesta e **efectul de incrementalitate**: ROAS-ul raportat ≠ vânzări incrementale (vânzări care nu ar fi existat fără reclamă).',
      },
      {
        type: 'paragraph',
        text: 'Practic, retargeting-ul recoltează ce a semănat partea de sus a pâlniei (awareness, prospectare), care are ROAS raportat mai mic. Dacă tai campaniile „cu ROAS mic”, în câteva săptămâni rămâi fără oameni de retargetat și ROAS-ul „vedetă” se prăbușește. **De aceea decizia se ia pe ROAS-ul întregului cont, nu pe campania-vedetă.** Un indicator util aici e ROAS-ul pe clienți **noi** vs. **existenți** (nROAS), îți arată cât plătești ca să aduci cumpărători cu adevărat noi.',
      },
      { type: 'heading', text: 'Atribuire: de ce ROAS-ul raportat nu e ROAS-ul real' },
      {
        type: 'paragraph',
        text: 'ROAS-ul afișat de platforme depinde de **fereastra de atribuire** aleasă (de ex. click în ultimele 7 zile, vizionare în 1 zi). Aceleași vânzări pot arăta ROAS-uri diferite în funcție de setare. Două probleme suplimentare:',
      },
      {
        type: 'list',
        items: [
          '**Suprapunerea atribuirii** — dacă aduni ROAS-ul raportat de Meta cu cel de la Google, ambele își revendică aceleași vânzări, deci suma depășește veniturile reale.',
          '**Pierderea de semnal** (restricții de confidențialitate, iOS) — o parte din conversii sunt modelate/estimate, nu măsurate.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Soluția profesionistă: compară mereu ROAS-ul de platformă cu **MER** (Marketing Efficiency Ratio) sau **ROAS „blended”**:',
      },
      { type: 'quote', text: 'MER = Venituri totale (din contabilitate) ÷ Cheltuieli totale de marketing' },
      {
        type: 'paragraph',
        text: 'MER nu depinde de atribuire și nu poate fi „umflat” de platforme. Adevărul e la intersecția dintre ce raportează platformele (util pentru optimizare zilnică) și MER (util pentru deciziile reale de business).',
      },
      { type: 'heading', text: 'ROAS pe prima comandă vs. pe LTV' },
      {
        type: 'paragraph',
        text: 'Pentru afaceri cu cumpărări repetate sau abonamente, ROAS-ul pe **prima** vânzare poate fi sub break-even și totuși profitabil pe termen lung, dacă LTV-ul (profitul total pe durata relației) acoperă CAC-ul. Regula: dacă vinzi o singură dată, optimizează pe break-even ROAS al primei comenzi; dacă ai recurență, poți accepta un ROAS inițial mai mic, raportat la LTV.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Ce înseamnă un ROAS bun?',
            answer: 'Niciun număr nu e „bun” în absolut. Bun = peste break-even-ul tău (1 ÷ marja de contribuție). La marjă de 25%, „bun” începe de la peste 4x.',
          },
          {
            question: 'Care e diferența dintre ROAS și ROI?',
            answer:
              'ROAS = venituri ÷ cheltuieli cu reclamele (ignoră costul produsului). ROI = randament net, după toate costurile. Pentru profitabilitate reală, folosește POAS sau ROI, nu ROAS brut.',
          },
          {
            question: 'De ce ROAS-ul din Meta nu se potrivește cu vânzările din contabilitate?',
            answer: 'Din cauza ferestrei de atribuire, a suprapunerii între platforme și a conversiilor modelate. Reconciliază cu MER (venituri totale ÷ cheltuieli totale de marketing).',
          },
          {
            question: 'Cum calculez ROAS-ul de care am nevoie ca să fac profit?',
            answer: 'Target ROAS = 1 ÷ (marja de contribuție − profitul-țintă dorit).',
          },
        ],
      },
    ],
  },
  {
    slug: 'performance-max-in-google-ads-ghidul-complet-pentru-magazine-online',
    category: 'Performance Ads',
    title: 'Performance Max în Google Ads: ghidul complet pentru magazine online',
    excerpt:
      'Performance Max livrează pe toate suprafețele Google dintr-o singură campanie. Cum configurezi corect feed-ul, cum segmentezi pe marjă și când ai nevoie și de Standard Shopping.',
    date: '19 IUN 2026',
    readTime: '10 MIN',
    articleNumber: '03',
    coverIcon: 'converge',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** Performance Max (PMax) e un tip de campanie Google bazat pe obiectiv, care livrează reclame pe toate suprafețele Google dintr-o singură campanie, folosind Smart Bidding. Pentru e-commerce, succesul depinde de trei lucruri: un feed de produse curat, urmărirea corectă a **valorii** conversiilor și suficient volum de conversii (≈30+/lună per campanie) ca algoritmul să iasă din învățare. Google îl recomandă ca **completare** a campaniilor Search și Shopping, nu ca înlocuitor.',
      },
      { type: 'heading', text: 'Ce este Performance Max' },
      {
        type: 'paragraph',
        text: 'PMax e o campanie *goal-based*: îi dai obiectivul, bugetul și un set de materiale (texte, imagini, video, feed de produse), iar inteligența artificială Google decide unde, cui și când livrează. Dintr-o singură campanie, acoperă toate suprafețele Google: Search, Shopping, Display, YouTube, Discover, Gmail și Maps (plus Search partners; în SUA s-a adăugat și Waze la final de 2025). E cel mai folosit tip de campanie pentru retaileri în 2026, și sursa celor mai multe greșeli, fiindcă ascunde ce placement, audiență sau interogare a produs conversia.',
      },
      { type: 'heading', text: 'Cum funcționează: Smart Bidding și asset groups' },
      {
        type: 'paragraph',
        text: 'PMax folosește licitare automată orientată spre obiectiv: **Target ROAS**, **Target CPA** sau **Maximize Conversion Value**. Pentru magazine online, documentația Google recomandă Maximize Conversion Value cu un Target ROAS atunci când urmărești valori, licitarea axată pe venituri produce, de regulă, rezultate mai bune decât cea pe volum brut de conversii.',
      },
      {
        type: 'paragraph',
        text: 'Materialele se organizează în **asset groups** (grupuri de elemente). Pentru e-commerce, motorul real e **feed-ul** din Google Merchant Center, titlurile, atributele și imaginile produselor funcționează ca semnale de relevanță. Un feed slab nu poate fi compensat de niciun setting.',
      },
      { type: 'heading', text: 'Avantajul și compromisul' },
      {
        type: 'paragraph',
        text: 'Avantajul: automatizarea Google e foarte bună la a găsi cumpărători când are date suficiente și materiale bune. Compromisul istoric a fost transparența, PMax era criticat ca o „cutie neagră”. Asta s-a redus: Google a adăugat raportare pe canale (Channel Performance) și a mutat raportul de termeni de căutare la nivel de campanie. Diagnosticul util de azi: dacă majoritatea bugetului PMax merge spre Display și foarte puțin spre Shopping, ai o problemă de feed sau de asset groups.',
      },
      {
        type: 'paragraph',
        text: 'Totuși, controlul granular rămâne mai mic decât la campaniile clasice, de aceea configurarea contează enorm.',
      },
      { type: 'heading', text: 'Când merită PMax și când folosești și Standard Shopping' },
      {
        type: 'paragraph',
        text: 'PMax excelează la prospectare și descoperire pe canale vizuale. Standard Shopping îți dă control fin pe interogări, bid-uri și date la nivel de produs. În 2026, abordarea câștigătoare e **hibridă**:',
      },
      {
        type: 'list',
        items: [
          '**PMax** — pentru descoperirea de produse noi, reach upper-funnel și audiențe neacoperite de Shopping.',
          '**Standard Shopping** — pentru produsele-erou cu marjă mare și ROAS deja stabilit.',
          '**Regula critică:** segmentează produsele ca cele două campanii să nu concureze pe același inventar. PMax are de regulă prioritate față de Standard Shopping când vizează aceleași produse, deci suprapunerea îți distorsionează datele.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Arhitecturile multi-campanie depășesc setup-ul cu o singură campanie cu 20–35% pe ROAS, dar cer segmentare deliberată a produselor.',
      },
      {
        type: 'paragraph',
        text: 'Dacă abia ai lansat, ai buget mic sau volum mic de conversii, începe cu Standard Shopping/Search ca să aduni semnale, apoi adaugă PMax.',
      },
      { type: 'heading', text: 'Cum o configurezi corect' },
      {
        type: 'list',
        ordered: true,
        items: [
          '**Feed-ul, înainte de orice.** Titluri descriptive cu cuvinte-cheie reale, atribute complete, imagini bune. 80% din rezultat se decide aici.',
          '**Pornire feed-only, în primele 2–4 săptămâni.** Dacă adaugi tot setul creativ din ziua 1, Google împrăștie bugetul pe Display și YouTube înainte ca Shopping-ul să-și demonstreze performanța. Secvența care funcționează: rulează feed-only ca să stabilești o bază curată pe Shopping, apoi adaugă întâi imagini, apoi video.',
          '**Segmentează pe marjă, nu arunca totul într-o campanie.** Un singur Target ROAS nu poate servi simultan produse cu marjă de 60% și de 15%, algoritmul favorizează produsele cu marjă mică, fiindcă convertesc în volum mai mare, iar restul „moare de foame”. Soluția: campanii separate pe paliere de marjă, fiecare cu un Target ROAS calibrat la break-even-ul acelui palier (break-even ROAS = 1 ÷ marja de contribuție). Exemplu: produse cu marjă 60% → break-even 1,67x → țintă peste ea; produse cu marjă 15% → break-even ≈6,7x → țintă mult mai sus.',
          '**Dă semnale, nu restricții.** Audience signals (date first-party, clienți, public care a interacționat) și search themes accelerează învățarea în direcția bună, fără a limita targetarea.',
          '**Exclude brandul** (acolo unde e disponibil), ca PMax să nu-și revendice căutările pe numele tău și să-ți arate performanța reală pe trafic nou.',
        ],
      },
      { type: 'heading', text: 'Pragul de volum și faza de învățare' },
      { type: 'paragraph', text: 'PMax are nevoie de densitate de date ca să optimizeze. Repere concrete:' },
      {
        type: 'list',
        items: [
          '**Volum minim:** cu peste ~30 de conversii pe lună merită să compari serios opțiunile; nu trece pe Target ROAS înainte de a atinge pragul de ~50 de conversii în 30 de zile.',
          '**Consolidează:** cinci campanii cu 10 conversii fiecare vor pierde mereu în fața uneia cu 50. Mai puține campanii, mai mult semnal.',
          '**Ramp și evaluare:** lasă campania să se calibreze 1–2 săptămâni, apoi evaluează pe 4–5 săptămâni, incluzând întârzierea de conversie (conversion lag), înainte de a trage concluzii.',
          '**Nu sufoca algoritmul:** setarea unui Target ROAS prea agresiv prea devreme poate reduce volumul de conversii dramatic, chiar până la 50%.',
        ],
      },
      { type: 'heading', text: 'Greșeli costisitoare' },
      {
        type: 'list',
        items: [
          '**Optimizare oprită din editări dese.** Nu ajusta Target ROAS mai des de o dată la 14 zile și nu adăuga asset groups noi înainte ca cele existente să aibă 4 săptămâni de date.',
          '**Un singur Target ROAS pentru toate marjele** (vezi mai sus, îți canibalizează catalogul).',
          '**Cea mai gravă: valoarea conversiilor măsurată greșit sau deloc.** Dacă Google nu știe cât valorează fiecare vânzare, optimizează spre orice arată ca o conversie, inclusiv vânzări cu marjă zero. Urmărirea corectă a valorii (cu enhanced conversions și date first-party) e fundația, nu un detaliu tehnic.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Pe ce canale rulează Performance Max?',
            answer: 'Pe toate suprafețele Google dintr-o singură campanie: Search, Shopping, Display, YouTube, Discover, Gmail, Maps și Search partners.',
          },
          {
            question: 'Înlocuiește PMax campaniile de Search/Shopping?',
            answer: 'Nu. Google îl recomandă ca completare. Abordarea optimă în 2026 e hibridă: PMax pentru prospectare, Standard Shopping pentru produsele-erou cu marjă mare.',
          },
          {
            question: 'De câte conversii are nevoie ca să funcționeze?',
            answer: 'Orientativ, peste ~30/lună per campanie; pentru a trece sigur pe Target ROAS, vizează un prag de ~50 de conversii în 30 de zile. Sub aceste praguri, consolidează campaniile.',
          },
          {
            question: 'De ce îmi merge tot bugetul pe Display și aproape nimic pe Shopping?',
            answer: 'E un semnal de feed slab sau de asset groups configurate greșit. Verifică raportul Channel Performance și pornește feed-only până stabilizezi Shopping-ul.',
          },
        ],
      },
    ],
  },
  {
    slug: 'funnel-complet-pe-meta-ads-tofu-mofu-si-bofu-explicate-simplu',
    category: 'Performance Ads',
    title: 'Funnel complet pe Meta Ads: TOFU, MOFU și BOFU explicate simplu',
    excerpt:
      'De ce funnel-ul e un sistem, nu o listă de campanii separate. Obiective, audiențe și mesaje pentru fiecare etaj, plus cum împarți bugetul între TOFU, MOFU și BOFU.',
    date: '16 IUN 2026',
    readTime: '9 MIN',
    articleNumber: '13',
    coverIcon: 'funnel',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** un funnel pe Meta împarte drumul de la „nu te cunosc” la „cumpăr” în trei etaje, TOFU (awareness), MOFU (considerare), BOFU (conversie), fiecare cu obiectivul de campanie, audiența și mesajul lui. Greșeala care arde cele mai multe bugete e să rulezi doar campanii de conversie pe public rece. Funnel-ul nu e o colecție de campanii separate, ci un sistem în care fiecare etaj îl alimentează pe următorul: fără TOFU, n-ai pe cine retargeta în BOFU.',
      },
      { type: 'heading', text: 'De unde vine ideea de „pâlnie”' },
      {
        type: 'paragraph',
        text: 'Conceptul nu e o invenție a marketingului digital. Rădăcina e modelul **AIDA**, Attention, Interest, Desire, Action, atribuit publicitarului Elias St. Elmo Lewis încă din 1898. AIDA a pus bazele interpretării moderne a parcursului de cumpărare, pe care marketerii au adaptat-o în modelul TOFU/MOFU/BOFU. Ideea de fond a rezistat peste un secol: oamenii nu trec direct de la a-ți auzi numele la a cumpăra, ci parcurg etape, întâi atenția, apoi interesul, apoi intenția, abia la final acțiunea.',
      },
      { type: 'heading', text: 'De ce campania pe un singur etaj eșuează' },
      {
        type: 'paragraph',
        text: 'Cea mai frecventă greșeală e să ceri vânzarea unor oameni care abia ți-au auzit numele. A funcționat acum un deceniu; azi nu mai merge. Cifrele o spun clar: costul de achiziție a clienților a crescut cu peste 60% în ultimul deceniu, iar 75% dintre marketerii de performanță raportează randamente descrescătoare din campaniile de conversie pe un singur etaj, adresate publicului rece. Epoca „dă boost la o postare și vin vânzările” s-a încheiat.',
      },
      { type: 'heading', text: 'TOFU — Top of Funnel (descoperire)' },
      { type: 'paragraph', text: 'Aici sunt oamenii care **nu te cunosc**. Obiectivul nu e vânzarea, ci atenția și prima impresie.' },
      {
        type: 'list',
        items: [
          '**Obiective de campanie Meta:** Awareness, Reach, Video Views.',
          '**Audiență:** rece. Targetarea largă la TOFU lasă AI-ul Meta să găsească audiențe eficiente, în loc să restrângi algoritmul cu parametri îngusti (plus lookalike din lista ta de clienți).',
          '**Mesaj:** valoare, poveste, demonstrație, conținut care nu pare reclamă. Video-ul scurt domină la acest etaj.',
          '**Metrici:** CPM, reach, vizionări.',
          '**Greșeala de evitat:** să ceri achiziția aici, vei plăti scump pentru zero rezultate.',
        ],
      },
      { type: 'heading', text: 'MOFU — Middle of Funnel (considerare)' },
      {
        type: 'paragraph',
        text: 'Acum vorbești cu oameni care **au interacționat deja**: au văzut un video, au vizitat site-ul, te urmăresc. Te cunosc, dar nu sunt convinși.',
      },
      {
        type: 'list',
        items: [
          '**Obiective de campanie Meta:** Traffic, Engagement, Leads.',
          '**Audiență:** caldă, audiențe custom (privitori de video, cei care au interacționat cu pagina, vizitatori de site).',
          '**Mesaj:** dovezi, testimoniale, comparații, răspunsuri la obiecții.',
          '**Metrici:** CTR, engagement rate, cost pe lead.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Acesta e etajul cel mai neglijat, și e o greșeală scumpă. Tocmai în faza de considerare se „blochează” aproximativ 68% dintre deal-urile B2B, fiindcă brandurile investesc masiv în trafic TOFU și în pagini de vânzare BOFU, dar lasă mijlocul subțire. Adăugarea unui singur touchpoint de MOFU (de exemplu, o reclamă cu testimonial) reduce vizibil rezistența la conversie.',
      },
      { type: 'heading', text: 'BOFU — Bottom of Funnel (decizie)' },
      {
        type: 'paragraph',
        text: 'Etajul de jos e pentru oamenii **gata să cumpere**, au pus în coș, au vizitat pagina de prețuri, au inițiat checkout fără să finalizeze.',
      },
      {
        type: 'list',
        items: [
          '**Obiective de campanie Meta:** Sales (Conversions); după caz, Leads.',
          '**Audiență:** fierbinte, vizitatori de site, coș abandonat, inițiatori de checkout.',
          '**Mesaj:** ofertă clară, urgență reală, garanție, recenzii la produsul vizat.',
          '**Metrici:** rata de conversie, CPA, ROAS.',
          '**De reținut:** aici se face cel mai bun ROAS, dar BOFU nu poate exista fără TOFU și MOFU care alimentează pâlnia.',
        ],
      },
      { type: 'heading', text: 'Maparea pe obiectivele Meta (rezumat)' },
      {
        type: 'paragraph',
        text: 'În 2026, Meta are șase obiective de campanie, Awareness, Traffic, Engagement, Leads, App Promotion și Sales, care se mapează pe etaje:',
      },
      {
        type: 'table',
        headers: ['Etaj', 'Obiectiv Meta', 'Audiență', 'Mesaj', 'Metrică'],
        rows: [
          ['TOFU', 'Awareness, Reach, Video Views', 'Rece (broad, lookalike)', 'Valoare, poveste', 'CPM, reach'],
          ['MOFU', 'Traffic, Engagement, Leads', 'Caldă (custom audiences)', 'Dovezi, social proof', 'CTR, CPL'],
          ['BOFU', 'Sales, Leads', 'Fierbinte (coș, vizitatori)', 'Ofertă, urgență', 'CPA, ROAS'],
        ],
      },
      { type: 'heading', text: 'De ce nu poți sări peste etaje' },
      {
        type: 'paragraph',
        text: 'Mulți văd că retargeting-ul (BOFU) are cel mai bun ROAS și vor să pună tot bugetul acolo. Problema: BOFU funcționează doar pe oamenii pe care TOFU și MOFU i-au adus. Fără TOFU, MOFU n-are pe cine retargeta; fără MOFU, BOFU încearcă să convertească oameni care nu sunt încă pregătiți. Dacă tai partea de sus, în câteva săptămâni rămâi fără audiență de retargetat și ROAS-ul „vedetă” se prăbușește. Gândește funnel-ul ca pe o buclă, nu ca pe o linie: campaniile TOFU aduc atenție, care alimentează MOFU, care întărește pool-ul de retargeting BOFU, fiecare etaj construiește momentum.',
      },
      { type: 'heading', text: 'Cum împarți bugetul (și două reguli tehnice)' },
      {
        type: 'paragraph',
        text: 'Nu există o formulă universală. Un punct de plecare frecvent, **orientativ**: 20–30% TOFU, 20–30% MOFU și 40–50% BOFU, ajustat în funcție de mărimea pool-ului de audiență și de cât de cunoscut e brandul (un brand nou are nevoie de mai mult TOFU). Două reguli care fac diferența:',
      },
      {
        type: 'list',
        items: [
          '**Densitatea de semnal.** Fiecare set de reclame are nevoie de ~50 de evenimente de conversie pe săptămână ca să iasă din „Learning Limited”; consolidează campaniile ca să atingă pragul.',
          '**Reîmprospătarea creativelor.** Schimbă creativele la fiecare 2–4 săptămâni, mai ales când frecvența depășește 3 într-o fereastră de 7 zile, ca să previi oboseala de reclame.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Pe scurt, mesajul se schimbă cu temperatura audienței: public rece → educație; public cald → dovadă socială; public fierbinte → urgență și o ofertă directă.',
      },
      { type: 'heading', text: 'Funnel-ul liniar vs. realitatea: „messy middle”' },
      {
        type: 'paragraph',
        text: 'Aici e nuanța pe care un strateg o cunoaște: pâlnia liniară e un model util, dar parcursul real nu mai e liniar. În 2026, cumpărătorii nu mai urmează un drum prestabilit, sar între etaje în funcție de ce vor să afle, iar o singură sesiune de research poate amesteca un răspuns generat de AI, un review pe YouTube și o discuție într-o comunitate. Concluzia practică: nu forța oamenii pe un traseu fix; construiește conținut și mesaje care îi întâlnesc oriunde ar intra în pâlnie. Funnel-ul rămâne un cadru bun de organizare a bugetului și a mesajelor, atâta timp cât îl tratezi ca pe o hartă, nu ca pe o lege.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Ce înseamnă TOFU, MOFU și BOFU?',
            answer: 'Top of Funnel (awareness, public rece), Middle of Funnel (considerare, public cald) și Bottom of Funnel (conversie, public fierbinte). Fiecare cu obiectivul, audiența și mesajul lui.',
          },
          {
            question: 'Pot să rulez doar campanii de conversie?',
            answer: 'Nu eficient. Conversia pe public rece are randamente tot mai slabe (75% dintre marketeri raportează asta). Ai nevoie de TOFU și MOFU care să alimenteze BOFU.',
          },
          {
            question: 'Cum împart bugetul între etaje?',
            answer: 'Orientativ, 20–30% TOFU, 20–30% MOFU, 40–50% BOFU, ajustat după cât de cunoscut e brandul și cât de mare e pool-ul de audiență. Un brand nou are nevoie de mai mult TOFU.',
          },
          {
            question: 'Ce obiectiv Meta aleg pentru fiecare etaj?',
            answer: 'TOFU: Awareness/Reach/Video Views. MOFU: Traffic/Engagement/Leads. BOFU: Sales (și uneori Leads).',
          },
          {
            question: 'De ce are retargeting-ul cel mai bun ROAS?',
            answer: 'Pentru că targetează oameni deja aproape de cumpărare. Dar acel ROAS depinde de TOFU și MOFU care i-au adus, de aceea privești performanța pe tot contul, nu pe o singură campanie.',
          },
        ],
      },
    ],
  },
  {
    slug: 'retargeting-pe-meta-cum-recuperezi-vizitatorii-care-nu-au-cumparat',
    category: 'Performance Ads',
    title: 'Retargeting pe Meta: cum recuperezi vizitatorii care n-au cumpărat',
    excerpt:
      '~70% dintre coșuri sunt abandonate, iar retargeting-ul e cea mai profitabilă campanie din cont. Conversions API, excluderea cumpărătorilor și segmentarea pe intenție, explicate pas cu pas.',
    date: '13 IUN 2026',
    readTime: '8 MIN',
    articleNumber: '14',
    coverIcon: 'retarget',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** circa 70% dintre coșuri sunt abandonate, iar retargeting-ul e cea mai profitabilă campanie din cont, recuperează ~26% dintre cumpărătorii care au plecat și are de departe cel mai bun ROAS. Dar în 2026 funcționează corect doar cu trei lucruri pe care majoritatea le ratează: **Conversions API** (pentru că pierderea de semnal iOS a tăiat masiv audiențele), **excluderea cumpărătorilor** și **segmentarea pe intenție**. Plus o avertizare: ROAS-ul lui e parțial iluzoriu (incrementalitate).',
      },
      { type: 'heading', text: 'Cât de mare e, de fapt, problema' },
      {
        type: 'paragraph',
        text: 'Aproape 70% din coșurile de cumpărături sunt abandonate, iar motivele nu țin de produs: costuri-surpriză la checkout (transport, taxe), forțarea creării unui cont în loc de checkout ca invitat, lipsa metodelor de plată preferate și „window shopping” (coșul folosit ca wishlist). Asta e o veste bună pentru retargeting: mulți dintre acești oameni nu te-au respins, ci s-au lovit de o frecare de moment.',
      },
      { type: 'heading', text: 'Ce este retargeting-ul și de ce funcționează' },
      {
        type: 'paragraph',
        text: '**Retargeting** înseamnă să arăți reclame oamenilor care au interacționat deja cu tine: au vizitat site-ul, au pus în coș, ți-au văzut un video. În loc să plătești ca să ajungi la străini, revii în fața unora care te cunosc și sunt aproape de decizie. Datele explică de ce e atât de eficient:',
      },
      {
        type: 'list',
        items: [
          'Vizitatorii retargetați au cu ~70% mai multe șanse să convertească decât cei care nu văd retargeting, iar reclamele de retargeting recuperează ~26% dintre cumpărătorii care au abandonat.',
          'CTR-ul reclamelor de retargeting e de ~0,7–1,5%, de aproape 10 ori mai mare decât la display-ul standard.',
          'Pe conturile de e-commerce, retargeting-ul pe coș abandonat are un ROAS mediu de ~5,8x, față de 1,8–2,4x la prospectarea pe public rece.',
          'Audiențele cu intenție mare (coș abandonat) pot avea un CPA cu ~60% mai mic decât display-ul larg.',
        ],
      },
      { type: 'heading', text: 'Nu tot abandonul e recuperabil, și fereastra de timp contează' },
      {
        type: 'paragraph',
        text: 'Retargeting-ul nu trebuie să țintească pe toată lumea (o parte „doar se uitau”), ci segmentele cu intenție reală, și cât mai repede. Recuperarea e concentrată în primele zile: zilele 1–3 aduc ~60% din venitul recuperat, zilele 4–7 restul de ~40%, iar dincolo de ziua 8 recuperarea e neglijabilă (sub 2%). Campaniile lansate în primele 24 de ore de la abandon produc cele mai mari rate de recuperare. Concluzie: fereastra de 7 zile e punctul optim; ce e dincolo adaugă frecvență fără venit și riscă iritarea.',
      },
      { type: 'heading', text: 'Tipurile de audiențe (segmentează pe intenție și pe valoare)' },
      {
        type: 'paragraph',
        text: 'Nu trata la fel pe cineva care a abandonat acum o oră și pe cineva de acum 28 de zile. Structura recomandată segmentează audiențele pe timp (0–3 zile foarte fierbinți vs. 4–14 vs. 30 de zile) și pe valoarea coșului (produse scumpe vs. ieftine), ca să licitezi mai mult pentru lead-urile fierbinți și să schimbi mesajul pe măsură ce omul „se răcește”. Mesajul se adaptează: coșul abandonat primește o reasigurare/ofertă, vizitatorul curios primește dovezi și recenzii.',
      },
      { type: 'heading', text: 'Dynamic Product Ads: arma e-commerce-ului' },
      {
        type: 'paragraph',
        text: 'Pentru magazine, saltul mare îl fac **Dynamic Product Ads (DPA)**, reclame care arată automat fiecărui utilizator exact produsul pe care l-a văzut sau adăugat în coș, extras din catalogul tău. DPA pe coș abandonat livrează tipic un ROAS de 3–5 ori mai mare decât reclamele statice, fiindcă creativul e hiper-relevant, iar recuperează ~10–25% dintre coșurile abandonate. Setup: conectezi catalogul (Commerce Manager / Shopify / WooCommerce) și te asiguri că evenimentul AddToCart trimite content_ids, content_type, value și currency, fără ele, DPA nu funcționează.',
      },
      { type: 'heading', text: 'Problema centrală a anului 2026: pierderea de semnal' },
      {
        type: 'paragraph',
        text: 'Aici e schimbarea pe care trebuie s-o înțelegi. După iOS 14.5 (ATT), audiențele de retargeting s-au prăbușit: pool-ul de retargeting iOS adresabil s-a redus la ~25% (cei care au acceptat urmărirea) plus cei care pot fi potriviți prin email/telefon hașuit, via CAPI; audiențele bazate pe ID-uri de dispozitiv au colapsat la rata de potrivire. Practic, pierderea de semnal afectează reach-ul de retargeting cu 20–35%, în funcție de ponderea iOS în baza ta de clienți.',
      },
      {
        type: 'paragraph',
        text: 'Soluția nu e opțională: **Conversions API**. Tracking-ul server-side e acum efectiv obligatoriu pentru orice cont care cheltuie peste ~5.000 $/lună; o rată de potrivire CAPI sub 60% e o „urgență de măsurare” (țintă 70%+). (Vezi [tutorialul dedicat Pixel + CAPI](/articole/cum-instalezi-meta-pixel-si-conversions-api) pentru implementare.) În plus, atenție la atribuire: pe 12 ianuarie 2026, Meta a eliminat din Ads Manager ferestrele de atribuire de 7 zile view și 28 de zile view, iar acuratețea atribuirii s-a deteriorat cu 40–60% de la iOS 14.5.',
      },
      { type: 'heading', text: 'Excluderile: greșeala nr. 1 din retargeting' },
      {
        type: 'paragraph',
        text: 'Cea mai frecventă eroare e să continui să arăți reclame oamenilor care deja au cumpărat, risipești buget, strici percepția de brand și antrenezi algoritmul pe semnal greșit. Reguli ferme: exclude întotdeauna cumpărătorii (180 de zile) din campaniile de retargeting și exclude suprapunerile dintre ferestre (audiența de 4–14 zile o exclude pe cea de 0–3), ca să nu licitezi împotriva ta. Reîmprospătează excluderea cumpărătorilor zilnic, via CAPI.',
      },
      { type: 'heading', text: 'Frecvență și oboseală de reclame' },
      {
        type: 'paragraph',
        text: 'Retargeting-ul prost te urmărește cu aceeași reclamă până devine deranjant. Repere: plafon de frecvență ideal 5–12 afișări per utilizator pe săptămână; doar ~18% găsesc retargeting-ul enervant când frecvența e controlată, dar suprexpunerea (15+ pe săptămână) crește oboseala de reclame cu ~40%. Și variază creativul: o secvență de creative pe etape (reminder → obiecție → dovadă → ofertă) depășește o singură reclamă servită tuturor cu 60–90% pe rata de conversie, iar retargeting-ul cu video convertește cu ~34% mai bine decât cel cu imagini.',
      },
      { type: 'heading', text: 'Capcana ROAS-ului umflat (incrementalitate)' },
      {
        type: 'paragraph',
        text: 'O avertizare pe care un profesionist o face mereu: ROAS-ul spectaculos al retargeting-ului e parțial iluzoriu. Întrebarea corectă: campania ta de retargeting chiar generează conversii, sau doar își ia meritul pentru achiziții care s-ar fi întâmplat oricum? Asta e **incrementalitatea**. În plus, retargeting-ul recoltează ce a semănat partea de sus a pâlniei, dacă pui tot bugetul pe el „pentru că are cel mai bun ROAS”, în câteva săptămâni rămâi fără audiență de retargetat. Privește-l mereu ca pe o piesă din funnel, nu ca pe întreaga strategie, și citește-l prin ROAS-ul pe tot contul.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'De ce e retargeting-ul cea mai profitabilă campanie?',
            answer: 'Pentru că targetează oameni deja aproape de cumpărare. Vizitatorii retargetați au cu ~70% mai multe șanse să convertească, iar ROAS-ul pe coș abandonat depășește de câteva ori prospectarea pe rece.',
          },
          {
            question: 'Cât timp ar trebui să retargetez pe cineva?',
            answer: 'Maximum 7 zile pentru coșul abandonat, zilele 1–3 aduc ~60% din recuperare, iar dincolo de ziua 8 e neglijabil. Pentru vizitatori generali, ferestre de 7/30 de zile, segmentate.',
          },
          {
            question: 'De ce mi s-au micșorat audiențele de retargeting?',
            answer: 'Din cauza pierderii de semnal iOS (ATT), care a redus pool-ul adresabil cu 20–35%. Soluția e Conversions API, cu o rată de potrivire de 70%+.',
          },
          {
            question: 'Care e cea mai mare greșeală în retargeting?',
            answer: 'Să arăți reclame celor care deja au cumpărat. Exclude cumpărătorii (180 de zile) și reîmprospătează excluderea zilnic.',
          },
          {
            question: 'Funcționează cu buget mic?',
            answer: 'Da, retargeting-ul are cel mai mic cost pe rezultat din cont, dar depinde de TOFU/MOFU care îi alimentează audiența.',
          },
        ],
      },
    ],
  },
  {
    slug: 'quality-score-in-google-ads-ce-este-si-cum-il-cresti',
    category: 'Performance Ads',
    title: 'Quality Score în Google Ads: ce este și cum îl crești ca să plătești mai puțin',
    excerpt:
      'Quality Score nu intră direct în licitație — Ad Rank-ul decide. Cele trei componente ale scorului, cum influențează CPC-ul real și cum îl crești fără să vânezi orbește un 10/10.',
    date: '10 IUN 2026',
    readTime: '9 MIN',
    articleNumber: '15',
    coverIcon: 'gauge',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** Quality Score (scorul de calitate) e o notă de la 1 la 10, la nivel de cuvânt cheie, pe care Google o dă în campaniile Search pe baza a trei componente: expected CTR, ad relevance și landing page experience. Crucial, și prost înțeles: **scorul vizibil 1–10 nu intră în licitație.** E un instrument de diagnostic. Ce contează în costul tău real e *Ad Rank-ul*, calculat la momentul licitației din aceleași semnale de calitate. O relevanță mai bună înseamnă poziție mai bună la un CPC mai mic, la unele cuvinte, diferența ajunge la zeci de procente.',
      },
      { type: 'heading', text: 'Ce este Quality Score (definiția oficială)' },
      {
        type: 'paragraph',
        text: 'Conform Google Ads Help: Quality Score nu e un input în licitație, ci un instrument de diagnostic care arată cum afectează experiența utilizatorului reclamele afișate pentru anumite cuvinte cheie. E un scor de la 1 la 10, la nivel de cuvânt cheie, în campaniile Search.',
      },
      {
        type: 'paragraph',
        text: 'Se calculează din trei componente, fiecare evaluată „peste medie / medie / sub medie”: expected CTR (probabilitatea ca reclama să fie clickuită), ad relevance (cât de bine se potrivește reclama cu intenția căutării) și landing page experience (cât de relevantă și utilă e pagina), comparativ cu ceilalți advertiseri care au apărut pentru exact aceeași căutare în ultimele 90 de zile. De reținut și: scorul se bazează pe afișările istorice pentru căutările exacte ale cuvântului tău, deci schimbarea tipului de potrivire nu îl modifică; un „—” înseamnă că nu sunt destule căutări ca să fie calculat.',
      },
      { type: 'heading', text: 'Cele trei componente' },
      {
        type: 'list',
        items: [
          '**Expected CTR** — cât de probabil e să fie clickuită reclama, raportat la competiție. E o estimare relativă, nu CTR-ul tău istoric brut.',
          '**Ad relevance** — potrivirea semantică dintre cuvânt cheie și textul anunțului.',
          '**Landing page experience** — relevanța, utilitatea, viteza și experiența pe mobil a paginii de destinație.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ca pondere, estimările practicienilor (nu cifre oficiale Google) sugerează: Expected CTR ~39%, Landing Page Experience ~39%, Ad Relevance ~22%, iar paginile de destinație sunt zona cea mai sub-investită. Tratează-le ca orientare, nu ca exactitate.',
      },
      { type: 'heading', text: 'Cum se leagă de costul tău: Ad Rank' },
      {
        type: 'paragraph',
        text: 'Aici e miezul. Poziția și costul nu sunt decise de scorul 1–10, ci de **Ad Rank**, calculat la fiecare licitație. Formula simplificată: Ad Rank = licitație (max CPC) × calitatea reclamei (la momentul licitației) + impactul estimat al asset-urilor/extensiilor + context. Asta înseamnă că un advertiser cu QS 8 și licitație de 3 $ poate depăși unul cu QS 4 și licitație de 5 $.',
      },
      {
        type: 'paragraph',
        text: 'Și partea care contează pentru factură: CPC-ul real ≈ (Ad Rank-ul advertiserului de sub tine ÷ calitatea ta) + 0,01 $. Pentru că propria ta calitate e la numitor, un Quality Score mai mare îți reduce prețul la fiecare poziție. Există și un prag de intrare: din 2017, Google impune praguri de Ad Rank pe care reclama trebuie să le depășească indiferent de concurență, de aceea o reclamă cu QS foarte mic poate să nu apară deloc, chiar și pe o căutare fără competiție.',
      },
      { type: 'heading', text: 'Cât economisești, de fapt' },
      {
        type: 'paragraph',
        text: 'Impactul pe CPC e real și asimetric. Repere (estimări de practicieni, direcționale, nu cifre Google): trecerea de la QS 5 la 7 poate reduce CPC-ul cu 28–50%, iar de la 5 la 3 îl crește cu 25–67%; la extreme, un QS de 1–3 poate costa cu până la 400% mai mult pe click decât baza de la QS 5, iar un QS de 10 deblochează până la ~50% reducere.',
      },
      {
        type: 'paragraph',
        text: 'Pus în bani: la 10.000 $/lună, urcarea Quality Score-ului mediu de la 5 la 7 poate însemna economii de 2.800–5.000 $ pe lună la același volum de trafic. Dar atenție la randamentul descrescător: câștigul cel mai mare e în zona de jos-mijloc, de la 5 la 7 contează mult mai mult decât de la 7 la 10.',
      },
      { type: 'heading', text: 'Diagnostic, nu KPI: nuanța pe care Google o subliniază' },
      {
        type: 'paragraph',
        text: 'Aici se vede profesionistul. Scorul 1–10 pe care îl vezi e o fotografie întârziată: la fiecare căutare, Google recalculează cele trei componente la momentul licitației, alături de alți factori, pentru a determina Ad Rank-ul, iar Quality Score-ul vizibil nu e plugat direct în acea formulă. Consecințe practice:',
      },
      {
        type: 'list',
        items: [
          '**Nu reacționa la fluctuații.** Scorul e un sumar periodic, întârziat cu zile sau săptămâni, poți modifica reclama azi și să vezi schimbarea peste zile. Un drop peste noapte de la 6 la 5 nu cere rescrierea tuturor anunțurilor.',
          '**Nu vâna 10/10.** Quality Score nu e un proxy fiabil pentru sănătatea contului, există conturi cu QS mediu 7 structural rupte și conturi cu QS 5 care aduc randamente excelente.',
          '**Folosește-l selectiv.** Sortează cuvintele după scor × afișări, găsește-le pe cele cu cheltuială mare și scor sub 7, și repară componenta marcată „sub medie”, acolo e impactul.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Tot Google clarifică ce NU afectează calitatea: suma licitată îți poate afecta Ad Rank-ul, dar nu evaluarea calității; conversiile raportate nu influențează calitatea; mutarea unui ad group în alt cont nu o schimbă (decât dacă pui text de anunț nou).',
      },
      { type: 'heading', text: 'Quality Score în era automatizării' },
      {
        type: 'paragraph',
        text: 'Întrebarea frecventă: mai contează cu Smart Bidding și Performance Max? Da. Smart Bidding (Target CPA, Target ROAS) operează tot în interiorul licitației, unde Ad Rank-ul e influențat de calitate, un Quality Score mai mare îi permite algoritmului să obțină aceleași rezultate cu licitații mai mici. Iar pentru PMax: nu afișează Quality Score la nivel de cuvânt cheie (nu folosește targetare pe cuvinte), dar aceleași semnale de calitate, creative, landing page, relevanță, îi influențează livrarea și costul. (Pentru anunțurile responsive, „Ad Strength” e o metrică separată, care nu intră în Quality Score, dar afectează selecția asset-urilor.)',
      },
      { type: 'heading', text: 'Cum îl crești, concret' },
      {
        type: 'list',
        items: [
          '**Expected CTR:** grupează cuvintele pe teme strânse, cu anunțuri dedicate; include cuvântul cheie în titlu; testează variante și păstrează-le pe cele cu CTR bun.',
          '**Ad relevance:** un ad group = o temă; potrivire semantică între cuvânt, anunț și ofertă; folosește cuvinte negative ca să elimini căutările irelevante.',
          '**Landing page experience:** pagina continuă promisiunea din anunț (nu trimite pe homepage); viteză de încărcare, funcționare pe mobil, claritate și transparență.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Quality Score intră în licitație?',
            answer: 'Nu. Google e explicit: e un instrument de diagnostic. În licitație contează Ad Rank-ul, calculat în timp real din aceleași trei componente plus alți factori.',
          },
          {
            question: 'Ce Quality Score e bun?',
            answer: 'Media conturilor e ~5–6; un 7 te pune înaintea majorității. Nu urmări 10 pe toate cuvintele, randamentul scade brusc peste 7.',
          },
          {
            question: 'Cum reduce Quality Score-ul costul?',
            answer: 'Pentru că propria ta calitate e la numitorul formulei de CPC: o calitate mai bună înseamnă poziție mai bună la un cost pe click mai mic, fără să crești licitația.',
          },
          {
            question: 'Mai contează cu Smart Bidding și Performance Max?',
            answer: 'Da. Semnalele de calitate rămân în Ad Rank. PMax nu arată un scor numeric, dar calitatea creativelor și a paginii tot îi influențează costul.',
          },
          {
            question: 'De ce mi-a scăzut Quality Score-ul peste noapte?',
            answer: 'Probabil nu s-a întâmplat „peste noapte”, scorul e un sumar întârziat. Nu rescrie tot; verifică ce componentă e „sub medie” și dacă e o problemă reală de relevanță.',
          },
        ],
      },
    ],
  },
  {
    slug: 'cum-construiesti-un-calendar-editorial-pentru-social-media-in-2026',
    category: 'Social Media',
    title: 'Cum construiești un calendar editorial pentru social media în 2026',
    excerpt:
      'Un calendar editorial nu e un tabel de bifat, e sistemul prin care antrenezi algoritmul. Opt pași, de la alegerea nișei la măsurarea semnalelor corecte, nu a like-urilor.',
    date: '07 IUN 2026',
    readTime: '9 MIN',
    articleNumber: '04',
    coverIcon: 'calendar',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** un calendar editorial nu e un tabel de bifat, ci sistemul prin care antrenezi algoritmul. În 2026, platformele rulează pe *interest graph* (distribuie după ce conține postarea, nu după câți te urmăresc), penalizează inconsecvența și salturile între nișe și răsplătesc semnale precum trimiterile în privat (DM), salvările și watch time-ul. Calendarul corect planifică, deci, patru lucruri: o nișă stabilă, cuvinte-cheie (social SEO), formate proiectate pentru aceste semnale și o cadență pe care o poți susține.',
      },
      { type: 'heading', text: 'De ce un calendar editorial nu mai e opțional' },
      {
        type: 'paragraph',
        text: 'Toate platformele majore au trecut de la *follow graph* la *interest graph*: urmăritorii nu mai garantează reach, conținutul însuși trebuie să-și câștige distribuția. Două consecințe concrete:',
      },
      {
        type: 'list',
        items: [
          '**Consecvența e un semnal de ranking, nu o vorbă.** Datele Buffer pe 2026 arată că conturile care tac chiar și o singură săptămână suferă o penalizare de creștere măsurabilă, iar postarea constantă bate net încercările sporadice de viral.',
          '**Primele 60 de minute sunt diagnostice.** Viteza de engagement din prima oră antrenează stratul inițial de distribuție și decide dacă postarea ajunge la audiența de nivel doi.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Un calendar rezolvă trei probleme simultan: îți garantează regularitatea (premiată de algoritmi), îți echilibrează tipurile de conținut și mută timpul de la panică spre producție.',
      },
      { type: 'heading', text: 'Pasul 1: Alege o nișă și nu sări din ea' },
      {
        type: 'paragraph',
        text: 'Înainte de orice, fixează tema. În 2026, dispersia tematică e penalizată direct: o analiză a algoritmului TikTok a evidențiat o penalizare de reach de până la −45% pentru conturile care sar între peste trei subiecte fără legătură. Motivul: conținutul e „înțeles” prin modele care deduc subiectul din material, nu prin etichete, așa că, în 2026, consecvența pe nișă contează mai mult decât hashtag-urile. Calendarul tău trebuie să țină brandul ancorat într-un teritoriu clar.',
      },
      { type: 'heading', text: 'Pasul 2: Definește rubricile (content pillars)' },
      { type: 'paragraph', text: 'Rubricile sunt categorii recurente care acoperă rolurile brandului. Un set sănătos:' },
      {
        type: 'list',
        items: [
          '**Educațional** — poziționează brandul ca expert.',
          '**Social proof** — testimoniale, rezultate, studii de caz.',
          '**Behind the scenes** — oameni, proces, cultură (umanizează).',
          '**Produs/ofertă** — ce vinzi și de ce.',
          '**Engagement** — întrebări, sondaje, conținut care provoacă reacții.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Regula de echilibru: conținutul de vânzare ≤ 20–30% din total. Restul construiește relația care face vânzarea posibilă. Toate rubricile rămân însă în interiorul nișei de la Pasul 1.',
      },
      { type: 'heading', text: 'Pasul 3: Planifică cuvinte-cheie, nu doar teme (social SEO)' },
      {
        type: 'paragraph',
        text: 'Schimbarea de fond a ultimilor ani: rețelele au devenit motoare de căutare. 40% dintre cei din generația Z preferă TikTok în locul Google pentru căutări. Asta înseamnă că fiecare postare ar trebui optimizată pentru ce caută publicul: cuvintele-cheie contează în audio, în textul de pe ecran, în caption, titlu și descriere, alături de semnalele de engagement. Practic, la fiecare idee din calendar adaugi o coloană „cuvânt-cheie țintă”, fraza pe care un utilizator ar tasta-o ca să-ți găsească acel conținut, și o folosești rostit în video, scris pe ecran și în caption.',
      },
      { type: 'heading', text: 'Pasul 4: Proiectează formate pentru semnalele care distribuie' },
      {
        type: 'paragraph',
        text: 'Nu toate interacțiunile cântăresc la fel. În 2026, like-urile au fost retrogradate, iar distribuția vine din semnale „adânci”:',
      },
      {
        type: 'list',
        items: [
          '**Instagram** — cele patru semnale de ranking confirmate de Adam Mosseri (actualizarea din aprilie 2026) sunt: trimiterile în DM, salvările, watch time-ul și click-urile pe profil. Pentru Reels, trimiterea în privat (send) e cel mai puternic semnal de engagement — peste like-uri și comentarii, iar rata de vizionare până la final și reluările au devenit semnalele dominante pentru distribuția Reels.',
          '**TikTok** — watch time-ul și rata de finalizare sunt factorul principal (~40–50% din pondere), iar share-urile și salvările cântăresc mai mult decât like-urile.',
          'Concluzie pentru calendar: la fiecare postare, întreabă-te „de ce ar trimite cineva asta unui prieten?” (send), „de ce ar salva-o?” (save) și „ce o face de privit până la capăt?” (watch time). Conținutul „de salvat” (ghiduri, carusele utile) și cel „de trimis” (relatabil, util pentru altcineva) trebuie să aibă rubrici dedicate.',
        ],
      },
      { type: 'heading', text: 'Pasul 5: Stabilește o frecvență sustenabilă' },
      {
        type: 'paragraph',
        text: 'Mai bine 3 postări pe săptămână constant un an, decât zilnic o lună și apoi tăcere (vezi penalizarea pentru inconsecvență de mai sus). Pentru majoritatea brandurilor mici și medii, 3–5 postări de feed pe săptămână plus story-uri e un ritm eficient și susținut. Cadența optimă diferă per platformă, detaliile sunt în [articolul dedicat despre câte postări pe săptămână îți trebuie](/articole/cate-postari-pe-saptamana-ai-nevoie-pe-instagram-tiktok-si-facebook).',
      },
      { type: 'heading', text: 'Pasul 6: Construiește structura lunară' },
      {
        type: 'paragraph',
        text: 'Distribuie rubricile pe zile ca să ai un mix echilibrat, variind formatul ca să nu devină monoton. Un tipar săptămânal cu 4 postări:',
      },
      {
        type: 'table',
        headers: ['Zi', 'Rubrică', 'Format', 'Semnal vizat'],
        rows: [
          ['Luni', 'Educațional', 'Carusel', 'Save'],
          ['Miercuri', 'Social proof', 'Reel', 'Watch time'],
          ['Vineri', 'Behind the scenes', 'Reel/Story', 'Send (DM)'],
          ['Duminică', 'Engagement', 'Imagine/întrebare', 'Comentarii'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Repeți tiparul, dar schimbi subiectele (toate în nișă) și optimizezi fiecare pentru cuvântul-cheie și semnalul-țintă.',
      },
      { type: 'heading', text: 'Câmpurile calendarului tău' },
      {
        type: 'table',
        headers: ['Câmp', 'De ce contează'],
        rows: [
          ['Data și ora', 'Programare consecventă (antrenează algoritmul)'],
          ['Platforma', 'Conținut nativ per platformă (vezi Pasul 7)'],
          ['Rubrica', 'Echilibrul tipurilor de conținut'],
          ['Formatul', 'Reel / carusel / story / imagine'],
          ['Cuvânt-cheie țintă', 'Social SEO — fraza căutabilă'],
          ['Semnalul vizat', 'Send / save / watch time / comentariu'],
          ['Cârligul (primele 3 sec.)', 'Decide retenția și deci distribuția'],
          ['Caption + cuvinte-cheie', 'Pentru search și context'],
          ['Status', 'Idee / în lucru / aprobat / publicat'],
        ],
      },
      { type: 'heading', text: 'Pasul 7: Produ în baterie și nativ per platformă' },
      {
        type: 'paragraph',
        text: 'Sursa reală de consecvență nu e voința de luni dimineața, ci **producția în baterie** (batching): filmezi conținut pentru 2–4 săptămâni într-o singură sesiune. Atenție însă la distribuție: conținutul nativ, per platformă, bate cross-postarea, watermark-urile vizibile, formatul greșit și hook-urile nepotrivite declanșează penalizări de distribuție. Reels-urile încărcate cu watermark de TikTok sunt suprimate la reach aproape zero în afara urmăritorilor existenți. Deci: produci o dată, dar adaptezi pentru fiecare platformă.',
      },
      { type: 'heading', text: 'Pasul 8: Măsoară semnalele corecte, nu like-urile' },
      {
        type: 'paragraph',
        text: 'La final de lună, nu te uita la like-uri (retrogradate ca semnal). Urmărește **salvări, trimiteri (sends), rata de vizionare/finalizare și click-urile pe profil**, semnalele care chiar determină reach-ul. Rebalansează rubricile și formatele în funcție de ce a generat aceste semnale. Calendarul nu e un document făcut o dată; e un sistem care se îmbunătățește lunar pe baza datelor reale.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'De câte ori pe săptămână ar trebui să postez?',
            answer: 'Pentru majoritatea brandurilor, 3–5 postări de feed pe săptămână, constant, plus story-uri. Consecvența contează mai mult decât volumul, fiindcă inconsecvența e penalizată.',
          },
          {
            question: 'Mai contează hashtag-urile în 2026?',
            answer: 'Mai puțin decât consecvența pe nișă și cuvintele-cheie din audio, text pe ecran și caption. Algoritmul deduce subiectul din conținut, nu din etichete.',
          },
          {
            question: 'Pot posta același conținut pe toate platformele?',
            answer: 'Poți reutiliza ideea, dar adaptează nativ fiecare versiune. Conținutul cross-postat cu watermark de pe altă platformă e suprimat.',
          },
          {
            question: 'Ce semnal contează cel mai mult pentru Reels?',
            answer: 'Trimiterea în privat (send) și rata de vizionare până la final, peste like-uri și comentarii.',
          },
        ],
      },
    ],
  },
  {
    slug: 'cate-postari-pe-saptamana-ai-nevoie-pe-instagram-tiktok-si-facebook',
    category: 'Social Media',
    title: 'Câte postări pe săptămână ai nevoie pe Instagram, TikTok și Facebook',
    excerpt:
      'Nu există un număr magic, dar datele 2026 dau repere clare pe fiecare platformă. Regula transversală: consecvența bate volumul, fiindcă cele mai mari câștiguri vin din trecerea de la „rar” la „regulat”.',
    date: '04 IUN 2026',
    readTime: '8 MIN',
    articleNumber: '05',
    coverIcon: 'bars',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** nu există un număr magic, dar datele 2026 dau repere clare. Pentru majoritatea brandurilor: **Instagram 3–5 postări de feed/săptămână** (plus story-uri), **TikTok 3–5/săptămână ca minim** (zilnic pentru creștere agresivă, dacă ții calitatea), **Facebook 3–5/săptămână** (organic slab, folosește-l mai mult cu buget plătit), **LinkedIn 3–5/săptămână în zilele lucrătoare**. Regula transversală: consecvența bate volumul, fiindcă cele mai mari câștiguri vin din trecerea de la „rar” la „regulat”.',
      },
      {
        type: 'table',
        headers: ['Platformă', 'Cadență recomandată', 'Observație'],
        rows: [
          ['Instagram', '3–5 postări feed/săpt. + story-uri', 'Reels pentru reach, carusele pentru engagement'],
          ['TikTok', '3–5/săpt. minim; zilnic pentru creștere agresivă', 'Volumul ajută, dar contează și pragul de calitate'],
          ['Facebook', '3–5/săpt.', 'Reach organic foarte mic; mizează pe paid + grupuri'],
          ['LinkedIn', '3–5/săpt., în zilele lucrătoare', 'Cel mai bine marți–joi; miercuri în top'],
        ],
      },
      { type: 'heading', text: 'Cum gândești frecvența (înainte de cifre)' },
      { type: 'paragraph', text: 'Trei principii care contextualizează orice număr:' },
      {
        type: 'list',
        items: [
          '**Randament descrescător.** Datele Buffer arată că saltul cel mai valoros e de la o postare pe săptămână la 3–5; peste acest prag, fiecare postare în plus aduce un câștig tot mai mic. Adică nu „mai mult = proporțional mai bine”.',
          '**Primele 30–60 de minute decid.** Algoritmii arată postarea unui grup mic întâi; dacă acel grup interacționează rapid, postarea e împinsă mai departe, de aceea postarea când publicul tău e activ contează mai mult decât ora „perfectă” în abstract.',
          '**Calitatea contului e acum un factor.** Volumul nu mai e gratuit: pe TikTok, algoritmul 2026 ține cont de calitatea generală a contului, iar videoclipurile slabe în mod constant pot suprima distribuția viitoare. Postatul des cu conținut slab te trage în jos.',
        ],
      },
      { type: 'heading', text: 'Instagram: 3–5 postări de feed pe săptămână' },
      {
        type: 'paragraph',
        text: 'Cifra optimă e bine documentată: datele Buffer din 2026 (pe 9,6 milioane de postări) arată că 3–5 postări pe săptămână corelează cu cel mai mare reach per postare, iar majoritatea brandurilor postează 3–6 ori pe săptămână pe Instagram, după datele Rival IQ. Adaugă story-uri zilnice pentru a menține relația cu audiența existentă (story-urile nu afectează algoritmul de feed, dar țin contul „cald”).',
      },
      {
        type: 'paragraph',
        text: 'Pe formate, o nuanță contraintuitivă: analiza Buffer pe peste 52 de milioane de postări arată că, pe Instagram, caruselele generează cu 109% mai mult engagement decât Reels. Reels rămân motorul de reach către oameni noi, dar caruselele sunt excelente pentru conținut educațional „de salvat”. Combină-le.',
      },
      { type: 'heading', text: 'TikTok: 3–5 pe săptămână minim, zilnic pentru creștere agresivă' },
      {
        type: 'paragraph',
        text: 'TikTok răsplătește volumul mai mult decât orice altă platformă, pentru că fiecare clip e un „bilet de loterie” independent. Datele o confirmă: analiza Buffer pe 11 milioane de postări arată că la 2–5 postări pe săptămână câștigi până la 17% mai multe vizualizări per clip, iar la 11+ pe săptămână până la 34%; conturile care postează zilnic cresc numărul de urmăritori de 3,5 ori mai repede decât cele cu 2–3 postări săptămânal.',
      },
      {
        type: 'paragraph',
        text: 'Dar volumul are o limită practică: producția trebuie să rămână peste pragul de calitate (vezi mai sus). De aceea reperul realist e 2–5 postări pe săptămână ca punct de echilibru între lift și calitate/burnout, iar zilnic devine recomandabil doar dacă ai un sistem de producție care susține ritmul fără să scadă calitatea. Vestea bună: pe TikTok, producția poate fi rapidă și neperfectă, autenticitatea bate șlefuiala.',
      },
      { type: 'heading', text: 'Facebook: 3–5 pe săptămână, dar cu așteptări realiste' },
      {
        type: 'paragraph',
        text: 'Pe Facebook, reach-ul organic e la minime istorice. Engagement-ul organic e între 0,02% și 0,23% în majoritatea industriilor (date Rival IQ), iar reach-ul organic ajunge la cel mult ~2–5% din urmăritorii existenți. Concluzia onestă: a aștepta rezultate semnificative din organic pe Facebook în 2026 e nerealist. 3–5 postări pe săptămână sunt suficiente pentru a menține o prezență, dar Facebook strălucește azi ca platformă de **distribuție plătită** și pentru **grupuri/comunități**, nu pentru reach organic din pagină.',
      },
      { type: 'heading', text: 'LinkedIn: 3–5 pe săptămână, în zilele lucrătoare' },
      {
        type: 'paragraph',
        text: 'Pentru B2B și brand personal, reperul e 3–5 postări pe săptămână, concentrate în timpul săptămânii. Marți–joi e cea mai puternică fereastră, miercuri fiind cea mai constantă zi; weekendurile sunt semnificativ mai slabe, iar 70% dintre utilizatori interacționează săptămânal, dar aproape exclusiv în zilele lucrătoare. Avantaj: o postare bună are o „viață” de distribuție de aproximativ 24–48 de ore, mai lungă decât pe celelalte rețele. Și aici caruselele („documentele”) performează puternic: pe LinkedIn, caruselele ating ~21,8% engagement, de circa 3 ori mai mult decât video.',
      },
      { type: 'heading', text: 'Principiul care contează mai mult decât numărul' },
      {
        type: 'paragraph',
        text: 'Consecvența bate frecvența. Algoritmii premiază brandurile pe care se pot baza că publică regulat: 3 postări pe săptămână, fiecare săptămână, timp de un an, bat 7 pe săptămână ținute două luni și apoi abandonate. Cel mai mare câștig nu vine din a urca de la 5 la 10 postări, ci din a trece de la haotic la regulat. Alege frecvența pe care o poți susține fără să scazi calitatea, și crește ritmul abia când ai un sistem solid.',
      },
      { type: 'heading', text: 'Calitate vs. cantitate: sistemul care îți dă ambele' },
      { type: 'paragraph', text: 'Falsa dilemă „des sau bine” se rezolvă cu un flux de producție, nu cu efort de moment:' },
      {
        type: 'list',
        items: [
          '**Producție în baterie (batching):** filmezi/produci conținut pentru 2–4 săptămâni într-o singură sesiune.',
          '**Șabloane reutilizabile** pentru grafică și carusele, ca să scazi timpul per postare.',
          '**Reutilizare (repurposing):** o singură piesă-sursă alimentează mai multe platforme. Un video lung de YouTube poate deveni 5–8 Shorts, 3–4 TikTok-uri și peste 10 Reels, fiecare adaptat nativ. Atenție: adaptezi pentru fiecare platformă, nu cross-postezi identic (conținutul cu watermark de pe altă platformă e penalizat la reach).',
        ],
      },
      { type: 'paragraph', text: 'Sistemul, nu inspirația de luni dimineața, e cel care îți dă și volum, și calitate.' },
      {
        type: 'faq',
        items: [
          {
            question: 'De câte ori pe zi ar trebui să postez pe TikTok?',
            answer:
              'Nu e nevoie zilnic ca să crești, dar zilnic accelerează creșterea numărului de urmăritori (de ~3,5 ori mai repede vs. 2–3/săptămână). Reperul sustenabil pentru majoritatea brandurilor e 3–5/săptămână, cu condiția să menții calitatea.',
          },
          {
            question: 'De ce nu mai funcționează Facebook organic?',
            answer: 'Reach-ul organic din pagină a scăzut la 2–5% din urmăritori. Facebook rămâne eficient prin reclame plătite și grupuri, nu prin postări organice de pagină.',
          },
          {
            question: 'Reels sau carusele pe Instagram?',
            answer: 'Ambele. Reels aduc oameni noi (reach), caruselele generează mai mult engagement și salvări. Un mix bate orice format folosit exclusiv.',
          },
          {
            question: 'Care e cea mai bună zi pentru LinkedIn?',
            answer: 'Marți–joi, cu miercurea în top. Evită weekendurile.',
          },
          {
            question: 'E mai bine să postez mult sau constant?',
            answer: 'Constant. Cel mai mare câștig vine din trecerea de la postat rar la postat regulat, nu din volum mare ținut sporadic.',
          },
        ],
      },
    ],
  },
  {
    slug: 'cum-cresti-organic-pe-tiktok-in-2026-ce-premiaza-algoritmul',
    category: 'Social Media',
    title: 'Cum crești organic pe TikTok în 2026: ce premiază cu adevărat algoritmul',
    excerpt:
      'TikTok distribuie după ce conține videoul, nu după câți te urmăresc. Watch time, engagement „adânc” și TikTok SEO — semnalele care decid descoperirea în 2026.',
    date: '01 IUN 2026',
    readTime: '9 MIN',
    articleNumber: '16',
    coverIcon: 'play-growth',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** TikTok distribuie după ce conține videoul, nu după câți te urmăresc, un cont cu zero followeri poate face milioane de vizualizări. În 2026, semnalul nr. 1 e watch time-ul/completion rate (bara pentru viral a urcat la ~70%), engagement-ul „adânc” (shares, saves, rewatches, comentarii substanțiale) bate like-urile, iar consecvența pe nișă și optimizarea pentru căutare (TikTok SEO) decid descoperirea. Volumul ajută, dar conținutul slab postat des te trage în jos.',
      },
      { type: 'heading', text: 'Cum decide algoritmul ce promovează' },
      {
        type: 'paragraph',
        text: 'TikTok rulează pe **interest graph**, nu pe social graph: recomandă conținut pe baza a ce vei urmări, nu a cui urmărești, de aceea un creator cu zero followeri poate ajunge la 10 milioane de vizualizări. Mecanica e un test-and-expand: fiecare video e arătat întâi unei audiențe mici de test; dacă acei oameni privesc și interacționează, e împins la mai mulți, în runde succesive, primii spectatori contează mai mult decât numărul total de urmăritori. O schimbare de reținut în 2026: videoclipurile sunt acum testate întâi cu propriii urmăritori, înainte de a ajunge la non-urmăritori.',
      },
      { type: 'heading', text: 'Semnalul nr. 1: watch time și completion rate' },
      {
        type: 'paragraph',
        text: 'Atenția e moneda. Watch time-ul și rata de finalizare sunt factorul principal (~40–50% din ponderea algoritmului), iar bara de finalizare pentru distribuție virală a urcat la ~70%, de la ~50% în 2024. Detalii operaționale:',
      },
      {
        type: 'list',
        items: [
          '**Primele secunde decid.** Primele 3–5 secunde sunt ponderate disproporționat; dacă audiența abandonează în primele 3 secunde, restul watch time-ului aproape nu mai contează.',
          '**Ținte de retenție.** Vizează un APV (procentul mediu vizionat) de ≥50% pentru short-form și ≥40% pentru video peste 60s; sub 30% APV, videoul rar scapă de distribuția pe graful de urmăritori.',
          '**Durata vs. completare.** Watch time-ul per afișare e ponderat mai mult decât numărul total de vizualizări, un video de 60s privit 80% se distribuie mai larg decât unul de 15s privit 95%.',
          '**Reluările.** Rata de rewatch/loop a ajuns să conteze mai mult decât numărul de urmăritori, conținutul „de revăzut” (dens vizual, cu un payoff) e un semnal puternic de viral.',
        ],
      },
      { type: 'heading', text: 'Engagement „adânc” bate like-urile' },
      {
        type: 'paragraph',
        text: 'Like-ul pasiv a fost retrogradat. Share-urile și salvările cântăresc acum mult peste like-uri, iar diferența merge mai fin: trimiterile în privat (DM-share) sunt ponderate mai mult decât share-urile publice, fiindcă indică o recomandare reală, iar comentariile substanțiale (de tip „exact asta mi s-a întâmplat și mie când…”) sunt un semnal mult mai puternic decât un emoji. În plus, pentru conturile cu TikTok Shop, semnalele de commerce, apăsările pe linkul de produs, salvările de produse, influențează acum distribuția pe For You Page. Întrebările-cheie la fiecare video: „de ce ar trimite cineva asta unui prieten?”, „de ce ar salva-o?”, „de ce ar privi-o până la capăt?”.',
      },
      { type: 'heading', text: 'Consecvența pe nișă (și de ce contează transcriptul)' },
      {
        type: 'paragraph',
        text: 'Dispersarea tematică e penalizată. Algoritmul 2026 prioritizează conținutul aliniat cu o comunitate, relevanța pe nișă contează mai mult decât reach-ul larg. Un detaliu tehnic sub-folosit: din mijlocul lui 2025, transcriptul auto-generat din audio e un input de ranking, TikTok îl compară cu captionul, hashtag-urile și subiectul dedus, iar nepotrivirile (un video de modă etichetat cu hashtag-uri de mâncare) sunt retrogradate. Concluzie: ține brandul ancorat într-un teritoriu clar, iar audio/text/caption trebuie să spună aceeași poveste.',
      },
      { type: 'heading', text: 'TikTok = motor de căutare (TikTok SEO)' },
      {
        type: 'paragraph',
        text: 'Schimbarea strategică majoră: TikTok a devenit un motor de căutare, mai ales pentru utilizatorii tineri, care caută tutoriale, recenzii și recomandări direct în aplicație, ca pe Google. Implicație: optimizează fiecare video pentru căutare. Cuvintele-cheie contează în caption, în vocea din video (transcrisă) și în textul de pe ecran, folosește limbaj natural, exact ce ar tasta publicul. Verifică sursa de trafic în analytics: dacă „Search” crește, titlurile, captionul și cuvintele rostite se potrivesc cu intenția de căutare, un semnal valoros pentru creștere evergreen.',
      },
      { type: 'heading', text: 'Hashtag-urile în 2026' },
      {
        type: 'paragraph',
        text: 'Și-au pierdut rolul central. Hashtag-urile rămân utile pentru a categoriza conținutul, dar captionul, vocea și textul de pe ecran optimizate cu cuvinte-cheie cântăresc acum la fel de mult sau mai mult; nu te baza pe hashtag-uri singure. Folosește un amestec mic: unul-două de comunitate (ex. #BookTok) plus câteva de nișă.',
      },
      { type: 'heading', text: 'Cât de des să postezi' },
      {
        type: 'paragraph',
        text: 'Reperul: 3–5 postări pe săptămână, la ore consecvente. Dar atenție la calitate: consecvența contează mai mult decât volumul, iar postatul de conținut slab doar ca să bifezi o cotă poate dăuna performanței. Vestea bună pentru conturile mici: nano și micro-creatorii depășesc constant conturile mari pe engagement per urmăritor, fiindcă TikTok prioritizează relevanța, nu mărimea contului.',
      },
      { type: 'heading', text: 'Ce să măsori (și ce să ignori)' },
      {
        type: 'paragraph',
        text: 'Nu te uita la like-uri și followeri (semnale de suprafață, slab predictive). Modelul „Signal Stack” pune view-urile, like-urile și followerii în Tier 1 (cele mai puțin predictive, nu optimiza pentru ele), iar completion rate, rewatch rate și average watch time în Tier 2, semnalele pe care For You Page le ponderează cel mai mult. Practic, urmărește trei numere per video: hold rate-ul la 2 secunde (retenția timpurie, îți spune dacă „ambalajul” funcționează), average watch time (dacă structura ține) și completion rate (dacă finalul merită). Plus diagnosticul pe sursa de trafic: dacă „For You” e mic și „Following” mare, conținutul nu e categorizat clar sau pică testul inițial.',
      },
      { type: 'heading', text: 'Mindset: algoritmul ca sistem de feedback' },
      {
        type: 'paragraph',
        text: 'Schimbarea de mentalitate din 2026: conturile de succes nu mai încearcă să „păcălească” algoritmul, ci îl tratează ca pe un sistem de feedback, citesc semnalele despre ce place, ce e ignorat și ce e sărit, și judecă pe performanța colectivă, nu pe un singur video. Procesul repetabil: produce → testează → taie → scalează. Dacă completarea se prăbușește după 3 secunde pe un concept, repari hook-ul, nu refilmezi același scenariu.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Contează numărul de urmăritori pentru reach?',
            answer: 'Nu pentru distribuție. TikTok rankează după semnale de engagement (rewatches, completare, share-uri). Un cont mic poate ajunge la audiențe mari dacă videoul performează.',
          },
          {
            question: 'Care e cel mai important semnal?',
            answer: 'Watch time-ul și rata de finalizare (~40–50% din pondere), urmate de rewatches, share-uri (mai ales DM) și salvări. Like-urile sunt slabe.',
          },
          {
            question: 'Mai contează hashtag-urile?',
            answer: 'Mai puțin decât consecvența pe nișă și cuvintele-cheie din audio, text pe ecran și caption. Algoritmul deduce subiectul din conținut și transcript, nu din etichete.',
          },
          {
            question: 'De câte ori pe săptămână să postez?',
            answer: '3–5 ori, consecvent. Consecvența și calitatea bat volumul; conținutul slab postat des dăunează.',
          },
          {
            question: 'Cum folosesc TikTok ca motor de căutare?',
            answer: 'Pune cuvintele pe care le-ar tasta publicul în caption, rostește-le în video (sunt transcrise) și scrie-le pe ecran. Urmărește creșterea sursei „Search” în analytics.',
          },
        ],
      },
    ],
  },
  {
    slug: 'community-management-cum-raspunzi-la-comentarii-dm-uri-si-review-uri-negative',
    category: 'Social Media',
    title: 'Community management: cum răspunzi la comentarii, DM-uri și review-uri negative',
    excerpt:
      '73% dintre utilizatori cumpără de la un concurent dacă un brand nu le răspunde pe social. Viteza, recunoașterea publică a problemei și când folosești AI vs. oameni.',
    date: '29 MAI 2026',
    readTime: '8 MIN',
    articleNumber: '17',
    coverIcon: 'chat',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** community management-ul nu e curtoazie, e managementul reputației în public. E singurul canal de relații cu clienții unde **răspunsul tău, sau tăcerea ta, rămâne vizibil** pentru orice viitor client care îți caută numele. Cifra care decide: 73% dintre utilizatori cumpără de la un concurent dacă un brand nu le răspunde pe social. Regulile câștigătoare: viteză (mulți așteaptă răspuns în sub o oră), recunoașterea publică a problemei înainte de a muta discuția în privat, și AI pentru viteză, oameni pentru situațiile delicate.',
      },
      { type: 'heading', text: 'De ce community management-ul e diferit de orice alt suport' },
      {
        type: 'paragraph',
        text: 'Pe social, fiecare interacțiune e publică. E singurul canal unde răspunsul sau tăcerea ta sunt un registru public, un comentariu nu dispare când agentul răspunde; rămâne, alături de replica ta, ca o dovadă permanentă a felului în care brandul îți tratează oamenii. Și e citit de mult mai mulți decât cel care a scris: 93% dintre consumatori spun că recenziile și comentariile publice le influențează deciziile de cumpărare. Practic, gestionarea comunității e marketing pentru toți cei care privesc, nu doar serviciu pentru cel care întreabă.',
      },
      { type: 'heading', text: 'Cifra care justifică totul: tăcerea = pierdere' },
      { type: 'paragraph', text: 'Costul ignorării e direct și măsurabil:' },
      {
        type: 'list',
        items: [
          '73% dintre utilizatorii de social media spun că vor cumpăra de la un concurent dacă un brand nu le răspunde (Sprout Social).',
          'Dacă un brand nu adresează comentariile lăsate pe social, rata de churn crește cu ~15%.',
          '88% dintre clienți spun că sunt mai puțin dispuși să cumpere de la un brand care lasă reclamațiile de pe social fără răspuns (JD Power), în condițiile în care 79% dintre reclamațiile online rămân fără răspuns.',
          'Și partea invizibilă: 56% dintre clienții nemulțumiți nu se plâng deloc, pur și simplu trec la concurență (Zendesk). Churn-ul tăcut e cel mai scump, fiindcă nu primești niciun feedback despre motiv.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Reversul e la fel de puternic: răspunsul la reclamații pe social poate crește advocacy-ul (recomandarea brandului) cu până la 25%, iar 51% dintre consumatori spun că brandurile care răspund public sunt mai memorabile și mai demne de încredere. Bonus economic: o interacțiune de suport pe social costă aproximativ 1 $, față de peste 6 $ pentru un apel telefonic.',
      },
      { type: 'heading', text: 'Regula vitezei: primele minute contează' },
      { type: 'paragraph', text: 'Așteptările s-au comprimat dramatic:' },
      {
        type: 'list',
        items: [
          '76% așteaptă un răspuns în 24 de ore (Sprout Social); pe X, 53% așteaptă răspuns într-o oră, urcând la 72% pentru reclamații (Lithium).',
          '40% așteaptă un răspuns pe social într-o oră, iar 37% în 30 de minute, iar aceste așteptări nu se ajustează pentru program, fus orar sau weekend.',
          '90% consideră importantă o reacție „imediată”, iar 60% definesc „imediat” ca 10 minute sau mai puțin (HubSpot).',
        ],
      },
      {
        type: 'paragraph',
        text: 'Realitatea e mult sub aceste așteptări: brandul mediu răspunde în 4–5 ore, față de o așteptare sub o oră, iar doar 37% dintre companii își ating țintele de timp de răspuns, un decalaj de 63%. Acolo se câștigă sau se pierde. (În plus, răspunsurile rapide din prima oră după publicare cresc și engagement-ul postării, comentariile sunt un semnal de ranking, deci conversația din comentarii e și distribuție gratuită.)',
      },
      { type: 'heading', text: 'Cum răspunzi la comentariile pozitive' },
      {
        type: 'paragraph',
        text: 'Nu te limita la un emoji sau la „Mulțumim!”. Răspunsurile care continuă conversația, o întrebare, o observație, o glumă în tonul brandului, generează mai multe comentarii și fac comunitatea să se simtă văzută. Fiecare răspuns e o ocazie să arăți personalitatea brandului și să transformi un client mulțumit într-un susținător.',
      },
      { type: 'heading', text: 'Cum gestionezi un comentariu negativ sau un review prost' },
      { type: 'paragraph', text: 'Aici se vede maturitatea, și aici e cel mai mare câștig de încredere (advocacy +25%). Pașii:' },
      {
        type: 'list',
        ordered: true,
        items: [
          '**Răspunde rapid și calm**, niciodată defensiv sau în ceartă.',
          '**Recunoaște public problema înainte de a muta în privat.** E greșeala nr. 2 din social: a răspunde cu „te rugăm să ne dai în DM numărul comenzii” fără a recunoaște întâi ce a pățit clientul citește ca disprețuitor și e des taxat ca atare. Întâi empatie publică, apoi mutarea în privat.',
          '**Asumă-ți partea ta și oferă o soluție concretă**, fără scuze inutile.',
          '**Mută detaliile în privat** (DM/telefon), dar lasă în public dovada că ai reacționat.',
          '**Revino public, scurt, după rezolvare**, cititorii tăcuți văd că ai rezolvat.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Un review negativ gestionat bine construiește mai multă încredere decât zece recenzii pozitive, fiindcă oamenii citesc cum reacționezi când lucrurile merg prost.',
      },
      { type: 'heading', text: 'Ce să NU faci niciodată' },
      {
        type: 'list',
        items: [
          'Nu șterge comentariile negative legitime, pari că ascunzi ceva (excepție: insulte, spam, atacuri).',
          'Nu intra în polemică publică, oricât de nedrept ar fi comentariul.',
          'Nu copia-lipi același răspuns la toți, se vede și răcește relația.',
          'Nu lăsa DM-urile cu intenție de cumpărare fără răspuns ore întregi, acolo pierzi bani direct (67% dintre consumatori preferă să contacteze suportul pe social, peste alte canale).',
        ],
      },
      { type: 'heading', text: 'Criză vs. reclamație normală: când escaladezi' },
      {
        type: 'paragraph',
        text: 'Nu tot ce e negativ e o criză. Crizele reale, campanii negative coordonate, reclamații virale, incidente cu posibile implicații legale, cer escaladare imediată și un proces structurat de răspuns, nu replici improvizate de cine se nimerește online. Stabilește din timp un protocol: cine decide, ce se aprobă, ce ton, cât de repede.',
      },
      { type: 'heading', text: 'Automatizări AI: ajutor, nu înlocuitor' },
      {
        type: 'paragraph',
        text: 'AI-ul a schimbat operarea, dar nu a redus importanța omului. Echipele cu cele mai bune rezultate în 2026 folosesc AI pentru suprasarcina operațională, monitorizarea mențiunilor și comentariilor în timp real, clasificarea după tip și urgență, scoaterea la suprafață a istoricului înainte de răspuns și semnalarea cazurilor de escaladat, păstrând agenții umani în control asupra răspunsului efectiv. Realitatea adoptării: 91% dintre liderii de customer service sunt sub presiune să implementeze AI, dar doar 20% au redus efectiv personalul (Gartner 2026). Folosește AI pentru viteză la întrebările repetitive; păstrează omul pentru situațiile delicate și pentru personalitate.',
      },
      { type: 'heading', text: 'Platform fluency: fiecare rețea, alte reguli' },
      {
        type: 'paragraph',
        text: 'Un singur ton nu funcționează peste tot. Ce merge ca răspuns pe LinkedIn citește greșit pe X; ce e potrivit într-un thread de comentarii pe Facebook cere altă abordare într-un reply pe TikTok. Echipa are nevoie de fluență per platformă, nu doar de competență de suport.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Cât de repede trebuie să răspund pe social?',
            answer: 'Ideal sub o oră (mulți o așteaptă), maximum 24 de ore. Pe X, 72% așteaptă răspuns într-o oră la reclamații. Brandul mediu răspunde în 4–5 ore, exact decalajul pe care îl poți exploata.',
          },
          {
            question: 'Ce fac cu un review negativ?',
            answer: 'Răspunde rapid și calm, recunoaște public problema înainte de a muta în DM, asumă-ți partea ta, oferă o soluție și revino public după rezolvare. Un review prost gestionat bine crește advocacy-ul.',
          },
          {
            question: 'Pot șterge comentariile negative?',
            answer: 'Nu pe cele legitime, pari că ascunzi ceva. Șterge doar insultele, spamul și atacurile.',
          },
          {
            question: 'Merită să investesc în community management dacă sunt mic?',
            answer: 'Da. Tăcerea costă (73% pleacă la concurență), iar suportul pe social e mult mai ieftin decât telefonul și construiește încredere vizibilă pentru toți cei care privesc.',
          },
          {
            question: 'AI sau oameni?',
            answer: 'Ambele. AI pentru viteză și triere (întrebări repetitive, monitorizare), oameni pentru situațiile delicate și pentru ton.',
          },
        ],
      },
    ],
  },
  {
    slug: 'mai-conteaza-hashtag-urile-in-2026-ce-functioneaza-acum',
    category: 'Social Media',
    title: 'Mai contează hashtag-urile în 2026? Ce funcționează acum și ce nu',
    excerpt:
      'Hashtag-urile n-au murit, dar au devenit metadata, nu motor de reach. Chiar șeful Instagram a confirmat-o. Câte și ce fel folosești, pe fiecare platformă.',
    date: '26 MAI 2026',
    readTime: '7 MIN',
    articleNumber: '18',
    coverIcon: 'hashtag',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** hashtag-urile nu au murit, dar și-au schimbat rolul radical, din motor de reach au devenit **metadata** (un semnal de categorizare, ca niște cuvinte-cheie de SEO). Însuși șeful Instagram a confirmat că hashtag-urile nu cresc reach-ul. Regula nouă: 3–5 hashtag-uri de nișă, specifice, nu liste lungi generice, iar ce contează cu adevărat acum sunt cuvintele-cheie din caption, din vocea video-ului și din textul de pe ecran.',
      },
      { type: 'heading', text: 'Ce s-a schimbat: de la motor de reach la metadata' },
      {
        type: 'paragraph',
        text: 'Schimbarea e oficială. Adam Mosseri, șeful Instagram, a fost clar de ceva vreme: hashtag-urile nu generează reach, sunt un semnal care ajută sistemul să-ți verifice subiectul și să arate postarea oamenilor interesați de acel domeniu. Motivul e că platformele „citesc” acum conținutul direct: TikTok și Instagram prioritizează captionul, audio-ul și textul de pe ecran pentru ranking; LinkedIn a trecut la indexare în limbaj natural; iar X a depreciat hashtag-urile în reclame, numindu-le „dezordine vizuală”. În plus, Instagram a eliminat posibilitatea de a urmări hashtag-uri, reducând expunerea pasivă. Dacă îți tratezi strategia de hashtag-uri ca în 2018, lucrezi pe un semnal pe care platformele abia îl mai bagă în seamă.',
      },
      { type: 'heading', text: 'Dar nu sunt moarte: ce arată datele' },
      {
        type: 'paragraph',
        text: 'Aici e nuanța onestă, „hashtag-urile au murit” e la fel de greșit ca „pune 30 de hashtag-uri”. Analizele de date arată că hashtag-urile **de nișă** încă ajută măsurabil: hashtag-urile de nișă, țintite, aduc cu 12–40% mai mult engagement, în timp ce stuffing-ul generic sau depășirea limitelor dăunează activ; pe Instagram, 3–5 hashtag-uri țintite înseamnă +12,6% engagement față de zero, iar tag-urile de nișă bat tag-urile uriașe de 3 ori la raportul reach/engagement. Tot acele date demontează și mitul opus: „zero hashtag-uri = mai viral” e fals pentru orice cont sub 500.000 de urmăritori.',
      },
      { type: 'heading', text: 'Câte și ce fel folosești, pe platformă' },
      { type: 'paragraph', text: 'Regulile diferă mult de la o rețea la alta:' },
      {
        type: 'table',
        headers: ['Platformă', 'Câte', 'Ce să eviți'],
        rows: [
          ['Instagram', '3–5 specifice; peste 5 poate semnala „low-intent”', '„Dump-ul” de 30, tag-uri generice'],
          ['TikTok', '3–5 de nișă (+40% vizualizări)', '#FYP, #ForYou, #Viral, zero beneficiu'],
          ['YouTube', '3–5', 'peste 15 → YouTube le ignoră pe TOATE'],
          ['X', '1–2 (+21%)', '3+ → −17% engagement'],
          ['LinkedIn', '3–5 specifice industriei (+30% reach)', 'tag-uri generice'],
          ['Facebook', '1–3 doar pentru organizare', 'nu te aștepta la reach'],
        ],
      },
      { type: 'heading', text: 'Niche bate mega, de fiecare dată' },
      {
        type: 'paragraph',
        text: 'Tentația tag-urilor uriașe e mare și aproape mereu greșită. Hashtag-urile de nișă (sub ~500.000 de postări) depășesc tag-urile uriașe de circa 3 ori la raportul reach/engagement, fiindcă tag-urile largi atrag potriviri slabe, postarea ajunge la oameni din afara temei, ceea ce scade relevanța. Un hashtag cu mii sau zeci de mii de postări relevante e mai valoros decât unul cu milioane, unde conținutul tău dispare în secunde.',
      },
      { type: 'heading', text: 'Ce contează mai mult decât hashtag-urile: cuvintele-cheie' },
      {
        type: 'paragraph',
        text: 'Tendința de fond: rețelele au devenit motoare de căutare, iar descoperirea e condusă acum de cuvinte-cheie în limbaj natural și de comportamentul de căutare, ceea ce face captionul clar, orientat spre intenție, mult mai eficient decât o listă de tag-uri. Regula: **scrie pentru întrebare întâi, apoi adaugă tag-uri de susținere.**',
      },
      {
        type: 'paragraph',
        text: 'Pe TikTok, asta e și mai literal: platforma transcrie audio-ul (ASR), citește textul de pe ecran (OCR) și analizează vizual cadrul, pe lângă metadata din caption și hashtag-uri, fiecare cuvânt pe care îl rostești e un potențial cuvânt-cheie. Iar poziția contează: TikTok afișează doar primele 100–150 de caractere din caption înainte de „more”, deci pune fraza-cheie la început, nu un teaser. Vestea bună pentru conturile mici: aproximativ 43% dintre primele rezultate în căutarea TikTok vin de la conturi cu sub 10.000 de urmăritori, relevanța bate mărimea.',
      },
      { type: 'heading', text: 'Plasarea (caption vs. primul comentariu)' },
      {
        type: 'paragraph',
        text: 'Pe Instagram, dezbaterea e veche. Poziția oficială Instagram e că nu există diferență algoritmică între caption și primul comentariu, dar captionul e varianta mai sigură: hashtag-urile sunt indexate imediat, împreună cu cuvintele-cheie, ca un singur pachet de date. Pune-le la finalul textului, ca să nu strice lizibilitatea.',
      },
      { type: 'heading', text: 'Strategia care funcționează în 2026' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Scrie un caption cu cuvintele reale pe care le-ar căuta publicul (logică de SEO).',
          'Rostește acele cuvinte în video și pune-le și ca text pe ecran (sunt „auzite” și „citite” de platformă).',
          'Adaugă 3–5 hashtag-uri de nișă, relevante exact pentru subiect, respectând limita platformei.',
          'Amestecă un hashtag de brand (al tău) cu câteva specifice temei.',
          'Renunță la listele lungi, copiate, de tag-uri generice, nu mai aduc nimic.',
        ],
      },
      { type: 'heading', text: 'Greșeli de evitat' },
      {
        type: 'list',
        items: [
          'Tag-uri generice uriașe (#love, #marketing, #fyp), zero semnal, te îneci în zgomot.',
          'Depășirea limitei (mai ales pe YouTube, unde peste 15 anulează toate hashtag-urile).',
          'Liste copiate-lipite identice pe toate postările, semnal de spam.',
          'Hashtag-uri care nu se potrivesc cu conținutul, pe TikTok, nepotrivirea dintre tag și subiectul dedus din transcript te retrogradează.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Mai funcționează hashtag-urile în 2026?',
            answer: 'Da, dar ca semnal secundar de categorizare, nu ca motor de reach. Cele de nișă încă aduc engagement măsurabil; cele generice, nu.',
          },
          {
            question: 'Câte hashtag-uri să pun?',
            answer: 'Depinde de platformă: Instagram și TikTok 3–5 de nișă, X 1–2, LinkedIn 3–5, YouTube 3–5 (niciodată peste 15), Facebook 1–3.',
          },
          {
            question: 'De ce nu mai funcționează ca înainte?',
            answer: 'Pentru că platformele „citesc” acum captionul, audio-ul transcris, textul de pe ecran și semnalele de engagement, deduc subiectul din conținut, nu din etichete.',
          },
          {
            question: 'Ce contează mai mult decât hashtag-urile?',
            answer: 'Cuvintele-cheie din caption, din vocea video-ului și din textul de pe ecran. Scrie pentru ce caută publicul, apoi adaugă câteva tag-uri de nișă.',
          },
        ],
      },
    ],
  },
  {
    slug: 'cum-alegi-o-agentie-de-marketing-digital-in-romania-9-intrebari',
    category: 'Studii de caz',
    title: 'Cum alegi o agenție de marketing digital în România: 9 întrebări esențiale',
    excerpt:
      'Modelele de tarifare, principiul care te protejează (datele și conturile trebuie să fie ale tale) și cele 9 întrebări care separă o agenție serioasă de una care îți arde bugetul.',
    date: '23 MAI 2026',
    readTime: '8 MIN',
    articleNumber: '12',
    coverIcon: 'checklist',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** alegerea unei agenții e una dintre cele mai consecvente decizii pentru o afacere, și una dintre cele mai ușor de greșit, fiindcă promisiunile sună la fel peste tot. Înainte de cele 9 întrebări, trebuie să înțelegi ce compari de fapt (modelul de tarifare) și un singur principiu care te protejează: **datele și conturile trebuie să fie ale tale**. Cele 9 întrebări de mai jos separă o agenție serioasă de una care îți arde bugetul.',
      },
      { type: 'heading', text: 'Întâi, înțelege ce compari: modelele de tarifare' },
      { type: 'paragraph', text: 'Trei propuneri pot arăta complet diferit pentru că folosesc modele diferite. Cele uzuale:' },
      {
        type: 'table',
        headers: ['Model', 'Cum funcționează', 'Pentru cine'],
        rows: [
          [
            'Retainer (abonament lunar)',
            'Tarif fix lunar pentru un scop definit. Modelul dominant, majoritatea agențiilor îl folosesc ca model principal',
            'Colaborări continue, predictibilitate',
          ],
          [
            'Procent din bugetul de ads',
            'Tipic 10–20% din bugetul de media, procentul scăzând pe măsură ce bugetul crește',
            'Management de paid media',
          ],
          [
            'Hibrid (bază + procent)',
            'Tarif de bază + un procent din ad spend. Cel mai sigur model pentru scalare; modelele pur performance provoacă dispute mari pe atribuire',
            'Cei mai mulți advertiseri serioși',
          ],
          [
            'Performance / revenue share',
            'Plată legată de rezultate (CPA, 3–10% din vânzările atribuite)',
            'Doar când agenția controlează majoritatea variabilelor',
          ],
          ['Per proiect', 'Tarif fix pentru un livrabil (site, lansare)', 'Nevoi punctuale'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Două lucruri de clarificat înainte să semnezi: comisionul de management e separat de bugetul de ads (banii dați platformelor), unele agenții adaugă un procent peste ad spend, iar unele percep și o taxă de setup (tipic 50–100% din primul retainer). Cere defalcarea clară: cât merge în strategie, cât în execuție/creative, cât în management și raportare.',
      },
      { type: 'heading', text: 'Cele 9 întrebări' },
      {
        type: 'paragraph',
        text: '**1. Îmi pot arăta rezultate concrete din portofoliu?** Nu mockup-uri sau „am lucrat cu branduri mari”, ci rezultate măsurabile: ROAS, creșteri de vânzări, scăderi de cost pe lead. **Răspuns bun:** cifre, contexte, ce-au schimbat și cum. **Semnal de alarmă:** doar postări „drăguțe” și niciun rezultat de business.',
      },
      {
        type: 'paragraph',
        text: '**2. Cum măsoară succesul?** Întreabă direct ce KPI urmăresc și cum vei ști dacă merge. Nu întâmplător: măsurarea ROI-ului de marketing e provocarea nr. 1 a marketerilor în 2026, citată de 33% dintre respondenți în raportul HubSpot, deci leagă tariful de un cadru clar de performanță *înainte* să semnezi. **Semnal de alarmă:** se ascund după „awareness” și „engagement” fără a lega nimic de vânzări.',
      },
      {
        type: 'paragraph',
        text: '**3. Cine va lucra efectiv pe contul meu?** Multe agenții vând cu seniori și predau unui junior. **Răspuns bun:** îți spun cine gestionează contul zi de zi, ce experiență are și cât de des vorbiți. **Semnal de alarmă:** evită întrebarea sau promit „o echipă” fără nume.',
      },
      {
        type: 'paragraph',
        text: '**4. În ce sunt cu adevărat buni?** Fii suspicios față de cei care fac „tot”, la fel de bine, pentru oricine. **Răspuns bun:** o forță clară și onestitatea de a spune ce NU fac. Specializarea e maturitate, nu limitare.',
      },
      {
        type: 'paragraph',
        text: '**5. Cum arată raportarea?** Cere un exemplu de raport. **Răspuns bun:** clar, onest, acționabil, ce s-a făcut, ce a mers, ce nu, ce urmează. **Semnal de alarmă:** un morman de grafice menit să impresioneze. Dacă nu înțelegi raportul, nu e vina ta.',
      },
      {
        type: 'paragraph',
        text: '**6. Cine deține conturile și datele?** Întrebarea pe care prea puțini o pun și mulți o regretă. **Totul trebuie să fie pe numele tău**, iar agenția să primească doar acces. Checklist concret de proprietate:',
      },
      {
        type: 'list',
        items: [
          '**Meta Business Manager** și contul de ads — ale tale, agenția adăugată ca partener.',
          '**Pixel / dataset** și **Conversions API** — în Business Manager-ul tău.',
          '**Proprietatea Google Analytics 4** și contul **Google Ads** — pe contul tău.',
          '**Domeniul, site-ul și conturile de social** — proprietatea ta.',
        ],
      },
      {
        type: 'paragraph',
        text: '**Semnal de alarmă:** agenția lucrează din conturile ei și nu-ți dă acces. În ziua în care pleci, pierzi istoricul, audiențele și învățarea algoritmului. Insistă pe proprietate de la început.',
      },
      {
        type: 'paragraph',
        text: '**7. Ce se întâmplă dacă vreau să plec?** Citește contractul: perioadă minimă, preaviz, ce se întâmplă cu materialele și conturile. **Răspuns bun:** preaviz rezonabil, predarea curată a tot ce e al tău. **Semnal de alarmă:** lock-in agresiv, deseori un semn că rezultatele nu vorbesc de la sine.',
      },
      {
        type: 'paragraph',
        text: '**8. Cum comunicați și cât de des?** Stabilește din start ritmul: întâlniri, canal, timp de răspuns. Multe colaborări eșuează din lipsă de comunicare, nu de competență. **Semnal de alarmă:** dacă răspund greu în faza de vânzare, după semnătură va fi mai rău.',
      },
      {
        type: 'paragraph',
        text: '**9. Promit rezultate garantate?** Contraintuitiv, garanțiile prea ferme sunt un steag roșu. Nimeni nu poate garanta „pagina 1 pe Google în 30 de zile” sau un ROAS exact, sunt prea multe variabile. **Răspuns bun:** promit proces, transparență și efort competent. **Semnal de alarmă:** garantează imposibilul (fie minte, fie nu înțelege cum funcționează).',
      },
      { type: 'heading', text: 'Concluzia' },
      {
        type: 'paragraph',
        text: 'Agenția potrivită nu e neapărat cea mai ieftină sau cea cu cea mai tare prezentare. E cea care vorbește în rezultate, folosește un model de tarifare transparent (și-ți explică diferența dintre comisionul de management și bugetul de ads), îți lasă **controlul asupra datelor tale**, comunică clar și nu-ți promite imposibilul. Pune aceste nouă întrebări înainte să semnezi și vei evita majoritatea greșelilor costisitoare.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Cât costă o agenție de marketing digital?',
            answer:
              'Depinde de model: retainer lunar (de la câteva mii de lei, în funcție de scop și senioritate), procent din bugetul de ads (tipic 10–20%, mai mic la bugete mari), hibrid (bază + procent) sau performance. Comisionul de management e separat de banii dați platformelor.',
          },
          {
            question: 'Ce model de tarifare e cel mai corect?',
            answer:
              'Pentru paid media, modelul hibrid (bază + procent din ad spend) e cel mai echilibrat. Modelele pur performance sună atractiv, dar provoacă dispute pe atribuire și funcționează doar când agenția controlează majoritatea variabilelor.',
          },
          {
            question: 'De ce e atât de importantă proprietatea asupra conturilor?',
            answer:
              'Pentru că, dacă agenția deține conturile, la final pierzi istoricul, audiențele și învățarea algoritmului. Cere ca totul (Business Manager, Pixel, GA4, Google Ads, domeniu) să fie pe numele tău.',
          },
          {
            question: 'Garanțiile de rezultate sunt un semn bun?',
            answer: 'Nu. Nimeni nu poate garanta poziții sau un ROAS exact. O agenție serioasă garantează proces și transparență, nu rezultate magice.',
          },
        ],
      },
    ],
  },
  {
    slug: 'cum-instalezi-meta-pixel-si-conversions-api',
    category: 'Tutoriale',
    title: 'Cum instalezi Meta Pixel și Conversions API (și de ce e esențial)',
    excerpt:
      'Pixel-ul urmărește din browser, CAPI trimite aceleași evenimente de pe server. În 2026 ai nevoie de amândouă, legate prin deduplicare, cu un Event Match Quality de 7+.',
    date: '20 MAI 2026',
    readTime: '9 MIN',
    articleNumber: '10',
    coverIcon: 'network',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** Meta Pixel urmărește acțiunile din browser; Conversions API (CAPI) trimite aceleași evenimente direct de pe server, recuperând datele pe care browserul le pierde. În 2026 ai nevoie de **amândouă**, legate prin deduplicare (event_name + event_id), cu un Event Match Quality cât mai mare (țintă 7+). Pixel-ul singur subraportează masiv pe traficul iOS, de aceea CAPI nu mai e opțional, ci standard.',
      },
      { type: 'heading', text: 'De ce tracking-ul corect nu mai e opțional' },
      {
        type: 'paragraph',
        text: 'Browserul a devenit un mediu ostil pentru tracking. Concret: Safari blochează cookie-urile third-party din 2020, iar cookie-urile first-party setate prin JavaScript expiră după 7 zile; din iOS 17, Link Tracking Protection elimină fbclid din linkuri în Mail/Messages/navigare privată; iar 15–20% dintre utilizatorii de desktop din piețele vestice folosesc un ad blocker. Rezultatul: Pixel-ul singur subraportează cu 30–60% pe traficul iOS. Fără tracking corect, optimizezi pe date incomplete și arzi buget.',
      },
      { type: 'heading', text: 'Ce este Meta Pixel' },
      {
        type: 'paragraph',
        text: 'Meta Pixel e o bucată de cod pe site care raportează către Meta ce fac vizitatorii: ce pagini văd, ce adaugă în coș, ce cumpără. (În Events Manager, Pixel-ul face azi parte dintr-un **dataset** / sursă de date.) Pe baza acestor semnale, algoritmul învață cine cumpără, îți permite retargeting și măsoară conversiile. Limitarea lui: rulează în browser, deci e expus la toate blocajele de mai sus.',
      },
      { type: 'heading', text: 'Ce este Conversions API și de ce ai nevoie de amândouă' },
      {
        type: 'paragraph',
        text: 'Conversions API (CAPI) trimite aceleași evenimente **direct de pe serverul tău** către Meta, ocolind browserul. Astfel recuperează evenimentele pierdute la ad blockere și restricții de confidențialitate. Folosit împreună cu Pixel, CAPI recuperează tipic 20–30% din datele de conversie pierdute și îmbunătățește acuratețea atribuirii. Beneficiul se vede în costuri: conform datelor Meta din aprilie 2026, advertiserii cu CAPI pentru evenimente web au, în medie, un cost pe rezultat cu ~17,8% mai mic față de cei cu Pixel-only (variază pe verticală). Ghidarea oficială Meta e clară: rulează ambele.',
      },
      { type: 'heading', text: 'Cum instalezi Meta Pixel: pas cu pas' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Intră în **Meta Events Manager** și creează un **dataset** (sursă de date) pentru site-ul tău.',
          'Alege metoda: integrare cu parteneri (Shopify, WooCommerce, WordPress au integrări native), prin Google Tag Manager, sau manual prin cod.',
          'Pentru majoritatea platformelor de e-commerce, conectarea se face cu un **ID** (Pixel/Dataset ID), fără să atingi codul.',
          'Instalează codul de bază pe toate paginile (sau lasă integrarea s-o facă automat).',
          'Configurează evenimentele cheie: ViewContent, AddToCart, InitiateCheckout, Purchase, Lead, după caz.',
        ],
      },
      { type: 'heading', text: 'Cum activezi Conversions API' },
      {
        type: 'paragraph',
        text: 'Patru opțiuni, de la simplu la avansat: integrare nativă cu un partener (Shopify/WooCommerce), CAPI Gateway, Google Tag Manager server-side, sau implementare directă prin API.',
      },
      {
        type: 'list',
        items: [
          '**Integrare nativă** — câteva clickuri, fără dezvoltator.',
          '**CAPI Gateway** — soluția Meta semi-gestionată, mijloc între simplu și control.',
          '**GTM server-side** — flexibilă, dar cere configurare.',
          '**API direct pe server** — cea mai robustă și precisă, dar necesită dezvoltator.',
        ],
      },
      { type: 'heading', text: 'Deduplicarea: pasul care, dacă lipsește, îți umflă cifrele' },
      {
        type: 'paragraph',
        text: 'Când rulezi și Pixel, și CAPI, același eveniment ajunge de două ori. Ca să fie numărat o singură dată, Meta potrivește perechea browser–server pe baza event_name + event_id, unde event_id e un identificator unic generat pentru fiecare instanță de eveniment și trimis identic din ambele surse. Dacă event_id sau event_name nu se potrivesc, Meta fie numără dublu, fie aruncă evenimente.',
      },
      {
        type: 'paragraph',
        text: 'O capcană tehnică reală: dacă un cache de pagină stochează HTML-ul randat (inclusiv JS-ul cu event_id), toți vizitatorii primesc același ID, iar Meta aruncă evenimentele ca duplicate. Verifică deduplicarea comparând în Events Manager: dacă totalul deduplicat e aproximativ egal cu totalele individuale (nu dublul lor), deduplicarea funcționează, țintă ~90%+ rată de deduplicare.',
      },
      { type: 'heading', text: 'Event Match Quality: cât de bine „leagă” Meta evenimentul de un om' },
      {
        type: 'paragraph',
        text: 'Event Match Quality (EMQ), pe o scală de la 0 la 10, reflectă cât de sigur poate Meta să asocieze evenimentul cu un utilizator cunoscut, iar scorul influențează direct cât cântărește acea conversie. EMQ crește cu cât trimiți mai multe identificatoare: chei de potrivire precum fbp, fbc, IP și user agent, plus date de utilizator hașuite (email, telefon, nume, adresă). Țintă practică: EMQ de 7,0+ pentru campanii competitive, iar CAPI ajunge deseori la 8–10, peste tracking-ul doar din browser.',
      },
      { type: 'heading', text: 'Aggregated Event Measurement (AEM): ce s-a schimbat' },
      {
        type: 'paragraph',
        text: 'AEM e cadrul de măsurare al Meta pentru utilizatorii iOS care refuză urmărirea (ATT). Istoric, presupunea **prioritizarea manuală a maximum 8 evenimente per domeniu**. Important, în 2026 acest pas s-a schimbat: Meta a eliminat configurarea manuală AEM în iunie 2025 și agregă acum automat evenimentele eligibile; verificarea domeniului nu mai e obligatorie pentru AEM, dar rămâne recomandată. De reținut și că raportarea pentru evenimentele AEM poate întârzia cu până la 3 zile, iar conversiile utilizatorilor care au refuzat ATT sunt atribuite prin modelare probabilistică. Pentru că zona e în schimbare, verifică starea curentă direct în Events Manager. Verificarea domeniului se face în Business Settings → Brand safety → Domains.',
      },
      { type: 'heading', text: 'Cum verifici că funcționează corect' },
      { type: 'paragraph', text: 'Instalarea se termină când confirmi că datele ajung corect:' },
      {
        type: 'list',
        items: [
          '**Test Events** (în Events Manager): declanșează acțiuni pe site și verifică să apară evenimentele din **ambele surse**, Browser și Server.',
          '**Deduplicare:** confirmă că totalul nu se dublează (vezi mai sus).',
          '**EMQ:** verifică scorurile după ~48 de ore de date; dacă sunt sub țintă, adaugă parametrii de utilizator care lipsesc.',
        ],
      },
      { type: 'heading', text: 'Confidențialitate și GDPR' },
      {
        type: 'paragraph',
        text: 'Tracking-ul vine cu obligații legale. În UE/România ai nevoie de politică de cookie-uri, banner de consimțământ și respectarea consimțământului **înainte** de a declanșa evenimente (nu colecta date despre cine a refuzat). Datele de utilizator trimise către Meta trebuie hașuite (integrările oficiale o fac automat, de regulă cu SHA-256). Nu sări peste acest pas, e atât cerință legală, cât și o chestiune de încredere.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Am nevoie de Conversions API dacă am deja Pixel?',
            answer:
              'Da. Pixel-ul singur subraportează 30–60% pe iOS. CAPI recuperează 20–30% din conversiile pierdute și scade costul pe rezultat. Meta recomandă explicit să le rulezi pe amândouă.',
          },
          {
            question: 'Cum evit numărarea dublă când folosesc Pixel + CAPI?',
            answer: 'Prin deduplicare: trimite același event_id și event_name din ambele surse. Verifică în Events Manager că totalul nu se dublează.',
          },
          {
            question: 'Ce e un Event Match Quality bun?',
            answer: 'Pe o scală 0–10, vizează 7+ pentru campanii competitive. Crește scorul trimițând mai mulți parametri de utilizator (email/telefon hașuite, fbp, fbc etc.).',
          },
          {
            question: 'Mai trebuie să prioritizez 8 evenimente în AEM?',
            answer: 'Din 2025, Meta a trecut AEM pe agregare automată și a eliminat configurarea manuală. Verifică starea curentă în Events Manager; verificarea domeniului rămâne recomandată.',
          },
        ],
      },
    ],
  },
  {
    slug: 'google-analytics-4-pentru-incepatori-metricile-care-conteaza',
    category: 'Tutoriale',
    title: 'Google Analytics 4 pentru începători: metricile care contează cu adevărat',
    excerpt:
      'GA4 măsoară totul ca evenimente, nu ca pageviews rigide. Utilizatori activi, engagement rate (înlocuitorul bounce rate-ului) și key events — restul îl poți ignora în primul an.',
    date: '17 MAI 2026',
    readTime: '9 MIN',
    articleNumber: '11',
    coverIcon: 'chart-axis',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** GA4 măsoară totul ca **evenimente**, nu ca pageviews și sesiuni rigide. Pentru majoritatea afacerilor, ai nevoie de doar câteva metrici: utilizatori activi, sesiuni, **engagement rate** (înlocuitorul bounce rate-ului, cu o definiție precisă) și **key events** (fostele „conversions”). Restul, explorări, cohorte, atribuire avansată, îl poți ignora în primul an. Cheia e să citești cifrele față de propriul istoric, nu față de benchmark-uri universale (care, pentru GA4, practic nu există).',
      },
      { type: 'heading', text: 'Cum gândește GA4: totul e un eveniment' },
      {
        type: 'paragraph',
        text: 'Marea schimbare față de vechiul Universal Analytics: în GA4, fiecare interacțiune, o vizualizare de pagină, un scroll, un click, o achiziție, e un **eveniment**. Există patru tipuri: automat colectate, de „enhanced measurement” (scroll, click pe linkuri externe, căutare pe site etc., activate din setări), recomandate (cu nume standard, ex. purchase) și personalizate. Odată ce înțelegi că „totul e un eveniment”, restul devine logic, și înțelegi de ce metricile au definiții diferite de UA.',
      },
      { type: 'heading', text: 'Metricile care contează cu adevărat' },
      {
        type: 'paragraph',
        text: '**Utilizatori activi (nu „total users”).** GA4 raportează ca metrică principală Active Users (utilizatori activi), o schimbare față de „Total Users” din UA. Practic, e numărul de oameni care au avut o interacțiune relevantă cu site-ul, nu doar care au atins o pagină. E baza: cât trafic real ai.',
      },
      {
        type: 'paragraph',
        text: '**Sesiuni.** O sesiune începe când cineva ajunge pe site și se încheie după 30 de minute de inactivitate. Atenție: GA4 numără sesiunile altfel decât UA (nu le reîncepe la miezul nopții sau la schimbarea sursei de campanie), deci cifrele nu sunt direct comparabile cu istoricul UA.',
      },
      {
        type: 'paragraph',
        text: '**Engaged sessions și Engagement rate (înlocuitorul bounce rate).** Aici e cea mai importantă, și cel mai des prost înțeleasă, metrică. O sesiune „engaged” are o definiție precisă, cu logică „SAU”: o sesiune e considerată engaged dacă durează 10 secunde sau mai mult, SAU include cel puțin un key event (conversie), SAU are 2 sau mai multe vizualizări de pagină/ecran, orice singură condiție îndeplinită e suficientă. Pragul de 10 secunde e cel implicit și minim, dar poate fi urcat până la 60 de secunde pe fiecare flux de date din setări.',
      },
      {
        type: 'paragraph',
        text: 'Engagement rate = sesiuni engaged ÷ total sesiuni. Iar bounce rate-ul în GA4 e exact inversul: procentul de sesiuni neangajate (sub 10 secunde ȘI fără key event ȘI sub 2 pagini). Consecință practică, des ratată: bounce rate-ul din UA și cel din GA4 nu sunt direct comparabile, au definiții diferite. Un cititor care stă 4 minute pe un articol și pleacă era „bounce” în UA, dar e sesiune engaged în GA4.',
      },
      {
        type: 'paragraph',
        text: 'Asociat: **Average engagement time** (timpul mediu de interacțiune) a înlocuit „average session duration”. Măsoară timpul cât pagina/ecranul e în prim-plan (tab activ), nu și tab-urile din fundal, un indicator mult mai onest al atenției reale.',
      },
      {
        type: 'paragraph',
        text: '**Key events (fostele „conversions”).** Aici e aurul. Definește ca key event acțiunile care contează pentru afacerea ta: o achiziție, un formular trimis, un apel inițiat. Terminologie de reținut: GA4 a redenumit „conversions” în „key events” la începutul lui 2025, mecanica e aceeași, termenul „conversion” e rezervat acum contextului Google Ads. Fără key events marcate, GA4 e doar un contor de trafic; cu ele, devine un instrument care îți arată ce aduce bani.',
      },
      {
        type: 'paragraph',
        text: '**Traffic acquisition.** De unde vin oamenii: organic, direct, social, plătit, referral. O nuanță utilă: GA4 separă „First user source” (cum te-a descoperit prima dată) de „Session source” (sursa vizitei curente), alege raportul potrivit întrebării tale (achiziție de utilizatori noi vs. ce canal a adus sesiunea care a convertit).',
      },
      { type: 'heading', text: 'Pe ce să NU pierzi timp la început' },
      {
        type: 'paragraph',
        text: 'GA4 are rapoarte avansate, explorări (Explore), cohorte, atribuire pe căi multiple, pe care majoritatea afacerilor nu le ating în primul an. Nu te bloca în ele. Dacă urmărești utilizatorii activi, engagement rate-ul, sursele de trafic și key events, ai deja ~80% din valoare.',
      },
      { type: 'heading', text: 'Configurarea minimă pe care chiar trebuie s-o faci' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Creează o proprietate GA4 și instalează tag-ul (direct sau prin Google Tag Manager).',
          'Verifică în raportul **Realtime** că datele intră când navighezi pe site.',
          'Marchează evenimentele importante ca **key events**.',
          'Conectează GA4 cu Google Ads (dacă faci reclame), ca să vezi imaginea completă și să imporți key events ca, conversii.',
          'Setează **păstrarea datelor (data retention)** la maximul permis, implicit e 2 luni, dar proprietățile standard permit 14 luni; pune 14, altfel pierzi istoric pentru analizele pe perioade lungi.',
          '**Pentru UE/România:** configurează Consent Mode v2. Din 2024, e necesar pentru a folosi datele în audiențe/remarketing Google Ads cu trafic din SEE, și pentru a respecta consimțământul (GA4 modelează conversiile utilizatorilor care refuză, în loc să le colecteze).',
        ],
      },
      { type: 'heading', text: 'Greșeala de început a tuturor: cifre fără context' },
      {
        type: 'paragraph',
        text: 'Cea mai frecventă greșeală e să te uiți la cifre fără reper. 1.000 de vizitatori e mult sau puțin? Un engagement rate de 55% e bun sau slab? Cifrele singure nu spun nimic. Și e un motiv suplimentar în GA4: nu există benchmark-uri de industrie autoritare pentru engagement rate-ul din GA4, fiindcă vechile repere din era UA foloseau definiția de „sesiune cu o singură pagină” și nu se aplică modelului GA4. Concluzia: nu vâna procente „universale”; compară-te cu propriul tău istoric și cu obiectivele tale. Singura întrebare care contează e dacă tu, față de luna trecută, te-ai îmbunătățit.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Ce e un engagement rate bun în GA4?',
            answer: 'Nu există un prag universal valid, benchmark-urile din UA nu se aplică. Compară-te cu propriul istoric și pe segmente (canal, tip de pagină).',
          },
          {
            question: 'Care e diferența dintre bounce rate-ul din UA și cel din GA4?',
            answer: 'În GA4, bounce rate = inversul engagement rate-ului (sesiuni neangajate). Are altă definiție decât în UA, deci nu compara direct cele două cifre.',
          },
          {
            question: 'S-au redenumit „conversions”?',
            answer: 'Da. În GA4 se numesc acum „key events” (din 2025); „conversions” se referă la contextul Google Ads.',
          },
          {
            question: 'Cât timp păstrează GA4 datele?',
            answer: 'Implicit 2 luni; setează la 14 luni (maximul pentru proprietățile standard), altfel pierzi istoric pentru analize pe termen lung.',
          },
          {
            question: 'Am nevoie de ceva special pentru UE?',
            answer: 'Da, Consent Mode v2, necesar din 2024 pentru folosirea datelor în Google Ads cu trafic din SEE și pentru respectarea consimțământului.',
          },
        ],
      },
    ],
  },
  {
    slug: 'reels-vs-tiktok-vs-youtube-shorts-ce-format-video-alegi-in-2026',
    category: 'Video & Content',
    title: 'Reels vs TikTok vs YouTube Shorts: ce format video alegi în 2026',
    excerpt:
      'Cele trei arată identic, dar funcționează diferit — și, mai ales, plătesc diferit. TikTok pentru descoperire și commerce, Reels pentru conversie, Shorts pentru autoritate pe termen lung.',
    date: '14 MAI 2026',
    readTime: '10 MIN',
    articleNumber: '08',
    coverIcon: 'format-compare',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** cele trei arată identic, dar funcționează diferit. **TikTok** = cea mai bună descoperire pentru un cont de la zero, plus commerce (TikTok Shop). **Instagram Reels** = cel mai bun pentru conversie și brand, fiindcă trăiește într-un ecosistem de cumpărare. **YouTube Shorts** = durabilitate, căutare și autoritate, plus singura cu o pâlnie reală spre conținut long-form bine plătit. Diferența cea mai mare, ignorată de majoritatea, e **cum plătește fiecare** (vezi tabelul de monetizare).',
      },
      { type: 'heading', text: 'Aceeași față, motoare diferite' },
      {
        type: 'paragraph',
        text: 'Toate trei sunt video vertical scurt, dar mecanica de distribuție diferă: TikTok rulează pe *interest graph* (te arată oamenilor care nu te urmăresc), Reels e împletit cu profilul tău de Instagram și cu shopping-ul, iar Shorts e legat de motorul de căutare și de canalul tău de YouTube. De aici decurg deosebiri reale de strategie.',
      },
      { type: 'heading', text: 'Repurposing: produci o dată, dar publici nativ' },
      {
        type: 'paragraph',
        text: 'Mitul de eliminat: nu trebuie să alegi exclusiv. Un singur video bun poate merge pe toate trei (repurposing). Avertismentul critic: **nu cross-posta identic.** Conținutul cu watermark de pe altă platformă e penalizat, un Reel încărcat cu watermark de TikTok e suprimat la reach aproape zero în afara urmăritorilor existenți. Deci: produci o dată, dar exporți fără watermark și adaptezi nativ fiecare versiune (format, hook, primele secunde).',
      },
      { type: 'heading', text: 'TikTok — descoperire și commerce' },
      {
        type: 'paragraph',
        text: 'TikTok rămâne campionul descoperirii: algoritmul arată conținutul unor oameni care nu te urmăresc, deci un cont nou poate „exploda” fără audiență existentă. Tonul potrivit e autentic, rapid, neperfect, producția lustruită de TV deseori performează mai slab decât un video care „simte real”. În 2026, bara de finalizare (completion rate) pentru distribuție virală a urcat la ~70%, iar share-urile și salvările cântăresc mai mult decât like-urile, deci densitatea de valoare și un hook puternic în primele secunde sunt obligatorii.',
      },
      {
        type: 'paragraph',
        text: 'Al doilea atu, tot mai important: **commerce-ul**. TikTok Shop a generat 15 miliarde de dolari în vânzări în SUA în 2025 și se estimează că va depăși 20 de miliarde în 2026. Pentru e-commerce, TikTok nu mai e doar reach, e și canal de vânzare directă.',
      },
      { type: 'heading', text: 'Instagram Reels — conversie și ecosistem de brand' },
      {
        type: 'paragraph',
        text: 'Reels are un avantaj pe care TikTok îl recuperează abia acum: trăiește într-un ecosistem unde oamenii sunt deja obișnuiți cu branduri, shopping și acțiuni comerciale. Dacă vinzi un produs sau serviciu, traficul de pe Reels convertește deseori mai bine, chiar dacă reach-ul brut e mai mic. În plus, Reels alimentează tot profilul (feed, story-uri, pagină), fiind mai integrat într-o pâlnie. Semnalele dominante în 2026: rata de vizionare până la final, reluările și cel mai puternic, trimiterile în privat (DM sends).',
      },
      {
        type: 'paragraph',
        text: 'Atenție însă la monetizarea directă: în 2026, Instagram Reels nu are un program de share din venitul publicitar comparabil cu YouTube sau TikTok, monetizarea vine aproape exclusiv din colaborări cu branduri și afiliere. Reels te plătește indirect (prin vânzări/branding), nu pe vizualizare.',
      },
      { type: 'heading', text: 'YouTube Shorts — durabilitate, căutare și autoritate' },
      {
        type: 'paragraph',
        text: 'Shorts joacă jocul lung. Spre deosebire de TikTok și Reels, unde viața unui video se măsoară în ore-zile, un Short bun poate aduce vizualizări săptămâni întregi și e **căutabil** (YouTube e al doilea motor de căutare din lume). Scara e uriașă: Shorts adună circa 200 de miliarde de vizualizări pe zi și peste 2 miliarde de privitori lunar.',
      },
      {
        type: 'paragraph',
        text: 'Marele atu strategic e însă **pâlnia spre long-form**: Shorts aduc abonați către canalul tău, unde conținutul lung construiește autoritate reală și e mult mai bine plătit. Canalele care postează Shorts consecvent își cresc numărul de abonați semnificativ mai repede. Dacă obiectivul e să fii perceput ca expert, YouTube e investiția pe termen lung.',
      },
      { type: 'heading', text: 'Monetizare: cum plătește fiecare (diferența mare)' },
      { type: 'paragraph', text: 'Aici platformele diverg dramatic:' },
      {
        type: 'table',
        headers: ['Platformă', 'Model', 'Plată orientativă', 'Observație'],
        rows: [
          [
            'TikTok',
            'Creator Rewards (doar video >1 min) + TikTok Shop + Pulse + gifts',
            '~0,50–1,00 $ / 1.000 vizualizări calificate',
            'Cel mai mult per vizualizare, dar doar pentru video peste 1 minut; intrare: 10K urmăritori + 100K vizualizări/30 zile',
          ],
          [
            'YouTube Shorts',
            'Cotă din venitul publicitar via YPP (pool)',
            'creatorul păstrează 45%; RPM ~0,03–0,07 $ / 1.000 vizualizări',
            'RPM mic, dar pâlnie spre long-form, unde CPM-urile ajung la 5–20+ $',
          ],
          ['Instagram Reels', 'Fără share direct de venit publicitar', '—', 'Monetizare prin brand deals și afiliere'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Pe scurt: TikTok plătește de 8–20 de ori mai mult per vizualizare pentru conținutul calificat, dar puterea YouTube e efectul de pâlnie, Shorts ca motor de descoperire care duce spre conținutul lung, mult mai bine plătit. Reels te plătește prin vânzări și branding, nu direct.',
      },
      { type: 'heading', text: 'Cum alegi pe care te concentrezi' },
      {
        type: 'list',
        items: [
          '**Creștere rapidă și reach nou cu audiență zero** → energia principală pe **TikTok**.',
          '**Vinzi un produs/serviciu și ai deja prezență pe Instagram** → prioritizează **Reels** (conversie + ecosistem).',
          '**Vrei autoritate pe termen lung și venit din conținut** → construiește pe **YouTube Shorts → long-form**.',
          '**Vinzi direct din video** → TikTok Shop și shopping-ul Instagram intră în calcul, nu doar reach-ul.',
          '**Resurse limitate** → produci pentru platforma principală și distribui nativ pe celelalte.',
        ],
      },
      { type: 'heading', text: 'Greșeala de evitat' },
      {
        type: 'paragraph',
        text: 'Cea mai costisitoare greșeală e să postezi pe toate trei superficial și identic, și să nu performezi nicăieri. Mai bine domini o platformă (aliniată cu obiectivul tău: reach, conversie sau autoritate) și refolosești conținutul nativ pe restul. Alege un cap de pod, câștigă acolo, apoi extinde, nu împrăștia efortul egal pe trei fronturi.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Care platformă plătește cel mai mult pentru video scurt?',
            answer:
              'Per vizualizare calificată, TikTok Creator Rewards (~0,50–1,00 $/1.000), dar numai pentru video peste 1 minut. YouTube Shorts plătește RPM mic (~0,03–0,07 $), însă deschide pâlnia spre long-form, unde câștigi mult mai mult. Instagram Reels nu are share direct, monetizezi prin colaborări și vânzări.',
          },
          {
            question: 'Pot posta același video pe toate trei?',
            answer: 'Da, dar adaptat nativ și fără watermark de pe altă platformă (altfel reach-ul e suprimat).',
          },
          {
            question: 'Care e cea mai bună pentru un cont nou, fără audiență?',
            answer: 'TikTok, algoritmul bazat pe interese poate împinge un cont nou la audiențe mari rapid.',
          },
          {
            question: 'Care e cea mai bună pentru autoritate pe termen lung?',
            answer: 'YouTube Shorts, pentru durabilitate (conținut căutabil, viață lungă) și pentru pâlnia către long-form.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ugc-ce-este-user-generated-content-si-cum-creste-vanzarile',
    category: 'Video & Content',
    title: 'UGC (User Generated Content): ce este și cum crește vânzările',
    excerpt:
      'Oamenii au încredere în oameni, nu în branduri. Drepturi de utilizare în scris, whitelisting prin contul creatorului și marcarea corectă a conținutului plătit — ce ratează majoritatea brandurilor.',
    date: '11 MAI 2026',
    readTime: '8 MIN',
    articleNumber: '09',
    coverIcon: 'video-play',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** UGC e conținut care arată ca și cum nu ar fi reclamă, făcut de oameni reali (sau de creatori UGC plătiți, în stil autentic). Convertește mai bine pentru că oamenii au încredere în oameni, nu în branduri: ~92% dintre consumatori se încred mai mult în recomandările altor oameni decât în mesajele de brand. Ca să-l folosești profesionist, ai nevoie de trei lucruri pe care majoritatea le ratează: drepturi de utilizare în scris, distribuție prin contul creatorului (whitelisting) și marcarea corectă a conținutului plătit.',
      },
      { type: 'heading', text: 'Ce este UGC' },
      {
        type: 'paragraph',
        text: 'UGC (User Generated Content) înseamnă conținut creat de utilizatori reali, nu de brand, recenzii video, unboxing-uri, demonstrații, fotografii cu produsul în viața de zi cu zi. Spre deosebire de reclama clasică, are aspectul și senzația de conținut organic.',
      },
      {
        type: 'paragraph',
        text: 'Nuanță importantă: în practica de azi, mult din ce se numește „UGC” e produs de **creatori UGC plătiți**, care realizează conținut în stil autentic pentru brand. Diferența față de un influencer: la influencer cumperi audiența lui; la creatorul UGC cumperi conținutul în sine, pe care apoi îl deții și îl folosești tu, inclusiv în reclame.',
      },
      { type: 'heading', text: 'De ce convertește: ce arată datele (nu doar „e psihologic”)' },
      {
        type: 'paragraph',
        text: 'Mecanismul de bază e încrederea. Circa 92% dintre consumatori se încred în recomandările altor oameni mai mult decât în conținutul de brand, chiar și când acei oameni sunt necunoscuți, pentru că un om real care folosește produsul e procesat ca dovadă socială, nu ca reclamă. În aceeași logică, 84% dintre consumatori au mai multă încredere într-un brand care folosește UGC.',
      },
      {
        type: 'paragraph',
        text: 'În reclame, asta se traduce în cifre. Conform benchmark-urilor de industrie pentru 2026: reclamele UGC generează rate de click mai mari și un cost pe click semnificativ mai mic decât cele non-UGC, iar pe paginile de produs conținutul UGC poate crește vizibil conversia, în mare parte fiindcă se integrează în feed în loc să declanșeze „orbirea la reclame”. Pe video, reclamele UGC au rate de vizionare până la final mai mari (în jur de 35%) față de reclamele de brand lustruite. Aceste cifre variază de la sursă la sursă, dar direcția e consecventă: UGC învinge oboseala de reclame (ad fatigue), pentru că nu arată ca o reclamă.',
      },
      {
        type: 'paragraph',
        text: 'Un detaliu strategic: deși dovezile sunt copleșitoare, doar ~16% dintre branduri au o strategie UGC dedicată, adică un avantaj real pentru cine îl tratează serios.',
      },
      { type: 'heading', text: 'Tipuri de UGC pe care le poți folosi' },
      {
        type: 'list',
        items: [
          '**Testimoniale video** — un client povestește problema și cum a rezolvat-o cu produsul tău.',
          '**Unboxing / first impression** — emoția primei interacțiuni.',
          '**Demonstrații / how-to** — produsul în uz, rezolvând o problemă concretă.',
          '**Before & after** — transformarea; cel mai persuasiv format pentru anumite nișe.',
          '**Day in the life** — produsul integrat firesc în rutină.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Pentru reclame de performanță, testimonialele și demonstrațiile în stil UGC tind să fie cele mai eficiente, fiindcă unesc dovada socială cu un beneficiu concret.',
      },
      { type: 'heading', text: 'Cum obții UGC' },
      {
        type: 'paragraph',
        text: '**1. De la clienții existenți.** Cea mai autentică și ieftină sursă. Încurajează-i să posteze cu un hashtag de brand, oferă un mic stimulent pentru recenzii video și cere mereu permisiunea (în scris) să refolosești conținutul.',
      },
      {
        type: 'paragraph',
        text: '**2. Colaborând cu creatori UGC plătiți.** Când vrei volum și control, le trimiți produsul și un brief clar, iar ei produc conținut în stil autentic pe care îl deții. Un brief bun specifică: problema/beneficiul de evidențiat, hook-ul pentru primele 3 secunde, formatul, durata, ce să NU facă (ex. să nu sune „de reclamă”) și unde va fi folosit (organic sau ads). E predictibil și scalabil.',
      },
      { type: 'heading', text: 'Drepturi de utilizare și whitelisting (partea pe care o ratează majoritatea)' },
      { type: 'paragraph', text: 'Aici se vede profesionistul:' },
      {
        type: 'list',
        items: [
          '**Drepturi în scris.** Înainte să folosești conținutul unui client sau creator în reclame, ai nevoie de o licență/acord scris de utilizare (durată, canale, dacă poate fi folosit în paid). Fără el, riști dispute și retrageri.',
          '**Whitelisting / rularea prin contul creatorului.** Cele mai performante reclame UGC nu sunt difuzate de pe pagina brandului, ci prin contul creatorului, pe TikTok prin **Spark Ads**, pe Meta prin **Partnership Ads** (fostele Branded Content Ads). Reclama apare ca venind de la o persoană reală, ceea ce crește dovada socială și deseori scade costul pe rezultat. Pentru asta ai nevoie de codul de autorizare de la creator.',
          '**Disclosure (marcarea publicității).** În UE și România, conținutul plătit/sponsorizat trebuie marcat ca atare (publicitate / „ad” / „colaborare plătită”), conform regulilor de protecție a consumatorului. Nu e opțional și nu strică performanța dacă e făcut firesc.',
        ],
      },
      { type: 'heading', text: 'Greșelile care strică tot' },
      {
        type: 'paragraph',
        text: '**1. Să-l „șlefuiești” până devine reclamă.** Text mare pe ecran, voce de corporație, montaj agresiv, și ai pierdut exact ce-l făcea valoros: autenticitatea. Las-o să respire. Imperfecțiunea e o caracteristică, nu un bug.',
      },
      {
        type: 'paragraph',
        text: '**2. UGC fals/forțat.** Conținutul evident regizat („actor care se preface că e client entuziasmat”) sau materialele generate prost cu AI declanșează tocmai neîncrederea pe care UGC ar trebui s-o înlăture. Publicul din 2026 detectează rapid falsul; mai bine puțin UGC real decât mult fabricat.',
      },
      { type: 'heading', text: 'Cum măsori dacă funcționează' },
      { type: 'paragraph', text: 'Testează UGC-ul împotriva creativelor tale clasice, în aceleași campanii, și compară pe metrici precise:' },
      {
        type: 'list',
        items: [
          '**Hook rate** = vizionări de 3 secunde ÷ afișări. Cât de bine oprește scroll-ul în primele secunde.',
          '**Hold rate / retenție** = ce procent ajunge la un anumit punct al video-ului. Cât de bine ține atenția.',
          '**CPA / cost pe rezultat** vs. creativul de control. Indicatorul de profitabilitate.',
        ],
      },
      {
        type: 'paragraph',
        text: 'În majoritatea cazurilor vei vedea de ce echipele de performance cer tot mai mult conținut în stil UGC: pur și simplu scoate cifre mai bune.',
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Care e diferența dintre UGC și influencer marketing?',
            answer:
              'La influencer cumperi audiența lui (postează pe contul lui). La UGC cumperi conținutul, pe care îl deții și îl folosești tu (inclusiv în reclame, eventual prin contul creatorului, whitelisting).',
          },
          {
            question: 'Am nevoie de acordul clientului ca să-i folosesc postarea în reclame?',
            answer: 'Da. Ai nevoie de un acord scris de utilizare. Folosirea fără permisiune e un risc legal și de reputație.',
          },
          {
            question: 'De ce convertește UGC mai bine?',
            answer: 'Pentru că oamenii au încredere în oameni (~92% se încred în recomandările altora peste reclame), iar conținutul care nu pare reclamă trece de „orbirea la reclame”.',
          },
          {
            question: 'Trebuie să marchez UGC-ul plătit ca publicitate?',
            answer: 'Da. În UE și România, conținutul plătit/sponsorizat trebuie marcat ca atare. Făcut firesc, nu strică performanța.',
          },
        ],
      },
    ],
  },
  {
    slug: 'cum-scrii-scriptul-unui-reel-care-converteste',
    category: 'Video & Content',
    title: 'Cum scrii scriptul unui reel care convertește',
    excerpt:
      'Hook (0-3s) → Corp/Valoare → Payoff → CTA. Structura testată pe peste 118.000 de videoclipuri virale, plus formulele de hook și greșelile care ucid retenția în primele secunde.',
    date: '08 MAI 2026',
    readTime: '8 MIN',
    articleNumber: '22',
    coverIcon: 'clapperboard',
    content: [
      {
        type: 'lead',
        text: '**Răspuns scurt:** un reel care convertește urmează o structură clară — **Hook (0-3s) → Corp/Valoare → Payoff → CTA** — și se câștigă sau se pierde în primele 3 secunde. Regulile de fier: scrie hook-ul ca să funcționeze și fără sunet (text pe ecran + vorbit), livrează imediat ce-ai promis (fără „hey guys”), pune un singur CTA potrivit cu obiectivul, și termină cu o buclă care provoacă revederea. Structura nu e teorie: cadrul Hook → Problemă → Soluție → CTA a fost testat pe peste 118.000 de videoclipuri virale (studiul de retenție OpusClip).',
      },
      { type: 'heading', text: 'Structura de bază' },
      {
        type: 'paragraph',
        text: 'Toate cadrele care funcționează sunt variații pe aceeași coloană: Hook (0-3s) → Corp/escaladare (3s până la ~80% din durată) → Payoff (ultimele 15-25%) → CTA/buclă (ultimele 3-5s). Alege varianta după obiectiv: Hook-Valoare-CTA (general), Hook-Problemă-Soluție-CTA, Before-After-Bridge (transformări), sau AIDA condensat. Atenție 0-2s, Interes 2-8s, Dorință 8-20s, Acțiune în ultimele 3-5s.',
      },
      { type: 'heading', text: 'Hook-ul (primele 3 secunde): unde se câștigă sau se pierde tot' },
      {
        type: 'paragraph',
        text: 'Aici se decide totul. 71% dintre spectatori decid în primele secunde dacă rămân sau dau scroll, iar retenția medie pe short-form e undeva aproape de 1,5 secunde, oamenii decid în ~2-3 secunde dacă merită să continue. Reguli pentru hook: **Pornește lângă payoff, nu cu context.** Intro-urile lente, saluturile generice și title-card-urile irosesc exact secundele care decid retenția; arată rezultatul finit înainte de lecție, masa dezordonată înainte de sfatul de organizare, produsul rezolvând problema înainte să-l explici. Fără „hey guys”, fără logo intro. **Funcționează cu sunetul oprit.** Combină cele cinci straturi de hook: vizualul, textul de pe ecran, captionul, vocea și sunetul de fundal, ca spectatorul să vadă, citească și audă ideea simultan. Primul subtitlu: 4-7 cuvinte, contrast mare. **Pune cuvântul-cheie în primele 3 secunde** (rostit + pe ecran), pentru social SEO, algoritmul „ascultă” și „citește” ca să te indexeze ca răspuns la o căutare.',
      },
      {
        type: 'list',
        items: [
          '**Pattern interrupt.** Folosește o afirmație contrară, o statistică surprinzătoare, o întrebare îndrăzneață sau un șoc vizual, „Faci asta greșit” sau „Trucul ăsta mi-a adus 1M de vizualizări” creează curiozitate instant.',
          '**Testul.** Citește hook-ul cu voce tare în 3 secunde: are sens și creează intrigă chiar și fără context?',
        ],
      },
      { type: 'heading', text: 'Formule de hook care funcționează' },
      {
        type: 'list',
        items: [
          '**Result-first:** „Cum am făcut [rezultat] în [timp].” (Începe cu rezultatul, apoi procesul.)',
          '**Mistake callout:** „Faci [lucru] mai greu decât trebuie.” / „Iată ce greșesc cei mai mulți.”',
          '**Contrarian:** „Tot ce ți s-a spus despre [X] e greșit.”',
          '**Stat-shock:** „[Cifră surprinzătoare], iată de ce.”',
          '**Problem callout:** „De ce [problemă] ți se întâmplă mereu.”',
        ],
      },
      { type: 'heading', text: 'Corpul: livrează promisiunea și păstrează momentum' },
      {
        type: 'paragraph',
        text: 'Greșeala fatală e ca hook-ul să promită și corpul „să reseteze” povestea. Hook-ul face o promisiune, corpul o dovedește (demo, dovadă socială, mecanism, transformare); dacă hook-ul e tare dar corpul reia introducerea, retenția se prăbușește. Reguli:',
      },
      {
        type: 'list',
        items: [
          '**Un singur punct, nu trei.** O idee, un sfat, o lecție, nu trei.',
          '**Front-load valoarea.** Nu păstra payoff-ul pentru final, pe short-form, finalul s-ar putea să nu vină niciodată.',
          '**Ritm constant.** Mișcă un element vizual nou la fiecare 2-3 secunde, ca să simtă momentum, nu expunere. În 2026, „dwell time”-ul (timpul petrecut) e cea mai importantă metrică.',
        ],
      },
      { type: 'heading', text: 'CTA care convertește: arhitectura stratificată' },
      {
        type: 'paragraph',
        text: 'Aici greșesc majoritatea, mizând totul pe un end-card. CTA-urile de tip „end card” suferă de drop-off înainte de ultimul cadru, pe TikTok, autoplay-ul spre următorul video începe înainte ca creatorul să termine de vorbit; soluția e o arhitectură stratificată: un CTA comportamental încastrat la mijloc (secundele 10-20) plus o instrucțiune directă la final. Potrivește CTA-ul cu obiectivul:',
      },
      {
        type: 'list',
        items: [
          '**Comentarii:** „Comentează [CUVÂNT] și îți trimit [resursă].” CTA-urile cu cuvânt-cheie în comentariu aduc de ~1,5-2,2x mai multe comentarii.',
          '**Salvări:** „Salvează pentru mai târziu” legat de un pas concret. CTA-urile de „save” cresc reach-ul pe 7-14 zile pe Reels.',
          '**Follow:** o promisiune de valoare viitoare.',
          '**Click:** formularea „link în bio” performează mai bine decât „link în comentarii” pe Shorts.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Regula de aur: **un singur CTA per video**, natural, nu agresiv. Și nu uita, algoritmii TikTok și Reels răspund tot mai mult la viteza comentariilor și la rata de salvare, nu doar la watch time, deci CTA-ul tău e și un semnal de distribuție.',
      },
      { type: 'heading', text: 'Bucla: cum provoci revederea (rewatch)' },
      {
        type: 'paragraph',
        text: 'Reluările sunt un semnal puternic de viral. Trucul: proiectează ultima jumătate de secundă ca să se potrivească vizual cu primul cadru, ca reluarea să pară intenționată; un subtitlu circular de final („Și de-aia contează prima frază…”) propulsează rewatch-ul. Template: Payoff → „Dar nu funcționează dacă ratezi X…” → tăietură la vizualul de deschidere.',
      },
      { type: 'heading', text: 'Lungimea și pacing-ul' },
      {
        type: 'paragraph',
        text: 'Mai scurt = completion rate mai mare. Lungimea optimă e 15-60 de secunde; videoclipurile sub 90 de secunde rețin în medie ~50% dintre spectatori, iar peste atât rata de finalizare scade semnificativ. Pentru scripturile Hook-Body-CTA, 30-50 de secunde e „sweet spot”-ul pentru o rată de finalizare mare. Și nu umple timpul: dacă mesajul tău se încheie în 20 de secunde, oprește la 20, respectă timpul spectatorului. (~75 de cuvinte = ~30 de secunde la ritm natural.)',
      },
      { type: 'heading', text: 'Captions și sound-off' },
      {
        type: 'paragraph',
        text: 'Mulți privesc fără sunet. Scrie prima frază ca să funcționeze atât ca audio, cât și ca text pe ecran, fiindcă mulți privesc cu sunetul oprit. În plus, textul de pe ecran cu cuvântul-cheie e citit de motoarele de căutare AI prin OCR, deci subtitrarea îți aduce și retenție, și SEO.',
      },
      { type: 'heading', text: 'Cum testezi: modular, nu „tot odată”' },
      {
        type: 'paragraph',
        text: 'Cea mai mare eroare e să schimbi tot și să nu înveți nimic. Dacă schimbi simultan hook, corp, ofertă, CTA și format, nu afli nimic din rezultat; testează modular: scrie 5 variante de hook, înregistrează doar primele 3 secunde diferit, păstrează corpul identic. Un sprint de 7 zile: ziua 1 — 5 hook-uri per idee; ziua 2 — înregistrezi primele 3s; ziua 3 — montezi cu micro-tăieturi și subtitrări; ziua 4 — publici; ziua 5 — citești curbele (hold la 3s, AVD, rewatches); ziua 6 — iterezi hook-ul câștigător și testezi un CTA nou. Metrici de urmărit: hold la 3 secunde, durata medie vizionată (AVD), CTR, comentarii, salvări.',
      },
      { type: 'heading', text: 'Reglaje pe platformă' },
      {
        type: 'paragraph',
        text: 'TikTok cere un pattern interrupt mai rapid și energie mare; Meta/Reels cer un prim 3 secunde și mai strâns, plus polish și salvări; YouTube Shorts cere un payoff mai clar — spectatorul vrea să știe ce va învăța, vedea sau evita dacă privește până la final. Produci o dată, dar reglezi hook-ul și primul cadru pentru fiecare.',
      },
      { type: 'heading', text: 'Greșeli de evitat' },
      {
        type: 'list',
        items: [
          'Intro lent („hey guys, azi vă vorbesc despre…”), ucide retenția în secundele care contează.',
          'Hook care nu se înțelege cu sunetul oprit.',
          'Trei idei într-un video în loc de una.',
          'Payoff-ul ținut pentru final (pe care nimeni nu-l atinge).',
          'CTA-uri multiple sau vagi („learn more”) în loc de unul clar.',
          'Să umpli timp ca să pară „complet”.',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Cât de important e hook-ul?',
            answer: 'Decisiv. 71% decid în primele secunde, iar retenția medie e ~1,5s. Dacă hook-ul nu prinde, restul scriptului e irelevant.',
          },
          {
            question: 'Care e structura unui reel care convertește?',
            answer: 'Hook (0-3s) → Corp/Valoare → Payoff → CTA, cu o buclă la final pentru rewatch. Un singur punct, un singur CTA.',
          },
          {
            question: 'Ce CTA folosesc?',
            answer:
              'Unul singur, potrivit cu obiectivul: „comentează X” (comentarii), „salvează pentru mai târziu” (reach pe Reels), follow (valoare viitoare) sau link în bio (click). Pune și un cue încastrat la mijloc, nu doar la final.',
          },
          {
            question: 'Ce lungime e ideală?',
            answer: '15-60 de secunde; 30-50s pentru completare bună. Mai scurt înseamnă completion rate mai mare. Nu umple timp degeaba.',
          },
          {
            question: 'Cum îmi îmbunătățesc reels-urile care nu performează?',
            answer: 'Aproape mereu e hook-ul. Testează 5 hook-uri pe aceeași idee, păstrând corpul identic, și uită-te la hold-ul de la 3 secunde.',
          },
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}
