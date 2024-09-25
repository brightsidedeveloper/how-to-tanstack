import Branding from '@/components/Branding'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/sign-in')({
  component: () => (
    <main className="min-h-screen [max-width:1920px] mx-auto px-4 flex flex-col items-center justify-center">
      <Branding />
      <Outlet />
    </main>
  ),
})
