import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AccessToken')
export class AuthPayload {
  @Field(() => String)
  accessToken!: string;
}
