import { Button } from "@/components/ui/button";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { useEffect, useRef, useState } from "react";
import { RiWhatsappLine } from "react-icons/ri";
import { GrFacebookOption } from "react-icons/gr";
import { Instagram } from "lucide-react";
import ContactForm from "@/components/layout/ContactForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const servicios = [
  "Catálogos",
  "Dípticos",
  "Facturas",
  "Trípticos",
  "Carpetas",
  "Recibos",
  "Afiches",
  "Bolsas de papel",
  "Remitos",
  "Calendarios",
  "Stickers",
  "Recetarios",
  "Tarjetas",
  "Sobres",
];

const imagenes: Record<string, string> = {
  "Catálogos": "/assets/images/servicios/catalogo.webp",
  "Dípticos": "/assets/images/servicios/dipticos.webp",
  "Facturas":"/assets/images/servicios/facturas.webp",
  "Trípticos": "/assets/images/servicios/tripticos.webp",
  "Carpetas": "/assets/images/servicios/carpetas.webp",
  "Recibos":"/assets/images/servicios/recibos.webp",
  "Afiches": "/assets/images/servicios/afiches.webp",
  "Bolsas de papel": "/assets/images/servicios/bolsas.webp",
  "Remitos":"/assets/images/servicios/remito.webp",
  "Calendarios": "/assets/images/servicios/calendarios.webp",
  "Stickers": "/assets/images/servicios/autoadhesivos.webp",
  "Recetarios":"/assets/images/servicios/recetario.webp",
  "Tarjetas": "/assets/images/servicios/tarjetas.webp",
  "Sobres": "/assets/images/servicios/sobres.webp",
};

