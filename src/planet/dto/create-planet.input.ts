import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType('NewPlanet')
export class PlanetInput {
  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsNumber()
  mass!: number;
}
