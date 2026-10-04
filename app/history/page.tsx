"use client";

import { Archive, BookOpen, Home, Wheat } from "lucide-react";
import { useEffect, useState } from "react";

type Language = "ca" | "es" | "en";

const languages: { code: Language; label: string }[] = [
  { code: "ca", label: "CA" },
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

const translations = {
  ca: {
    nav: {
      home: "Torna a l'inici",
      language: "Idioma",
    },
    hero: {
      label: "Història fictícia · demo",
      title: "Des de 1928, una taula compartida.",
      text: "La història del Forn del Born és una narració fictícia creada per a aquesta web de demostració, inspirada en l'ofici i la vida de barri de Barcelona.",
      dates: "1928 → 1960 → 1995 → Avui",
    },
    intro: {
      label: "El relat",
      title: "Una família, un forn petit i el costum de començar abans que surti el sol.",
      text: "Segons aquesta història imaginada, Josep i Maria Rovira van aixecar la persiana d'un petit obrador del Born l'any 1928. Ella portava una llibreta amb receptes de casa; ell coneixia els veïns pel nom. Entre sacs de farina, cafè acabat de moldre i fornades lentes, el forn es va convertir en un punt de trobada discret per a gent que volia pa honest i una conversa curta abans de continuar el dia.",
    },
    archive: {
      label: "Arxiu recreat",
      title: "Fotografies d'ambient, generades per a aquesta demo.",
      caption:
        "Imatges fictícies amb aparença d'arxiu: forners, família, interior antic i taulell de barri. No representen persones reals ni documents històrics.",
      alt: "Collage fictici d'arxiu vintage amb forners, família i interior d'un forn antic de Barcelona",
    },
    timeline: {
      label: "Cronologia",
      title: "Quatre moments d'un forn imaginat.",
      items: [
        {
          date: "1928",
          title: "Josep i Maria obren l'obrador",
          text: "El primer pa surt d'un forn de pedra prop del mercat. La recepta principal és senzilla: massa mare, farina local, temps i una mica de paciència.",
        },
        {
          date: "1960",
          title: "La segona generació manté el barri",
          text: "Pere i Montserrat amplien el taulell sense perdre el tracte de sempre. El forn resisteix els canvis de la ciutat amb coques, pans rodons i esmorzars matiners.",
        },
        {
          date: "1995",
          title: "Nous oficis, mateixa massa mare",
          text: "Laia Rovira recupera fermentacions llargues i afegeix cafè d'especialitat. El local es fa més net i minimal, però conserva prestatges de fusta i el ritme lent.",
        },
        {
          date: "Avui",
          title: "Un forn de barri amb mirada actual",
          text: "La família fictícia continua fent pa cada matí per al Born: brioixeria acabada de fer, cafè bo i una manera tranquil·la de rebre qui entra.",
        },
      ],
    },
    note: "Contingut fictici per a una web demo. Cap nom, data familiar o fotografia correspon a una història real del negoci.",
  },
  es: {
    nav: {
      home: "Volver al inicio",
      language: "Idioma",
    },
    hero: {
      label: "Historia ficticia · demo",
      title: "Desde 1928, una mesa compartida.",
      text: "La historia de Forn del Born es una narración ficticia creada para esta web de demostración, inspirada en el oficio y la vida de barrio de Barcelona.",
      dates: "1928 → 1960 → 1995 → Hoy",
    },
    intro: {
      label: "El relato",
      title: "Una familia, un horno pequeño y la costumbre de empezar antes de que salga el sol.",
      text: "Según esta historia imaginada, Josep y Maria Rovira levantaron la persiana de un pequeño obrador del Born en 1928. Ella llevaba una libreta con recetas de casa; él conocía a los vecinos por su nombre. Entre sacos de harina, café recién molido y hornadas lentas, el horno se convirtió en un punto de encuentro discreto para quienes querían pan honesto y una conversación breve antes de seguir el día.",
    },
    archive: {
      label: "Archivo recreado",
      title: "Fotografías de ambiente, generadas para esta demo.",
      caption:
        "Imágenes ficticias con aspecto de archivo: panaderos, familia, interior antiguo y mostrador de barrio. No representan personas reales ni documentos históricos.",
      alt: "Collage ficticio de archivo vintage con panaderos, familia e interior de un horno antiguo de Barcelona",
    },
    timeline: {
      label: "Cronología",
      title: "Cuatro momentos de un horno imaginado.",
      items: [
        {
          date: "1928",
          title: "Josep y Maria abren el obrador",
          text: "El primer pan sale de un horno de piedra cerca del mercado. La receta principal es sencilla: masa madre, harina local, tiempo y un poco de paciencia.",
        },
        {
          date: "1960",
          title: "La segunda generación sostiene el barrio",
          text: "Pere y Montserrat amplían el mostrador sin perder el trato de siempre. El horno resiste los cambios de la ciudad con cocas, panes redondos y desayunos tempranos.",
        },
        {
          date: "1995",
          title: "Nuevos oficios, la misma masa madre",
          text: "Laia Rovira recupera fermentaciones largas y suma café de especialidad. El local se vuelve más limpio y minimalista, pero conserva estantes de madera y el ritmo lento.",
        },
        {
          date: "Hoy",
          title: "Un horno de barrio con mirada actual",
          text: "La familia ficticia sigue haciendo pan cada mañana para el Born: bollería recién hecha, buen café y una forma tranquila de recibir a quien entra.",
        },
      ],
    },
    note: "Contenido ficticio para una web demo. Ningún nombre, fecha familiar o fotografía corresponde a una historia real del negocio.",
  },
  en: {
    nav: {
      home: "Back to home",
      language: "Language",
    },
    hero: {
      label: "Fictional history · demo",
      title: "Since 1928, a table shared.",
      text: "The story of Forn del Born is fictional demo content, inspired by Barcelona bakery craft and neighborhood life.",
      dates: "1928 → 1960 → 1995 → Today",
    },
    intro: {
      label: "The story",
      title: "A family, a small oven and the habit of starting before sunrise.",
      text: "In this imagined story, Josep and Maria Rovira opened the shutters of a small bakery workshop in El Born in 1928. She carried a notebook of family recipes; he knew the neighbors by name. Among flour sacks, freshly ground coffee and slow bakes, the bakery became a quiet meeting point for people who wanted honest bread and a short conversation before the day moved on.",
    },
    archive: {
      label: "Recreated archive",
      title: "Atmospheric photographs generated for this demo.",
      caption:
        "Fictional archive-style images: bakers, family, an old interior and a neighborhood counter. They do not depict real people or historical documents.",
      alt: "Fictional vintage archive collage with bakers, a family and the interior of an old Barcelona bakery",
    },
    timeline: {
      label: "Timeline",
      title: "Four moments in an imagined bakery.",
      items: [
        {
          date: "1928",
          title: "Josep and Maria open the workshop",
          text: "The first loaves leave a stone oven near the market. The core recipe is simple: sourdough, local flour, time and a little patience.",
        },
        {
          date: "1960",
          title: "The second generation keeps the neighborhood close",
          text: "Pere and Montserrat widen the counter without losing the familiar welcome. The bakery carries the city through change with cocas, round loaves and early breakfasts.",
        },
        {
          date: "1995",
          title: "New craft, the same sourdough",
          text: "Laia Rovira brings back long fermentations and adds specialty coffee. The shop becomes cleaner and more minimal, while keeping wooden shelves and a slower rhythm.",
        },
        {
          date: "Today",
          title: "A neighborhood bakery with a modern eye",
          text: "The fictional family still bakes for El Born each morning: fresh pastries, great coffee and a calm way of welcoming everyone who steps inside.",
        },
      ],
    },
    note: "Fictional content for a demo website. No name, family date or photograph corresponds to a real business history.",
  },
};

const archiveImage = "/history-archive.png";

export default function HistoryPage() {
  const [language, setLanguage] = useState<Language>("ca");
  const t = translations[language];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("lang");
    const saved = window.localStorage.getItem("forn-del-born-language");

    if (requested === "ca" || requested === "es" || requested === "en") {
      setLanguage(requested);
      return;
    }

    if (saved === "ca" || saved === "es" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("forn-del-born-language", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className="min-h-screen bg-[#fbf5ea] text-[#24150f]">
      <header className="border-b border-[#d8c1a0]/[0.75] bg-[#fbf5ea]/[0.92] backdrop-blur-xl">
        <nav className="site-container flex min-h-[72px] items-center justify-between gap-4 py-3">
          <a className="group flex items-center gap-3 text-left" href={`/?lang=${language}`}>
            <span className="grid h-9 w-9 place-items-center border border-[#2f1c14]/[0.2] bg-[#fffaf3]/[0.5] text-[0.7rem] font-black text-[#8b4a38]">
              FB
            </span>
            <span>
              <span className="block font-serif text-lg leading-none sm:text-xl">
                Forn del Born
              </span>
              <span className="block text-xs font-semibold text-[#80634b]">
                El Born, Barcelona
              </span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <LanguageSwitch
              current={language}
              label={t.nav.language}
              onChange={setLanguage}
            />
            <a
              className="hidden min-h-11 items-center justify-center gap-2 border border-[#2f1c14]/[0.18] bg-[#fffaf3]/[0.58] px-4 text-sm font-bold text-[#3b2117] transition hover:bg-[#fffaf3] sm:inline-flex"
              href={`/?lang=${language}`}
            >
              <Home size={17} />
              {t.nav.home}
            </a>
          </div>
        </nav>
      </header>

      <section className="site-container grid gap-10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="section-label">{t.hero.label}</p>
          <h1 className="max-w-[10ch] font-serif text-[clamp(3.2rem,14vw,8rem)] leading-[0.9] text-[#2b160f]">
            {t.hero.title}
          </h1>
        </div>
        <div className="max-w-2xl lg:pb-3">
          <p className="text-base leading-7 text-[#624938] sm:text-lg sm:leading-8">
            {t.hero.text}
          </p>
          <div className="mt-7 flex flex-col gap-4 border-y border-[#d8c1a0] py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-2xl text-[#3b2117] sm:text-3xl">
              {t.hero.dates}
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-[#6f7340]">
              <Wheat size={19} />
              <span>Forn del Born</span>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container border-t border-[#d8c1a0] py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="section-label">{t.intro.label}</p>
            <h2 className="section-title max-w-2xl">{t.intro.title}</h2>
          </div>
          <p className="text-base leading-8 text-[#5f432f] sm:text-lg sm:leading-9">
            {t.intro.text}
          </p>
        </div>
      </section>

      <section className="site-container py-6 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
          <figure className="overflow-hidden border border-[#d8c1a0] bg-[#fffaf3] p-2 shadow-[0_22px_60px_rgba(47,28,20,0.1)]">
            <img
              alt={t.archive.alt}
              className="aspect-[16/10] w-full object-cover sepia-[0.18] contrast-[0.96] saturate-[0.7]"
              src={archiveImage}
            />
          </figure>
          <div className="border-t border-[#c9ab84] pt-6">
            <p className="section-label">{t.archive.label}</p>
            <h2 className="font-serif text-[clamp(2.2rem,7vw,4.35rem)] leading-[0.98] text-[#2b160f]">
              {t.archive.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#6d4f39]">
              {t.archive.caption}
            </p>
          </div>
        </div>
      </section>

      <section className="site-container py-16 sm:py-20">
        <div className="mb-10 border-t border-[#d8c1a0] pt-8">
          <p className="section-label">{t.timeline.label}</p>
          <h2 className="section-title max-w-2xl">{t.timeline.title}</h2>
        </div>

        <div className="grid gap-7 md:grid-cols-4 md:gap-5">
          {t.timeline.items.map((item) => (
            <article
              className="border-t border-[#8b4a38]/[0.38] pt-5"
              key={item.date}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#2f1c14] text-[#fff8ea]">
                <BookOpen size={20} />
              </div>
              <p className="font-serif text-[2.35rem] leading-none text-[#8b4a38]">
                {item.date}
              </p>
              <h3 className="mt-4 font-serif text-[1.7rem] leading-tight text-[#2b160f]">
                {item.title}
              </h3>
              <p className="mt-4 text-[0.98rem] leading-7 text-[#684d39]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-[#24150f] py-12 text-[#fff8ea]">
        <div className="site-container flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-[#d3a25d]">
              <Archive size={18} />
              Demo
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f3d39b] sm:text-base sm:leading-7">
              {t.note}
            </p>
          </div>
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#f3d39b]/[0.45] px-5 py-3 text-sm font-bold text-[#fff8ea] transition hover:bg-[#fff8ea] hover:text-[#24150f]"
            href={`/?lang=${language}`}
          >
            <Home size={18} />
            {t.nav.home}
          </a>
        </div>
      </footer>
    </main>
  );
}

function LanguageSwitch({
  current,
  label,
  onChange,
}: {
  current: Language;
  label: string;
  onChange: (language: Language) => void;
}) {
  return (
    <div
      aria-label={label}
      className="inline-flex items-center border border-[#2f1c14]/[0.18] bg-[#fffaf3]/[0.6] p-1 text-xs font-bold"
      role="group"
    >
      {languages.map((language) => (
        <button
          aria-pressed={current === language.code}
          className={`px-3 py-2 transition ${
            current === language.code
              ? "bg-[#2f1c14] text-[#fff8ea]"
              : "text-[#6d4f39] hover:text-[#24150f]"
          }`}
          key={language.code}
          onClick={() => onChange(language.code)}
          type="button"
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}
