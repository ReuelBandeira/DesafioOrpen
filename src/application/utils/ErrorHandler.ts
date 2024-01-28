import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export abstract class ErrorHandler {
  static type: any;
  static entityReferenceError: any;

  constructor() {
    ErrorHandler.type = new.target.name;
    ErrorHandler.entityReferenceError = {
      OrpenController: 'orpen',
      // Adicione outras referências de entidade, se necessário
    };
  }

  public static errorResponse(res: Response, error: any, customMessage?: string) {

    let status;
    let errorMessage;

    if (error instanceof HttpException) {
      status = error.getStatus();
      errorMessage = error.message || HttpStatus[status] || 'Internal Server Error';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = customMessage || 'Internal Server Error';
    }

    return res.status(status).json({ message: errorMessage });
  }

  public static handle(error: HttpException) {
    try {
      throw error
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
  public static NOT_FOUND() {
    throw new HttpException(
      `${ErrorHandler.entityReferenceError[ErrorHandler.type]} Not found`,
      HttpStatus.NOT_FOUND
    )
  }

  public static BAD_REQUEST() {
    throw new HttpException(
      `${ErrorHandler.entityReferenceError[ErrorHandler.type]} Not created`,
      HttpStatus.BAD_REQUEST
    )
  }

  public static UNAUTHORIZED() {
    throw new HttpException(
      `Access to ${
        ErrorHandler.entityReferenceError[ErrorHandler.type]
      } Denied`,
      HttpStatus.UNAUTHORIZED
    )
  }

  public static FORBIDDEN() {
    throw new HttpException(
      `Access to ${
        ErrorHandler.entityReferenceError[ErrorHandler.type]
      } Forbidden`,
      HttpStatus.FORBIDDEN
    )
  }

  public static CONFLICT() {
    throw new HttpException(
      `${ErrorHandler.entityReferenceError[ErrorHandler.type]} already exists`,
      HttpStatus.CONFLICT
    )
  }

  public static INTERNAL_SERVER_ERROR() {
    throw new HttpException(
      `Internal Server Error`,
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }

  public static BAD_GATEWAY() {
    throw new HttpException(`Bad Gateway`, HttpStatus.BAD_GATEWAY)
  }

  public static SERVICE_UNAVAILABLE() {
    throw new HttpException(
      `Service Unavailable`,
      HttpStatus.SERVICE_UNAVAILABLE
    )
  }

  public static GATEWAY_TIMEOUT() {
    throw new HttpException(`Gateway Timeout`, HttpStatus.GATEWAY_TIMEOUT)
  }

  public static NOT_IMPLEMENTED() {
    throw new HttpException(`Not Implemented`, HttpStatus.NOT_IMPLEMENTED)
  }

  public static BAD_REQUEST_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.BAD_REQUEST)
  }

  public static UNAUTHORIZED_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.UNAUTHORIZED)
  }

  public static FORBIDDEN_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.FORBIDDEN)
  }

  public static CONFLICT_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.CONFLICT)
  }

  public static INTERNAL_SERVER_ERROR_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }

  public static BAD_GATEWAY_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.BAD_GATEWAY)
  }

  public static SERVICE_UNAVAILABLE_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.SERVICE_UNAVAILABLE)
  }

  public static GATEWAY_TIMEOUT_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.GATEWAY_TIMEOUT)
  }

  public static NOT_IMPLEMENTED_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.NOT_IMPLEMENTED)
  }

  public static NOT_FOUND_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.NOT_FOUND)
  }

  public static UNPROCESSABLE_ENTITY_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY)
  }

  public static UNPROCESSABLE_ENTITY() {
    throw new HttpException(
      `Unprocessable Entity`,
      HttpStatus.UNPROCESSABLE_ENTITY
    )
  }

  public static NOT_ACCEPTABLE() {
    throw new HttpException(`Not Acceptable`, HttpStatus.NOT_ACCEPTABLE)
  }

  public static NOT_ACCEPTABLE_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.NOT_ACCEPTABLE)
  }

  public static PRECONDITION_FAILED() {
    throw new HttpException(
      `Precondition Failed`,
      HttpStatus.PRECONDITION_FAILED
    )
  }

  public static PRECONDITION_FAILED_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.PRECONDITION_FAILED)
  }

  public static TOO_MANY_REQUESTS() {
    throw new HttpException(`Too Many Requests`, HttpStatus.TOO_MANY_REQUESTS)
  }

  public static TOO_MANY_REQUESTS_MESSAGE(message: string) {
    throw new HttpException(message, HttpStatus.TOO_MANY_REQUESTS)
  }

}
