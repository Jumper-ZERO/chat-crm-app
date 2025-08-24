import { useState } from 'react'

export const useSettingDialog = (defaultItem?: string) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(defaultItem || null)

  const openDialog = (itemId?: string) => {
    if (itemId) setActiveItem(itemId)
    setOpen(true)
  }

  const closeDialog = () => setOpen(false)

  return {
    open,
    activeItem,
    setActiveItem,
    openDialog,
    closeDialog
  }
}