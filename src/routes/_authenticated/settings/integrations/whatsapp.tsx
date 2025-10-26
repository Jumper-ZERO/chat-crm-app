import { createFileRoute } from '@tanstack/react-router'
import { SettingsIntegrationWhatsapp } from '@/features/settings/integrations/whatsapp'

export const Route = createFileRoute(
  '/_authenticated/settings/integrations/whatsapp'
)({
  component: SettingsIntegrationWhatsapp,
})
