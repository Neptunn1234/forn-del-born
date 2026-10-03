"use client";

import {
  AtSign,
  BadgeCheck,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  PhoneCall,
  Scissors,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Language = "ca" | "es" | "en";

const languages: { code: Language; label: string }[] = [
  { code: "ca", label: "CA" },
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

const phoneNumber = "+34 631 757 391";
const whatsappBase = "https://wa.me/34631757391";
const storageKey = "distrito-barber-language";

const photos = {
  hero:
    "https://unsplash.com/photos/QDV80LO1VUQ/download?force=true&w=1800",
  cut: "https://unsplash.com/photos/Q82AM6BWBPM/download?force=true&w=1500",
  tools:
    "https://unsplash.com/photos/MNu0n-3BIKs/download?force=true&w=1500",
  toolsClose:
    "https://unsplash.com/photos/04s75rY1JPY/download?force=true&w=1200",
  station:
    "https://unsplash.com/photos/4pV_ZGTTFsk/download?force=true&w=1500",
  beard:
    "https://unsplash.com/photos/4k60yfGy7fU/download?force=true&w=1200",
  shave:
    "https://unsplash.com/photos/Twd3yaqA2NM/download?force=true&w=1500",
  finish:
    "https://unsplash.com/photos/S3GxGKyGPWM/download?force=true&w=1200",
  finishWarm:
    "https://unsplash.com/photos/zAsMbiVW5-M/download?force=true&w=1200",
};

const marqueeOne = [
  photos.cut,
  photos.tools,
  photos.beard,
  photos.station,
  photos.finish,
  photos.hero,
  photos.toolsClose,
];

const marqueeTwo = [
  photos.shave,
  photos.finishWarm,
  photos.station,
  photos.beard,
  photos.toolsClose,
  photos.cut,
  photos.hero,
];

const galleryImages = [
  photos.finish,
  photos.cut,
  photos.beard,
  photos.tools,
  photos.finishWarm,
  photos.station,
  photos.shave,
  photos.hero,
];

const translations = {
  ca: {
    nav: {
      home: "Inici",
      services: "Serveis",
      shop: "Barbería",
      gallery: "Galería",
      contact: "Contacte",
      reserve: "Reservar",
      menu: "Obrir menú",
      close: "Tancar menú",
      language: "Idioma",
    },
    whatsappMessage: "Hola, m’agradaria reservar una cita.",
    whatsappCta: "Reservar per WhatsApp",
    hero: {
      eyebrow: "Distrito Barber · Barcelona",
      title: "El teu tall. El teu estil.",
      text: "Barberia a Barcelona. Tall, barba i estil sense complicacions.",
      secondary: "Veure serveis",
      trust: "Talls · Barba · Degradats",
    },
    marquee: {
      first: "Treball de barberia, detalls i acabats recents",
      second: "Ambient, barba, eines i talls de la barberia",
    },
    services: {
      label: "Serveis",
      title: "Serveis i preus",
      subtitle: "Tria el servei que necessites.",
      cta: "Reservar cita",
      items: [
        {
          name: "Tall de cabell",
          price: "18 €",
          description:
            "Tall personalitzat segons el teu estil, acabat i pentinat final.",
          includesTitle: "Inclou",
          includes: [
            "Consulta breu amb el barber",
            "Tall amb tisora i/o maquina",
            "Acabat",
            "Pentinat final",
          ],
        },
        {
          name: "Degradat / Fade",
          price: "20 €",
          description:
            "Tall on els laterals i la part posterior passen progressivament de molt curt a més llarg, creant un degradat net i precís.",
          includesTitle: "Inclou",
          includes: [
            "Elecció de l’altura del degradat",
            "Treball detallat amb màquina",
            "Connexió amb la part superior",
            "Acabat i pentinat",
          ],
        },
        {
          name: "Barba",
          price: "12 €",
          description:
            "Retoc, definició i perfilat de la barba per donar-li una forma neta i cuidada.",
          includesTitle: "Inclou",
          includes: [
            "Retall de llargada",
            "Definició de la forma",
            "Perfilat de coll i galtes",
            "Acabat final",
          ],
        },
        {
          name: "Tall + Barba",
          price: "28 €",
          description:
            "El servei complet: tall de cabell i treball de barba en una mateixa visita.",
          includesTitle: "Inclou",
          includes: [
            "Tall personalitzat",
            "Acabat del cabell",
            "Retall i forma de la barba",
            "Perfilat",
            "Acabat final",
          ],
        },
        {
          name: "Tall a màquina",
          price: "14 €",
          description:
            "Tall uniforme o molt curt fet principalment amb màquina, ideal si busques un tall senzill i ràpid.",
          includesTitle: "Inclou",
          includes: [
            "Elecció de llargada",
            "Tall uniforme amb màquina",
            "Repàs de contorns",
            "Acabat net",
          ],
        },
        {
          name: "Tall infantil",
          price: "15 €",
          description:
            "Tall de cabell per a nens, adaptat al seu estil i amb un servei ràpid i còmode.",
          includesTitle: "Inclou",
          includes: [
            "Tall adaptat al nen",
            "Servei àgil",
            "Acabat suau",
            "Pentinat final",
          ],
        },
      ],
    },
    shop: {
      label: "La barberia",
      title: "Sense presses. Sense complicacions.",
      text: "Un espai local on venir, desconnectar i sortir amb un bon tall.",
      points: [
        "Atenció personalitzada",
        "Professionals amb experiència",
        "Reserva fàcil per WhatsApp",
      ],
    },
    why: {
      title: "La teva barberia de confiança.",
      points: [
        {
          title: "Bon tall",
          text: "Atenció al detall.",
        },
        {
          title: "Bon ambient",
          text: "Una barberia còmoda i propera.",
        },
        {
          title: "Fàcil de reservar",
          text: "Escriu-nos directament per WhatsApp.",
        },
      ],
    },
    gallery: {
      label: "Galeria",
      title: "Últims talls",
    },
    reviews: {
      title: "Què diuen els nostres clients",
      items: [
        "Tracte molt bo i tall perfecte. Hi tornaré segur.",
        "Professionals, ràpids i molt bon ambient.",
        "Molt content amb el degradat. Just el que buscava.",
      ],
    },
    contact: {
      label: "Contacte",
      title: "Vine a veure'ns",
      addressLabel: "Adreça",
      hoursLabel: "Horaris",
      weekdays: "Dilluns - Divendres",
      saturday: "Dissabte",
      sunday: "Diumenge",
      closed: "Tancat",
      directions: "Com arribar",
      mapLabel: "Carrer de Mallorca, Barcelona",
    },
    footer: {
      text: "Barberia local a Barcelona. Tall, barba i degradats.",
      links: "Enllaços",
      hours: "Horaris",
      language: "Idioma",
      copyright: "© 2026 Distrito Barber",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      shop: "Barberia",
      gallery: "Galeria",
      contact: "Contacto",
      reserve: "Reservar",
      menu: "Abrir menú",
      close: "Cerrar menú",
      language: "Idioma",
    },
    whatsappMessage: "Hola, me gustaría reservar una cita.",
    whatsappCta: "Reservar por WhatsApp",
    hero: {
      eyebrow: "Distrito Barber · Barcelona",
      title: "Tu corte. Tu estilo.",
      text: "Barbería en Barcelona. Cortes, barba y estilo sin complicaciones.",
      secondary: "Ver servicios",
      trust: "Cortes · Barba · Degradados",
    },
    marquee: {
      first: "Trabajo de barbería, detalles y acabados recientes",
      second: "Ambiente, barba, herramientas y cortes de la barbería",
    },
    services: {
      label: "Servicios",
      title: "Servicios y precios",
      subtitle: "Elige el servicio que necesitas.",
      cta: "Reservar cita",
      items: [
        {
          name: "Corte de pelo",
          price: "18 €",
          description:
            "Corte personalizado según tu estilo, acabado y peinado final.",
          includesTitle: "Incluye",
          includes: [
            "Breve consulta con el barbero",
            "Corte con tijera y/o máquina",
            "Acabado",
            "Peinado final",
          ],
        },
        {
          name: "Degradado / Fade",
          price: "20 €",
          description:
            "Corte en el que los laterales y la parte posterior pasan progresivamente de muy corto a más largo, creando un degradado limpio.",
          includesTitle: "Incluye",
          includes: [
            "Elección de la altura del degradado",
            "Trabajo detallado con máquina",
            "Conexión con la parte superior",
            "Acabado y peinado",
          ],
        },
        {
          name: "Barba",
          price: "12 €",
          description:
            "Recorte, definición y perfilado para conseguir una barba limpia y bien cuidada.",
          includesTitle: "Incluye",
          includes: [
            "Recorte de longitud",
            "Definición de la forma",
            "Perfilado de cuello y mejillas",
            "Acabado final",
          ],
        },
        {
          name: "Corte + Barba",
          price: "28 €",
          description:
            "Servicio completo de corte de pelo y arreglo de barba en una misma visita.",
          includesTitle: "Incluye",
          includes: [
            "Corte personalizado",
            "Acabado del cabello",
            "Recorte y forma de la barba",
            "Perfilado",
            "Acabado final",
          ],
        },
        {
          name: "Corte a máquina",
          price: "14 €",
          description:
            "Corte uniforme o muy corto hecho principalmente con máquina, ideal si buscas un corte sencillo y rápido.",
          includesTitle: "Incluye",
          includes: [
            "Elección de longitud",
            "Corte uniforme con máquina",
            "Repaso de contornos",
            "Acabado limpio",
          ],
        },
        {
          name: "Corte infantil",
          price: "15 €",
          description:
            "Corte de pelo para niños, adaptado a su estilo y con un servicio rápido y cómodo.",
          includesTitle: "Incluye",
          includes: [
            "Corte adaptado al niño",
            "Servicio ágil",
            "Acabado suave",
            "Peinado final",
          ],
        },
      ],
    },
    shop: {
      label: "La barbería",
      title: "Sin prisas. Sin complicaciones.",
      text: "Un espacio local donde venir, desconectar y salir con un buen corte.",
      points: [
        "Atención personalizada",
        "Profesionales con experiencia",
        "Reserva fácil por WhatsApp",
      ],
    },
    why: {
      title: "Tu barbería de confianza.",
      points: [
        {
          title: "Buen corte",
          text: "Atención al detalle.",
        },
        {
          title: "Buen ambiente",
          text: "Una barbería cómoda y cercana.",
        },
        {
          title: "Fácil de reservar",
          text: "Escríbenos directamente por WhatsApp.",
        },
      ],
    },
    gallery: {
      label: "Galería",
      title: "Últimos cortes",
    },
    reviews: {
      title: "Qué dicen nuestros clientes",
      items: [
        "Muy buen trato y corte perfecto. Volveré seguro.",
        "Profesionales, rápidos y muy buen ambiente.",
        "Muy contento con el degradado. Justo lo que buscaba.",
      ],
    },
    contact: {
      label: "Contacto",
      title: "Ven a vernos",
      addressLabel: "Dirección",
      hoursLabel: "Horario",
      weekdays: "Lunes - Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
      closed: "Cerrado",
      directions: "Cómo llegar",
      mapLabel: "Carrer de Mallorca, Barcelona",
    },
    footer: {
      text: "Barbería local en Barcelona. Corte, barba y degradados.",
      links: "Enlaces",
      hours: "Horario",
      language: "Idioma",
      copyright: "© 2026 Distrito Barber",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      shop: "Barbershop",
      gallery: "Gallery",
      contact: "Contact",
      reserve: "Book",
      menu: "Open menu",
      close: "Close menu",
      language: "Language",
    },
    whatsappMessage: "Hi, I'd like to book an appointment.",
    whatsappCta: "Book on WhatsApp",
    hero: {
      eyebrow: "Distrito Barber · Barcelona",
      title: "Your cut. Your style.",
      text: "Local barbershop in Barcelona. Haircuts, beard trims and fades.",
      secondary: "See services",
      trust: "Haircuts · Beards · Fades",
    },
    marquee: {
      first: "Barbershop work, details and recent finishes",
      second: "Atmosphere, beard work, tools and fresh cuts",
    },
    services: {
      label: "Services",
      title: "Services and prices",
      subtitle: "Choose the service you need.",
      cta: "Book appointment",
      items: [
        {
          name: "Haircut",
          price: "€18",
          description:
            "A personalized haircut based on your style, including finishing and styling.",
          includesTitle: "Includes",
          includes: [
            "Short consultation",
            "Scissors and/or clipper cut",
            "Finishing",
            "Final styling",
          ],
        },
        {
          name: "Fade haircut",
          price: "€20",
          description:
            "A haircut where the sides and back gradually transition from very short hair to longer hair, creating a clean blended effect.",
          includesTitle: "Includes",
          includes: [
            "Choice of fade height",
            "Detailed clipper work",
            "Blend into the top",
            "Finishing and styling",
          ],
        },
        {
          name: "Beard trim",
          price: "€12",
          description:
            "Trimming, shaping and defining the beard for a clean and well-groomed finish.",
          includesTitle: "Includes",
          includes: [
            "Length trim",
            "Beard shaping",
            "Neck and cheek line-up",
            "Final finish",
          ],
        },
        {
          name: "Haircut + Beard",
          price: "€28",
          description:
            "Complete haircut and beard grooming service in one appointment.",
          includesTitle: "Includes",
          includes: [
            "Personalized haircut",
            "Hair finish",
            "Beard trim and shape",
            "Line-up",
            "Final finish",
          ],
        },
        {
          name: "Clipper cut",
          price: "€14",
          description:
            "A uniform or very short haircut done mainly with clippers, ideal for a simple short look.",
          includesTitle: "Includes",
          includes: [
            "Length choice",
            "Uniform clipper cut",
            "Clean edge check",
            "Neat finish",
          ],
        },
        {
          name: "Kids haircut",
          price: "€15",
          description:
            "Haircut for children, adapted to their style with a quick and comfortable service.",
          includesTitle: "Includes",
          includes: [
            "Child-friendly haircut",
            "Quick service",
            "Soft finish",
            "Final styling",
          ],
        },
      ],
    },
    shop: {
      label: "The barbershop",
      title: "No rush. No fuss.",
      text: "A local space to come in, switch off and leave with a good cut.",
      points: [
        "Personal attention",
        "Experienced professionals",
        "Easy WhatsApp booking",
      ],
    },
    why: {
      title: "Your local barbershop.",
      points: [
        {
          title: "Good cuts",
          text: "Attention to detail.",
        },
        {
          title: "Good atmosphere",
          text: "A comfortable neighborhood barbershop.",
        },
        {
          title: "Easy to book",
          text: "Message us directly on WhatsApp.",
        },
      ],
    },
    gallery: {
      label: "Gallery",
      title: "Recent cuts",
    },
    reviews: {
      title: "What our clients say",
      items: [
        "Great service and a perfect cut. I will definitely come back.",
        "Professional, quick and a really good atmosphere.",
        "Very happy with the fade. Exactly what I was looking for.",
      ],
    },
    contact: {
      label: "Contact",
      title: "Come see us",
      addressLabel: "Address",
      hoursLabel: "Opening hours",
      weekdays: "Monday - Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      directions: "Get directions",
      mapLabel: "Carrer de Mallorca, Barcelona",
    },
    footer: {
      text: "Local barbershop in Barcelona. Haircuts, beard trims and fades.",
      links: "Links",
      hours: "Hours",
      language: "Language",
      copyright: "© 2026 Distrito Barber",
    },
  },
};

const navItems = [
  { id: "home", key: "home" },
  { id: "services", key: "services" },
  { id: "shop", key: "shop" },
  { id: "gallery", key: "gallery" },
  { id: "contact", key: "contact" },
] as const;

const addressLines = ["Distrito Barber", "Carrer de Mallorca, 000", "Barcelona"];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const whyIcons = [Scissors, Sparkles, MessageCircle];

export default function Home() {
  const [language, setLanguage] = useState<Language>("ca");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const t = translations[language];

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "ca" || saved === "es" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = useMemo(
    () => `${whatsappBase}?text=${encodeURIComponent(t.whatsappMessage)}`,
    [t.whatsappMessage],
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
    <main
      id="home"
      className="min-h-screen overflow-hidden bg-[#f5f0e8] text-[#151515]"
    >
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-black/10 bg-[#f5f0e8]/95 shadow-[0_16px_40px_rgba(0,0,0,0.07)] backdrop-blur-xl"
            : "border-white/10 bg-[#101010]/20 text-white backdrop-blur-[2px]"
        }`}
      >
        <nav className="site-container flex h-[72px] items-center justify-between gap-4">
          <button
            className="group flex items-center gap-3 text-left"
            onClick={() => scrollTo("home")}
            type="button"
          >
            <span
              className={`grid h-10 w-10 place-items-center border text-[0.72rem] font-black transition ${
                scrolled || menuOpen
                  ? "border-black/15 bg-[#151515] text-[#f5f0e8]"
                  : "border-white/35 bg-white/10 text-white"
              }`}
            >
              DB
            </span>
            <span>
              <span className="block text-base font-black uppercase leading-none tracking-[0.08em] sm:text-lg">
                Distrito Barber
              </span>
              <span
                className={`mt-1 block text-[0.66rem] font-bold uppercase tracking-[0.16em] ${
                  scrolled || menuOpen ? "text-[#6f6559]" : "text-white/72"
                }`}
              >
                Barcelona
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-5 text-[0.86rem] font-bold uppercase tracking-[0.08em]">
              {navItems.map((item) => (
                <button
                  className="group relative py-2 transition hover:text-[#9a7a55]"
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  type="button"
                >
                  {t.nav[item.key]}
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition group-hover:scale-x-100" />
                </button>
              ))}
            </div>
            <LanguageSwitch
              current={language}
              label={t.nav.language}
              onChange={changeLanguage}
              variant={scrolled || menuOpen ? "light" : "dark"}
            />
            <a
              className={`nav-cta ${
                scrolled || menuOpen ? "nav-cta-light" : "nav-cta-dark"
              }`}
              href={whatsappUrl}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle size={17} />
              {t.nav.reserve}
            </a>
          </div>

          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            className={`grid h-11 w-11 place-items-center border transition lg:hidden ${
              scrolled || menuOpen
                ? "border-black/15 bg-white/60 text-[#151515]"
                : "border-white/35 bg-white/10 text-white"
            }`}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-black/10 bg-[#f5f0e8] px-4 pb-5 pt-2 text-[#151515] lg:hidden"
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
          >
            <div className="mx-auto flex w-[min(1120px,100%)] flex-col gap-2">
              {navItems.map((item) => (
                <button
                  className="border-b border-black/10 py-4 text-left text-[1.55rem] font-black uppercase leading-none tracking-[0.02em]"
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  type="button"
                >
                  {t.nav[item.key]}
                </button>
              ))}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <LanguageSwitch
                  current={language}
                  label={t.nav.language}
                  onChange={changeLanguage}
                  variant="light"
                />
                <a
                  className="button-primary min-w-[170px]"
                  href={whatsappUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle size={18} />
                  {t.nav.reserve}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </header>

      <section className="relative min-h-screen overflow-hidden bg-[#101010] pt-[72px] text-white">
        <img
          alt="Barber tallant els cabells a un client"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.68]"
          fetchPriority="high"
          src={photos.hero}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.9),rgba(8,8,8,0.55)_42%,rgba(8,8,8,0.24))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,#101010,transparent)]" />
        <div className="site-container relative flex min-h-[calc(100vh-72px)] items-center py-16 sm:py-20">
          <motion.div
            animate="visible"
            className="max-w-[760px]"
            initial={reducedMotion ? false : "hidden"}
            transition={{ staggerChildren: reducedMotion ? 0 : 0.08 }}
          >
            <motion.p className="section-kicker text-[#c4a47b]" variants={fadeUp}>
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1
              className="mt-5 max-w-[9.5ch] text-[clamp(4rem,17vw,10.5rem)] font-black uppercase leading-[0.82] tracking-normal text-white lg:text-[clamp(6.3rem,9.4vw,10.5rem)]"
              variants={fadeUp}
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              className="mt-7 max-w-[34rem] text-base leading-7 text-white/78 sm:text-xl sm:leading-8"
              variants={fadeUp}
            >
              {t.hero.text}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              variants={fadeUp}
            >
              <a
                className="button-primary button-on-dark"
                href={whatsappUrl}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle size={19} />
                {t.whatsappCta}
              </a>
              <button
                className="button-secondary button-secondary-dark"
                onClick={() => scrollTo("services")}
                type="button"
              >
                <Scissors size={18} />
                {t.hero.secondary}
              </button>
            </motion.div>
            <motion.div
              className="mt-8 inline-flex border-l border-[#c4a47b] pl-4 text-sm font-black uppercase tracking-[0.12em] text-white/80"
              variants={fadeUp}
            >
              {t.hero.trust}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ImageMarquee
        images={marqueeOne}
        label={t.marquee.first}
        reverse={false}
      />

      <Section className="bg-[#f5f0e8] py-20 sm:py-28" id="services">
        <div className="mb-10 grid gap-5 border-t border-black/15 pt-8 md:grid-cols-[0.9fr_1fr] md:items-end">
          <Reveal>
            <p className="section-kicker text-[#8a6a45]">{t.services.label}</p>
            <h2 className="section-title">{t.services.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xl text-base leading-7 text-[#655d54] sm:text-lg">
              {t.services.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="border-t border-black/15">
          {t.services.items.map((service, index) => (
            <Reveal delay={index * 0.035} key={service.name}>
              <article className="grid gap-5 border-b border-black/15 py-6 sm:py-7 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-[12rem] text-2xl font-black uppercase leading-none tracking-normal sm:max-w-none sm:text-3xl">
                      {service.name}
                    </h3>
                    <p className="shrink-0 text-2xl font-black leading-none text-[#8a6a45] sm:text-3xl">
                      {service.price}
                    </p>
                  </div>
                  <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[#4f4943] sm:text-base">
                    {service.description}
                  </p>
                </div>
                <div className="grid gap-2 text-sm text-[#5f574f] sm:grid-cols-2">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a6a45] sm:col-span-2">
                    {service.includesTitle}
                  </p>
                  {service.includes.map((item) => (
                    <div className="flex items-center gap-2" key={item}>
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#151515]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <a
            className="button-primary mt-10"
            href={whatsappUrl}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle size={18} />
            {t.services.cta}
          </a>
        </Reveal>
      </Section>

      <Section className="bg-[#101010] py-20 text-white sm:py-28" id="shop">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal>
            <div className="image-panel aspect-[4/5] sm:aspect-[5/4] lg:aspect-[5/6]">
              <img
                alt="Barber treballant amb un client"
                className="h-full w-full object-cover"
                src={photos.cut}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-xl lg:pl-8">
              <p className="section-kicker text-[#c4a47b]">{t.shop.label}</p>
              <h2 className="section-title text-white">{t.shop.title}</h2>
              <p className="mt-7 text-lg leading-8 text-white/72">
                {t.shop.text}
              </p>
              <div className="mt-9 grid gap-4">
                {t.shop.points.map((point) => (
                  <div
                    className="flex items-center gap-3 border-t border-white/15 pt-4 text-sm font-black uppercase tracking-[0.08em] text-white/84"
                    key={point}
                  >
                    <BadgeCheck className="text-[#c4a47b]" size={20} />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <ImageMarquee images={marqueeTwo} label={t.marquee.second} reverse />

      <Section className="bg-[#f5f0e8] py-20 sm:py-28">
        <Reveal>
          <h2 className="section-title max-w-3xl">{t.why.title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {t.why.points.map((point, index) => {
            const Icon = whyIcons[index];
            return (
              <Reveal delay={index * 0.08} key={point.title}>
                <div className="border-t border-black/15 pt-6">
                  <Icon className="mb-6 text-[#8a6a45]" size={28} />
                  <h3 className="text-2xl font-black uppercase leading-none">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#655d54]">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="bg-[#efebe4] py-20 sm:py-28" id="gallery">
        <div className="mb-10 border-t border-black/15 pt-8">
          <Reveal>
            <p className="section-kicker text-[#8a6a45]">{t.gallery.label}</p>
            <h2 className="section-title">{t.gallery.title}</h2>
          </Reveal>
        </div>
        <div className="grid auto-rows-[210px] grid-cols-2 gap-3 sm:auto-rows-[260px] md:grid-cols-6">
          {galleryImages.map((image, index) => (
            <Reveal
              className={
                index === 0
                  ? "col-span-2 row-span-2 md:col-span-3"
                  : index === 3
                    ? "col-span-2 md:col-span-2 md:row-span-2"
                    : index === 6
                      ? "col-span-2 md:col-span-3"
                      : "col-span-1 md:col-span-2"
              }
              delay={index * 0.035}
              key={image}
            >
              <figure className="group h-full overflow-hidden bg-[#151515]">
                <img
                  alt={`${t.gallery.title} ${index + 1}`}
                  className="h-full w-full object-cover opacity-[0.92] transition duration-700 group-hover:scale-[1.045] group-hover:opacity-100"
                  src={image}
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[#151515] py-20 text-white sm:py-24">
        <Reveal>
          <h2 className="max-w-3xl text-[clamp(2.5rem,9vw,5.6rem)] font-black uppercase leading-[0.9]">
            {t.reviews.title}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {t.reviews.items.map((review, index) => (
            <Reveal delay={index * 0.08} key={review}>
              <figure className="min-h-[190px] border border-white/15 p-5">
                <div className="mb-6 flex gap-1 text-[#c4a47b]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      fill="currentColor"
                      key={starIndex}
                      size={17}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <blockquote className="text-lg font-semibold leading-7 text-white/86">
                  "{review}"
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-[#f5f0e8] py-20 sm:py-28" id="contact">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div>
              <p className="section-kicker text-[#8a6a45]">
                {t.contact.label}
              </p>
              <h2 className="section-title">{t.contact.title}</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="border-t border-black/15 pt-5">
                  <p className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#8a6a45]">
                    <MapPin size={18} />
                    {t.contact.addressLabel}
                  </p>
                  <div className="space-y-1 text-lg font-semibold leading-7">
                    {addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="border-t border-black/15 pt-5">
                  <p className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#8a6a45]">
                    <Clock size={18} />
                    {t.contact.hoursLabel}
                  </p>
                  <div className="space-y-3 text-base leading-6">
                    <p>
                      <span className="block font-black">
                        {t.contact.weekdays}
                      </span>
                      <span className="text-[#655d54]">10:00 - 20:00</span>
                    </p>
                    <p>
                      <span className="block font-black">
                        {t.contact.saturday}
                      </span>
                      <span className="text-[#655d54]">09:00 - 19:00</span>
                    </p>
                    <p>
                      <span className="block font-black">
                        {t.contact.sunday}
                      </span>
                      <span className="text-[#655d54]">
                        {t.contact.closed}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  className="button-primary"
                  href="https://www.google.com/maps/search/?api=1&query=Carrer%20de%20Mallorca%20000%20Barcelona"
                  rel="noreferrer"
                  target="_blank"
                >
                  <MapPin size={18} />
                  {t.contact.directions}
                </a>
                <a
                  className="button-secondary"
                  href={whatsappUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle size={18} />
                  {t.whatsappCta}
                </a>
              </div>
              <p className="mt-5 text-sm font-bold text-[#655d54]">
                {phoneNumber}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="map-visual min-h-[430px] overflow-hidden border border-black/15 bg-[#dfd6ca] p-4 sm:min-h-[520px] sm:p-6">
              <div className="relative h-full min-h-[398px] border border-black/15 bg-[#eee7dd] sm:min-h-[468px]">
                <div className="map-line map-line-a" />
                <div className="map-line map-line-b" />
                <div className="map-line map-line-c" />
                <div className="map-line map-line-d" />
                <div className="absolute left-[51%] top-[48%] -translate-x-1/2 -translate-y-1/2">
                  <div className="grid h-16 w-16 place-items-center bg-[#151515] text-[#f5f0e8] shadow-[0_18px_60px_rgba(0,0,0,0.25)] sm:h-20 sm:w-20">
                    <MapPin size={30} />
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 bg-[#f5f0e8]/90 p-5 backdrop-blur sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="text-3xl font-black uppercase leading-none">
                    Distrito Barber
                  </p>
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#8a6a45]">
                    {t.contact.mapLabel}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <footer className="bg-[#101010] py-12 text-white sm:py-14">
        <div className="site-container grid gap-9 md:grid-cols-[1.1fr_0.7fr_0.8fr_0.8fr]">
          <div>
            <p className="text-2xl font-black uppercase tracking-[0.06em]">
              Distrito Barber
            </p>
            <p className="mt-3 max-w-sm leading-7 text-white/62">
              {t.footer.text}
            </p>
            <div className="mt-5 flex items-center gap-3 text-white/75">
              <a
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center border border-white/15 transition hover:border-[#c4a47b] hover:text-[#c4a47b]"
                href="https://www.instagram.com/"
                rel="noreferrer"
                target="_blank"
              >
                <AtSign size={18} />
              </a>
              <a
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center border border-white/15 transition hover:border-[#c4a47b] hover:text-[#c4a47b]"
                href={whatsappUrl}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
          <div>
            <p className="footer-title">{t.footer.links}</p>
            <div className="flex flex-col items-start gap-2 text-white/68">
              {navItems.map((item) => (
                <button
                  className="transition hover:text-[#c4a47b]"
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
            <p className="footer-title">{t.footer.hours}</p>
            <div className="space-y-2 text-white/68">
              <p>{t.contact.weekdays}</p>
              <p>10:00 - 20:00</p>
              <p>
                {t.contact.saturday}: 09:00 - 19:00
              </p>
              <p>
                {t.contact.sunday}: {t.contact.closed}
              </p>
            </div>
          </div>
          <div>
            <p className="footer-title">{t.footer.language}</p>
            <LanguageSwitch
              current={language}
              label={t.nav.language}
              onChange={changeLanguage}
              variant="dark"
            />
            <a
              className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.1em] text-[#c4a47b]"
              href={`tel:${phoneNumber.replaceAll(" ", "")}`}
            >
              <PhoneCall size={16} />
              {phoneNumber}
            </a>
          </div>
        </div>
        <div className="site-container mt-10 border-t border-white/12 pt-6 text-sm text-white/45">
          {t.footer.copyright}
        </div>
      </footer>

      <motion.a
        animate={{ opacity: 1, scale: 1, y: 0 }}
        aria-label={t.whatsappCta}
        className="floating-whatsapp group"
        href={whatsappUrl}
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        rel="noreferrer"
        target="_blank"
        transition={{ duration: reducedMotion ? 0 : 0.35, delay: 0.5 }}
      >
        <MessageCircle size={22} />
        <span>{t.whatsappCta}</span>
      </motion.a>
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
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : "hidden"}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      variants={fadeUp}
      viewport={{ once: true, margin: "-80px" }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

function ImageMarquee({
  images,
  label,
  reverse,
}: {
  images: string[];
  label: string;
  reverse: boolean;
}) {
  const repeatedImages = [...images, ...images];

  return (
    <section
      aria-label={label}
      className="overflow-hidden border-y border-white/10 bg-[#101010] py-4 sm:py-5"
    >
      <div
        className={`marquee-track ${
          reverse ? "marquee-track-reverse" : "marquee-track-forward"
        }`}
      >
        {repeatedImages.map((image, index) => (
          <div
            className="marquee-image overflow-hidden bg-[#1f1f1f]"
            key={`${image}-${index}`}
          >
            <img
              alt={`${label} ${index + 1}`}
              className="h-full w-full object-cover"
              src={image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function LanguageSwitch({
  current,
  label,
  onChange,
  variant,
}: {
  current: Language;
  label: string;
  onChange: (language: Language) => void;
  variant: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div
      aria-label={label}
      className={`inline-flex items-center border p-1 text-xs font-black uppercase tracking-[0.08em] ${
        isDark
          ? "border-white/18 bg-white/5"
          : "border-black/15 bg-white/45"
      }`}
      role="group"
    >
      {languages.map((language) => {
        const active = current === language.code;

        return (
          <button
            aria-pressed={active}
            className={`px-3 py-2 transition ${
              active
                ? isDark
                  ? "bg-[#f5f0e8] text-[#151515]"
                  : "bg-[#151515] text-[#f5f0e8]"
                : isDark
                  ? "text-white/62 hover:text-white"
                  : "text-[#686058] hover:text-[#151515]"
            }`}
            key={language.code}
            onClick={() => onChange(language.code)}
            type="button"
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}
