import { createFileRoute } from "@tanstack/react-router";

import { ContactTable } from "@/components/contact/contact-table";

export const Route = createFileRoute("/(dashboard)/contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContactTable />;
}
