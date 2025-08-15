import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"

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
import { Toaster } from "@/components/ui/sonner"
import { login } from "@/lib/api/auth"
import { useT } from "@/lib/i18n/useT";
import { cn } from "@/lib/utils"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { t } = useT();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSigIn = await login({username, password});
    if (isSigIn) {
      navigate({ to: '/chats' });
    } else {
      toast('Error al iniciar sesion', {
        description: "Nombre de usuario o contraseña incorrectos",
      })
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* toast */}
      <Toaster position="top-right" />

      {/* card */}
      <Card>
        <CardHeader>
          <CardTitle>{t("login.title")}</CardTitle>
          <CardDescription>
            {t("login.desc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">{t("login.form.username.label")}</Label>
                <Input
                  id="username"
                  placeholder={t("login.form.username.placeholder")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("login.form.password.label")}</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t("login.form.password.forgot")}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {t("login.form.button")}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("login.link.noaccount")}{" "}
              <a href="/(auth)/register" className="underline underline-offset-4">
                {t("login.link.register")}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
