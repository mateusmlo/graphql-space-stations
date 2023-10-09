import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from './decorators/get-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateUserInputDTO } from './dto/create-user.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserDto, {
    name: 'createUser',
    description: 'Register a new user'
  })
  register(@Args('createUserInput') createUserInput: CreateUserInputDTO) {
    return this.userService.createUser(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserDto, { description: 'Returns currently authenticated user' })
  whoAmI(@CurrentUser() user: UserDto) {
    return user;
  }
}
