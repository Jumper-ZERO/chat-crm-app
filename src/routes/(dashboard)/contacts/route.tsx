import { createFileRoute } from "@tanstack/react-router";

import { ContactTable } from "@/components/contact/contact-table";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/(dashboard)/contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="h-full">
      <CardContent>
        <ContactTable />
      </CardContent>
    </Card>
  );
}
