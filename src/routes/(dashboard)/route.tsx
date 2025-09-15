import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

// import { Toaster } from "@/components/ui/sonner";
// import { me } from "@/lib/api/auth";
// import { Route as LoginRoute } from "@/routes/(auth)/login";
// import { useUserStore } from "@/stores/userStore";

export const Route = createFileRoute("/(dashboard)")({
  // beforeLoad: async ({ context }) => {
  //   const user = context?.user ?? (await me());

  //   if (!user) throw redirect({ to: LoginRoute.to, replace: true });

  //   const { setUser } = useUserStore.getState();
  //   setUser(user);
  //   context.user = user;
  // },
  component: RouteComponent,
});

const queryClient = new QueryClient();

function RouteComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <Outlet />
        {/* <Toaster position="top-right" expand={true} richColors /> */}
      </div>
    </QueryClientProvider>
  );
}
