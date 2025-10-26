import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { editContact, saveContact } from '@/services/contact.service'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { toast } from 'sonner'
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
import { useSearchUsers } from '@/components/contact/hooks/user-search-users'
import { UserCombobox } from '@/features/contacts/components/user-combobox'
import { type Contact } from '../data/schema'

const formSchema = z
  .object({
    name: z.string().optional(),
    phone: z.string(),
    assignedTo: z.string(),
    isEdit: z.boolean(),
  })
  .refine(
    ({ isEdit, phone }) => {
      if (isEdit) return true
      return phone.trim().length > 0
    },
    {
      message: 'Phone number is required.',
      path: ['phone'],
    }
  )
  .refine(
    ({ phone }) => {
      return isValidPhoneNumber(phone)
    },
    {
      message: 'Not is a valid number phone',
      path: ['phone'],
    }
  )
  .refine(
    ({ isEdit, assignedTo }) => {
      if (isEdit) return true
      return assignedTo.trim().length > 0
    },
    {
      message: 'Assigned user is required.',
      path: ['assignedTo'],
    }
  )
  .refine(({ assignedTo }) => z.uuid().safeParse(assignedTo).success, {
    message: 'Assigned user must be a valid UUID.',
    path: ['assignedTo'],
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
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
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
          phone: '',
          assignedTo: '',
          isEdit,
        },
  })

  const { data: users = [] } = useSearchUsers(search)

  const onSubmit = (values: ContactForm) => {
    form.reset()
    const { isEdit, ...data } = values

    const apiCall =
      isEdit && currentRow?.id
        ? editContact(currentRow.id, data)
        : saveContact(data)

    toast.promise(apiCall, {
      loading: 'Guardando...',
      success: () => {
        queryClient.invalidateQueries({
          queryKey: ['contacts'],
        })
        return 'Se guardó exitosamente'
      },
      error: (err) => {
        console.error(err)
        const msg = err.response?.data?.message
        if (msg) {
          if (Array.isArray(msg)) return msg.reduce((a, c) => a + ', ' + c)
          return err.response.data.message
        }
        return 'Ocurrió un error al guardar.'
      },
    })
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
                  <FormItem>
                    <FormLabel className='col-span-2 text-end'>
                      Name (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John Doe'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => {
                  const valueInE164 = field.value
                    ? field.value.startsWith('+')
                      ? field.value
                      : `+51${field.value}`
                    : undefined

                  return (
                    <FormItem>
                      <FormLabel>Celular</FormLabel>
                      <FormControl>
                        <PhoneInput
                          value={valueInE164}
                          onChange={field.onChange ?? ''}
                          defaultCountry='PE'
                          international={false}
                          placeholder='987 654 321'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              {/* Assigned To */}
              <FormField
                control={form.control}
                name='assignedTo'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel className=''>Asignado</FormLabel>
                    <UserCombobox
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      options={users}
                      onSearch={(q) => setSearch(q)}
                    />
                    <FormMessage />
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
