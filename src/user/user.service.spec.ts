import { Test, TestingModule } from '@nestjs/testing';
import { MockType } from '../common/mocks/mock.type';
import { modelMock } from '../common/mocks/repo.mock';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';

describe('UserService', () => {
  let service: UserService;
  let repo: MockType<Repository<User>>;
  const userId = randomUUID();

  const vUser: Awaited<Promise<Partial<User>>> = {
    id: userId,
    email: 'test@test.com',
    password: '31872#&(@*fbnhHJ',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: modelMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      repo.create.mockReturnValue(vUser);
      repo.save.mockReturnValue(vUser);

      const newUser = await service.createUser({
        email: vUser.email as string,
        password: vUser.password as string,
      });

      expect(newUser).toEqual(vUser);
    });
  });

  describe('findUser', () => {
    it('should find user by email', async () => {
      repo.findOne.mockReturnValue(vUser);

      const user = await service.findOne('test@test.com');

      expect(user).toEqual(vUser);
    });
  });
});
