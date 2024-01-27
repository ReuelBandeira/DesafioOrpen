import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse
} from '@nestjs/swagger'
import { deleteOrpenResponseDto } from '../dto/delete-orpen.dto'

export function deleteApiDecorator(): MethodDecorator {
  const decorators = [
    ApiResponse({ type: deleteOrpenResponseDto, status: 204 }),
    ApiNotFoundResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Bad Request'
              }
            }
          }
        }
      }
    }),
    ApiInternalServerErrorResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Internal Server Error'
              }
            }
          }
        }
      }
    })
  ]

  return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    for (const decorator of decorators) {
      decorator(target, propertyKey, descriptor)
    }
  }
}
