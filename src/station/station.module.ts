import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './entity/station.entity';
import { PlanetModule } from 'src/planet/planet.module';
import { StationService } from './station.service';
import { StationResolver } from './station.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Station]),
    PlanetModule,
    forwardRef(() => AuthModule)
  ],
  providers: [StationService, StationResolver],
  exports: [StationService]
})
export class StationModule {}
