export function getValues(o: object, paths: string[]): any[] {
  let tail = o
  const result: any[] = []
  for (let key of paths) {
    const val = tail[key]
    tail = val
    result.push(val)
  }
  return result
}

export function createProxy<T extends object>(
  target: object | null | undefined,
  handler: ProxyHandler<object>
) {
  const noop = function () {}
  const proxy = new Proxy(target || noop, handler) as T
  return proxy
}

export class Deferred<T> {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}
