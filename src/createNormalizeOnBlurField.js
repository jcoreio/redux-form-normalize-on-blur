// @flow

import * as React from 'react'
import typeof {Field} from 'redux-form'
import type {FieldProps} from 'redux-form'

function createNormalizeOnBlurField<P: React.ElementProps<Field>>(
  Field: React.ComponentType<P>
): React.ComponentType<P & {normalizeOnBlur?: Function}> {
  type FieldInputProps = React.ElementProps<typeof Field>

  type InputProps = FieldInputProps & {
    normalizeOnBlur?: Function,
  }

  return class NormalizeOnBlurField extends React.Component<InputProps> {
    BlurHandler = ({input: {onBlur, ...input}, ...props}: FieldProps): React.Node => {
      const Comp = this.props.component
      return (
        <Comp
          {...props}
          input={{
            ...input,
            onBlur: (event: any) => {
              const {normalizeOnBlur} = this.props
              const value = event && event.target && event.target.hasOwnProperty('value')
                ? event.target.value
                : event
              const newValue = normalizeOnBlur ? normalizeOnBlur(value) : value
              onBlur(newValue)
            },
          }}
        />
      )
    }

    render(): ?React.Node {
      const {component, normalizeOnBlur, ...props} = this.props
      if (normalizeOnBlur) {
        return <Field component={this.BlurHandler} {...props} />
      }
      return <Field component={component} {...props} />
    }
  }
}

module.exports = createNormalizeOnBlurField
