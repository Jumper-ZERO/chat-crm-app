import { IntegrationsForm } from '@/features/settings/integrations/integrations-form'
import { ContentSection } from '../components/content-section'

export function SettingsIntegrations() {
  return (
    <ContentSection
      title='Integrations'
      desc='Customize the integrations of the app.'
    >
      <IntegrationsForm />
    </ContentSection>
  )
}
