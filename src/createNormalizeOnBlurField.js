// @flow

import * as React from 'react'
import type {FieldProps} from 'redux-form'

function createNormalizeOnBlurField<P: {component: React.ElementType | Function | string}>(
  Field: React.ComponentType<P>
): React.ComponentType<P & {normalizeOnBlur?: Function}> {
  type FieldInputProps = React.ElementProps<typeof Field>

  type InputProps = FieldInputProps & {
    normalizeOnBlur?: Function,
  }

  type Props = FieldProps & {
    normalizeOnBlur: Function,
    __blurHandlerComponent: React.ComponentType<FieldProps>,
  }

  class BlurHandler extends React.Component<Props> {
    handleBlur = (event: any) => {
      const {normalizeOnBlur, input: {onBlur}} = this.props
      const value = event && event.target && event.target.hasOwnProperty('value')
        ? event.target.value
        : event
      const newValue = normalizeOnBlur(value)
      onBlur(newValue)
    }

    render(): ?React.Node {
      const {
        input,
        normalizeOnBlur, // eslint-disable-line no-unused-vars
        __blurHandlerComponent: Comp,
        ...props
      } = this.props

      return (
        <Comp
          {...props}
          input={{
            ...input,
            onBlur: this.handleBlur,
          }}
        />
      )
    }
  }

  return class NormalizeOnBlurField extends React.Component<InputProps> {
    render(): ?React.Node {
      const {component, normalizeOnBlur, ...props} = this.props
      if (normalizeOnBlur) {
        return (
          <Field
            component={BlurHandler}
            __blurHandlerComponent={component}
            normalizeOnBlur={normalizeOnBlur}
            {...props}
          />
        )
      }
      return <Field component={component} {...props} />
    }
  }
}

module.exports = createNormalizeOnBlurField
