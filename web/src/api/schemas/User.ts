import { z } from 'zod'

// $ GET
export const GetUserSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  credits: z.number(),
})
export type GetUserResponse = z.infer<typeof GetUserSchema>

// $ POST
export type PostUserBody = {
  username: string
}
export const PostUserResponseSchema = z.object({
  success: z.literal(true),
})
export type PostUserResponse = z.infer<typeof PostUserResponseSchema>

declare global {
  interface GetEndpoints {
    '/rest/user': () => GetUserResponse
  }
  interface PostEndpoints {
    '/rest/user': (body: PostUserBody) => PostUserResponse
  }
}
