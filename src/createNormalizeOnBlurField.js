// @flow

import * as React from 'react'
import type { FieldProps } from 'redux-form'
import type { Props as FieldInputProps } from 'redux-form/lib/FieldProps.types'
import memoize from './util/memoize'

function createNormalizeOnBlurField<P: FieldInputProps>(
  Field: React.ComponentType<P>
): React.ComponentType<P & { normalizeOnBlur?: Function }> {
  type InputProps = FieldInputProps & {
    normalizeOnBlur?: Function,
  }

  return class NormalizeOnBlurField extends React.Component<InputProps> {
    _input: ?Element = null

    BlurHandler = memoize(
      Comp => ({
        input: { onBlur, ...input },
        ...props
      }: FieldProps): React.Node => {
        const enterListener = (event: SyntheticKeyboardEvent<any>) => {
          if (event.keyCode === 13) {
            const { normalizeOnBlur } = this.props
            const value =
              event && event.target && event.target.hasOwnProperty('value')
                ? (event.target: any).value
                : event
            const newValue = normalizeOnBlur ? normalizeOnBlur(value) : value
            input.onChange(newValue)
          }
        }
        return (
          <Comp
            {...props}
            input={{
              ...input,
              onKeyDown: (event: SyntheticKeyboardEvent<any>) => {
                enterListener(event)
                if ((input: any).onKeyDown) (input: any).onKeyDown(event)
              },
              onBlur: (event: any) => {
                const { normalizeOnBlur } = this.props
                const value =
                  event && event.target && event.target.hasOwnProperty('value')
                    ? event.target.value
                    : event
                const newValue = normalizeOnBlur
                  ? normalizeOnBlur(value)
                  : value
                onBlur(newValue)
              },
            }}
          />
        )
      }
    )

    render(): React.Node {
      const { component, normalizeOnBlur, ...props } = this.props
      if (normalizeOnBlur) {
        return (
          <Field {...(props: any)} component={this.BlurHandler(component)} />
        )
      }
      return <Field {...(props: any)} component={component} />
    }
  }
}

module.exports = createNormalizeOnBlurField
