import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';
import { RechargeStatus } from '../entity/recharge.entity';
import { StationDTO } from 'src/station/dto/station.dto';
import { PlanetDTO } from 'src/planet/dto/planet.dto';

registerEnumType(RechargeStatus, { name: 'RechargeStatus' });

@ObjectType('Recharge')
export class RechargeDTO {
  @Field(() => ID)
  id?: string;

  @Field(() => UserDto)
  user!: UserDto;

  @Field(() => StationDTO)
  station!: StationDTO;

  @Field(() => PlanetDTO)
  planet!: PlanetDTO;

  @Field(() => RechargeStatus)
  rechargeStatus?: RechargeStatus;

  @Field(() => GraphQLISODateTime)
  startedAt!: Date;

  @Field(() => GraphQLISODateTime)
  finishAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt?: Date;
}
