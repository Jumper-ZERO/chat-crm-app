import { createFileRoute } from "@tanstack/react-router";

import { ContactDialog } from "@/components/contact/contact-dialog";
import { ContactTable } from "@/components/contact/contact-table";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/(dashboard)/contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card>
      <CardContent>
        <ContactTable />
        <ContactDialog />
      </CardContent>
    </Card>
  );
}
