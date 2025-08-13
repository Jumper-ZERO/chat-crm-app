import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const isSigIn = await login({username, password});
    if (isSigIn) {
      navigate({ to: '/chats' });
    } else {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Card>
        <CardHeader>
          <CardTitle>{t("login.title")}</CardTitle>
          <CardDescription>
            {t("login.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">{t("login.emailLabel")}</Label>
                <Input
                  id="username"
                  placeholder="write your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {t("login.button")}
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
