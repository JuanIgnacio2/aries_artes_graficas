import React, { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xvgdplnp");
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [submitCount, setSubmitCount] = useState<number>(0);
  const SUBMIT_COOLDOWN = 60000; // 60 segundos entre envíos
  const MAX_SUBMITS_PER_SESSION = 3; // máximo 3 envíos por sesión

  // Validar si se puede enviar el formulario
  const canSubmit = () => {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    
    // Si ya se alcanzó el límite de envíos
    if (submitCount >= MAX_SUBMITS_PER_SESSION) {
      toast({
        variant: "destructive",
        title: "Límite de mensajes alcanzado",
        description: (
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <span>Has alcanzado el límite de mensajes por sesión. Por favor, intenta más tarde.</span>
          </div>
        ),
      });
      return false;
    }

    // Si no ha pasado suficiente tiempo desde el último envío
    if (timeSinceLastSubmit < SUBMIT_COOLDOWN) {
      const remainingTime = Math.ceil((SUBMIT_COOLDOWN - timeSinceLastSubmit) / 1000);
      toast({
        variant: "destructive",
        title: "Espera un momento",
        description: (
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <span>Por favor espera {remainingTime} segundos antes de enviar otro mensaje.</span>
          </div>
        ),
      });
      return false;
    }

    return true;
  };

  // Envoltorio para el handleSubmit que incluye las validaciones
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar campos requeridos
    const form = e.currentTarget;
    const email = form.email.value;
    const message = form.message.value;
    
    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
      });
      return;
    }

    // Validación de longitud del mensaje
    if (message.length < 10) {
      toast({
        variant: "destructive",
        title: "Mensaje muy corto",
        description: "El mensaje debe tener al menos 10 caracteres.",
      });
      return;
    }

    // Verificar rate limiting
    if (!canSubmit()) {
      return;
    }

    // Actualizar contadores y proceder con el envío
    setLastSubmitTime(Date.now());
    setSubmitCount(prev => prev + 1);
    
    // Proceder con el envío original
    await handleSubmit(e);
  };

  useEffect(() => {
    if (state.succeeded) {
      // Mostrar toast
      toast({
        className: "bg-background",
        title: "¡Mensaje enviado!",
        description: (
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <span>Gracias por contactarnos. Te responderemos a la brevedad.</span>
          </div>
        ),
        duration: 5000, // 5 segundos
      });
      
      // Limpiar formulario
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state.succeeded, toast]);

  return (
  <form ref={formRef} onSubmit={onSubmit} className="space-y-6 animate-fade-up">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Tu nombre"
          required
          className="transition-all focus-visible:ring-brand-cyan"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-sm text-red-500" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          required
          className="transition-all focus-visible:ring-brand-cyan"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-red-500" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="¿En qué podemos ayudarte?"
          required
          className="min-h-[120px] resize-none transition-all focus-visible:ring-brand-cyan"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-red-500" />
      </div>

      <Button 
        type="submit" 
        disabled={state.submitting || submitCount >= MAX_SUBMITS_PER_SESSION}
        className="w-full bg-foreground text-background hover:bg-foreground/90 transition-all"
      >
        {state.submitting ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent"></div>
            <span>Enviando...</span>
          </div>
        ) : (
          "Enviar mensaje"
        )}
      </Button>
    </form>
  );
}