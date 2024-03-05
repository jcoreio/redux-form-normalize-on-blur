export default function memoize<I, O>(fn: (arg1: I) => O): (arg1: I) => O {
  let called = false
  let lastInput: I | null | undefined = null
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
