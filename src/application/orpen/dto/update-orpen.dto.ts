import { Type } from 'class-transformer'
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class UpdateOrpenDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  city: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  country: string

  @IsOptional()
  @IsDefined()
  weatherData?: string[]

}
