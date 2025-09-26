import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { useUsers } from '@/hooks/use-users'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { type Contact } from '../data/schema'

// schema de contacto simplificado para formulario
const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
  assignedTo: z.uuid().nullable().optional(),
  isEdit: z.boolean(),
})

type ContactForm = z.infer<typeof formSchema>

type ContactsActionDialogProps = {
  currentRow?: Contact
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ContactsActionDialogProps) {
  const { data: users = [] } = useUsers()
  const isEdit = !!currentRow
  const form = useForm<ContactForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          assignedTo: currentRow.assignedTo?.id,
          isEdit,
        }
      : {
          name: '',
          phone: '',
          assignedTo: null,
          isEdit,
        },
  })

  const onSubmit = (values: ContactForm) => {
    form.reset()
    showSubmittedData(values) // Aquí reemplazarías por llamada a tu backend
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Edit Contact' : 'Add New Contact'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the contact here.' : 'Create a new contact here.'}
            Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='h-fit w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='contact-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              {/* Name */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel className='col-span-2 text-end'>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John Doe'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <PhoneInput
                        value={field.value}
                        onChange={field.onChange}
                        defaultCountry='PE'
                        placeholder='987 654 321'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Assigned To */}
              <FormField
                control={form.control}
                name='assignedTo'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel className=''>Asignado</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value ?? ''}
                      onValueChange={field.onChange}
                      placeholder='Select user'
                      className='col-span-4'
                      items={users.map((u) => ({
                        value: u.id,
                        label: u.username,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='contact-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
