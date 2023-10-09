import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NasaModule } from './providers/NasaProvider/nasa.module';
import { PlanetModule } from './planet/planet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtEnvs } from './config/jwt.config';
import { dbConfig } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { Planet } from './planet/entities/planet.entity';

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
        entities: [User, Planet],
        synchronize: true,
        autoLoadEntities: true
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      playground: true,
      autoSchemaFile: true,
      include: [PlanetModule, UserModule, AuthModule],
      context: ({ req }) => ({ req })
    }),
    NasaModule,
    PlanetModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
