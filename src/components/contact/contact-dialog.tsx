import { useState } from "react";
import { toast } from "sonner";

import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { useCreateContact } from "@/hooks/use-create-contact";
import type { ContactFormValues } from "@/schemas/contact.schema";

export const ContactDialog = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateContact();

  const onSumit = (data: ContactFormValues) => {
    mutate(data);
    setOpen(false);
    toast.success("El contacto se creo exitosamente");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Contacto</DialogTitle>
          <DialogDescription>
            Crear un nuevo contacto para la tabla
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSubmit={onSumit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
};
