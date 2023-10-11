import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  ObjectType
} from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, IsUUID } from 'class-validator';

@ObjectType('User')
export class UserDto {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Exclude()
  password?: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

@InputType('LoginUser')
export class LoginDTO {
  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  password: string;
}
