import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//  Define the uniform response structure interface
export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode; // Dynamically gets 200, 201, etc.

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: 'Success', // Generic success message (can be customized)
        data: data || null, // Handles routes that return void/nothing gracefully
      })),
    );
  }
}
