import { Catch } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(RpcException)
export class ExceptionFilter {
  catch(exception) {
    const error = exception.getError();
    return throwError(() => ({
      status: 'error',
      message: error.message || error,
      statusCode: error.statusCode || 400,
    }));
  }
}
