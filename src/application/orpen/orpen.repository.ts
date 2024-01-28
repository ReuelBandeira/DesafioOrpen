import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { EntityRepository } from '../repository/entity.repository'
import { Orpen, OrpenDocument } from './schemas/orpen.schema'

@Injectable()
export class OrpenRepository extends EntityRepository<OrpenDocument> {
  constructor(
    @InjectModel(Orpen.name)
    private readonly orpenModel: Model<OrpenDocument>
  ) {
    super(orpenModel)
  }
}

