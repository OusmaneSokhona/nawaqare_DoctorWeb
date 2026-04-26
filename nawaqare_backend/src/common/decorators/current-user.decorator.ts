import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface CurrentUserDto {
  id: string;
  email: string;
  role: string;
  [key: string]: any;
}

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): CurrentUserDto => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.user as CurrentUserDto;
});
