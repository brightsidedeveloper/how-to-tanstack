import chatQuery from '@/api/queries/chatQuery'
import { Input } from '@/components/ui/shadcn/ui/input'
import { post } from '@/utils/request'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient, useSuspenseQuery, wetToast } from 'bsdweb'
import { FormEvent, useState } from 'react'

export const Route = createLazyFileRoute('/_app/chat')({
  component: Chat,
})

function Chat() {
  const queryClient = useQueryClient()
  const {
    data: { messages },
  } = useSuspenseQuery(chatQuery)

  const [prompt, setPrompt] = useState('')

  const { mutate } = useMutation({
    mutationFn: () => post('/rest/chat', undefined, { prompt }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQuery.queryKey })
      setPrompt('')
    },
    onError: (error) => {
      wetToast(error.message)
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt) return wetToast('Prompt Required')
    mutate()
  }

  const reverseMessages = messages.map((_, i) => messages[messages.length - 1 - i])

  return (
    <div>
      <div className="flex flex-col-reverse gap-2 bg-card p-8 rounded-t-xl border border-b-transparent max-h-[40rem] overflow-y-auto max-w-[30rem]">
        {reverseMessages.map((message, i) => (
          <div key={i} className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="bg-card rounded-b-xl border p-2">
        <Input placeholder="Message..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </form>
    </div>
  )
}
