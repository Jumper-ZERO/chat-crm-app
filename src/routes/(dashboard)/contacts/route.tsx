import { createFileRoute } from "@tanstack/react-router";

import { ContactDialog } from "@/components/contact/contact-dialog";
import { ContactTable } from "@/components/contact/contact-table";

export const Route = createFileRoute("/(dashboard)/contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <div className="bg-zinc-900 border m-5 p-5">
        <ContactTable />
        <ContactDialog />
      </div>
    </div>
  );
}
