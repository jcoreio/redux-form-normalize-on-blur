// @flow

import * as React from 'react'
import { Field as _Field } from 'redux-form'
import type { Props as FieldInputProps } from 'redux-form/lib/FieldProps.types'
import createNormalizeOnBlurField from './createNormalizeOnBlurField'

const Field = createNormalizeOnBlurField<FieldInputProps>(_Field)

export { Field, createNormalizeOnBlurField }
