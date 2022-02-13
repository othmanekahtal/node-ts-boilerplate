import validator from 'validator'
import {Schema} from 'mongoose'
import {UserBaseDocument} from '@entities/UserBaseDocument.entity'
// we need to getting schema class in mongoose:
export default new Schema<UserBaseDocument>({
  username: {
    type: String,
    required: [true, 'An user must have a username'],
    // unique: true,
    trim: true,
    maxlength: [40, 'An username must have less or equal then 40 characters'],
    minlength: [10, 'An username must have more or equal then 10 characters'],
  },
  email: {
    type: String,
    required: [true, 'An user must have an email'],
    unique: true,
    trim: true,
    maxlength: [40, 'An email must have less or equal then 40 characters'],
    minlength: [10, 'An email must have more or equal then 10 characters'],
    validate: {
      message: 'An email is not valid !',
      validator: validator.isEmail,
    },
  },
  role: {
    type: String,
    enum: ['admin', 'guide', 'lead-guide', 'user'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'An user must have an password'],
    maxlength: [26, 'A password must have less or equal then 26 characters'],
    minlength: [10, 'An password must have more or equal then 10 characters'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'please confirm your password'],
    maxlength: [26, 'A password must have less or equal then 26 characters'],
    minlength: [10, 'An password must have more or equal then 10 characters'],
    validate: {
      message: 'Passwords not the same !',
      validator: function (this: User, element: string): boolean {
        return this.password === element
      },
    },
  },
  resetToken: String,
  resetTokenExpiration: Date,
  updatePasswordAt: Date,
  imageCover: {
    type: String,
    required: [true, 'An user must have a cover image'],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
})
