import {UserBaseDocument} from '@entities/UserBaseDocument.entity'
import userModel from '@models/userModel'
import {ValidatePasswordParamDefinition} from '@interfaces/ValidatePasswordParamDefinition'
import {ValidatePasswordChangedAfterTokenDefinition} from '@interfaces/ValidatePasswordChangedAfterTokenDefinition'
import {QueryOptions} from 'mongoose'

export const createUser = async (user: User): Promise<UserBaseDocument> =>
  await userModel.create(user)

export const findUser = async ({...fields}): Promise<UserBaseDocument | null> =>
  await userModel.findOne(fields)?.select('+password')

export const validatePassword = async ({
  document,
  userPassword,
}: ValidatePasswordParamDefinition): Promise<boolean> =>
  await document!.correctPassword({
    candidatePassword: document!.password!,
    userPassword: userPassword,
  })

export const findUserById = async (
  id: string,
): Promise<UserBaseDocument | null> =>
  await userModel.findById(id)?.select('+password')

export const validatePasswordChangedAfterToken = async ({
  document,
  date,
}: ValidatePasswordChangedAfterTokenDefinition): Promise<boolean> =>
  await document!.changedAfter({date: date})

export const generatePasswordResetToken = (
  document: UserBaseDocument,
): Promise<void> => document.createPasswordResetToken()

export const saveUser = async (
  document: UserBaseDocument,
  options?: QueryOptions,
): Promise<UserBaseDocument> => await document.save(options)
