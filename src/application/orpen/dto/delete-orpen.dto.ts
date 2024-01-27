import { ApiProperty } from '@nestjs/swagger'

export class deleteOrpenResponseDto {
  @ApiProperty({
    example: true
  })
  deleted: boolean
}
