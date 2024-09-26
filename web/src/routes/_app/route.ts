import userQuery from '@/api/queries/userQuery'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  async loader({ context: { queryClient } }) {
    await queryClient.ensureQueryData(userQuery)
  },
})
