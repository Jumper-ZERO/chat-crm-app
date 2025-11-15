import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  customerStatusValues,
  sourceContactValues,
} from "@/models/contact.model";
import {
  contactSchema,
  type ContactFormValues,
} from "@/schemas/contact.schema";

const onInvalidSubmit = (errors: FieldErrors<ContactFormValues>) => {
  Object.values(errors).forEach((error) => {
    if (error?.message) toast.error(error.message);
  });
};

type ContactFormProps = {
  onSubmit: (data: ContactFormValues) => void;
  isPending: boolean;
};

export function ContactForm({ onSubmit, isPending }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      customerStatus: "new",
      source: "manual",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
        className="space-y-4 max-w-md"
      >
        {/* Nombre */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-sm">
                Nombre
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej. Juan Pérez" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Teléfono */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  defaultCountry="PE"
                  placeholder="Escribe tu número de celular"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-5">
          {/* Estado del cliente */}
          <FormField
            control={form.control}
            name="customerStatus"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Estado del Cliente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {customerStatusValues.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Fuente */}
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Fuente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona fuente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sourceContactValues.map((source) => (
                      <SelectItem
                        key={source}
                        value={source}
                        className="capitalize"
                      >
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* Botón */}
        <LoadingButton type="submit" loading={isPending}>
          Guardar
        </LoadingButton>
      </form>
    </Form>
  );
}
