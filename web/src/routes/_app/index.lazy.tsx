import creditsQuery from '@/api/queries/creditsQuery'
import userQuery from '@/api/queries/userQuery'
import { PostCreditsBody, PostCreditsSchema } from '@/api/schemas/Credits'
import { Button } from '@/components/ui/shadcn/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/shadcn/ui/card'
import { post } from '@/utils/request'
import { createLazyFileRoute } from '@tanstack/react-router'
import { tw, useMutation, useQuery, useQueryClient, useSuspenseQuery, wetToast } from 'bsdweb'

export const Route = createLazyFileRoute('/_app/')({
  component: Home,
})

function Home() {
  const queryClient = useQueryClient()
  const { data: user } = useSuspenseQuery(userQuery)

  const { data: credits, error, isLoading, refetch, status, isRefetching } = useQuery(creditsQuery)

  const { mutate } = useMutation({
    mutationFn: (multiplier: PostCreditsBody['multiplier']) => post('/rest/credits', undefined, { multiplier }, PostCreditsSchema.parse),
    onSuccess: () => {
      wetToast('Credits purchased!')
      queryClient.invalidateQueries({ queryKey: creditsQuery.queryKey })
    },
    onError: (error) => wetToast(error.message),
  })

  return (
    <div>
      <h1 className="text-6xl mb-4">Home</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome {user.firstName}!</CardTitle>
          <CardDescription>You username is: @{user.username}</CardDescription>
        </CardHeader>
        <CardContent className="gap-2 flex">
          <Button
            variant="secondary"
            onClick={() => {
              refetch()
            }}
          >
            Refetch Credits
          </Button>
          {([1, 2, 3] as const).map((multiplier) => (
            <Button key={multiplier} onClick={() => mutate(multiplier)}>
              Buy Credits x{multiplier}
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex-col">
          <span> {isLoading ? 'Loading...' : error ? error.message : credits && `You have ${credits.credits} credits`}</span>
          <span>
            Status:&nbsp;
            <span className={tw(status === 'pending' ? 'text-amber-500' : status === 'error' ? 'text-destructive' : 'text-emerald-500')}>
              {status}
            </span>
            {isRefetching && ' (Refetching...)'}
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
