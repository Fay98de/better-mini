import { createProxy, Deferred, getValues } from './utils'

interface IAsyncApiCommonOptions {
  success?: (result: any) => void
  fail?: (error: any) => void
  complete?: () => void
}

export function createApiProxy<T extends object>(
  target: { [key: string]: object },
  options: { syncPreset?: RegExp[]; syncApis?: string[]; props?: string[] } = {}
) {
  const [[variable, sdk]] = Object.entries(target)
  const { syncPreset = [], syncApis = [], props = [] } = options
  const cache: { [key: string]: any } = {}
  let paths: string[] = []
  let values: any[] = []

  const handler = {
    get(target, key: string, receiver) {
      if (target === sdk) {
        paths = []
        values = []
      }
      paths.push(key)
      const pathStr = paths.join('.')
      try {
        values = getValues(sdk, paths)
      } catch (error) {
        throw new Error(`${variable}.${pathStr} is not exist.`)
      }
      const value = values.slice().pop()
      if (props.includes(pathStr)) {
        return value
      }
      const proxy = (cache[pathStr] = cache[pathStr] || createProxy(value, handler))
      return proxy
    },

    apply(target, thisArg, args) {
      const pathStr = paths.join('.')
      const fn = values.pop()
      const caller = values.pop() || sdk
      if (typeof fn !== 'function') {
        throw new TypeError(`${variable}.${pathStr} is not function.`)
      }
      let isSync = false
      if (syncApis.includes(pathStr)) {
        isSync = true
      }
      for (let reg of syncPreset) {
        if (reg.test(pathStr)) isSync = true
      }
      if (isSync) {
        return fn.apply(caller, args)
      }
      const { resolve, reject, promise } = new Deferred()
      const options: IAsyncApiCommonOptions = args[0] || {}
      options.success = resolve
      options.fail = reject
      fn.call(caller, options)
      return promise
    },
  }

  const proxy = createProxy<T>(sdk, handler)

  return proxy
}
