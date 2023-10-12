import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO, UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthPayload } from './dto/auth-payload';
import { JWTPayload } from './dto/jwt-payload';
import { User } from 'src/user/entities/user.entity';
import { CreateUserInputDTO } from 'src/user/dto/create-user.input';

@Injectable()
export class AuthService {
  private logger = new Logger('AUTH');

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.userService.findBy('email', email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException(`Invalid credentials`);

    return user;
  }

  async validateToken(tkn: string) {
    try {
      const { user_id } = this.jwtService.verify(tkn);
      const user = await this.userService.findBy('id', user_id);

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async signUp(createUserDto: CreateUserInputDTO): Promise<UserDto> {
    const { email, password } = createUserDto;

    try {
      const user = await this.userService.createUser({
        email,
        password
      });

      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async login(payload: LoginDTO): Promise<AuthPayload> {
    const user = await this.validateUser(payload.email, payload.password);

    const jwtPayload: JWTPayload = {
      email: payload.email,
      sub: user.id
    };

    try {
      const accessToken = await this.jwtService.signAsync(jwtPayload);

      return {
        accessToken
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
