import DropDown from './ui/DropDown'
import { Avatar, AvatarFallback, AvatarImage } from './ui/shadcn/ui/avatar'
import { ThemeToggle } from './ui/ThemeToggle'

export default function Header() {
  return (
    <header className="h-14 border-b shadow-sm flex items-center justify-center">
      <div className="px-4 flex items-center justify-between w-full [max-width:1920px]">
        <span className="font-semibold text-xl flex items-center">
          <img src="/Bright.svg" className="size-7 rounded-lg" alt="" />
          &nbsp;HowToTanStack
        </span>
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
