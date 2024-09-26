import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

let loggedIn = false
const messages: { role: 'user' | 'assistant' | 'system'; content: string }[] = []
const user = { username: 'brightsidedeveloper', firstName: 'Tim', lastName: 'Van Lerberg', credits: 1000 }

app.post('/rest/signin', async (c) => {
  const { username, password } = await c.req.json()
  if (!username || !password) {
    return c.json({ error: 'Username & Password Required' }, 400)
  }
  if (username.toLowerCase() !== 'tim' || password.toLowerCase() !== 'password') {
    return c.json({ error: 'Invalid Username or Password' }, 400)
  }
  loggedIn = true
  return c.json({ success: true })
})

app.post('/rest/signin/signout', async (c) => {
  loggedIn = false
  return c.json({ success: true })
})

app.get('/rest/user', async (c) => {
  if (!loggedIn) return c.json({ error: 'Not Logged In' }, 401)
  return c.json(user)
})

app.put('/rest/user', async (c) => {
  if (!loggedIn) return c.json({ error: 'Not Logged In' }, 401)
  const { username } = await c.req.json()
  if (!username) return c.json({ error: 'Username Required' }, 400)
  user.username = username
  return c.json({ success: true })
})

app.get('/rest/chat', async (c) => {
  if (!loggedIn) return c.json({ error: 'Not Logged In' }, 401)
  return c.json({ messages })
})

app.post('/rest/chat', async (c) => {
  if (!loggedIn) return c.json({ error: 'Not Logged In' }, 401)
  const { prompt } = await c.req.json()
  if (!prompt) {
    return c.json({ error: 'Prompt Required' }, 400)
  }
  messages.push({ role: 'user', content: prompt })
  await sleep(1000)
  messages.push({ role: 'assistant', content: 'I am a bot, I do not understand' })
  return c.json({ success: true })
})

serve(app)

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
