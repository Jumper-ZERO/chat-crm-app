import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateContact } from "@/hooks/use-create-contact";
import {
  customerStatusValues,
  sourceContactValues,
} from "@/models/contact.model";
import {
  contactSchema,
  type ContactFormValues,
} from "@/schemas/contact.schema";

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      customerStatus: "new",
      source: "manual",
    },
  });

  const { mutate, isPending } = useCreateContact();

  const onSumit = (data: ContactFormValues) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSumit)}
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
              <FormMessage />
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
                <Input type="number" placeholder="Ej. 987654321" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Estado del cliente */}
        <FormField
          control={form.control}
          name="customerStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado del Cliente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fuente */}
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón */}
        <LoadingButton type="submit" loading={isPending}>
          Guardar
        </LoadingButton>
      </form>
    </Form>
  );
}
