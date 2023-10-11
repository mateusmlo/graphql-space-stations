import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { UserDto } from 'src/user/dto/user.dto';
import { RechargeStatus } from '../entity/recharge.entity';

@ObjectType('RechargeHistory')
export class RechargeHistoryDTO {
  @Field(() => GraphQLString)
  startedAt!: string;

  @Field(() => GraphQLString)
  finishAt!: string;

  @Field(() => GraphQLString, { nullable: true })
  elapsedTime?: string;

  @Field(() => RechargeStatus)
  RechargeStatus?: RechargeStatus;

  @Field(() => UserDto)
  user!: UserDto;
}
