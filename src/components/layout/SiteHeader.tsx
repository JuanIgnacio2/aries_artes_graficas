import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";
import { Menu, X } from "lucide-react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  /*<header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">*/
  /*<header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">*/
  return (
    <header className="sticky top-0 z-50 w-full border-b supports-[backdrop-filter]:bg-background/90 shadow-sm">
      {/* Contenedor principal */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-2">
          <BrandLogo />
        </a>

        {/* Navegación escritorio */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#quienes-somos"
            className="text-md text-muted-foreground hover:text-foreground transition-transform active:translate-y-[1px]"
          >
            Quienes somos
          </a>
          <a
            href="#servicios"
            className="text-md text-muted-foreground hover:text-foreground transition-transform active:translate-y-[1px]"
          >
            Servicios
          </a>
          <a
            href="#contacto"
            className="text-md text-muted-foreground hover:text-foreground transition-transform active:translate-y-[1px]"
          >
            Contacto
          </a>
        </nav>

        {/* Botón WhatsApp escritorio */}
        <div className="hidden md:flex items-center gap-2 relative">
          <a href="https://wa.me/541158566275" target="_blank" rel="noreferrer">
            <Button className="bg-brand-whatsapp text-white hover:bg-brand-whatsapp/90 active:translate-y-[1px] transition-transform">
              WhatsApp
            </Button>
          </a>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden p-2 text-foreground z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Overlay oscuro para cerrar tocando fuera */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fadeIn"></div>
      )}

      {/* Menú móvil */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-40 h-full w-3/4 max-w-xs bg-white border-l shadow-xl transform transition-all duration-300 ease-in-out
        ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <div className="p-6 flex flex-col justify-between">
          {/* Superior */}
          <div className="flex flex-col items-center gap-6 mt-10 pb-10">
            <h2 className="text-lg font-bold text-gradient-brand">
              Aries Artes Gráficas
            </h2>
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
          </div>

          {/* Inferior */}
          <div className="flex flex-col items-center gap-3 mb-10 py-6 pb-safe">
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
            <small className="text-xs text-muted-foreground">
              © 2025 Aries Artes Gráficas
            </small>
          </div>
        </div>
      </div>

      {/* Barra CMYK decorativa */}
      <div className="cmyk-bar">
        <div></div><div></div><div></div><div></div>
      </div>
    </header>
  );
}