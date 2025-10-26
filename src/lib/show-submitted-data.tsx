import { toast } from 'sonner'

export function showSubmittedData(
  data: unknown,
  title: string = 'You submitted the following values:'
) {
  toast.message(title, {
    description: (
      // * w-[320px] is the maximun width
      <pre className='mt-2 w-[320px] overflow-x-auto rounded-md bg-slate-950 p-4'>
        <code className='w-fit text-white'>
          {JSON.stringify(data, null, 2)}
        </code>
      </pre>
    ),
  })
}
