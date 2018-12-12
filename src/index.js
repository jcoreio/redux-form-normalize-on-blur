// @flow

import { Field as _Field } from 'redux-form'
import createNormalizeOnBlurField from './createNormalizeOnBlurField'

const Field = createNormalizeOnBlurField<React.ElementConfig<typeof _Field>>(
  _Field
)

export { Field, createNormalizeOnBlurField }
