import {Document, Types} from 'mongoose'
export interface UserBaseDocument extends User, Document {
  _id: Types.ObjectId
  correctPassword({
    candidatePassword,
    userPassword,
  }: {
    candidatePassword: string
    userPassword: string
  }): Promise<boolean>
  changedAfter({date}: {date: number | undefined}): Promise<boolean>
  createPasswordResetToken(): Promise<void>
}