export default function Index() {
  const serviciosRef = useRef<HTMLDivElement | null>(null);
  const [serviciosVisible, setServiciosVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [isFullscreenImageOpen, setIsFullscreenImageOpen] = useState(false);
  const [fullscreenImageSrc, setFullscreenImageSrc] = useState<string>("");
  const carouselApiRef = useRef<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const restartAutoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Hook para la hero
  const { ref: heroRef, isVisible: heroVisible } = useInViewAnimation<HTMLDivElement>();
  const { ref: quienesRef, isVisible: quienesVisible } = useInViewAnimation<HTMLDivElement>();
  const { ref: ctaRef, isVisible: ctaVisible } = useInViewAnimation<HTMLDivElement>();
  const { ref: contactoRef, isVisible: contactoVisible } = useInViewAnimation<HTMLDivElement>();

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setServiciosVisible(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );

    if (serviciosRef.current) sectionObserver.observe(serviciosRef.current);

    // Observa cada tarjeta
    const cards = document.querySelectorAll(".servicio-card");
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card) => cardObserver.observe(card));

    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  // Función para reiniciar el autoplay
  const restartAutoplay = () => {
    // Limpiar timeout anterior
    if (restartAutoplayTimeoutRef.current) {
      clearTimeout(restartAutoplayTimeoutRef.current);
    }
    // Limpiar intervalo anterior
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    // Esperar a que termine la interacción y luego reiniciar autoplay
    restartAutoplayTimeoutRef.current = setTimeout(() => {
      if (carouselApiRef.current) {
        autoplayIntervalRef.current = setInterval(() => {
          carouselApiRef.current?.scrollNext();
        }, 4000);
      }
    }, 300);
  };

  // Controlar autoplay del carrusel cuando está abierto
  useEffect(() => {
    if (!isModalOpen) {
      // Limpiar intervalo si el modal se cierra
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
      if (restartAutoplayTimeoutRef.current) {
        clearTimeout(restartAutoplayTimeoutRef.current);
        restartAutoplayTimeoutRef.current = null;
      }
      return;
    }

    // Esperar a que el carousel se monte y luego iniciar autoplay
    const timeout = setTimeout(() => {
      if (carouselApiRef.current) {
        autoplayIntervalRef.current = setInterval(() => {
          carouselApiRef.current?.scrollNext();
        }, 4000);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };
  }, [isModalOpen]);
  
  return (
    <TooltipProvider>
    <main>
      {/* Hero */}
      <section 
        ref={heroRef}
        className={`relative overflow-hidden backdrop-blur-sm 
              bg-white/70 dark:bg-slate-900/60 
              transition-all duration-700 
              ${heroVisible ? "animate-fade-up" : "opacity-0 translate-y-6"}`}
        >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 
               [background:radial-gradient(1200px_600px_at_50%_-200px,theme(colors.brand.cyan)/20%_0%,transparent_60%),radial-gradient(800px_400px_at_80%_0%,theme(colors.brand.magenta)/15%_0%,transparent_60%)]" />
        <div className="container mx-auto grid gap-8 py-16 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground animate-fade-up">
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-magenta" />
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-yellow" />
              <span>Imprenta offset y diseño gráfico</span>
            </div>
            <img
              src="/logo-aries.png"
              alt="Aries · Artes Gráficas"
              className="mb-4 h-16 w-auto md:h-20 animate-float"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
            <h1 className="text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl animate-fade-up anim-delay-100 text-gradient-brand">
              Aries · Artes Gráficas
            </h1>
            <p className="mt-4 max-w-xl text-xl text-muted-foreground animate-fade-up anim-delay-200">
              Calidad de impresión superior, diseño cuidado y compromiso en cada
              entrega.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up anim-delay-300">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="#servicios"
                    className="inline-block"
                    aria-label="Ver servicios"
                  >
                    <Button
                      className="bg-foreground text-background hover:bg-foreground/90"
                    >
                      Ver servicios
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ver servicios</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://wa.me/541158566275"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/70 hover:text-foreground"
                    aria-label="WhatsApp"
                  >
                    <RiWhatsappLine className="h-10 w-10" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Contactanos por WhatsApp</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://www.instagram.com/ariesartesgraficas?igsh=MXkxcjR3eHpvMnRlcA=="
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/70 hover:text-foreground"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-10 w-10" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Síguenos en Instagram</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://www.facebook.com/share/1GhMYHmn9E/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/70 hover:text-foreground"
                    aria-label="Facebook"
                  >
                    <GrFacebookOption className="h-10 w-10" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Síguenos en Facebook</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="relative">
            <div className="cmyk-bar mb-4"><div></div><div></div><div></div><div></div></div>
            <div className="rounded-xl border bg-card p-6 shadow-sm animate-fade-up anim-delay-200">
              <ul className="grid grid-cols-2 gap-3 text-md md:grid-cols-3">
                {servicios.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modal con carrusel de imágenes por servicio */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-2xl mx-auto rounded-lg border bg-card p-4 sm:p-6 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in data-[state=closed]:fade-out">
          {/* Close button discreto */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 opacity-50 hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <DialogHeader className="p-0">
            <div className="w-full rounded-md bg-gradient-to-r from-brand-cyan/8 via-brand-magenta/6 to-brand-yellow/8 p-4 mb-3 text-center">
              <DialogTitle className="text-center text-gradient-brand text-2xl sm:text-3xl font-bold">{modalTitle}</DialogTitle>
              <DialogDescription className="text-center text-sm sm:text-base text-muted-foreground mt-2">
                Desliza para ver muestras de nuestros trabajos.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="mt-2 relative px-12 sm:px-16">
            <Carousel 
              opts={{ loop: true }}
              setApi={(api) => {
                carouselApiRef.current = api;
                // Rastrear índice actual
                const updateIndex = () => {
                  if (api?.selectedScrollSnap) {
                    setCurrentImageIndex(api.selectedScrollSnap());
                  }
                };
                updateIndex();
                api?.on("select", () => {
                  updateIndex();
                  // Reiniciar autoplay cuando cambias de slide (click en siguiente/anterior o indicadores)
                  restartAutoplay();
                });
                
                // También reiniciar autoplay cuando toques/deslices
                api?.on("pointerDown", () => {
                  restartAutoplay();
                });
              }}
            >
              <CarouselContent>
                {modalImages.map((src, i) => (
                  <CarouselItem key={i} className="rounded">
                    <div 
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-96 flex items-center justify-center bg-muted/10 rounded cursor-pointer hover:bg-muted/20 transition-colors"
                      onClick={() => {
                        setFullscreenImageSrc(src);
                        setIsFullscreenImageOpen(true);
                      }}
                    >
                      <img
                        src={src}
                        alt={`${modalTitle} ${i + 1}`}
                        className="max-w-full max-h-full object-contain rounded"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-10 sm:-left-14 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute -right-10 sm:-right-14 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>

            {/* Image indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: modalImages.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    carouselApiRef.current?.scrollTo(index);
                    setCurrentImageIndex(index);
                    restartAutoplay();
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "w-6 bg-foreground"
                      : "w-2 bg-muted-foreground"
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de imagen en tamaño completo */}
      <Dialog open={isFullscreenImageOpen} onOpenChange={setIsFullscreenImageOpen}>
        <DialogContent className="w-screen h-screen max-w-none max-h-none p-4 sm:p-6 md:p-8 rounded-none border-0 bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setIsFullscreenImageOpen(false)}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 md:right-8 md:top-8 z-50 opacity-70 hover:opacity-100 transition-opacity text-white"
            aria-label="Cerrar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Imagen en tamaño completo */}
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={fullscreenImageSrc}
              alt="Imagen ampliada"
              className="max-w-full max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] md:max-h-[calc(100vh-4rem)] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Quienes somos */}
      <section 
        ref={quienesRef}
        id="quienes-somos"
        className={`container mx-auto scroll-mt-20 py-10 ${
          quienesVisible ? "animate-fade-up" : "opacity-0 translate-y-6"
        }`}
        >
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-bold tracking-tight text-gradient-brand">Quiénes somos</h2>
            <div className="mt-3 h-1 w-28 bg-gradient-brand" />
          </div>
          <div className="md:col-span-3 space-y-4 text-muted-foreground text-xl">
            <p className="animate-fade-up">Somos una empresa con 20 años de experiencia en el rubro gráfico.</p>
            <p className="animate-fade-up anim-delay-100">
              Trabajamos ofreciendo la mejor calidad de impresión en distintos
              tipos de materiales.
            </p>
            <p className="animate-fade-up anim-delay-200">
              Nuestro objetivo es satisfacer las necesidades del cliente, con un
              servicio de atención personalizada, con calidad, precio y
              compromiso en los tiempos de entrega.
            </p>
            <p className="animate-fade-up anim-delay-300">Esperamos contribuir con el desarrollo de su prestigiosa entidad.</p>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section 
          ref={serviciosRef}
          id="servicios"
          className={`relative backdrop-blur-sm bg-white/60 
              dark:bg-slate-900/60 py-20 transition-all duration-700 
              ${serviciosVisible ? "opacity-100" : "opacity-0 translate-y-6"}`}
        >
        <div className="container mx-auto">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gradient-brand">Servicios</h2>
              <p className="mt-2 max-w-2xl text-lg text-muted-foreground animate-fade-up">
                Impresión offset y digital con terminaciones de calidad.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {servicios.map((s, idx) => {
              const color =
                idx % 3 === 0
                  ? "from-white to-brand-cyan/10"
                  : idx % 3 === 1
                  ? "from-white to-brand-magenta/10"
                  : "from-white to-brand-yellow/10";

              return (
                <div
                  key={s}
                  data-index={idx}
                  // Hacemos las cards más grandes y clicables
                  className={`servicio-card group relative overflow-hidden rounded-xl border 
                              bg-gradient-to-tr ${color} p-6 sm:p-8 min-h-[200px] sm:min-h-[260px] shadow-sm transition-all duration-500 
                              hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm cursor-pointer
                              ${visibleCards.includes(idx) ? "animate-fade-up opacity-100" : "opacity-0 translate-y-8"}`}
                  style={{ animationDelay: `${idx * 150}ms` }}
                  onClick={() => {
                    // Abrir modal con imágenes relacionadas (convención: public/assets/images/modals/<slug>/1.jpg...)
                    // Generar slug seguro: normalizar (quitar acentos), espacios => '_' y eliminar caracteres no permitidos
                    const slug = s
                      .normalize("NFD")
                      .replace(/\p{Diacritic}/gu, "")
                      .replace(/\s+/g, "_")
                      .replace(/[^a-zA-Z0-9_]/g, "")
                      .toLowerCase();
                    // Convención: nombre_de_la_card_numero.jpg (4 imágenes por card)
                    const imgs = [1, 2, 3, 4].map((n) => `/assets/images/modals/${slug}_${n}.webp`);
                    setModalImages(imgs);
                    setModalTitle(s);
                    setIsModalOpen(true);
                  }}
                >
                  {/* Imagen de fondo inclinada */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out md:filter md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${imagenes[s]})`,
                      
                      maskImage:
                        "linear-gradient(135deg, transparent 40%, black 75%)", // controla la diagonal
                      WebkitMaskImage:
                        "linear-gradient(135deg, transparent 40%, black 75%)",
                    }}
                  />

                  {/* Hover: vuelve a color y hace zoom */}
                  <div
                    className="absolute inset-0 z-0"
                    style={{
                      backgroundImage: `url(${imagenes[s]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center left",
                      filter: "grayscale(0)",
                      opacity: 0,
                      transition: "opacity 0.8s ease, transform 0.8s ease",
                      transform: "scale(1.05)",
                      maskImage:
                        "linear-gradient(135deg, transparent 40%, black 75%)",
                      WebkitMaskImage:
                        "linear-gradient(135deg, transparent 40%, black 75%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Efecto hover con pseudo-overlay */}
                  <style>
                    {`
                      .group:hover div[style*="grayscale(1)"] {
                        filter: grayscale(0);
                        transform: scale(1.05);
                      }
                    `}
                  </style>

                  {/* Contenido texto */}
                  <div className="relative z-10 max-w-[60%]">
                    <div className="mb-3 inline-flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          idx % 3 === 0
                            ? "bg-brand-cyan"
                            : idx % 3 === 1
                            ? "bg-brand-magenta"
                            : "bg-brand-yellow"
                        }`}
                      />
                      <h3 className="text-lg font-semibold text-foreground">{s}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
          ref={ctaRef}
          className={`container mx-auto py-16 ${
            ctaVisible ? "animate-fade-up" : "opacity-0 translate-y-6"
          }`}
        >
        <div className="rounded-2xl border bg-foreground p-8 text-background md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-bold">¿Listo para imprimir?</h3>
              <p className="mt-1 text-white/80">
                Envíanos tu proyecto y te asesoramos sin costo.
              </p>
            </div>
            <a href="#contacto">
              <Button variant="secondary" className="text-foreground">
                Solicitar presupuesto
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section
        ref={contactoRef}
        id="contacto"
        className={`container mx-auto scroll-mt-20 py-10 ${
          contactoVisible ? "animate-fade-up" : "opacity-0 translate-y-6"
        }`}
       >
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gradient-brand">Contacto</h2>
            <p className="mt-2 max-w-prose text-muted-foreground">
              Contanos qué necesitás imprimir y te responderemos a la
              brevedad.
            </p>
            <div className="mt-6 rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                También podés escribirnos a <span className="font-semibold text-foreground">ariesartesgraficas@gmail.com</span>
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
        <div className="mt-10 overflow-hidden rounded-xl border">
          <iframe
            title="Mapa - Irigoyen 1013, Hasenkamp"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3401.207701780278!2d-59.839024605014544!3d-31.518454875950233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDMxJzA4LjQiUyA1OcKwNTAnMTcuNCJX!5e0!3m2!1ses-419!2sus!4v1762730430164!5m2!1ses-419!2sus"
            width="100%"
            height="360"
            className="border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
    </TooltipProvider>
  );
}