import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateOrpenDto {
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
