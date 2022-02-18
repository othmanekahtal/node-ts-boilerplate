import {UserBaseDocument} from '@entities/UserBaseDocument.entity'

export interface ValidatePasswordParamDefinition {
  document: null | UserBaseDocument
  userPassword: string
}
