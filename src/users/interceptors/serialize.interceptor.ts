import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by request handler
    console.log('I am running before the  handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response sent out
        console.log('I am running before the response sent out', data);
      }),
    );
  }
}
