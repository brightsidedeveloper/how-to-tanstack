import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/ui/dropdown-menu'

import { Github, LogOut, PillBottle, Star } from 'lucide-react'
import { Button } from './shadcn/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from 'bsdweb'
import { post } from '@/utils/request'
import wetToast from '@/utils/wetToast'

export default function DropDown({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: signOut } = useMutation({
    mutationFn: () => post('/rest/signin/signout', undefined, undefined),
    onSuccess: () => {
      queryClient.clear()
      navigate({ to: '/sign-in' })
    },
    onError: (error) => wetToast(error.message),
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-10">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="https://github.com/brightsidedeveloper" target="_blank" className="flex items-center">
            <Github className="mr-2 h-4 w-4" />
            <span>Follow GitHub</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="https://github.com/brightsidedeveloper/how-to-tanstack" target="_blank" className="flex items-center">
            <Star className="mr-2 h-4 w-4" />
            <span>Star Repo</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <PillBottle className="mr-2 h-4 w-4" />
          <span>Secret Sauce</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center" onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
