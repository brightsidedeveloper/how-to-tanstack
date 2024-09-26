// TODO

import { get } from '@/utils/request'
import { queryOptions } from 'bsdweb'
import { GetCreditsSchema } from '../schemas/Credits'

const creditsQuery = queryOptions({
  queryKey: ['credits'],
  queryFn: () => get('/rest/credits', undefined, GetCreditsSchema.parse),
})

export default creditsQuery
