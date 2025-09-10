import { z } from "zod";

import { customerStatusValues, sourceContactValues } from "@/models/contact.model";

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  phone: z.string()
    .min(6, "El teléfono es demasiado corto")
    .regex(/^[0-9]+$/, "Solo se permiten números"),
  customerStatus: z.enum(customerStatusValues), // según tu enum real
  source: z.enum(sourceContactValues),           // según tu enum real
});

export type ContactFormValues = z.infer<typeof contactSchema>;