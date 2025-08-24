import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useSettingDialog } from '@/hooks/useSettingDialog'
import { SettingsDialog } from '@/routes/(dashboard)/-components/settings/settings-dialog'


export const Route = createFileRoute('/(dashboard)/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const { open, activeItem, setActiveItem, openDialog, closeDialog } = 
    useSettingDialog('general')

  return (
    <>
      <Button onClick={() => openDialog()}>Open Configuration</Button>
      <Button onClick={() => openDialog('whatsapp')}>WhatsApp Settings</Button>
      
      <SettingsDialog
        open={open}
        onOpenChange={closeDialog}
        activeItem={activeItem}
        onItemChange={setActiveItem}
      />
    </>
  )
}
