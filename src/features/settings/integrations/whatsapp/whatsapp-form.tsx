import { useEffect } from 'react'
import { useForm, type FieldErrors, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  defaultValues,
  isApiVersion,
  schema,
  versions,
  type WhatsAppConfigInput,
} from '@/schemas/whatsapp-config.schema'
import { getConfig, saveConfig } from '@/services/whatsapp.service'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PasswordInput } from '@/components/password-input'

const onInvalidSubmit = (errors: FieldErrors<WhatsAppConfigInput>) => {
  Object.values(errors).forEach((error) => {
    if (error?.message) toast.error(error.message)
  })
}

export const WhatsappForm = () => {
  const { businessId } = useAuthStore().auth.user!

  // Get data config
  const { data, isLoading } = useQuery({
    queryKey: ['whatsapp', 'config', businessId],
    queryFn: () => getConfig(businessId),
  })

  const form = useForm<WhatsAppConfigInput>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (vals: WhatsAppConfigInput) => saveConfig(businessId, vals),
  })

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data, form])

  return isLoading ? (
    <div className='flex h-8/10 items-center justify-center'>
      <Loader2Icon className='text-muted-foreground h-max w-6 animate-spin' />
    </div>
  ) : (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit((vals) => mutate(vals), onInvalidSubmit)}
        onSubmit={form.handleSubmit(async (vals) => {
          await toast.promise(mutateAsync(vals), {
            loading: 'Guardando configuración...',
            success: 'Configuración guardada correctamente 🎉',
            error: 'Ocurrió un error al guardar la configuración ❌',
          })
        }, onInvalidSubmit)}
        className='flex h-8/10 flex-col justify-between space-y-6'
      >
        <div className='flex flex-col gap-5'>
          {/* Business Information Section */}
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <InputForm
                form={form}
                name='businessId'
                label='Business Account ID'
                placeholder='ID de la cuenta de negocio'
              />

              <InputForm
                form={form}
                name='phoneNumberId'
                label='Phone Number ID'
                placeholder='ID del número de Whatsapp'
              />

              <FormField
                control={form.control}
                name='apiVersion'
                render={({ field }) => {
                  const handleSelectChange = (val?: string) => {
                    if (!isApiVersion(val)) return
                    field.onChange(val)
                  }

                  return (
                    <FormItem>
                      <FormLabel>Versión de API</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={handleSelectChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={'vXX.X'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {versions.map((version) => (
                            <SelectItem key={version} value={version}>
                              {version}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )
                }}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Tokens de acceso</h3>
            <div className='space-y-4'>
              <InputForm
                form={form}
                name='accessToken'
                label='Access Token'
                placeholder='Token de acceso de Meta'
                secret={true}
              />

              <InputForm
                form={form}
                name='webhookVerifyToken'
                label='Verify Token'
                placeholder='Token de verificación de Meta'
                secret={true}
              />
            </div>
          </div>

          {/* Webhook Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Configuración de Webhook</h3>
            <InputForm
              form={form}
              name='webhookUrl'
              label='Webhook URL'
              placeholder='https://tu-dominio.com/whatsapp/webhook'
            />
          </div>
        </div>

        {/* Buttons Actions */}
        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            size='lg'
            variant='secondary'
            // disabled={loading}
            style={{ padding: '0.5rem 1rem' }}
          >
            Test
          </Button>
          <LoadingButton type='submit' loading={isPending}>
            Guardar
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}

export const InputForm = ({
  form,
  name,
  label,
  placeholder,
  secret = false,
}: {
  form: UseFormReturn
  name: keyof WhatsAppConfigInput
  label: string
  placeholder: string
  secret?: boolean
  readOnly?: boolean
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {secret ? (
              <PasswordInput placeholder='********' {...field} />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  )
}
