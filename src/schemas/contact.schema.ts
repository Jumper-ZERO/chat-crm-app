import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

import { customerStatusValues, sourceContactValues } from "@/models/contact.model";

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  phone: z.string()
    .min(6, "El teléfono es demasiado corto")
    .refine((val) => isValidPhoneNumber(val || ""), {
      message: "Número de teléfono inválido",
    }),
  customerStatus: z.enum(customerStatusValues),
  source: z.enum(sourceContactValues),
});

export type ContactFormValues = z.infer<typeof contactSchema>;