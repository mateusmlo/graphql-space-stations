import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Recharge } from './entity/recharge.entity';
import { RechargeService } from './recharge.service';
import { RechargeDTO } from './dto/recharge.dto';
import { RechargeInput } from './dto/create-recharge.input';
import { CurrentUser } from 'src/user/decorators/get-user.decorator';
import { UserDto } from 'src/user/dto/user.dto';
import { RechargeHistoryDTO } from './dto/recharge-history.dto';

@UseGuards(GqlAuthGuard)
@Resolver(() => Recharge)
export class RechargeResolver {
  constructor(private readonly rechargeService: RechargeService) {}

  @Mutation(() => RechargeDTO, {
    name: 'recharge',
    description: 'Registers a new recharge period'
  })
  createRecharge(
    @Args('rechargeData') rechargeData: RechargeInput,
    @CurrentUser() user: UserDto
  ) {
    return this.rechargeService.createRecharge({
      ...rechargeData,
      user: { ...user }
    });
  }

  @Query(() => RechargeDTO, {
    name: 'findRecharge',
    description: 'Returns user latest recharge'
  })
  findRecharge(@CurrentUser() user: UserDto) {
    return this.rechargeService.findOngoingRecharge(user.id);
  }

  @Query(() => [RechargeHistoryDTO], {
    name: 'stationHistory',
    description: 'Returns all recharges for a given station'
  })
  stationHistory(@Args('stationId') stationId: string) {
    return this.rechargeService.stationHistory(stationId);
  }
}
