import { redirect } from 'next/navigation'
import { getSession } from '@auth0/nextjs-auth0'
import Welcome from '@/components/Welcome'

export default async function Home() {
  const session = await getSession()

  if (session?.user) {
    redirect('/home')
  }

  return <Welcome />
}