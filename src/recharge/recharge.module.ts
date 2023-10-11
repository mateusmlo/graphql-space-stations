import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recharge } from './entity/recharge.entity';
import { StationModule } from 'src/station/station.module';
import { AuthModule } from 'src/auth/auth.module';
import { RechargeService } from './recharge.service';
import { RechargeResolver } from './recharge.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recharge]),
    StationModule,
    forwardRef(() => AuthModule)
  ],
  providers: [RechargeService, RechargeResolver],
  exports: [RechargeService]
})
export class RechargeModule {}
