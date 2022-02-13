import userSchema from '@schemas/user.schema'
import mongoose, {Model} from 'mongoose'
import {UserBaseDocument} from '@entities/UserBaseDocument.entity'

import {
  hashPassword,
  willBeActive,
  changedAfter,
  createPasswordResetToken,
  correctPassword,
} from '@models/hooks/userModel.hooks'
userSchema.pre<UserBaseDocument>('save', hashPassword)
userSchema.pre<Model<UserBaseDocument>>(/^find/, willBeActive)
userSchema.methods.correctPassword = correctPassword
userSchema.methods.changedAfter = changedAfter
userSchema.methods.createPasswordResetToken = createPasswordResetToken
export default mongoose.model<UserBaseDocument>('user', userSchema)
