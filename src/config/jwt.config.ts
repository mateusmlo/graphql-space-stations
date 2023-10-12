import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('secret'),
      signOptions: {
        expiresIn: this.configService.get<string>('signOptions.expiresIn'),
        issuer: 'ALTIMIT Corp.'
      }
    };
  }
}

export const jwtEnvs = (): JwtModuleOptions => {
  return {
    secret: process.env.ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      issuer: 'ALTIMIT Corp.'
    }
  };
};
