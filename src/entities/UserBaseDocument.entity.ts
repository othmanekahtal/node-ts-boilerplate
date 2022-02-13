import {Document} from 'mongoose'
export interface UserBaseDocument extends User, Document {
  corredrPassword(): Promise<boolean>
  changedAfter(): Promise<boolean>
  createPasswordResetToken(): Promise<void>
}
