import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType('NewPlanet')
export class PlanetInput {
  @Field(() => ID)
  @IsUUID()
  id?: string;

  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsNumber()
  bMassj!: number;
}
