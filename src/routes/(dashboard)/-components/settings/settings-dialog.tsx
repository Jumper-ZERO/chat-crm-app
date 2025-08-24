import { useMemo } from "react";

import { getConfigItemById } from "./config";
import { SettingsSidebar } from "./settings-sidebar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function SettingsDialog({
  open,
  onOpenChange,
  activeItem,
  onItemChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeItem: string | null;
  onItemChange: (id: string) => void;
}) {
  const configItem = useMemo(
    () => (activeItem ? getConfigItemById(activeItem) : null),
    [activeItem]
  );
  const ActiveComponent = configItem?.component ?? null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "p-0 rounded-lg overflow-hidden",
          "lg:max-w-5xl lg:max-h-[85vh]",
          "md:max-w-[700px] md:max-h-[75vh]",
          "min-w-lg max-h-[65vh]",
        )
        }
      >
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Configure your CRM settings and integrations.
        </DialogDescription>

        {/* * [&>div] => It is to overwrite the styles that the provider has by default. */}
        <SidebarProvider defaultOpen={false} className="[&>div]:p-0 [&>div]:m-0">
          <div className="flex w-full h-full p-0">
            <SettingsSidebar activeItem={activeItem} onItemChange={onItemChange} />
            <main className="flex-1 min-h-0 overflow-hidden">
              {ActiveComponent ? (
                <div>
                  <header className="px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">{configItem?.title}</h2>
                    {configItem?.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {configItem.description}
                      </p>
                    )}
                  </header>
                  <section className="p-6 overflow-y-auto flex-1 min-h-0">
                    <ActiveComponent />
                  </section>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground p-6">
                  Select a setting option
                </div>
              )}
            </main>
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
