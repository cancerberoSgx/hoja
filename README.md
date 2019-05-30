  * Micro TDD library that runs on several/rare JavaScript engines, including rhino,  V7, and Old Internet Explorer. 

  * It's physically divided on two implementations, synchronous and asynchronous,  on purpose since it was used on non asynchronous - non hackeable - JavaScript environments. 
 
  * The assertion syntax is similar to jasmine / mocha based on `describe()`, `expect()`, `it()`..

  * But the execution flow is different, you explicitly stop / start groups of specs imperatively.

  * aims to be as portable, simple and fast.

  * basic support for reports but customizable. The objective is to be agnostics on the report output  mediums so we limit to plain text. 

  * for the server and the browser. 
 
  * other scenario that shows to be useful is while bundling scripts to be runnel individually bu puppeteer os similar headless, in which case you need to be as fast as possible and a text report to stdout is enough.

# Usage

```
npm install -D canto
```

# API

 * The flow is driven, imperatively, via the object `SpecRunner`. You declare your tests, and execute them using it:

```ts

import {SpecRunner, describe, it, expect} from 'canto'
SpecRunner.getInstance().reset()
describe('Fruit', () => {
    it('can be eaten', () => {
        expect([1, 2, 3]).toContain(2)
    })
    it('can walk', () => {
        expect('asdas').toContain('as')
        expect(Math.random() > 2).toBe(true)
    })
})
const {results} = const results = SpecRunner.getInstance().run()
```

```Ahead on the file, or in ahother one you declare another group of tests by, again, resetting the object and run it.
