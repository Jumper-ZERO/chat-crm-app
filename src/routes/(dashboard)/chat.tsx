import { createFileRoute } from "@tanstack/react-router";

import { ChatCard } from "@/routes/(dashboard)/-components/chat-card";

export const Route = createFileRoute("/(dashboard)/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ChatCard
      contact={{
        fullName: "John Doe",
        phoneNumber: "51922936950",
      }}
    />
  );
}
