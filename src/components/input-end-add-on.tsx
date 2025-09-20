import { useId } from 'react'
import { Input } from '@/components/ui/input'

interface InputEndAddOnProps extends React.ComponentProps<'input'> {
  textEnd: string
}

export const InputEndAddOn = ({
  className,
  type,
  textEnd,
  ...props
}: InputEndAddOnProps) => {
  const id = useId()

  return (
    <div className='flex rounded-md shadow-xs'>
      <Input
        id={id}
        type={type}
        className='-me-px rounded-e-none shadow-none'
        {...props}
      />
      <span className='border-input bg-background text-muted-foreground inline-flex items-center rounded-e-md border px-3 text-sm'>
        {textEnd}
      </span>
    </div>
  )
}
