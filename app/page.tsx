"use client";

import {
  AtSign,
  BookOpen,
  Coffee,
  MapPin,
  Menu,
  Sparkles,
  Sprout,
  Wheat,
  X,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Language = "ca" | "es" | "en";

type Product = {
  name: string;
  description: string;
  price?: string;
};

const languages: { code: Language; label: string }[] = [
  { code: "ca", label: "CA" },
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

const images = {
  hero:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=85",
  croissant:
    "https://unsplash.com/photos/sqkXyyj4WdE/download?force=true&w=1200",
  counter:
    "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=85",
  coffee:
    "https://images.unsplash.com/photo-1769138886199-7cc55bf86da5?auto=format&fit=crop&w=1200&q=85",
  dough: "https://unsplash.com/photos/tOYiQxF9-Ys/download?force=true&w=1200",
  pastries:
    "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1200&q=85",
  breakfast:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
  barcelona:
    "https://images.unsplash.com/photo-1769988638107-445221fe852f?auto=format&fit=crop&w=1800&q=85",
  focaccia:
    "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=1200&q=85",
};

const productImages = [
  images.counter,
  images.croissant,
  images.pastries,
  images.focaccia,
  images.dough,
  images.coffee,
];

const galleryImages = [
  images.croissant,
  images.breakfast,
  images.counter,
  images.coffee,
  images.barcelona,
  images.pastries,
];

const translations = {
  ca: {
    nav: {
      home: "Inici",
      bakery: "El forn",
      products: "Productes",
      contact: "Contacte",
      directions: "Com arribar",
      menu: "Obrir menú",
      close: "Tancar menú",
      language: "Idioma",
    },
    hero: {
      eyebrow: "Fet cada matí a Barcelona.",
      title: "Pa fet amb temps.",
      text: "Pa artesà, brioixeria acabada de fer i bon cafè al cor del Born des de 1928.",
      products: "Veure productes",
      visit: "Visita'ns",
      badge: "Massa mare viva · Cafè d'especialitat · Born",
    },
    featured: {
      label: "Especialitats",
      title: "El que surt del forn",
      text: "Una selecció curta, feta per omplir el taulell de bon aroma i textura.",
      products: [
        {
          name: "Pa de massa mare",
          description: "Crosta fosca, molla humida i fermentació llarga.",
          price: "4,80 €",
        },
        {
          name: "Croissant de mantega",
          description: "Fullat cada matí, daurat i lleugerament torrat.",
          price: "2,40 €",
        },
        {
          name: "Pain au chocolat",
          description: "Xocolata negra, mantega i capes fines.",
          price: "2,80 €",
        },
        {
          name: "Coca de temporada",
          description: "Fruita del mercat i massa tendra de forn.",
          price: "3,20 €",
        },
        {
          name: "Ensaimada",
          description: "Suau, airejada i acabada amb sucre fi.",
          price: "2,90 €",
        },
        {
          name: "Focaccia",
          description: "Romaní, oli d'oliva i sal marina.",
          price: "4,20 €",
        },
      ] satisfies Product[],
    },
    story: {
      label: "El nostre forn",
      title: "Ingredients senzills. Temps. I molta cura.",
      text: "Cada dia comencem abans que desperti la ciutat. Treballem amb massa mare, fermentacions llargues i farines que coneixem, per fer pa i brioixeria amb gust de barri.",
      link: "Coneix la nostra història",
    },
    experience: {
      title: "El teu esmorzar al Born.",
      text: "Pa calent, cafè i una mica de Barcelona.",
    },
    daily: {
      label: "Selecció diària",
      title: "Avui al forn",
      note: "La selecció canvia cada dia segons el forn i la temporada.",
      items: [
        "Croissant clàssic",
        "Pa de pagès",
        "Focaccia de romaní",
        "Cinnamon roll",
        "Coca de xocolata",
      ],
    },
    philosophy: {
      label: "La manera de fer",
      title: "Poca pressa, molta mà.",
      values: [
        {
          title: "Fer-ho lent",
          text: "Fermentacions llargues i sense presses.",
        },
        {
          title: "Fer-ho bé",
          text: "Ingredients de qualitat i receptes honestes.",
        },
        {
          title: "Fer-ho aquí",
          text: "Elaborat cada dia al nostre obrador de Barcelona.",
        },
      ],
    },
    location: {
      label: "Visita'ns",
      title: "Ens trobaràs al Born.",
      hours: "Horaris",
      weekdays: "Dilluns - Divendres",
      weekend: "Dissabte - Diumenge",
      maps: "Obrir a Google Maps",
      instagram: "Instagram",
      mapLabel: "El Born, Barcelona",
    },
    social: {
      label: "@forndelborn",
      title: "Del forn al feed.",
      button: "Segueix-nos a Instagram",
    },
    footer: {
      text: "Pa artesà fet cada dia a Barcelona.",
      address: "Adreça",
      hours: "Horaris",
      copyright: "© 2026 Forn del Born",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      bakery: "El horno",
      products: "Productos",
      contact: "Contacto",
      directions: "Cómo llegar",
      menu: "Abrir menú",
      close: "Cerrar menú",
      language: "Idioma",
    },
    hero: {
      eyebrow: "Hecho cada mañana en Barcelona.",
      title: "Pan hecho con tiempo.",
      text: "Pan artesano, bollería recién hecha y buen café en el corazón del Born desde 1928.",
      products: "Ver productos",
      visit: "Visítanos",
      badge: "Masa madre viva · Café de especialidad · Born",
    },
    featured: {
      label: "Especialidades",
      title: "Lo que sale del horno",
      text: "Una selección breve, pensada para llenar el mostrador de aroma y textura.",
      products: [
        {
          name: "Pan de masa madre",
          description: "Corteza oscura, miga húmeda y fermentación larga.",
          price: "4,80 €",
        },
        {
          name: "Croissant de mantequilla",
          description: "Hojaldrado cada mañana, dorado y ligeramente tostado.",
          price: "2,40 €",
        },
        {
          name: "Pain au chocolat",
          description: "Chocolate negro, mantequilla y capas finas.",
          price: "2,80 €",
        },
        {
          name: "Coca de temporada",
          description: "Fruta del mercado y masa tierna de obrador.",
          price: "3,20 €",
        },
        {
          name: "Ensaimada",
          description: "Suave, aireada y acabada con azúcar fino.",
          price: "2,90 €",
        },
        {
          name: "Focaccia",
          description: "Romero, aceite de oliva y sal marina.",
          price: "4,20 €",
        },
      ] satisfies Product[],
    },
    story: {
      label: "Nuestro horno",
      title: "Ingredientes sencillos. Tiempo. Y mucho cuidado.",
      text: "Cada día empezamos antes de que despierte la ciudad. Trabajamos con masa madre, fermentaciones largas y harinas que conocemos, para hacer pan y bollería con sabor de barrio.",
      link: "Conoce nuestra historia",
    },
    experience: {
      title: "Tu desayuno en el Born.",
      text: "Pan caliente, café y un poco de Barcelona.",
    },
    daily: {
      label: "Selección diaria",
      title: "Hoy en el horno",
      note: "La selección cambia cada día según el horno y la temporada.",
      items: [
        "Croissant clásico",
        "Pan de payés",
        "Focaccia de romero",
        "Cinnamon roll",
        "Coca de chocolate",
      ],
    },
    philosophy: {
      label: "Nuestra manera",
      title: "Poca prisa, mucha mano.",
      values: [
        {
          title: "Hacerlo lento",
          text: "Fermentaciones largas y sin prisas.",
        },
        {
          title: "Hacerlo bien",
          text: "Ingredientes de calidad y recetas honestas.",
        },
        {
          title: "Hacerlo aquí",
          text: "Elaborado cada día en nuestro obrador de Barcelona.",
        },
      ],
    },
    location: {
      label: "Visítanos",
      title: "Nos encontrarás en el Born.",
      hours: "Horarios",
      weekdays: "Lunes - Viernes",
      weekend: "Sábado - Domingo",
      maps: "Abrir en Google Maps",
      instagram: "Instagram",
      mapLabel: "El Born, Barcelona",
    },
    social: {
      label: "@forndelborn",
      title: "Del horno al feed.",
      button: "Síguenos en Instagram",
    },
    footer: {
      text: "Pan artesano hecho cada día en Barcelona.",
      address: "Dirección",
      hours: "Horarios",
      copyright: "© 2026 Forn del Born",
    },
  },
  en: {
    nav: {
      home: "Home",
      bakery: "The bakery",
      products: "Products",
      contact: "Contact",
      directions: "Directions",
      menu: "Open menu",
      close: "Close menu",
      language: "Language",
    },
    hero: {
      eyebrow: "Made every morning in Barcelona.",
      title: "Bread made with time.",
      text: "Artisan bread, freshly baked pastries and great coffee in the heart of El Born since 1928.",
      products: "See products",
      visit: "Visit us",
      badge: "Living sourdough · Specialty coffee · Born",
    },
    featured: {
      label: "Specialties",
      title: "Fresh from the oven",
      text: "A small selection made to fill the counter with aroma and texture.",
      products: [
        {
          name: "Sourdough loaf",
          description: "Dark crust, moist crumb and long fermentation.",
          price: "€4.80",
        },
        {
          name: "Butter croissant",
          description: "Laminated every morning, golden and lightly toasted.",
          price: "€2.40",
        },
        {
          name: "Pain au chocolat",
          description: "Dark chocolate, butter and delicate layers.",
          price: "€2.80",
        },
        {
          name: "Seasonal coca",
          description: "Market fruit and tender bakery dough.",
          price: "€3.20",
        },
        {
          name: "Ensaimada",
          description: "Soft, airy and finished with fine sugar.",
          price: "€2.90",
        },
        {
          name: "Focaccia",
          description: "Rosemary, olive oil and sea salt.",
          price: "€4.20",
        },
      ] satisfies Product[],
    },
    story: {
      label: "Our bakery",
      title: "Simple ingredients. Time. And plenty of care.",
      text: "Every day starts before the city wakes. We work with sourdough, long fermentations and flours we know, making bread and pastries with a neighborhood soul.",
      link: "Meet our story",
    },
    experience: {
      title: "Your breakfast in El Born.",
      text: "Warm bread, coffee and a little Barcelona.",
    },
    daily: {
      label: "Daily selection",
      title: "Today at the bakery",
      note: "The selection changes every day with the bake and the season.",
      items: [
        "Classic croissant",
        "Country loaf",
        "Rosemary focaccia",
        "Cinnamon roll",
        "Chocolate coca",
      ],
    },
    philosophy: {
      label: "How we work",
      title: "Slow hands, honest bread.",
      values: [
        {
          title: "Make it slowly",
          text: "Long fermentations, never rushed.",
        },
        {
          title: "Make it well",
          text: "Quality ingredients and honest recipes.",
        },
        {
          title: "Make it here",
          text: "Baked every day in our Barcelona workshop.",
        },
      ],
    },
    location: {
      label: "Visit us",
      title: "Find us in El Born.",
      hours: "Opening hours",
      weekdays: "Monday - Friday",
      weekend: "Saturday - Sunday",
      maps: "Open in Google Maps",
      instagram: "Instagram",
      mapLabel: "El Born, Barcelona",
    },
    social: {
      label: "@forndelborn",
      title: "From oven to feed.",
      button: "Follow us on Instagram",
    },
    footer: {
      text: "Artisan bread made every day in Barcelona.",
      address: "Address",
      hours: "Hours",
      copyright: "© 2026 Forn del Born",
    },
  },
};

const navItems = [
  { id: "home", key: "home" },
  { id: "bakery", key: "bakery" },
  { id: "products", key: "products" },
  { id: "contact", key: "contact" },
] as const;

const addressLines = [
  "Forn del Born",
  "Carrer fictici del Born, 23",
  "08003 Barcelona",
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const icons = [Wheat, Sparkles, Sprout];

export default function Home() {
  const [language, setLanguage] = useState<Language>("ca");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -46]);
  const t = translations[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("forn-del-born-language");
    if (saved === "ca" || saved === "es" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("forn-del-born-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroStyle = useMemo(
    () => ({ backgroundImage: `url(${images.hero})` }),
    [],
  );

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main id="home" className="min-h-screen overflow-hidden bg-[#fbf5ea] text-[#24150f]">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-[#d8c1a0]/[0.7] bg-[#fbf5ea]/[0.9] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="site-container flex h-[70px] items-center justify-between gap-4">
          <button
            className="group flex items-center gap-3 text-left"
            onClick={() => scrollTo("home")}
            type="button"
          >
            <span className="grid h-9 w-9 place-items-center border border-[#2f1c14]/[0.2] bg-[#fffaf3]/[0.5] text-[0.7rem] font-black text-[#8b4a38]">
              FB
            </span>
            <span className="text-left">
              <span className="block font-serif text-lg leading-none sm:text-xl">
                Forn del Born
              </span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-[#80634b]">
                El Born, Barcelona
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            <div className="flex items-center gap-6 text-[0.9rem] font-semibold">
              {navItems.map((item) => (
                <button
                  className="group relative py-2 text-[#3a251b] transition hover:text-[#8b4a38]"
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  type="button"
                >
                  {t.nav[item.key]}
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#8b4a38] transition group-hover:scale-x-100" />
                </button>
              ))}
            </div>
            <LanguageSwitch
              current={language}
              label={t.nav.language}
              onChange={changeLanguage}
            />
            <button
              className="button-primary"
              onClick={() => scrollTo("contact")}
              type="button"
            >
              {t.nav.directions}
            </button>
          </div>

          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            className="grid h-11 w-11 place-items-center border border-[#2f1c14]/[0.2] bg-[#fffaf3]/[0.7] text-[#24150f] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-[#d8c1a0] bg-[#fbf5ea] px-4 pb-5 pt-2 lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mx-auto flex w-[min(1120px,100%)] flex-col gap-2">
              {navItems.map((item) => (
                <button
                  className="border-b border-[#e4ccb0] py-4 text-left font-serif text-[1.55rem]"
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  type="button"
                >
                  {t.nav[item.key]}
                </button>
              ))}
              <div className="flex items-center justify-between gap-4 pt-4">
                <LanguageSwitch
                  current={language}
                  label={t.nav.language}
                  onChange={changeLanguage}
                />
                <button
                  className="button-primary px-4"
                  onClick={() => scrollTo("contact")}
                  type="button"
                >
                  {t.nav.directions}
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </header>

      <section className="relative overflow-hidden pb-16 pt-[78px] sm:pb-20 sm:pt-28 lg:min-h-screen lg:pb-24">
        <div className="site-container grid items-center gap-9 lg:min-h-[calc(100vh-112px)] lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
          <motion.div
            animate="visible"
            className="max-w-[620px]"
            initial="hidden"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.p
              className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-[#8b4a38]"
              variants={fadeUp}
            >
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1
              className="max-w-[9ch] font-serif text-[clamp(3.45rem,16vw,8.7rem)] leading-[0.88] text-[#2b160f] lg:text-[clamp(5.8rem,8.2vw,8.7rem)]"
              variants={fadeUp}
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              className="mt-7 max-w-[34rem] text-base leading-7 text-[#624938] sm:text-lg sm:leading-8"
              variants={fadeUp}
            >
              {t.hero.text}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              variants={fadeUp}
            >
              <button
                className="button-primary"
                onClick={() => scrollTo("products")}
                type="button"
              >
                {t.hero.products}
              </button>
              <button
                className="button-secondary"
                onClick={() => scrollTo("contact")}
                type="button"
              >
                {t.hero.visit}
              </button>
            </motion.div>
            <motion.div
              className="mt-8 flex max-w-md items-center gap-3 border-l border-[#6f7340]/[0.45] pl-4 text-sm font-semibold text-[#5f432f]"
              variants={fadeUp}
            >
              <Wheat className="shrink-0 text-[#6f7340]" size={20} />
              {t.hero.badge}
            </motion.div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative order-first min-h-[320px] overflow-hidden bg-[#ead8bd] sm:min-h-[560px] lg:order-none lg:min-h-[74vh]"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ scale: 1 }}
              className="absolute inset-0 bg-cover bg-center"
              initial={{ scale: reducedMotion ? 1 : 1.04 }}
              style={heroStyle}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,21,15,0.03),rgba(36,21,15,0.24))]" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border border-white/[0.35] bg-[#fffaf3]/[0.78] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#4f3324] backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
              <span>Forn del Born</span>
              <span>Barcelona</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="products" className="py-20 sm:py-24">
        <div className="mb-9 grid gap-5 border-t border-[#d8c1a0] pt-8 md:grid-cols-[0.82fr_1fr] md:items-end">
          <Reveal>
            <p className="section-label">{t.featured.label}</p>
            <h2 className="section-title">{t.featured.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-base leading-7 text-[#6d4f39] sm:text-lg sm:leading-8">
              {t.featured.text}
            </p>
          </Reveal>
        </div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {t.featured.products.map((product, index) => (
            <Reveal delay={index * 0.04} key={product.name}>
              <article className="group">
                <div className="aspect-[4/3] overflow-hidden bg-[#ead8bd] sm:aspect-[5/4]">
                  <img
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                    src={productImages[index]}
                  />
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-[#ddc7a9] py-4">
                  <div>
                    <h3 className="font-serif text-[1.45rem] leading-tight">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-[0.94rem] leading-6 text-[#725540]">
                      {product.description}
                    </p>
                  </div>
                  {product.price ? (
                    <span className="shrink-0 pt-1 text-sm font-bold text-[#8b4a38]">
                      {product.price}
                    </span>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="bakery" className="py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal>
            <div className="relative">
              <img
                alt={t.story.label}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
                src={images.dough}
              />
              <div className="absolute bottom-4 left-4 max-w-[220px] border border-white/[0.45] bg-[#fffaf3]/[0.82] p-4 backdrop-blur-md sm:bottom-6 sm:left-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8b4a38]">
                  07:30
                </p>
                <p className="mt-1 text-sm leading-6 text-[#5f432f]">
                  {t.hero.eyebrow}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="max-w-xl lg:pl-10">
              <p className="section-label">{t.story.label}</p>
              <h2 className="section-title">{t.story.title}</h2>
              <p className="mt-7 text-base leading-7 text-[#654936] sm:text-lg sm:leading-8">
                {t.story.text}
              </p>
              <a
                className="mt-9 inline-flex min-h-16 w-full items-center justify-center gap-3 border border-[#2f1c14] bg-[#2f1c14] px-6 py-4 text-base font-extrabold text-[#fff8ea] shadow-[0_18px_40px_rgba(47,28,20,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1e120d] sm:w-auto sm:px-8"
                href={`/history?lang=${language}`}
              >
                <BookOpen size={21} />
                {t.story.link}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <section className="relative h-[64vh] min-h-[430px] overflow-hidden bg-[#24150f] text-[#fff8ea] sm:h-[72vh] sm:min-h-[520px]">
        <motion.img
          alt={t.experience.title}
          className="absolute inset-0 h-[110%] w-full object-cover opacity-70"
          src={images.barcelona}
          style={{ y: reducedMotion ? 0 : parallaxY }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,21,15,0.78),rgba(36,21,15,0.38))]" />
        <div className="site-container relative flex h-full items-center">
          <Reveal>
            <div className="max-w-[46rem]">
              <h2 className="font-serif text-[clamp(3rem,12vw,7.2rem)] leading-[0.92] lg:text-[clamp(4.5rem,7vw,7.2rem)]">
                {t.experience.title}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-7 text-[#f3d39b] sm:text-xl sm:leading-8">
                {t.experience.text}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section className="py-20 sm:py-24">
        <div className="mb-9 flex flex-col justify-between gap-4 border-t border-[#d8c1a0] pt-8 md:flex-row md:items-end">
          <Reveal>
            <p className="section-label">{t.daily.label}</p>
            <h2 className="section-title">{t.daily.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-base leading-7 text-[#6d4f39]">
              {t.daily.note}
            </p>
          </Reveal>
        </div>
        <div className="grid auto-rows-[170px] gap-3 sm:auto-rows-[210px] md:grid-cols-6 md:auto-rows-[170px]">
          {t.daily.items.map((item, index) => (
            <Reveal
              className={
                index === 0
                  ? "md:col-span-3 md:row-span-2"
                  : index === 1
                    ? "md:col-span-3"
                    : "md:col-span-2"
              }
              delay={index * 0.04}
              key={item}
            >
              <article className="group relative h-full overflow-hidden bg-[#e7d0ad]">
                <img
                  alt={item}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  src={productImages[(index + 1) % productImages.length]}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,21,15,0.02),rgba(36,21,15,0.58))]" />
                <h3 className="absolute bottom-4 left-4 right-4 font-serif text-[1.75rem] leading-tight text-[#fff8ea] sm:bottom-5 sm:left-5 sm:text-3xl">
                  {item}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-y border-[#d8c1a0] py-[4.5rem] sm:py-20">
        <Reveal>
          <p className="section-label">{t.philosophy.label}</p>
          <h2 className="section-title max-w-2xl">{t.philosophy.title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {t.philosophy.values.map((value, index) => {
            const Icon = icons[index];
            return (
              <Reveal delay={index * 0.08} key={value.title}>
                <div className="border-t border-[#c9ab84] pt-6">
                  <Icon className="mb-6 text-[#6f7340]" size={26} />
                  <h3 className="font-serif text-[1.65rem] leading-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#6d4f39]">
                    {value.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="contact" className="py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div>
              <p className="section-label">{t.location.label}</p>
              <h2 className="section-title">{t.location.title}</h2>
              <div className="mt-7 space-y-1.5 text-base leading-7 text-[#503829] sm:text-lg sm:leading-8">
                {addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="border-t border-[#c9ab84] pt-4">
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8b4a38]">
                    <Coffee size={18} />
                    {t.location.hours}
                  </p>
                  <p className="font-bold">{t.location.weekdays}</p>
                  <p className="text-[#654936]">07:30 - 19:30</p>
                </div>
                <div className="border-t border-[#c9ab84] pt-4">
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6f7340]">
                    <Coffee size={18} />
                    {t.location.hours}
                  </p>
                  <p className="font-bold">{t.location.weekend}</p>
                  <p className="text-[#654936]">08:00 - 20:00</p>
                </div>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  className="button-primary"
                  href="https://www.google.com/maps/search/?api=1&query=Carrer%20fictici%20del%20Born%2023%20Barcelona"
                  rel="noreferrer"
                  target="_blank"
                >
                  <MapPin size={18} />
                  {t.location.maps}
                </a>
                <a
                  className="button-secondary"
                  href="https://www.instagram.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <AtSign size={18} />
                  {t.location.instagram}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative min-h-[360px] overflow-hidden bg-[#ead8bd] p-4 sm:min-h-[460px] sm:p-6">
              <img
                alt={t.location.mapLabel}
                className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
                src={images.barcelona}
              />
              <div className="absolute inset-0 bg-[#ead8bd]/[0.76]" />
              <div className="relative h-full min-h-[328px] border border-[#8b4a38]/[0.18] bg-[#fffaf3]/[0.58] p-5 sm:min-h-[410px] sm:p-6">
                <div className="absolute left-[12%] top-[31%] h-px w-[70%] rotate-[-14deg] bg-[#8b4a38]/[0.28]" />
                <div className="absolute left-[8%] top-[58%] h-px w-[78%] rotate-[8deg] bg-[#8b4a38]/[0.24]" />
                <div className="absolute left-[44%] top-[10%] h-[78%] w-px rotate-[18deg] bg-[#6f7340]/[0.3]" />
                <div className="absolute left-[25%] top-[10%] h-[74%] w-px rotate-[-24deg] bg-[#6f7340]/[0.22]" />
                <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#8b4a38] text-[#fff8ea] sm:h-20 sm:w-20">
                    <MapPin size={30} />
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 bg-[#fffaf3]/[0.9] p-4 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                  <p className="font-serif text-2xl sm:text-3xl">Forn del Born</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#8b4a38] sm:text-sm">
                    {t.location.mapLabel}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <section className="bg-[#24150f] py-20 text-[#fff8ea] sm:py-24">
        <div className="site-container">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d3a25d]">
                {t.social.label}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.7rem,12vw,5.9rem)] leading-[0.96] lg:text-[clamp(4rem,6vw,5.9rem)]">
                {t.social.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#f3d39b]/[0.4] px-5 py-3 text-sm font-bold text-[#fff8ea] transition hover:-translate-y-px hover:bg-[#fff8ea] hover:text-[#24150f]"
                href="https://www.instagram.com/"
                rel="noreferrer"
                target="_blank"
              >
                <AtSign size={18} />
                {t.social.button}
              </a>
            </Reveal>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
            {galleryImages.map((image, index) => (
              <Reveal delay={index * 0.035} key={image}>
                <a
                  className="group block aspect-square overflow-hidden bg-[#3b2117]"
                  href="https://www.instagram.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    alt={`${t.social.label} ${index + 1}`}
                    className="h-full w-full object-cover opacity-[0.86] transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
                    src={image}
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#fffaf3] py-12 sm:py-14">
        <div className="site-container grid gap-9 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <p className="font-serif text-[1.9rem]">Forn del Born</p>
            <p className="mt-3 max-w-sm leading-7 text-[#6d4f39]">
              {t.footer.text}
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#8b4a38]">
              Menu
            </p>
            <div className="flex flex-col gap-2 text-[#503829]">
              {navItems.map((item) => (
                <button
                  className="w-fit hover:text-[#8d392d]"
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  type="button"
                >
                  {t.nav[item.key]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#8b4a38]">
              {t.footer.address}
            </p>
            <div className="space-y-1 text-[#503829]">
              {addressLines.slice(1).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#8b4a38]">
              {t.footer.hours}
            </p>
            <p className="text-[#503829]">07:30 - 19:30</p>
            <a
              className="mt-4 inline-flex items-center gap-2 font-bold text-[#3b2117] hover:text-[#8d392d]"
              href="https://www.instagram.com/"
              rel="noreferrer"
              target="_blank"
            >
              <AtSign size={17} />
              Instagram
            </a>
          </div>
        </div>
        <div className="site-container mt-10 border-t border-[#d8c1a0] pt-6 text-sm text-[#7b5a43]">
          {t.footer.copyright}
        </div>
      </footer>
    </main>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={className} id={id}>
      <div className="site-container">{children}</div>
    </section>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
      viewport={{ once: true, margin: "-80px" }}
      whileInView="visible"
    >
      {children}
    </motion.div>
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
