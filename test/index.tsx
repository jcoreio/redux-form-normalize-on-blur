import * as React from 'react'
import { describe, it } from 'mocha'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { expect } from 'chai'
import { render, fireEvent } from '@testing-library/react'
import {
  reduxForm as pojoReduxForm,
  reducer as pojoReducer,
  WrappedFieldProps,
  DecoratedFormProps,
} from 'redux-form'
import {
  reduxForm as immutableReduxForm,
  reducer as immutableReducer,
} from 'redux-form/immutable'
import { Field as PojoField } from '../src'
import { Field as ImmutableField } from '../src/immutable'

const Input: any = ({
  input: props,
}: WrappedFieldProps): React.ReactElement => <input {...props} />

describe('NormalizeOnBlurField', () => {
  for (const immutable of [false, true] as boolean[]) {
    describe(immutable ? 'immutable' : 'pojo', function () {
      const reduxForm = immutable ? immutableReduxForm : pojoReduxForm
      const reducer = immutable ? immutableReducer : pojoReducer
      const Field = immutable ? ImmutableField : PojoField

      it('works when normalizeOnBlur is given', () => {
        const store = createStore(combineReducers({ form: reducer }))

        const Form = reduxForm({ form: 'form' })(() => (
          <form>
            <Field
              name="hello"
              component={Input}
              normalizeOnBlur={(value: string | null | undefined) =>
                value && value.trim()
              }
            />
          </form>
        ))

        const comp = render(
          <Provider store={store}>
            <Form />
          </Provider>
        )

        const input = comp.container.querySelector('input')
        if (!input) throw new Error(`failed to find input element`)
        fireEvent.focus(input)
        fireEvent.change(input, { target: { value: '  23  ' } })
        expect(input.value).to.equal('  23  ')
        fireEvent.blur(input)
        expect(input.value).to.equal('23')
      })
      it('works when normalizeOnBlur is not given', () => {
        const store = createStore(combineReducers({ form: reducer }))

        const Form = reduxForm({ form: 'form' })(() => (
          <form>
            <Field name="hello" component={Input} />
          </form>
        ))

        const comp = render(
          <Provider store={store}>
            <Form />
          </Provider>
        )

        const input = comp.container.querySelector('input')
        if (!input) throw new Error(`failed to find input element`)
        fireEvent.focus(input)
        fireEvent.change(input, { target: { value: '  23  ' } })
        expect(input.value).to.equal('  23  ')
        fireEvent.blur(input)
        expect(input.value).to.equal('  23  ')
      })
      it(`normalizes when enter is pressed`, function () {
        const store = createStore(combineReducers({ form: reducer }))

        const Form = reduxForm({ form: 'form' })(
          ({ onSubmit }: DecoratedFormProps<any, any>) => (
            <form>
              <Field
                name="hello"
                component={Input}
                normalizeOnBlur={(value: string | null | undefined) =>
                  value && value.trim()
                }
              />
              <button type="submit">Submit</button>
            </form>
          )
        )

        const comp = render(
          <Provider store={store}>
            <Form />
          </Provider>
        )

        const input = comp.container.querySelector('input')
        if (!input) throw new Error(`failed to find input element`)
        fireEvent.focus(input)
        fireEvent.change(input, { target: { value: '  23  ' } })
        expect(input.value).to.equal('  23  ')
        fireEvent.keyDown(input, { keyCode: 13 })
        expect(input.value).to.equal('23')
      })
    })
  }
})
