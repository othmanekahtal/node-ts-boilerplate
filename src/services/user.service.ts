import {UserBaseDocument} from '@entities/UserBaseDocument.entity'
import userModel from '@models/userModel'
import {QueryOptions, UpdateQuery, Types} from 'mongoose'
import {find, findbyIdAndUpdate, findOne} from './providers/mongoose.service'
export const getAllUser = async ({...options}) =>
  await find<UserBaseDocument>(userModel, options)

export const getSPecificUser = async ({...options}) =>
  await findOne<UserBaseDocument>(userModel, options)
export const updateUser = async (
  id: Types.ObjectId,
  fields: UpdateQuery<UserBaseDocument>,
  options?: QueryOptions,
) => await findbyIdAndUpdate<UserBaseDocument>(userModel, id, fields, options)
