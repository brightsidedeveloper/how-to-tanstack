import { c } from 'bsdweb'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={c('animate-pulse rounded-md bg-muted', className)} {...props} />
}

export { Skeleton }
