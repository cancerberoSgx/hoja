import { Describe, SpecError, SpecType } from "./describe"
import { ExpectResult } from "./expect"
import { It } from "./it"
import { printError } from './textReporter'
import { now, printNativeError } from './util'

/** [[run]] configuration */
export interface SpecRunnerRunConfig {
  specs?: (() => void)[]
  random?: boolean
  breakOnFirstError?: boolean
  reset?: boolean
}

export interface ItResult {
  name: string
  type: SpecType
  /** expect() results in this execution, */
  results: ExpectResult[]
  error?: SpecError
}

export interface SpecRunnerResult {
  results: DescribeResult[]
  totalTime: number
}

export interface DescribeResult {
  name: string
  specs: DescribeResult[]
  /** Results per it() call expression per describe() call expressions..*/
  results: ItResult[]
}

export function reset() {
  return SpecRunner.getInstance().reset()
}

export function run(config: SpecRunnerRunConfig = {}) {
  return SpecRunner.getInstance().run()
}


/** user needs to instantiate this, add their describe functions and execute `run()` in order to run the tests adn obtain the results */
export class SpecRunner {

  private static instance = new SpecRunner()
  static getInstance() {
    return SpecRunner.instance
  }
  public describes: Describe[] = [] // TODO getter
  _currentDescribe: Describe | undefined
  _currentIt: It | undefined
  private constructor() { }

  reset() {
    this._currentDescribe = undefined
    this._currentIt = undefined
    this.describes = []
  }

  run(config: SpecRunnerRunConfig = {}) {
    if (config.reset) {
      SpecRunner.getInstance().reset()
    }
    (config.specs || []).forEach((s, index) => {
      try {
        s()
      }
      catch (error) {
        console.log(`Exception while evaluating describe() and its() of the #${index} given specs function:` + error)
        console.log((this._currentDescribe && this._currentDescribe.name) + ' ' + (this._currentIt && this._currentIt.name))
        console.log(printNativeError(error))
      }
    })
    let totalTime = now()
    this.describes.forEach(d => {
      this._currentDescribe = d
      d.its.forEach(i => {
        this._currentIt = i
        try {
          i.fn()
        }
        catch (err) {
          const error = { ...err, nativeException: err }
          i.error = error
          console.log('Exception catch in it ' + i.name)
          if (config.breakOnFirstError) {
            console.log(printError(error))
            throw error
          }
        }
      })
    })
    const results = this.getResults(this.describes)
    totalTime = now() - totalTime
    return { results, totalTime }
  }

  protected getResults(describes: Describe[]): DescribeResult[] {
    const specs = describes.map(d => {
      return {
        name: d.name,
        specs: this.getResults(d.describes || []),
        results: d.its.map(i => ({ ...i, parent: undefined }))
      }
    })
    return specs
  }

}

