import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type OrpenDocument = Orpen & Document

@Schema({ timestamps: true })
export class Orpen {
  @Prop()
  _id: string

  @Prop()
  city: string

  @Prop()
  country: string

  @Prop({ type: Object }) 
  weatherData: object;

  @Prop()
  updatedAt?: Date

  @Prop()
  createdAt?: Date

  @Prop()
  updatedBy?: string

  @Prop()
  createdBy?: string

  @Prop()
  deleted: boolean

  constructor(
    city: string,
    country: string,
    _id?: string,

  ) {
    this.city = city
    this.country = country
    this._id = _id

  }
}

export const OrpenSchema = SchemaFactory.createForClass(Orpen)
