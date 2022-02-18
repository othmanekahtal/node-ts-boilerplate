import {UserBaseDocument} from '@entities/UserBaseDocument.entity'

export interface ValidatePasswordChangedAfterTokenDefinition {
  document: null | UserBaseDocument
  date: number | undefined
}
