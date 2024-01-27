import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class RemoveWhitespaceInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    const request = context.switchToHttp().getRequest()

    function processObject(obj: any): any {
      if (typeof obj === 'string') {
        const cleanedBody = obj.replace(/\s{2,}/g, ' ')
        const trimmedBody = cleanedBody.trim()
        return trimmedBody
      } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          obj[key] = processObject(obj[key])
        }
      }

      return obj
    }

    for (const key in request.body) {
      request.body[key] = processObject(request.body[key])
    }

    return next.handle()
  }
}
