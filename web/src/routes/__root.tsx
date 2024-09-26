import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
})
