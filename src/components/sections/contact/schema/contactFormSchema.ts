
import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string()
    .min(5, "Name must be at least 5 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
  
  email: z.string()
    .email("Please provide a valid email address"),
  
  phone: z.string()
    .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Phone number must follow the format (555) 555-5555"),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters long")
    .max(300, "Message cannot exceed 300 characters")
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

