import { HttpException } from '@nestjs/common'
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose'

interface MyObj {
  count: any[]
  list: any[]
}
export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>
  ): Promise<T | null> {
    return this.entityModel.findOne({ ...entityFilterQuery, deleted: false }).exec()
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery, { deleted: false })
  }

  async list(
    entityFilterQuery: FilterQuery<T>,
    limit: number,
    page: number
  ): Promise<{ count: number; list: T[]; filterOptions?: any }> {
    try {
      Object.keys(entityFilterQuery).forEach((key) => {
        if (entityFilterQuery[key] === '') {
          delete entityFilterQuery[key]
        }
      })

      let countQuery
      
      countQuery = await this.entityModel
          .find({
            ...entityFilterQuery,
            deleted: false
          })
          .countDocuments()

      const query = await this.entityModel
        .find({
          ...entityFilterQuery,
          deleted: false
        })
        .limit(limit)
        .sort({ createdAt: -1 })
        .skip(limit * (page - 1))

      const count = countQuery || 0
      const list = query || []

      return { count, list }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status)
    }
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData)
    return await entity.save()
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(
      { ...entityFilterQuery, deleted: false },
      updateEntityData,
      {
        new: true
      }
    )
  }

  async delete(entityFilterQuery: FilterQuery<T>): Promise<{ deleted: boolean }> {
    const result = await this.entityModel.findOneAndUpdate(
      { ...entityFilterQuery, deleted: false },
      {
        deleted: true,
        deletedAt: new Date(),
        deletedBy: 'admin'
      }
    )
    if (!result) {
      return { deleted: false }
    }
    return { deleted: true }
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery)
    return deleteResult.deletedCount >= 1
  }

}
