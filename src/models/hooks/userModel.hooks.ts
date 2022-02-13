import {UserBaseDocument} from '@entities/UserBaseDocument.entity'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import {Model} from 'mongoose'
// before aggregate, we need to execute all VIP or secret tours
export const hashPassword = async function (
  this: UserBaseDocument,
  next: Function,
) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.confirmPassword = undefined
  next()
}
export const correctPassword = async ({
  candidatePassword,
  userPassword,
}: {
  candidatePassword: string
  userPassword: string
}): Promise<boolean> => await bcrypt.compare(userPassword, candidatePassword)

export const changedAfter = async function (
  this: UserBaseDocument,
  date: number,
): Promise<boolean> {
  if (this.updatePasswordAt) {
    const parsedDate = this.updatePasswordAt.getTime() / 1000
    return parsedDate > date
  }
  return false
}
export const createPasswordResetToken = function (this: UserBaseDocument) {
  const resetTokenUser = crypto.randomBytes(32).toString('hex')
  this.resetToken = crypto
    .createHash('sha256')
    .update(resetTokenUser)
    .digest('hex')
  this.resetTokenExpiration = Date.now() + 10 * 60 * 1000
  return resetTokenUser
}
export const willBeActive = function (
  this: Model<UserBaseDocument>,
  next: Function,
) {
  this.find({active: {$ne: false}})
  next()
}
