// @flow

import * as React from 'react'
import { describe, it } from 'mocha'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { reduxForm, reducer } from 'redux-form'
import {
  reduxForm as immutableReduxForm,
  reducer as immutableReducer,
} from 'redux-form/immutable'

import { Field } from '../src'
import { Field as ImmutableField } from '../src/immutable'

const Input = ({ input: props }): React.Node => <input {...props} />

describe('NormalizeOnBlurField', () => {
  it('works when normalizeOnBlur is given', () => {
    const store = createStore(combineReducers({ form: reducer }))

    const Form = reduxForm({ form: 'form' })(() => (
      <form>
        <Field
          name="hello"
          component={Input}
          normalizeOnBlur={value => value && value.trim()}
        />
      </form>
    ))

    const comp = mount(
      <Provider store={store}>
        <Form />
      </Provider>
    )

    comp.find(Input).simulate('focus')
    comp.find(Input).simulate('change', { target: { value: '  23  ' } })
    expect(
      comp
        .update()
        .find('input')
        .prop('value')
    ).to.equal('  23  ')
    comp
      .update()
      .find(Input)
      .simulate('blur')
    expect(
      comp
        .update()
        .find('input')
        .prop('value')
    ).to.equal('23')
  })
  it('works when normalizeOnBlur is not given', () => {
    const store = createStore(combineReducers({ form: reducer }))

    const Form = reduxForm({ form: 'form' })(() => (
      <form>
        <Field name="hello" component={Input} />
      </form>
    ))

    const comp = mount(
      <Provider store={store}>
        <Form />
      </Provider>
    )

    comp.find(Input).simulate('focus')
    comp.find(Input).simulate('change', { target: { value: '  23  ' } })
    expect(
      comp
        .update()
        .find('input')
        .prop('value')
    ).to.equal('  23  ')
    comp
      .update()
      .find(Input)
      .simulate('blur')
    expect(
      comp
        .update()
        .find('input')
        .prop('value')
    ).to.equal('  23  ')
  })

  describe('with redux-form/immutable', () => {
    it('works when normalizeOnBlur is given', () => {
      const store = createStore(combineReducers({ form: immutableReducer }))

      const Form = immutableReduxForm({ form: 'form' })(() => (
        <form>
          <ImmutableField
            name="hello"
            component={Input}
            normalizeOnBlur={value => value && value.trim()}
          />
        </form>
      ))

      const comp = mount(
        <Provider store={store}>
          <Form />
        </Provider>
      )

      comp.find(Input).simulate('focus')
      comp.find(Input).simulate('change', { target: { value: '  23  ' } })
      expect(
        comp
          .update()
          .find('input')
          .prop('value')
      ).to.equal('  23  ')
      comp
        .update()
        .find(Input)
        .simulate('blur')
      expect(
        comp
          .update()
          .find('input')
          .prop('value')
      ).to.equal('23')
    })
    it('works when normalizeOnBlur is not given', () => {
      const store = createStore(combineReducers({ form: immutableReducer }))

      const Form = immutableReduxForm({ form: 'form' })(() => (
        <form>
          <ImmutableField name="hello" component={Input} />
        </form>
      ))

      const comp = mount(
        <Provider store={store}>
          <Form />
        </Provider>
      )

      comp.find(Input).simulate('focus')
      comp.find(Input).simulate('change', { target: { value: '  23  ' } })
      expect(
        comp
          .update()
          .find('input')
          .prop('value')
      ).to.equal('  23  ')
      comp
        .update()
        .find(Input)
        .simulate('blur')
      expect(
        comp
          .update()
          .find('input')
          .prop('value')
      ).to.equal('  23  ')
    })
  })
})
