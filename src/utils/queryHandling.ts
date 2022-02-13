import {Document, Query, QueryWithHelpers} from 'mongoose'
import * as core from 'express-serve-static-core'

export default class QueryHandling {
  #query:
    | Query<never, Document, Document[]>
    | QueryWithHelpers<never, Document, Document[]>
  #queryString: core.Query
  constructor(
    query:
      | Query<never, Document, Document[]>
      | QueryWithHelpers<never, Document, Document[]>,
    queryString: core.Query,
  ) {
    this.#query = query
    this.#queryString = queryString
  }

  get query() {
    return this.#query
  }

  filter() {
    let query = {...this.#queryString}
    const excluded = ['limit', 'page', 'order', 'fields']
    excluded.forEach(el => delete query[el])
    query = JSON.parse(
      JSON.stringify(query).replace(
        /\b(gte|gt|lte|lt)\b/g,
        match => `$${match}`,
      ),
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.#query = this.#query.find(query)

    return this
  }

  sort() {
    if (this.#queryString.order) {
      this.#query = this.#query.sort(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.#queryString.order.split(',').join(' '),
      )
    } else {
      // sorted by date the newest to oldest
      this.#query = this.#query = this.#query.sort('-createdAt')
    }
    return this
  }

  limitFields() {
    if (this.#queryString.fields) {
      this.#query = this.#query.select(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.#queryString.fields?.split(',').join(' '),
      )
    } else {
      this.#query = this.#query.select('-__v')
    }
    return this
  }

  paginate() {
    const page = Number(this.#queryString.page) || 1
    const limit = Number(this.#queryString.limit) || 100
    const skip = (page - 1) * limit
    this.#query = this.#query.skip(skip).limit(limit)
    return this
  }
}
