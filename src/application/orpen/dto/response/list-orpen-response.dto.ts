import { ApiProperty } from '@nestjs/swagger'

export class listOrpenDtoResponse {
  @ApiProperty({
    example: 'count: 1'
  })
  count: number

  @ApiProperty({
    example: [
      {
        _id: '6de5b9d8-64f6-4716-a597-3d8b2a10d610',
        city: 'Manaus',
        country: 'BR',
        weatherData: {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        },
        updatedBy: 'admin',
        createdBy: 'admin',
        deleted: false,
        createdAt:'2024-01-26T20:14:30.881Z',
        updatedAt:'2024-01-26T20:14:30.881Z',
        __v: 0
      }
    ]
  })
  list: string[]
}
