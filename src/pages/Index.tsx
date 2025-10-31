import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { useEffect, useRef, useState } from "react";

const servicios = [
  "Catálogos",
  "Dípticos",
  "Trípticos",
  "Carpetas",
  "Afiches",
  "Bolsas de papel",
  "Calendarios",
  "Autoadhesivos",
  "Tarjetas",
];

const imagenes: Record<string, string> = {
  "Catálogos": "/assets/images/servicios/catalogo.jpg",
  "Dípticos": "/assets/images/servicios/dipticos.jpg",
  "Trípticos": "/assets/images/servicios/tripticos.jpg",
  "Carpetas": "/assets/images/servicios/carpetas.png",
  "Afiches": "/assets/images/servicios/afiches.jpg",
  "Bolsas de papel": "/assets/images/servicios/bolsas.jpg",
  "Calendarios": "/assets/images/servicios/calendarios.jpg",
  "Autoadhesivos": "/assets/images/servicios/autoadhesivos.jpg",
  "Tarjetas": "/assets/images/servicios/tarjetas.jpg",
};

export default function Index() {
  const [status, setStatus] = useState<string | null>(null);
  const serviciosRef = useRef<HTMLDivElement | null>(null);
  const [serviciosVisible, setServiciosVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("¡Gracias! Te responderemos a la brevedad.");
    (e.currentTarget as HTMLFormElement).reset();
  };
  
  return (
    <main>
      {/* Hero */}
      <section 
        ref={heroRef}
        className={`relative overflow-hidden bg-gradient-to-b from-white to-slate-50 ${
          heroVisible ? "animate-fade-up" : "opacity-0 translate-y-6"}`}
        >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(1200px_600px_at_50%_-200px,theme(colors.brand.cyan)/20%_0%,transparent_60%),radial-gradient(800px_400px_at_80%_0%,theme(colors.brand.magenta)/15%_0%,transparent_60%)]" />
        <div className="container mx-auto grid gap-8 py-16 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground animate-fade-up">
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-magenta" />
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-yellow" />
              <span>Imprenta offset y diseño gráfico</span>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F663c00dc1c6e4b4bb40553918806045f%2F05aeb48d76b0480bae13774c377c646d?format=webp&width=600"
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
              <a href="#servicios">
                <Button className="bg-foreground text-background hover:bg-foreground/90">
                  Ver servicios
                </Button>
              </a>
              <a href="https://wa.me/541158566275" target="_blank" rel="noreferrer">
                <Button className="bg-brand-whatsapp text-white hover:bg-brand-whatsapp/90 transition-transform active:translate-y-[1px]">WhatsApp</Button>
              </a>
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
          className={`relative bg-gradient-to-b from-slate-50 to-white py-20 transition-all duration-700 
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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  className={`servicio-card group relative overflow-hidden rounded-xl border 
                              bg-gradient-to-tr ${color} p-6 shadow-sm transition-all duration-500 
                              hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm
                              ${visibleCards.includes(idx) ? "animate-fade-up opacity-100" : "opacity-0 translate-y-8"}`}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Imagen de fondo inclinada */}
                  <div
                    className="absolute inset-0 bg-cover bg-center-left filter grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
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
        className={`container mx-auto scroll-mt-20 py-20 ${
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
                También podés escribirnos a <span className="font-semibold text-foreground">info@ariesartesgraficas.com</span>
              </p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="nombre" placeholder="Nombre" required />
              <Input name="email" type="email" placeholder="Email" required />
            </div>
            <Input name="telefono" type="tel" placeholder="Teléfono" />
            <Textarea name="mensaje" placeholder="Detalle del trabajo, cantidades, medidas…" required />
            <div className="flex items-center gap-3">
              <Button type="submit" className="bg-foreground text-background hover:bg-foreground/90">
                Enviar consulta
              </Button>
              {status && <p className="text-sm text-green-600">{status}</p>}
            </div>
          </form>
        </div>
        <div className="mt-10 overflow-hidden rounded-xl border">
          <iframe
            title="Mapa - Irigoyen 1013, Hasenkamp"
            src="https://www.google.com/maps?q=Irigoyen%201013%2C%20Hasenkamp%2C%20Entre%20R%C3%ADos&output=embed"
            width="100%"
            height="360"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
