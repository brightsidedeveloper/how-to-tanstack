import { serve } from '@hono/node-server'
import axios from 'axios'
import { Hono } from 'hono'

const app = new Hono()

let loggedIn = false
const messages: { role: 'user' | 'assistant' | 'system'; content: string }[] = [
  { role: 'assistant', content: 'Hello, how can I help you today?' },
]
const user = { username: 'brightsidedeveloper', firstName: 'Tim', lastName: 'Van Lerberg' }
let credits = 1000

app.post('/rest/signin', async (c) => {
  const { username, password } = await c.req.json()
  if (!username || !password) {
    return c.json({ error: 'Username & Password Required' }, 400)
  }
  if (username.toLowerCase() !== 'tim' || password.toLowerCase() !== 'password') {
    return c.json({ error: 'Invalid Username or Password' }, 400)
  }
  loggedIn = true
  return c.json({})
})

app.post('/rest/signin/signout', async (c) => {
  loggedIn = false
  return c.json({})
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
  return c.json({})
})

app.get('/rest/credits', async (c) => {
  if (!loggedIn) return c.json({ error: 'Not Logged In' }, 401)
  await sleep(Math.random() * 3000)
  if (Math.random() > 0.66) return c.json({ error: 'Server Error' }, 500)
  return c.json({ credits })
})

app.post('/rest/credits', async (c) => {
  if (!loggedIn) return c.json({ error: 'Not Logged In' }, 401)
  const { multiplier } = await c.req.json()
  await sleep(Math.random() * 3000)
  if (Math.random() > 0.66) return c.json({ error: 'Server Error' }, 500)
  switch (multiplier) {
    case 1:
      credits += 1000
      break
    case 2:
      credits += 5000
      break
    case 3:
      credits += 10000
      break
    default:
      return c.json({ error: 'Invalid Multiplier' }, 400)
  }
  return c.json({})
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
  const { data } = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer`,
      },
    }
  )

  messages.push({ role: 'assistant', content: data.choices[0].message.content })
  return c.json({})
})

serve(app)

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
