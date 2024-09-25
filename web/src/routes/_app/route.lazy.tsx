import Header from '@/components/Header'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app')({
  component: () => (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-3.5rem)] [max-width:1920px] mx-auto px-4">
        <Outlet />
      </main>
    </>
  ),
})
