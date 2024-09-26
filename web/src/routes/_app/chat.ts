import chatQuery from '@/api/queries/chatQuery'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/chat')({
  async loader({ context: { queryClient } }) {
    await queryClient.ensureQueryData(chatQuery)
  },
})
