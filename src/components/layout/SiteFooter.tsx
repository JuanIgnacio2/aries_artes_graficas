import { Instagram, Facebook, Twitter } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-background">
      <div className="cmyk-bar"><div></div><div></div><div></div><div></div></div>
      <div className="container mx-auto grid gap-6 py-10 text-sm text-muted-foreground md:grid-cols-3">
        <div>
          <p className="font-semibold text-foreground">Aries · Artes Gráficas</p>
          <p>Imprenta offset y diseño gráfico</p>
          <p className="mt-2 max-w-xs">Irigoyen 1013 · CP 3134 · Hasenkamp, Entre Ríos</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Contacto</p>
          <p>
            <a className="hover:underline" href="mailto:info@ariesartesgraficas.com">info@ariesartesgraficas.com</a>
          </p>
          <p>
            <a className="hover:underline" href="https://wa.me/541158566275" target="_blank" rel="noreferrer">WhatsApp 11 5856-6275</a>
          </p>
        </div>
        <div className="md:text-right">
          <p className="font-semibold text-foreground">Redes</p>
          <div className="mt-2 flex gap-4 md:justify-end">
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-foreground"><Instagram className="h-5 w-5" /></a>
            <a href="https://facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-foreground/70 hover:text-foreground"><Facebook className="h-5 w-5" /></a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X" className="text-foreground/70 hover:text-foreground"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
