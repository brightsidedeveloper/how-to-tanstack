import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/')({
  component: () => <div>Hello /_app/!</div>
})