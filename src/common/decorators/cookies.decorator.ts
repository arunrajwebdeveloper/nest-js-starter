import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Fall back to unsigned cookies if signedCookies doesn't exist
    const cookies = request.signedCookies || request.cookies;

    return data ? cookies?.[data] : cookies;
  },
);
