import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IApiResponse<T = any> {
  data: T;
  meta: {
    timestamp: string;
  };
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
    void context;

    return next.handle().pipe(
      map((data) => {
        const now = new Date().toISOString();

        if (!data || typeof data !== 'object') {
          return {
            data,
            meta: {
              timestamp: now,
            },
          };
        }

        // Already wrapped by controller with { data: ... } — just add meta
        if ('data' in data) {
          return {
            ...data,
            meta: {
              timestamp: now,
            },
          };
        }

        return {
          data,
          meta: {
            timestamp: now,
          },
        };
      }),
    );
  }
}
