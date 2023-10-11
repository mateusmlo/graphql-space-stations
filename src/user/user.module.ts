import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [
    UserService,
    UserResolver,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor }
  ],
  exports: [UserService]
})
export class UserModule {}
