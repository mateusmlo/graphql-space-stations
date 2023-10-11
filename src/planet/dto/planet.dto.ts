import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { StationDTO } from 'src/station/dto/station.dto';

@ObjectType('Planet')
export class PlanetDTO {
  @Field(() => ID)
  id?: string;

  @Field()
  name!: string;

  @Field()
  mass!: number;

  @Field(() => [StationDTO])
  stations?: StationDTO[];

  @Field(() => GraphQLISODateTime)
  createdAt?: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt?: Date;
}
