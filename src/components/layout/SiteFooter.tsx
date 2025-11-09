import { Instagram, Facebook } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SiteFooter() {
  // Componente reutilizable para los tooltips de redes sociales
  const SocialTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <footer className="mt-24 border-t bg-background">
      <TooltipProvider>
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
            <a className="hover:underline" href="mailto:ariesartesgraficas@gmail.com">ariesartesgraficas@gmail.com</a>
          </p>
          <p>
            <a className="hover:underline" href="https://wa.me/541158566275" target="_blank" rel="noreferrer">WhatsApp 11 5856-6275</a>
          </p>
        </div>
        <div className="md:text-right">
          <p className="font-semibold text-foreground">Redes</p>
          <div className="mt-2 flex gap-4 md:justify-end">
            <SocialTooltip content="Síguenos en Instagram">
              <a href="https://www.instagram.com/ariesartesgraficas?igsh=MXkxcjR3eHpvMnRlcA==" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
            </SocialTooltip>
            <SocialTooltip content="Síguenos en Facebook">
              <a href="https://facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-foreground/70 hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
            </SocialTooltip>
          </div>
        </div>
      </div>
      </TooltipProvider>
    </footer>
  );
}
