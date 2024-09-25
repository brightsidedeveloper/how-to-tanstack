import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.use('*', async (c, next) => {
  const apiKey = c.req.header('x-api-key')
  if (apiKey !== 'tim') {
    console.log('Unauthorized Request:', c.req.url)
    return c.text('Unauthorized', 401)
  }
  console.log('Request:', c.req.url)

  await next()
})

app.get('/', (c) => c.text('We up!'))

serve(app)
