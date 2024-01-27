import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '../utils/ErrorHandler'

@Injectable()
export class ValidationParam extends ErrorHandler implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

    const idPositionTwo = req.originalUrl.split('/')[2]
    const idPositionFour = req.originalUrl.split('/')[4]

    const prevPathOne = req.originalUrl.split('/')[1]
    const prevPathTwo = req.originalUrl.split('/')[2]

    const urlPatterns = ['sop']

    this.validate(idPositionTwo, prevPathOne, 'id', regex)
    urlPatterns.forEach((pattern) => {
      this.validate(idPositionFour, prevPathTwo, pattern, regex)
    }),
      next()
  }

  validate(id, prevPath, pattern, regex) {
    if (prevPath === pattern) {
      if (id === '') {
        ErrorHandler.UNPROCESSABLE_ENTITY_MESSAGE('Invalid Id')
      }
      if (!id.match(regex)) {
        ErrorHandler.UNPROCESSABLE_ENTITY_MESSAGE('id malformatted')
      }
    }
  }
}
