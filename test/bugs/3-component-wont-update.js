// @flow

import * as React from 'react'
import { describe, it } from 'mocha'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { reduxForm, reducer } from 'redux-form'

import { Field } from '../../src'

const Input = ({ input: props }): React.Node => <input {...props} />

describe('NormalizeOnBlurField', () => {
  it(`#3 - Component won't update`, () => {
    const store = createStore(combineReducers({ form: reducer }))

    const Form = reduxForm({ form: 'form' })(({ component }) => (
      <Field
        name="hello"
        component={component}
        normalizeOnBlur={value => value && value.trim()}
      />
    ))

    const comp = mount(
      <Provider store={store}>
        <Form component={Input} />
      </Provider>
    )

    expect(comp.find(Input)).to.have.lengthOf(1)

    comp.setProps(
      (
        <Provider store={store}>
          <Form
            component={({ input: { value } }) => (
              <div className="readOnly">{value}</div>
            )}
          />
        </Provider>
      ).props
    )
    comp.update()

    expect(comp.find('.readOnly')).to.have.lengthOf(1)
    expect(comp.find(Input)).to.have.lengthOf(0)

    comp.setProps(
      (
        <Provider store={store}>
          <Form component={Input} />
        </Provider>
      ).props
    )

    comp.update()

    expect(comp.find('.readOnly')).to.have.lengthOf(0)
    expect(comp.find(Input)).to.have.lengthOf(1)
  })
})
