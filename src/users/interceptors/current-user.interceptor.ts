import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { UserService } from '../user.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(ctx: ExecutionContext, handler: CallHandler) {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const { req } = gqlCtx.getContext();

    const email = req.email;

    if (email) {
      const user = await this.userService.findBy('email', email);
      req.user = user;
    }

    return handler.handle();
  }
}
