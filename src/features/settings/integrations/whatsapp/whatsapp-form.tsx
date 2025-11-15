import { useEffect } from 'react'
import { useForm, type FieldErrors } from 'react-hook-form'
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
import { Separator } from '@/components/ui/separator'
import { CopyIconButton } from '@/components/button-copy-icon'
import { InputEndAddOn } from '@/components/input-end-add-on'
import { PasswordInput } from '@/components/input-password'

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
        onSubmit={form.handleSubmit(async (vals) => {
          toast.promise(mutateAsync(vals), {
            loading: 'Guardando configuración...',
            success: 'Configuración guardada correctamente 🎉',
            error: 'Ocurrió un error al guardar la configuración ❌',
          })
        }, onInvalidSubmit)}
        className='flex h-8/10 w-full flex-col justify-between space-y-6'
      >
        {/* Business Information Section */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
          <FormField
            control={form.control}
            name='businessId'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Business Account ID</FormLabel>
                <Input placeholder='ID de la cuenta de negocio' {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phoneNumberId'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Phone Number ID</FormLabel>
                <Input placeholder='ID del número de whatsapp' {...field} />
              </FormItem>
            )}
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
                    <FormControl className='w-full'>
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

        {/* Security Section */}
        <div className='space-y-4'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='accessToken'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Token</FormLabel>
                  <PasswordInput
                    placeholder='Token de acceso de Meta'
                    {...field}
                  />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Webhook Section */}
        <div className='mb-0 flex-none'>
          <h3 className='text-lg font-medium'>Webhook Configuration</h3>
          <p className='text-muted-foreground text-sm'>
            Configure endpoints to receive real-time events from external
            services.
          </p>
        </div>
        <Separator className='my-4 flex-none' />
        <div className='flex items-end justify-between gap-2'>
          <FormField
            control={form.control}
            name='webhookUrl'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Webhook Url</FormLabel>
                <FormControl className='flex w-full flex-row'>
                  <InputEndAddOn
                    textEnd='/whatsapp/webwook'
                    placeholder='http://tu-domain.com'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <CopyIconButton
            text={form.getValues('webhookUrl') + '/whatsapp/webhook'}
          />
        </div>

        <div className='flex items-end justify-between gap-2'>
          <FormField
            control={form.control}
            name='webhookVerifyToken'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Verify Token</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='********'
                    readOnly={true}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <CopyIconButton text={form.getValues('webhookVerifyToken') + ''} />
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
