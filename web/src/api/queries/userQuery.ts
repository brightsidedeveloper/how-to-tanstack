import { get } from '@/utils/request'
import { queryOptions } from 'bsdweb'
import { GetUserSchema } from '../schemas/User'

const userQuery = queryOptions({
  queryKey: ['user'],
  queryFn: () => get('/rest/user', undefined, GetUserSchema.parse),
})

export default userQuery
