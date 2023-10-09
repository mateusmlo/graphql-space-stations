import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { JwtConfigService } from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService
    }),
    forwardRef(() => UserModule),
    ConfigModule
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService]
})
export class AuthModule {}
