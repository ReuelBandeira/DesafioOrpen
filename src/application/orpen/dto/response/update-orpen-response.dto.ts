import { ApiProperty } from '@nestjs/swagger'

export class UpdateOrpenResponseDto {
  @ApiProperty({
    required: false,
    name: '_id',
    type: 'string',
    example: 'bf8923b7-3906-489d-b09b-9b5e21fcda58'
  })
  _id: string

  @ApiProperty({
    required: true,
    name: 'city',
    type: 'string',
    example: 'Manaus'
  })
  city: string

  @ApiProperty({
    required: true,
    name: 'country',
    type: 'string',
    example: 'BR'
  })
  country: string

  @ApiProperty({
    required: false,
    name: 'weatherData',
    type: 'bject',
    example: [
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d'
      }
    ]
  })
  weatherData: object

  @ApiProperty({
    required: false,
    name: 'createdBy',
    type: 'string',
    example: 'admin'
  })
  createdBy: string

  @ApiProperty({
    required: false,
    name: 'updatedBy',
    type: 'string',
    example: 'admin'
  })
  updatedBy: string

  @ApiProperty({
    required: false,
    name: 'createdAt',
    type: 'date',
    example: '2023-09-26T03:50:55.407Z'
  })
  createdAt: Date

  @ApiProperty({
    required: false,
    name: 'updatedAt',
    type: 'date',
    example: '2023-09-26T03:50:55.407Z'
  })
  updatedAt: Date

  @ApiProperty({
    required: false,
    name: 'deleted',
    type: 'boolean',
    example: false
  })
  deleted: boolean
}

export class UpdateOrpenResponseBodyDto {
  @ApiProperty({
    required: true,
    name: 'city',
    type: 'string',
    example: 'Manaus'
  })
  city: string

  @ApiProperty({
    required: true,
    name: 'country',
    type: 'string',
    example: 'BR'
  })
  country: string

  @ApiProperty({
    required: false,
    name: 'weatherData',
    type: 'object',
    example: 
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d'
      }
    
  })
  weatherData: object
}
