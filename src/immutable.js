// @flow

import * as React from 'react'
import { Field as _Field } from 'redux-form/immutable'
import createNormalizeOnBlurField from './createNormalizeOnBlurField'

const Field = createNormalizeOnBlurField<React.ElementConfig<typeof _Field>>(
  _Field
)

export { Field, createNormalizeOnBlurField }
