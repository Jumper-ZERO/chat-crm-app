import { GalleryVerticalEnd } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/lib/i18n/useT";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useT();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">{t("forgot.brand")}</span>
            </a>
            <h1 className="text-xl font-bold">
              {t("forgot.title")}
            </h1>
            <div className="text-center text-sm">
              {t("forgot.desc")}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">{t("forgot.form.email.label")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("forgot.form.email.placeholder")}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t("forgot.form.button")}
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              <a href="/login">{t("forgot.link.back")}</a>
            </span>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {t("forgot.footer.accept")}{" "}
        <a href="#">{t("forgot.footer.terms")}</a>{" "}
        {t("forgot.footer.privacy")}
      </div>
    </div>
  );
}
