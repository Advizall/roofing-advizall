
import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string()
    .min(5, "Nome deve ter pelo menos 5 caracteres")
    .regex(/^[a-zA-Z\s]+$/, "Nome deve conter apenas letras"),
  
  email: z.string()
    .email("Por favor, forneça um email válido"),
  
  phone: z.string()
    .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Número de telefone deve seguir o formato (555) 555-5555"),
  
  message: z.string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(300, "Mensagem não pode exceder 300 caracteres")
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
