import * as React from 'react'
import type { BaseFieldProps, WrappedFieldProps } from 'redux-form'
import memoize from './util/memoize'

type AdditionalProps = {
  input: { onKeyDown?: React.KeyboardEventHandler<any> }
}

type InputProps = BaseFieldProps<AdditionalProps> & {
  normalizeOnBlur?: any
}

export default function createNormalizeOnBlurField(
  Field: React.ComponentType<BaseFieldProps<AdditionalProps>>
): React.ComponentType<InputProps> {
  return class NormalizeOnBlurField extends React.Component<InputProps> {
    _input: Element | null | undefined = null
    BlurHandler = memoize(
      (Comp: React.ComponentType<WrappedFieldProps & AdditionalProps>) =>
        // eslint-disable-next-line react/display-name
        ({
          input: { onBlur, ...input },
          ...props
        }: WrappedFieldProps): React.ReactElement => {
          const enterListener = (event: React.KeyboardEvent<any>) => {
            if (event.key === 'Enter') {
              const { normalizeOnBlur } = this.props
              const value =
                event &&
                event.target &&
                Object.prototype.hasOwnProperty.call(event.target, 'value')
                  ? (event.target as any).value
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
                onKeyDown: (event: React.KeyboardEvent<any>) => {
                  enterListener(event)
                  if ((input as any).onKeyDown) (input as any).onKeyDown(event)
                },
                onBlur: (event: any) => {
                  const { normalizeOnBlur } = this.props
                  const value =
                    event &&
                    event.target &&
                    Object.prototype.hasOwnProperty.call(event.target, 'value')
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

    render(): React.ReactElement {
      const { component, normalizeOnBlur, ...props } = this.props

      if (normalizeOnBlur && component) {
        return (
          <Field
            {...(props as any)}
            component={this.BlurHandler(component as any)}
          />
        )
      }

      return <Field {...(props as any)} component={component} />
    }
  }
}
