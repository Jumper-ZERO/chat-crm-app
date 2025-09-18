// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSignIn } from '@/hooks/use-sign-in'
import { useT } from '@/lib/i18n/useT'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Please enter your username' })
    .refine((val) => val.trim() !== '', {
      message: 'Username cannot be just whitespace',
    }),
  password: z
    .string()
    .min(1, 'Please enter your password')
    .min(7, 'Password must be at least 7 characters long'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useSignIn();
  const { t } = useT();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

   const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.promise(mutateAsync(values), {
      loading: "Signing in...",
      success: () => {
        navigate({ to: "/" })
        return `Welcome back, ${values.username}!`
      },
      error: (err) =>
        err.response?.data?.message || "Login failed",
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sign-in.form.username.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('sign-in.form.username.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>{t('sign-in.form.password.label')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75'
              >
                {t('sign-in.form.password.forgot')}
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isPending}>
          {isPending ? <Loader2 className='animate-spin' /> : <LogIn />}
          {t('sign-in.form.button.submit')}
        </Button>
      </form>
    </Form>
  )
}
