import * as React from 'react'
import { describe, it } from 'mocha'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { expect } from 'chai'
import {
  reduxForm,
  reducer,
  WrappedFieldProps,
  DecoratedFormProps,
} from 'redux-form'
import { Field } from '../../src'

const Input = ({ input: props }: WrappedFieldProps): React.ReactElement => (
  <input {...props} />
)

describe('NormalizeOnBlurField', () => {
  it(`#3 - Component won't update`, () => {
    const store = createStore(combineReducers({ form: reducer }))

    const Form = reduxForm({ form: 'form' })(
      ({ component }: DecoratedFormProps<any, any>) => (
        <Field
          name="hello"
          component={component}
          normalizeOnBlur={(value: string | null | undefined) =>
            value && value.trim()
          }
        />
      )
    ) as any

    const comp = render(
      <Provider store={store}>
        <Form component={Input} />
      </Provider>
    )

    expect(comp.container.querySelectorAll('input')).to.have.lengthOf(1)

    comp.rerender(
      <Provider store={store}>
        <Form
          component={({ input: { value } }: WrappedFieldProps) => (
            <div className="readOnly">{value}</div>
          )}
        />
      </Provider>
    )

    expect(comp.container.querySelectorAll('.readOnly')).to.have.lengthOf(1)
    expect(comp.container.querySelectorAll('input')).to.have.lengthOf(0)

    comp.rerender(
      <Provider store={store}>
        <Form component={Input} />
      </Provider>
    )

    expect(comp.container.querySelectorAll('.readOnly')).to.have.lengthOf(0)
    expect(comp.container.querySelectorAll('input')).to.have.lengthOf(1)
  })
})
