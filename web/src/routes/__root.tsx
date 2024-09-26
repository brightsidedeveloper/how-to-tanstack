import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

export const Route = createRootRouteWithContext()({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
})
