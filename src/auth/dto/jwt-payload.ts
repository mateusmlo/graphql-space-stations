import { Expose } from 'class-transformer';

export class JWTPayload {
  @Expose()
  sub: string;

  @Expose()
  email: string;
}
