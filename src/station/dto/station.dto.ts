import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { PlanetDTO } from 'src/planet/dto/planet.dto';

@ObjectType('Station')
export class StationDTO {
  @Field(() => ID)
  id?: string;

  @Field()
  name!: string;

  @Field(() => PlanetDTO)
  planet!: PlanetDTO;

  @Field(() => GraphQLISODateTime)
  createdAt?: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt?: Date;
}
