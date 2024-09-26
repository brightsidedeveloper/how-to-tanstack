import { z } from 'zod'

type SignInBody = {
  username: string
  password: string
}

export const PostSignInSchema = z.object({
  success: z.literal(true),
})
export type PostSignInResponse = z.infer<typeof PostSignInSchema>

declare global {
  interface PostEndpoints {
    '/rest/signin': (params: undefined, body: SignInBody) => PostSignInResponse
    '/rest/signin/signout': () => PostSignInResponse
  }
}
