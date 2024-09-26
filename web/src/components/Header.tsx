import { Link } from '@tanstack/react-router'
import DropDown from './ui/DropDown'
import { Avatar, AvatarFallback, AvatarImage } from './ui/shadcn/ui/avatar'
import { ThemeToggle } from './ui/ThemeToggle'

export default function Header() {
  return (
    <header className="h-14 border-b shadow-sm flex items-center justify-center">
      <div className="px-4 flex items-center justify-between w-full [max-width:1920px]">
        <div className="flex items-center gap-12">
          <span className="font-semibold text-xl flex items-center">
            <img src="/Bright.svg" className="size-7 rounded-lg" alt="" />
            &nbsp;How To TanStack
          </span>
          <nav className="flex items-center gap-5">
            <Link
              to="/"
              className="transition-colors text-lg text-foreground/50 hover:text-foreground"
              activeProps={{
                style: {
                  fontWeight: 'bold',
                  color: 'var(--foreground)',
                },
              }}
            >
              Home
            </Link>
            <Link
              to="/chat"
              className="transition-colors text-lg text-foreground/50 hover:text-foreground"
              activeProps={{
                style: {
                  fontWeight: 'bold',
                  color: 'var(--foreground)',
                },
              }}
            >
              Chat
            </Link>
          </nav>
        </div>

        <div className="w-fit flex items-center gap-3">
          <ThemeToggle />

          <DropDown>
            <Avatar className="size-7">
              <AvatarImage src="https://github.com/brightsidedeveloper.png" alt="name" />
              <AvatarFallback>NAME</AvatarFallback>
            </Avatar>
          </DropDown>
        </div>
      </div>
    </header>
  )
}
