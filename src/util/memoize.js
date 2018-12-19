/**
 * @flow
 * @prettier
 */

export default function memoize<I, O>(fn: I => O): I => O {
  let called: boolean = false
  let lastInput: ?I = null
  let lastOutput: any = null

  return (input: I): O => {
    if (called && input === lastInput) {
      return lastOutput
    }
    called = true
    lastInput = input
    return (lastOutput = fn(lastInput))
  }
}
