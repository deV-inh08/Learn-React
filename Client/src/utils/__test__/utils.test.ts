import { describe, it, expect } from 'vitest'
import { AxiosError } from 'axios'
import { isAxiosErrorFunc, isAxiosUnprocessableEntityError } from '../uitls'
import HttpStatusCode from '../../constants/httpStatusCode.enum'

describe('isAxiosError', () => {
  // it: các trường hợp cần test
  it('isAxiosError trả về boolean', () => {
    // kì vọng giá trị trả về
    expect(isAxiosErrorFunc(new Error())).toBe(false)
    expect(isAxiosErrorFunc(new AxiosError())).toBe(true)
  })
})


describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError trả về boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    )
  })
})
