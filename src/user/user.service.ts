import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDTO } from './dto/create-user.input';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private logger = new Logger('Users Service');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserInputDTO): Promise<UserDto> {
    const { email, password } = createUserDto;

    try {
      const user = this.userRepository.create({
        email,
        password
      });

      return await this.userRepository.save(user);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findBy(col: string, value: any): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { [col]: value }
      });

      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
