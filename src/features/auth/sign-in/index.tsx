import { useSearch } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useT } from '@/lib/i18n/useT'
import { AuthLayout } from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const { t } = useT()

  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>{t('sign-in.title')}</CardTitle>
          <CardDescription className='w-8/10'>
            {t('sign-in.desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm redirectTo={redirect} />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            {t('sign-in.form.footer.msg')}
            {' \''}
            {t('sign-in.form.button.submit')}
            {'\''}
            {t('sign-in.form.footer.accept')}
            <a
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              {/* Terms of Service */}
              {t('sign-in.form.footer.term')}
            </a>{' '}
            and{' '}
            <a
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              {/* Privacy Policy */}
              {t('sign-in.form.footer.policy')}
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
