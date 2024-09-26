/* eslint-disable @typescript-eslint/no-empty-object-type */
import debug from 'debug'

//* Initialize debug variables
const logGet = debug('request:get')
const logPost = debug('request:post')
const logPut = debug('request:put')
const logPatch = debug('request:patch')
const logDelete = debug('request:delete')

//* Initialize debug styles
const InfoStyles = 'color: lightblue;'
const ErrorStyles = 'color: lightred;'
const SuccessStyles = 'color: lightgreen;'

//* Declare global types
declare global {
  interface GetEndpoints {}
  interface PostEndpoints {}
  interface PutEndpoints {}
  interface PatchEndpoints {}
  interface DeleteEndpoints {}
}

/**
 * Fetches data from the specified URL using the GET method.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param options - The fetch options
 * @returns The fetched data
 * @example Fetching data from an API
 * ```ts
 * declare global {
 *   interface GetEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params?: { id?: number }) => { userId: number; id: number; title: string; body: string; }[]
 *   }
 * }
 *
 * const posts = await get("https://jsonplaceholder.typicode.com/posts", { id: 1 })
 * ```
 */
export async function get<U extends keyof GetEndpoints>(
  url: U,
  params: Parameters<GetEndpoints[U]>[0],
  options?: RequestOptions
): Promise<ReturnType<GetEndpoints[U]>>
/**
 * Fetches data from the specified URL using the GET method and validates it.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param validator - The function to validate the fetched data
 * @param options - The fetch options
 * @returns The fetched data after validation
 * @example Fetching data from an API
 * ```ts
 * declare global {
 *   interface GetEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params?: { id?: number }) => { userId: number; id: number; title: string; body: string; }[]
 *   }
 * }
 *
 * const PostsSchema = z.array(z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string(),
 * }))
 *
 * const posts = await get("https://jsonplaceholder.typicode.com/posts", { id: 1 }, PostsSchema.parse)
 * ```
 */
export async function get<U extends keyof GetEndpoints>(
  url: U,
  params: Parameters<GetEndpoints[U]>[0],
  validator: Validator<ReturnType<GetEndpoints[U]>>,
  options?: RequestOptions
): Promise<ReturnType<GetEndpoints[U]>>
export async function get<U extends keyof GetEndpoints>(
  url: U,
  params: Parameters<GetEndpoints[U]>[0],
  validator?: RequestOptions | Validator<ReturnType<GetEndpoints[U]>>,
  options?: RequestOptions
) {
  let rawData: unknown

  // Handle the case where the validator is not provided
  if (typeof validator !== 'function') {
    options = validator
    validator = undefined
  }

  logGet('%c>> %s %o %o', InfoStyles, url, params, options)

  try {
    // Parse the query parameters
    const query = parseParams(params ?? undefined)

    // Fetch the data
    const res = await fetch(url + query, { ...options, method: 'GET' })
    if (!res.ok) throw new Error(res.statusText)
    const contentType = res.headers.get('content-type')

    // Handle the response based on the content type
    if (contentType === 'application/json') rawData = await res.json()
    else if (contentType?.startsWith('text/')) rawData = await res.text()
    else rawData = await res.blob()

    // Validate the response
    const data = validator ? validator(rawData) : (rawData as ReturnType<GetEndpoints[U]>)
    logGet('%c<< %s %o %o', SuccessStyles, url, params, data)
    return data
  } catch (value) {
    const err = ensureError(value)
    logGet('%c<< %s %o %o\n%s', ErrorStyles, url, params, rawData, err.stack)
    throw err
  }
}

/**
 * Fetches data from the specified URL using the POST method.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param body - The request body
 * @param options - The fetch options
 * @returns The fetched data
 * @example Sending data to an API
 * ```ts
 * declare global {
 *   interface PostEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params?: never, body: { userId: number; title: string; body: string }) => { userId: number; id: number; title: string; body: string; }
 *   }
 * }
 *
 * const post = await post("https://jsonplaceholder.typicode.com/posts", null, { userId: 1, title: "Hello, World!", body: "This is a test post." })
 * ```
 */
export async function post<U extends keyof PostEndpoints>(
  url: U,
  params: Parameters<PostEndpoints[U]>[0],
  body: Parameters<PostEndpoints[U]>[1],
  options?: RequestOptions
): Promise<ReturnType<PostEndpoints[U]>>
/**
 * Fetches data from the specified URL using the POST method and validates it.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param body - The request body
 * @param validator - The function to validate the fetched data
 * @param options - The fetch options
 * @returns The fetched data after validation
 * @example Sending data to an API
 * ```ts
 * declare global {
 *   interface PostEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params?: never, body: { userId: number; title: string; body: string }) => { userId: number; id: number; title: string; body: string; }
 *   }
 * }
 *
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string(),
 * })
 *
 * const post = await post("https://jsonplaceholder.typicode.com/posts", null, { userId: 1, title: "Hello, World!", body: "This is a test post." }, PostSchema.parse)
 * ```
 */
