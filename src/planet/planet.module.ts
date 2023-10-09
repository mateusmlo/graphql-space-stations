import { Module, forwardRef } from '@nestjs/common';
import { NasaModule } from 'src/providers/NasaProvider/nasa.module';
import { PlanetService } from './planet.service';
import { PlanetResolver } from './planet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planet]),
    NasaModule,
    forwardRef(() => AuthModule)
  ],
  providers: [PlanetService, PlanetResolver],
  exports: [PlanetService]
})
export class PlanetModule {}
