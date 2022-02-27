import {
  QueryOptions,
  Types,
  FilterQuery,
  Document,
  HydratedDocument,
  Model,
  UpdateQuery,
} from 'mongoose'
// generic find method :
export const find = async <T>(
  model: Model<T>,
  options?: QueryOptions,
): Promise<Document<T>[] | null> => await model.find({...options})
// generic findone method:
export const findOne = async <T>(
  model: Model<T>,
  filter: FilterQuery<T>,
  options?: QueryOptions,
): Promise<Document<T> | null> => await model.findOne(filter, options)
// generic findByIdAndUpdate method:
export const findbyIdAndUpdate = async <T>(
  model: Model<T>,
  id: Types.ObjectId,
  fields: UpdateQuery<T> | undefined,
  options?: QueryOptions,
): Promise<Document<T> | null> =>
  await model.findByIdAndUpdate(id, fields, options)
// generic create method :
export const create = async <T>(
  model: Model<T>,
  user: User,
): Promise<HydratedDocument<T>> => await model.create(user)
export const save = async <T>(
  model: Document,
  options?: QueryOptions,
): Promise<Document<T>> => await model.save(options)
