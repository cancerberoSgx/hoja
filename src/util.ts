
/** returns the type of the value with key K in the Mapped type T. Example: `type _string = ValueOf<A, 'a'>` . */
export type ValueOf<T extends { [k: string]: any }, K extends string> = T[K]
/** same as [[ValueOf]] but for numbers. */
export type ValueOfNumberKey<T extends { [k: number]: any }, K extends number> = T[K]


export function printMs(
  ms: number,
  config: {
    minutes?: boolean
    seconds?: boolean
    ms?: boolean
  } = { minutes: false, seconds: true, ms: true }
) {
  config = { ...{ minutes: false, seconds: true, ms: true }, ...config }
  const seconds = config.seconds && Math.floor(ms / 1000)
  const minutes = config.minutes && seconds && Math.floor(seconds / 60)
  const milliseconds = config.ms && Math.floor(ms % 1000 || ms)
  return `${minutes ? `${minutes} minutes ` : ''}${seconds ? `${seconds} seconds ` : ''}${
    milliseconds ? `${milliseconds} milliseconds ` : ''
    }`
}

export function repeat(n: number, s: string): string {
  return array(n, s).join('')
}

export function indent(i: number = 1, tabSize = 2): string {
  return repeat(i * tabSize, ' ')
}
export function array<T = number>(n: number, sample?: T): T[] {
  const a: (T | number)[] = []
  for (let i = 0;i < n;i++) {
    a.push(typeof sample === 'undefined' ? i : sample)
  }
  return a as T[]
}
// export function pr(error: Error) {
//   return `${error && error.type}, ${error && error.name}
// Cause: ${error && error.message}
// Stack Trace:
// ${printNativeErrorStack(error)}
// `}

// export function printNativeErrorStack(error: Error) {
//   return `${(error.stack && Array.isArray(error.stack)) ? error.stack.map(s => repeat(2, ' ') + s).join('\n') : error.stack}`
// }

const log = require('ololog')

export function printNativeError(e: Error) {
  log.bright.red.error.noLocate
}

