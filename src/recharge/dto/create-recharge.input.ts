import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { GraphQLString } from 'graphql';
import { RechargeStatus } from '../entity/recharge.entity';
import { UserDto } from 'src/user/dto/user.dto';

@InputType('NewRecharge')
export class RechargeInput {
  user?: UserDto;

  @Field(() => GraphQLString)
  @IsUUID()
  stationId!: string;

  @Field(() => GraphQLString)
  @IsString()
  finishAt!: string;

  @Field(() => RechargeStatus, { defaultValue: RechargeStatus.CHARGING })
  @IsOptional()
  @IsEnum(RechargeStatus)
  RechargeStatus?: RechargeStatus;
}
