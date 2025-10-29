import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <a href="/" className="group">
          <BrandLogo />
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#quienes-somos" className="text-sm text-muted-foreground hover:text-foreground transition-transform active:translate-y-[1px]">
            Quienes somos
          </a>
          <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-transform active:translate-y-[1px]">
            Servicios
          </a>
          <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-transform active:translate-y-[1px]">
            Contacto
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://wa.me/541158566275" target="_blank" rel="noreferrer">
            <Button className="bg-brand-whatsapp text-white hover:bg-brand-whatsapp/90 active:translate-y-[1px] transition-transform">WhatsApp</Button>
          </a>
        </div>
      </div>
      <div className="cmyk-bar"><div></div><div></div><div></div><div></div></div>
    </header>
  );
}
