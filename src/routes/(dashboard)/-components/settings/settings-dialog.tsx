import { getConfigItemById } from "./config"
import { SettingsSidebar } from "./settings-sidebar"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { SidebarProvider } from "@/components/ui/sidebar"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeItem: string | null
  onItemChange: (id: string) => void
}

export function SettingsDialog({ 
  open = true, 
  onOpenChange, 
  activeItem = null, 
  onItemChange 
}: SettingsDialogProps) {
  const configItem = activeItem ? getConfigItemById(activeItem) : null
  const ActiveComponent = configItem?.component

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Configure your CRM settings and integrations.
        </DialogDescription>
        <SidebarProvider defaultOpen={false} className="[&>div]:p-0 [&>div]:m-0 [&>div]:max-w-full">
        <div className="flex w-full h-full">
            <SettingsSidebar 
              activeItem={activeItem}
              onItemChange={onItemChange}
            />
            <main className="flex flex-1 flex-col w-full overflow-hidden">
              {ActiveComponent ? (
                <ActiveComponent />
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Select a configuration option
                </div>
              )}
            </main>
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
