import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginForm } from "@/components/login-form";
import { getUser } from "@/lib/api/auth";
import { Route as ChatsRouter } from "@/routes/(dashboard)/chat";

export const Route = createFileRoute("/(auth)/login")({
  beforeLoad: async ({ context }) => {
    const user = await getUser(context);
    if (user) throw redirect({ to: ChatsRouter.to, replace: true });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