export async function post<U extends keyof PostEndpoints>(
  url: U,
  params: Parameters<PostEndpoints[U]>[0],
  body: Parameters<PostEndpoints[U]>[1],
  validator: Validator<ReturnType<PostEndpoints[U]>>,
  options?: RequestOptions
): Promise<ReturnType<PostEndpoints[U]>>
export async function post<U extends keyof PostEndpoints>(
  url: U,
  params: Parameters<PostEndpoints[U]>[0],
  body: Parameters<PostEndpoints[U]>[1],
  validator?: RequestOptions | Validator<ReturnType<PostEndpoints[U]>>,
  options?: RequestOptions
) {
  let rawData: unknown

  // Handle the case where the validator is not provided
  if (typeof validator !== 'function') {
    options = validator
    validator = undefined
  }

  logPost('%c>> %s %o %o %o', InfoStyles, url, params, body, options)

  try {
    // Parse the query parameters
    const query = parseParams(params ?? undefined)

    // Fetch the data
    const res = await fetch(url + query, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(res.statusText)
    const contentType = res.headers.get('content-type')

    // Handle the response based on the content type
    if (contentType === 'application/json') rawData = await res.json()
    else if (contentType?.startsWith('text/')) rawData = await res.text()
    else rawData = await res.blob()

    // Validate the response
    const data = validator ? validator(rawData) : (rawData as ReturnType<PostEndpoints[U]>)
    logPost('%c<< %s %o %o %o', SuccessStyles, url, params, body, data)
    return data
  } catch (value) {
    const err = ensureError(value)
    logPost('%c<< %s %o %o %o\n%s', ErrorStyles, url, params, body, rawData, err.stack)
    throw err
  }
}

/**
 * Fetches data from the specified URL using the PUT method.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param body - The request body
 * @param options - The fetch options
 * @returns The fetched data
 * @example Updating data in an API
 * ```ts
 * declare global {
 *   interface PutEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params: { id: number }, body: { userId: number; title: string; body: string }) => { userId: number; id: number; title: string; body: string; }
 *   }
 * }
 *
 * const post = await put("https://jsonplaceholder.typicode.com/posts", { id: 1 }, { userId: 1, title: "Hello, World!", body: "This is a test post." })
 * ```
 */
export async function put<U extends keyof PutEndpoints>(
  url: U,
  params: Parameters<PutEndpoints[U]>[0],
  body: Parameters<PutEndpoints[U]>[1],
  options?: RequestOptions
): Promise<ReturnType<PutEndpoints[U]>>
/**
 * Fetches data from the specified URL using the PUT method and validates it.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param body - The request body
 * @param validator - The function to validate the fetched data
 * @param options - The fetch options
 * @returns The fetched data after validation
 * @example Updating data in an API
 * ```ts
 * declare global {
 *   interface PutEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params: { id: number }, body: { userId: number; title: string; body: string }) => { userId: number; id: number; title: string; body: string; }
 *   }
 * }
 *
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string(),
 * })
 *
 * const post = await put("https://jsonplaceholder.typicode.com/posts", { id: 1 }, { userId: 1, title: "Hello, World!", body: "This is a test post." }, PostSchema.parse)
 * ```
 */
export async function put<U extends keyof PutEndpoints>(
  url: U,
  params: Parameters<PutEndpoints[U]>[0],
  body: Parameters<PutEndpoints[U]>[1],
  validator: Validator<ReturnType<PutEndpoints[U]>>,
  options?: RequestOptions
): Promise<ReturnType<PutEndpoints[U]>>
export async function put<U extends keyof PutEndpoints>(
  url: U,
  params: Parameters<PutEndpoints[U]>[0],
  body: Parameters<PutEndpoints[U]>[1],
  validator?: RequestOptions | Validator<ReturnType<PutEndpoints[U]>>,
  options?: RequestOptions
) {
  let rawData: unknown

  // Handle the case where the validator is not provided
  if (typeof validator !== 'function') {
    options = validator
    validator = undefined
  }

  logPut('%c>> %s %o %o %o', InfoStyles, url, params, body, options)

  try {
    // Parse the query parameters
    const query = parseParams(params ?? undefined)

    // Fetch the data
    const res = await fetch(url + query, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(res.statusText)
    const contentType = res.headers.get('content-type')

    // Handle the response based on the content type
    if (contentType === 'application/json') rawData = await res.json()
    else if (contentType?.startsWith('text/')) rawData = await res.text()
    else rawData = await res.blob()

    // Validate the response
    const data = validator ? validator(rawData) : (rawData as ReturnType<PutEndpoints[U]>)
    logPut('%c<< %s %o %o %o', SuccessStyles, url, params, body, data)
    return data
  } catch (value) {
    const err = ensureError(value)
    logPut('%c<< %s %o %o %o\n%s', ErrorStyles, url, params, body, rawData, err.stack)
    throw err
  }
}

/**
 * Fetches data from the specified URL using the PATCH method.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param body - The request body
 * @param options - The fetch options
 * @returns The fetched data
 * @example Updating data in an API
 * ```ts
 * declare global {
 *   interface PatchEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params: { id: number }, body: { userId?: number; title?: string; body?: string }) => { userId: number; id: number; title: string; body: string; }
 *   }
 * }
 *
 * const post = await patch("https://jsonplaceholder.typicode.com/posts", { id: 1 }, { title: "Hello, World!" })
 * ```
 */
export async function patch<U extends keyof PatchEndpoints>(
  url: U,
  params: Parameters<PatchEndpoints[U]>[0],
  body: Parameters<PatchEndpoints[U]>[1],
  options?: RequestOptions
): Promise<ReturnType<PatchEndpoints[U]>>
/**
 * Fetches data from the specified URL using the PATCH method and validates it.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param body - The request body
 * @param validator - The function to validate the fetched data
 * @param options - The fetch options
 * @returns The fetched data after validation
 * @example Updating data in an API
 * ```ts
 * declare global {
 *   interface PatchEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params: { id: number }, body: { userId?: number; title?: string; body?: string }) => { userId: number; id: number; title: string; body: string; }
 *   }
 * }
 *
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string(),
 * })
 *
 * const post = await patch("https://jsonplaceholder.typicode.com/posts", { id: 1 }, { title: "Hello, World!" }, PostSchema.parse)
 * ```
 */
export async function patch<U extends keyof PatchEndpoints>(
  url: U,
  params: Parameters<PatchEndpoints[U]>[0],
  body: Parameters<PatchEndpoints[U]>[1],
  validator: Validator<ReturnType<PatchEndpoints[U]>>,
  options?: RequestOptions
): Promise<ReturnType<PatchEndpoints[U]>>
export async function patch<U extends keyof PatchEndpoints>(
  url: U,
  params: Parameters<PatchEndpoints[U]>[0],
  body: Parameters<PatchEndpoints[U]>[1],
  validator?: RequestOptions | Validator<ReturnType<PatchEndpoints[U]>>,
  options?: RequestOptions
) {
  let rawData: unknown

  // Handle the case where the validator is not provided
  if (typeof validator !== 'function') {
    options = validator
    validator = undefined
  }

  logPatch('%c>> %s %o %o %o', InfoStyles, url, params, body, options)

  try {
    // Parse the query parameters
    const query = parseParams(params ?? undefined)

    // Fetch the data
    const res = await fetch(url + query, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(res.statusText)
    const contentType = res.headers.get('content-type')

    // Handle the response based on the content type
    if (contentType === 'application/json') rawData = await res.json()
    else if (contentType?.startsWith('text/')) rawData = await res.text()
    else rawData = await res.blob()

    // Validate the response
    const data = validator ? validator(rawData) : (rawData as ReturnType<PatchEndpoints[U]>)
    logPatch('%c<< %s %o %o %o', SuccessStyles, url, params, body, data)
    return data
  } catch (value) {
    const err = ensureError(value)
    logPatch('%c<< %s %o %o %o\n%s', ErrorStyles, url, params, body, rawData, err.stack)
    throw err
  }
}

/**
 * Fetches data from the specified URL using the DELETE method.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param options - The fetch options
 * @returns The fetched data
 * @example Deleting data from an API
 * ```ts
 * declare global {
 *   interface DeleteEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params: { id: number }) => { userId: number; id: number; title: string; body: string; }
 *   }
 * }
 *
 * const post = await del("https://jsonplaceholder.typicode.com/posts", { id: 1 })
 * ```
 */
export async function del<U extends keyof DeleteEndpoints>(
  url: U,
  params: Parameters<DeleteEndpoints[U]>[0],
  options?: RequestOptions
): Promise<ReturnType<DeleteEndpoints[U]>>
/**
 * Fetches data from the specified URL using the DELETE method and validates it.
 * @param url - The URL to fetch
 * @param params - The query parameters
 * @param validator - The function to validate the fetched data
 * @param options - The fetch options
 * @returns The fetched data after validation
 * @example Deleting data from an API
 * ```ts
 * declare global {
 *   interface DeleteEndpoints {
 *     "https://jsonplaceholder.typicode.com/posts": (params: { id: number }) => { userId: number; id: number; title: string; body: string; }
 *   }
 * }
 *
 * const SuccessSchema = z.object({ success: z.literal(true) })
 *
 * const success = await del("https://jsonplaceholder.typicode.com/posts", { id: 1 }, SuccessSchema.parse)
 * ```
 */
export async function del<U extends keyof DeleteEndpoints>(
  url: U,
  params: Parameters<DeleteEndpoints[U]>[0],
  validator: Validator<ReturnType<DeleteEndpoints[U]>>,
  options?: RequestOptions
): Promise<ReturnType<DeleteEndpoints[U]>>
export async function del<U extends keyof DeleteEndpoints>(
  url: U,
  params: Parameters<DeleteEndpoints[U]>[0],
  validator?: RequestOptions | Validator<ReturnType<DeleteEndpoints[U]>>,
  options?: RequestOptions
) {
  let rawData: unknown

  // Handle the case where the validator is not provided
  if (typeof validator !== 'function') {
    options = validator
    validator = undefined
  }

  logDelete('%c>> %s %o %o', InfoStyles, url, params, options)

  try {
    // Parse the query parameters
    const query = parseParams(params ?? undefined)

    // Fetch the data
    const res = await fetch(url + query, { ...options, method: 'DELETE' })
    if (!res.ok) throw new Error(res.statusText)
    const contentType = res.headers.get('content-type')

    // Handle the response based on the content type
    if (contentType === 'application/json') rawData = await res.json()
    else if (contentType?.startsWith('text/')) rawData = await res.text()
    else rawData = await res.blob()

    // Validate the response
    const data = validator ? validator(rawData) : (rawData as ReturnType<DeleteEndpoints[U]>)
    logDelete('%c<< %s %o %o', SuccessStyles, url, params, data)
    return data
  } catch (value) {
    const err = ensureError(value)
    logDelete('%c<< %s %o %o\n%s', ErrorStyles, url, params, err.stack)
    throw err
  }
}

/**
 * Parses the query parameters into a query string.
 * @param params - The object containing the query parameters
 * @returns - The query string
 */
export function parseParams(params?: Record<string, unknown> | null) {
  if (!params) return ''
  const searchParams = new URLSearchParams()
  for (const key in params) {
    const value = params[key]
    let parsedValue: string
    if (value == null) continue
    else if (value instanceof Date) parsedValue = String(value.getUTCMilliseconds())
    else if (Array.isArray(value)) parsedValue = value.map(String).join()
    else if (typeof value === 'object') parsedValue = JSON.stringify(value)
    else parsedValue = String(value)
    searchParams.set(key, parsedValue)
  }
  const str = searchParams.toString()
  if (str.length === 0) return ''
  return `?${str}`
}

/**
 * Checks whether the value is an AbortException.
 * @param value - The value to check
 * @returns Whether the value is an AbortException
 */
export function isAbortException(value: unknown): value is DOMException {
  return value instanceof DOMException && value.name === 'AbortError'
}

export type RequestOptions = Omit<RequestInit, 'body' | 'method'>
export type Validator<T> = (data: unknown) => T
/**
 * Ensures the given value is an error, otherwise wraps it in a ThrownValueException
 * @param value - The value to ensure is an error
 * @returns The given value if it is an error, otherwise a new ThrownValueException containing the value
 * @example Ensuring an error
 * ```ts
 * try {
 *   if (Math.random() < 0.5) throw new Error('An error occurred') // This will be caught as an Error
 *   throw 'An error occurred' // This will be caught as a string and wrapped in a ThrownValueException
 * } catch(value) {
 *   const error = ensureError(value)
 *   console.error(error)
 * }
 * ```
 */
export default function ensureError(value: unknown): Error {
  if (value instanceof Error) return value
  return new ThrownValueException(value)
}

/**
 * An exception that wraps a value that was thrown
 */
export class ThrownValueException<T> extends Error {
  /**
   * The value that was thrown
   */
  readonly value: T

  /**
   * Creates a new ThrownValueException
   * @param value - The value that was thrown
   */
  constructor(value: T) {
    try {
      super(JSON.stringify(value))
    } catch {
      super(String(value))
    }
    this.name = 'ThrownValueException'
    this.value = value
  }
}
