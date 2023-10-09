import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { GraphQLString } from 'graphql';

@InputType('NewStation')
export class CreateStationInput {
  @Field()
  @IsString()
  name!: string;

  @Field(() => GraphQLString)
  @IsUUID()
  planetId!: string;
}
