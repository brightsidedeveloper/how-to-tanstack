import { Button } from '@/components/ui/shadcn/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/shadcn/ui/card'
import { Input } from '@/components/ui/shadcn/ui/input'
import { Label } from '@/components/ui/shadcn/ui/label'
import { post } from '@/utils/request'
import wetToast from '@/utils/wetToast'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation } from 'bsdweb'
import { useState } from 'react'

export const Route = createLazyFileRoute('/sign-in/')({
  component: SignIn,
})

function SignIn() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { mutate } = useMutation({
    mutationFn: () => post('/rest/signin', undefined, { username, password }),
    onSuccess: () => navigate({ to: '/' }),
    onError: (error) => wetToast(error.message),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Here is a hint, the password is password 😅</CardDescription>
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
