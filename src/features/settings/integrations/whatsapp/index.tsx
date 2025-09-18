import { ContentSection } from '@/features/settings/components/content-section'
import { WhatsappForm } from '@/features/settings/integrations/whatsapp/whatsapp-form'

export function SettingsIntegrationWhatsapp() {
  return (
    <ContentSection
      title={'Whatsapp Configuration'}
      desc={
        'This section is for configuration credentials for whatsapp business'
      }
    >
      <WhatsappForm />
    </ContentSection>
  )
}
