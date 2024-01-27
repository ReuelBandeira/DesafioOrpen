import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse
} from '@nestjs/swagger'
import { findOrpenResponseDto } from '../dto/response/find-orpen-response.dto'



export function findApiDecorator(): MethodDecorator {
  const decorators = [
    ApiParam({ name: 'city', type: 'string' ,in: 'header'  }as any),
    ApiParam({ name: 'country', type: 'string',in: 'header'  }as any),
    ApiResponse({ type: findOrpenResponseDto, status: 200 }),
    ApiNotFoundResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                example: 'Not Found'
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
