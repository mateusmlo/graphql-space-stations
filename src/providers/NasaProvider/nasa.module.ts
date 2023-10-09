import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      baseURL: 'https://exoplanetarchive.ipac.caltech.edu/TAP'
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: 6379
      }
    })
  ],
  providers: [NasaService],
  exports: [NasaService]
})
export class NasaModule {}
