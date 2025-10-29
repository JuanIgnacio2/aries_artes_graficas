import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const servicios = [
  "Catálogos",
  "Volantes",
  "Dípticos",
  "Trípticos",
  "Carpetas",
  "Afiches",
  "Bolsas de papel",
  "Display",
  "Calendarios",
  "Agendas",
  "Autoadhesivos",
  "Estuches",
  "Otros",
];

export default function Index() {
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("¡Gracias! Te responderemos a la brevedad.");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(1200px_600px_at_50%_-200px,theme(colors.brand.cyan)/20%_0%,transparent_60%),radial-gradient(800px_400px_at_80%_0%,theme(colors.brand.magenta)/15%_0%,transparent_60%)]" />
        <div className="container mx-auto grid gap-8 py-24 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-magenta" />
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-yellow" />
              <span>Imprenta offset y diseño gráfico</span>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F663c00dc1c6e4b4bb40553918806045f%2F05aeb48d76b0480bae13774c377c646d?format=webp&width=600"
              alt="Aries · Artes Gráficas"
              className="mb-4 h-16 w-auto md:h-20"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Aries · Artes Gráficas
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Calidad de impresión superior, diseño cuidado y compromiso en cada
              entrega.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <ul className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
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
      <section id="quienes-somos" className="container mx-auto scroll-mt-20 py-20">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight">Quiénes somos</h2>
            <div className="mt-3 h-1 w-24 bg-foreground" />
          </div>
          <div className="md:col-span-3 space-y-4 text-muted-foreground">
            <p>Somos una empresa con 20 años de experiencia en el rubro gráfico.</p>
            <p>
              Trabajamos ofreciendo la mejor calidad de impresión en distintos
              tipos de materiales.
            </p>
            <p>
              Nuestro objetivo es satisfacer las necesidades del cliente, con un
              servicio de atención personalizada, con calidad, precio y
              compromiso en los tiempos de entrega.
            </p>
            <p>Esperamos contribuir con el desarrollo de su prestigiosa entidad.</p>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="relative bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="container mx-auto">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Servicios</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Impresión offset y digital con terminaciones de calidad.
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s, idx) => (
              <div
                key={s}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-colors hover:border-foreground/30"
              >
                <div className="mb-3 inline-flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${idx % 3 === 0 ? "bg-brand-cyan" : idx % 3 === 1 ? "bg-brand-magenta" : "bg-brand-yellow"}`} />
                  <span className="text-sm uppercase tracking-wide text-muted-foreground">
                    Impresión
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{s}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-16">
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
      <section id="contacto" className="container mx-auto scroll-mt-20 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contacto</h2>
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