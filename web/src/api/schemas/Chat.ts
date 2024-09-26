import { z } from 'zod'

// $ GET
export const GetChatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    })
  ),
})
export type GetChatResponse = z.infer<typeof GetChatSchema>

// $ POST
type PostChatBody = {
  prompt: string
}
export const PostChatSchema = z.object({})
export type PostChatResponse = z.infer<typeof PostChatSchema>

declare global {
  interface GetEndpoints {
    '/rest/chat': () => GetChatResponse
  }
  interface PostEndpoints {
    '/rest/chat': (params: undefined, body: PostChatBody) => PostChatResponse
  }
}
