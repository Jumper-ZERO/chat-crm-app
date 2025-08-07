import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useT } from "@/lib/i18n/useT";
import { cn } from "@/lib/utils"
import { Route as RouteChats } from '@/routes/(dashboard)/chats'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { t } = useT();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("login.title")}</CardTitle>
          <CardDescription>
            {t("login.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">{t("login.emailLabel")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("login.passwordLabel")}</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t("login.forgotPassword")}
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  <Link
                    to={RouteChats.to}>
                    {t("login.button")}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("login.noAccountText")}{" "}
              <a href="/(auth)/register" className="underline underline-offset-4">
                {t("login.registerLink")}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
