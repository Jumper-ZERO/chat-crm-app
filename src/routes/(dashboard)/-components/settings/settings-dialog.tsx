import { Menu } from "lucide-react";
import { useMemo, useState } from "react";

import { getConfigItemById } from "./config";
import { SettingsSidebar } from "./settings-sidebar";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const configItem = useMemo(
    () => (activeItem ? getConfigItemById(activeItem) : null),
    [activeItem]
  );
  const ActiveComponent = configItem?.component ?? null;

  const handleItemChange = (id: string) => {
    onItemChange(id);
    setMobileMenuOpen(false); // Close mobile menu after selection
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "p-0 rounded-lg overflow-hidden",
          "lg:max-w-5xl lg:max-h-[85vh]",
          "md:max-w-[700px] md:max-h-[75vh]",
          "max-w-[95vw] max-h-[90vh]"
        )}
      >
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Configure your CRM settings and integrations.
        </DialogDescription>

        <SidebarProvider
          defaultOpen={false}
          className="[&>div]:p-0 [&>div]:m-0"
        >
          <div className="flex w-full h-full p-0">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <SettingsSidebar
                activeItem={activeItem}
                onItemChange={onItemChange}
              />
            </div>

            <main className="flex-1 min-h-0 overflow-hidden flex flex-col">
              {ActiveComponent ? (
                <>
                  <header className="px-4 md:px-6 py-4 border-b flex items-center gap-3">
                    {/* Mobile Menu Button */}
                    <Sheet
                      open={mobileMenuOpen}
                      onOpenChange={setMobileMenuOpen}
                    >
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="md:hidden"
                        >
                          <Menu className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 p-0">
                        <SettingsSidebar
                          activeItem={activeItem}
                          onItemChange={handleItemChange}
                        />
                      </SheetContent>
                    </Sheet>

                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">
                        {configItem?.title}
                      </h2>
                      {configItem?.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {configItem.description}
                        </p>
                      )}
                    </div>
                  </header>
                  <section className="p-4 md:p-6 overflow-y-auto flex-1">
                    <ActiveComponent />
                  </section>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground p-6">
                  <div className="text-center">
                    <Sheet
                      open={mobileMenuOpen}
                      onOpenChange={setMobileMenuOpen}
                    >
                      <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden mb-4">
                          <Menu className="h-4 w-4 mr-2" />
                          Open Menu
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 p-0">
                        <SettingsSidebar
                          activeItem={activeItem}
                          onItemChange={handleItemChange}
                        />
                      </SheetContent>
                    </Sheet>
                    <p>Select a setting option</p>
                  </div>
                </div>
              )}
            </main>
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
