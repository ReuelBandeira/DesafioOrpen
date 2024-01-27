import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'

export abstract class ResponseHandler {
  static type: string
  static entityReferenceResponse: string

  constructor() {
    ResponseHandler.type = new.target.name
    ResponseHandler.entityReferenceResponse = `${ResponseHandler.type} Response`
  }

  public static sendResponse(json: any, res: Response) {
    try {
      return res.status(HttpStatus.OK).json(json)
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }

  public static sendCreatedResponse(json: any, res: Response) {
    try {
      return res.status(HttpStatus.CREATED).json(json)
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }

  public static sendAcceptedResponse(json: any, res: Response) {
    try {
      return res.status(HttpStatus.ACCEPTED).json(json)
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }

  public static sendNonAuthoritativeInformationResponse(
    json: any,
    res: Response
  ) {
    try {
      return res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json(json)
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }

  public static sendNoContentResponse(res: Response) {
    try {
      return res.status(HttpStatus.NO_CONTENT).json()
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }

  public static sendResetContentResponse(res: Response) {
    try {
      return res.status(HttpStatus.RESET_CONTENT).json()
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }

  public static sendPartialContentResponse(json: any, res: Response) {
    try {
      return res.status(HttpStatus.PARTIAL_CONTENT).json(json)
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }

  public static sendMultiStatusResponse(json: any, res: Response) {
    try {
      return res.status(207).json(json)
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }
}
