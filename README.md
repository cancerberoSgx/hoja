# hoja

## WIP

  * Minimal JavaScript testing framework designed to run different/rare JavaScript environments, such as
    rhino,  V7,old browsers.

  * Supports safe synchronous test run mode.  
     * It's physically divided on two implementations, synchronous and asynchronous,  on purpose since it was
       used on non asynchronous - non hackeable - JavaScript environments. 

  * The assertion syntax is similar to jasmine / mocha based on `describe()`, `expect()`, `it()`..

  * But the execution flow is different, you explicitly stop / start groups of specs imperatively.

  * aims to be as portable, simple and fast.

  * basic support for reports but customizable. The objective is to be agnostics on the report output  mediums
    so we limit to plain text. 

  * for the server and the browser. 

  * other scenario that shows to be useful is while bundling scripts to be runnel individually bu puppeteer os
    similar headless, in which case you need to be as fast as possible and a text report to stdout is enough.

## Usage

```
npm install -D canto
```

## API

 * The flow is driven, imperatively, via the object `SpecRunner`. You declare your tests, and execute them
   using it:

```ts
import { SpecRunner, describe, it, expect, skip, fai } from 'parra'

reset()
describe('Fruit', () => {
  it('can be eaten', () => {
    expect([1, 2, 3]).toContain(2)
  })
  it('can walk', () => {
    expect('asdas').toContain('as')
    expect(Math.random() > 2).toBe(true)
  })
})
const { results } = run()   // run the inner describe statements. Default implementation is synchronous.

                            // ... ahead in time...
reset()                     // make sure the next execution block is clean.
describe('d1', () => {
  it('must fail', () => {
    expect(1).toBe(1)
    if (1 < 2) {
      skip('Preconditions failed')  // skip() makes the test not to fail nor not to success. 
    }                               // means conditions for the test to execute are not meet in the current environment.
    expect(2).toBe(2)
  })
  it('must not fail2', () => {
    expect(1).toBe(1)
    if(foo()){
      fail('Expected something')
    }
  })
})
const {results, timings} = run({random: true, breakOnFirstError: true})       
                             // this time run() is configured  and returns timing data.


```

 * [spec/specSpec.ts](spec/specSpec.ts)
 * 


## run() 

Returns a result object 


## TODO

* async api
* api docs
* fit(), fdescribe()
* make describes optional and introduce test() like ava / jest
* easy framework to run the tests and descendt report with jsdom and puppetter.
* should we invest on optimize performance (parrallel)
