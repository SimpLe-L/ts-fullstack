import type { Context, Next } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export interface ResponseWrapper {
  code: number
  msg: string
  data: any
}

interface ResponseBody {
  message?: string
  msg?: string
  code?: number
  [key: string]: any
}

export async function responseWrapper(c: Context, next: Next) {
  await next()

  const response = c.res.clone()
  const status = response.status
  const contentType = response.headers.get('Content-Type')

  if (contentType?.includes('text/html') || contentType?.includes('application/json')) {
    const body = contentType?.includes('application/json')
      ? await response.json()
      : await response.text()

    if (typeof body === 'object' && 'code' in body && 'msg' in body) {
      c.set('responseData', body)
      return
    }

    if (contentType?.includes('text/html')) {
      return
    }

    const {
      message = '',
      msg = message,
      code = status,
      ...rest
    } = (typeof body === 'object' ? body : {}) as ResponseBody

    const wrappedResponse: ResponseWrapper = {
      code,
      msg,
      data: Object.keys(rest).length ? rest : null,
    }

    c.set('responseData', wrappedResponse)

    c.res = c.json(wrappedResponse, response.status as number as ContentfulStatusCode)
  }
}
