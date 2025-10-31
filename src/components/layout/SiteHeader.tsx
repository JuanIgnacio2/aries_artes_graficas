import { useState } from "react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <a href="/" className="group flex items-center gap-2">
          <BrandLogo />
        </a>

        {/* Menu escritorio */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#quienes-somos" className="text-md text-muted-foreground hover:text-foreground transition-transform active:translate-y-[1px]">
            Quienes somos
          </a>
          <a href="#servicios" className="text-md text-muted-foreground hover:text-foreground transition-transform active:translate-y-[1px]">
            Servicios
          </a>
          <a href="#contacto" className="text-md text-muted-foreground hover:text-foreground transition-transform active:translate-y-[1px]">
            Contacto
          </a>
        </nav>

        {/* Botón Whatsapp */}
        <div className="flex items-center gap-2">
          <a href="https://wa.me/541158566275" target="_blank" rel="noreferrer">
            <Button className="bg-brand-whatsapp text-white hover:bg-brand-whatsapp/90 active:translate-y-[1px] transition-transform">WhatsApp</Button>
          </a>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-md animate-fade-down">
          <div className="p-4 flex flex-col items-center gap-4">
            <h2 className="text-lg font-bold text-gradient-brand">Aries Artes Gráficas</h2>
            <a
              href="#quienes-somos"
              className="text-md text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Quienes somos
            </a>
            <a
              href="#servicios"
              className="text-md text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Servicios
            </a>
            <a
              href="#contacto"
              className="text-md text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Contacto
            </a>
            <a
              href="https://wa.me/541158566275"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <Button className="bg-brand-whatsapp text-white hover:bg-brand-whatsapp/90">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      )}
      <div className="cmyk-bar"><div></div><div></div><div></div><div></div></div>
    </header>
  );
}