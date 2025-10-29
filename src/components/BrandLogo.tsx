import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  height?: number;
}

export default function BrandLogo({ className, height = 28 }: Props) {
  const [imgOk, setImgOk] = useState(true);
  const srcs = [
    "https://cdn.builder.io/api/v1/image/assets%2F663c00dc1c6e4b4bb40553918806045f%2F05aeb48d76b0480bae13774c377c646d?format=webp&width=400",
    "/assets/logo-aries.svg",
    "/assets/logo-aries.png",
    "/logo.png",
    "/logo.svg",
  ];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {imgOk ? (
        <img
          src={srcs[0]}
          srcSet={srcs.join(", ")}
          alt="Aries · Artes Gráficas"
          height={height}
          className="h-7 w-auto"
          onError={() => setImgOk(false)}
        />
      ) : (
        <div className="relative grid h-6 w-6 grid-cols-2 grid-rows-2 overflow-hidden rounded">
          <span className="bg-brand-cyan" />
          <span className="bg-brand-magenta" />
          <span className="bg-brand-yellow" />
          <span className="bg-foreground" />
        </div>
      )}
      <span className="font-extrabold tracking-tight">Aries · Artes Gráficas</span>
    </div>
  );
}
