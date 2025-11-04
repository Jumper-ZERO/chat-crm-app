import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { getSentimentMonthlyTrend } from '@/features/dashboard/clients/metrics.client'

const chartConfig = {
  pos: {
    label: 'Positivo',
    color: 'var(--chart-1)',
  },
  neg: {
    label: 'Negativo',
    color: 'var(--chart-2)',
  },
  neu: {
    label: 'Neutral',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function SentimentLineChart() {
  const { data } = useQuery({
    queryKey: ['metrics', 'chart', 'line', 'sentiments'],
    queryFn: () => getSentimentMonthlyTrend,
  })

  const chartData =
    data?.map((item) => ({
      day: format(new Date(item.date), 'd MMM'),
      pos: item.pos,
      neg: item.neg,
      neu: item.neu,
    })) ?? []

  return (
    <Card className='col-span-1 lg:col-span-4'>
      <CardHeader>
        <CardTitle>Sentimiento mensual</CardTitle>
        <CardDescription>Distribución emocional por día</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 5, right: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='day'
              tickLine={false}
              axisLine={false}
              tickMargin={7}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey='pos'
              type='monotone'
              stroke='var(--color-pos)'
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey='neg'
              type='monotone'
              stroke='var(--color-neg)'
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey='neu'
              type='monotone'
              stroke='var(--color-neu)'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
