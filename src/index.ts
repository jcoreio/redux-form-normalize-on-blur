import { Field as _Field } from 'redux-form'
import createNormalizeOnBlurField from './createNormalizeOnBlurField'

const Field = createNormalizeOnBlurField(_Field)

export { Field, createNormalizeOnBlurField }
