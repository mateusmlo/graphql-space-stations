import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { NasaModule } from './providers/NasaProvider/nasa.module';
import { PlanetModule } from './planet/planet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtEnvs } from './config/jwt.config';
import { dbConfig } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Planet } from './planet/entities/planet.entity';
import { StationModule } from './station/station.module';
import { Station } from './station/entity/station.entity';
import { RechargeModule } from './recharge/recharge.module';
import { Recharge } from './recharge/entity/recharge.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtEnvs, dbConfig],
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        port: configService.get<number>('dbPort'),
        username: configService.get<string>('dbUser'),
        password: configService.get<string>('dbPassword'),
        database: configService.get<string>('db'),
        host: configService.get<string>('dbHost'),
        entities: [User, Planet, Station, Recharge],
        synchronize: true,
        autoLoadEntities: true,
        timezone: '-03:00'
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      playground: true,
      autoSchemaFile: true,
      include: [
        PlanetModule,
        UserModule,
        AuthModule,
        StationModule,
        RechargeModule
      ],
      context: ({ req }) => ({ req })
    }),
    NasaModule,
    PlanetModule,
    UserModule,
    AuthModule,
    StationModule,
    RechargeModule,
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
