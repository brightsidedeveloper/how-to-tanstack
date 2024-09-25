import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/chat')({
  component: () => <div>Hello /_app/chat!</div>,
})
