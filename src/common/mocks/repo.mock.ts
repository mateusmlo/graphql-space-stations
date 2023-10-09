import { Repository } from 'typeorm';
import { MockType } from './mock.type';

export const modelMock: () => MockType<Repository<any>> = jest.fn(
  () =>
    ({
      create: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      deleteOne: jest.fn(),
      updateOne: jest.fn(),
      aggregate: jest.fn(),
    }) as any,
);
