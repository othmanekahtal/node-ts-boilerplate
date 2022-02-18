import {UserBaseDocument} from '@entities/UserBaseDocument.entity'
import userModel from '@models/userModel'
import {QueryOptions, Types} from 'mongoose'

export const getAllUser = async ({
  ...options
}): Promise<UserBaseDocument[] | null> => await userModel.find(options)
export const getSPecificUser = async ({
  ...options
}): Promise<UserBaseDocument | null> => await userModel.findOne(options)
export const updateUser = async (
  id: Types.ObjectId,
  fields: {[x: string]: any},
  options?: QueryOptions,
): Promise<UserBaseDocument | null> =>
  await userModel.findByIdAndUpdate(id, fields, options)
