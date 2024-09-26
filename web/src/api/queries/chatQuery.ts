import { get } from '@/utils/request'
import { queryOptions } from 'bsdweb'
import { GetChatSchema } from '../schemas/Chat'

const chatQuery = queryOptions({
  queryKey: ['chat'],
  queryFn: () => get('/rest/chat', undefined, GetChatSchema.parse),
})

export default chatQuery
