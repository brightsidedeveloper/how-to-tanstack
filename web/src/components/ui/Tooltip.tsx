import { TooltipProvider, Tooltip as RTooltip, TooltipTrigger, TooltipContent } from './shadcn/ui/tooltip'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <TooltipProvider>
      <RTooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </RTooltip>
    </TooltipProvider>
  )
}
