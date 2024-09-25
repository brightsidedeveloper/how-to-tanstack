import { Button } from '@/components/ui/shadcn/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/shadcn/ui/card'
import { Input } from '@/components/ui/shadcn/ui/input'
import { Label } from '@/components/ui/shadcn/ui/label'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/sign-in/')({
  component: SignIn,
})

function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent className="[&_input]:mt-2 [&_input:first-of-type]:mb-4">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Tim" />
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Sign In</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
