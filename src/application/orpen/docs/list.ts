import {
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse
} from '@nestjs/swagger'
import { listOrpenDtoResponse } from '../dto/response/list-orpen-response.dto'


export function listApiDecorator(): MethodDecorator {
  const decorators = [
    ApiHeaders([
      {
        name: 'page',
        required: true,
        example: 1,
        description: 'Page number'
      },
      {
        name: 'limit',
        required: true,
        example: 10,
        description: 'Limit of items per page'
      },
      {
        name: 'filter',
        required: false,
        example: { city: 'Manaus' },
        description: 'Object to filter your list'
      }
    ]),
    ApiResponse({ type: listOrpenDtoResponse, status: 200 }),
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
