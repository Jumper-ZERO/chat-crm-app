import { useQuery } from '@tanstack/react-query'
import {
  Activity,
  MessageSquareDot,
  MessageSquareReply,
  type LucideIcon,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getKpis } from '@/features/dashboard/clients/metrics.client'

export const KPIs = () => {
  const { data: kpis } = useQuery({
    queryKey: ['metrics', 'kpis'],
    queryFn: () => getKpis,
    placeholderData: (prev) => prev,
  })

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <KPICard
        title='Chat Activos'
        value={kpis?.activeChats.value ?? 0}
        porcentLastMonth={kpis?.activeChats.porcentLastMonth ?? '0%'}
        icon={MessageSquareDot}
      />
      <KPICard
        title='Mensajes de hoy'
        value={kpis?.messagesToday.value ?? 0}
        porcentLastMonth={kpis?.messagesToday.porcentLastMonth ?? '0%'}
        icon={MessageSquareReply}
      />
      <KPICard
        title='Usuarios Activos'
        value={kpis?.agentsActive.value ?? 0}
        porcentLastMonth={kpis?.agentsActive.porcentLastMonth ?? '0%'}
        icon={Activity}
      />
    </div>
  )
}

const KPICard = ({
  title,
  value,
  porcentLastMonth,
  icon,
}: {
  title: string
  value: number | string
  porcentLastMonth: string
  icon: LucideIcon
}) => {
  const Icon: LucideIcon = icon
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium capitalize'>
          {title}
        </CardTitle>
        <Icon size={18} opacity={0.5} />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <CardDescription className='text-muted-foreground text-xs'>
          {`${porcentLastMonth} que el último mes`}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
