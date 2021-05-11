import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Http OK Response
 */
export class League_OKException extends HttpException {
  /**
   * League Http OK Response Exception
   * @param message
   */
  constructor(message: string | Record<string, string>) {
    super(
      {
        status: HttpStatus.OK,
        message: message,
      },
      HttpStatus.OK,
    );
  }
}
