import { LoginDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthPayload } from './dto/auth-payload';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload, {
    name: 'login',
    description: 'Authenticates user with email and password'
  })
  login(@Args('loginData') payload: LoginDTO) {
    return this.authService.login(payload);
  }
}
