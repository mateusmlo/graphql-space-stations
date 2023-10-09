import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Planet } from './entities/planet.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { PlanetDTO } from './dto/planet.dto';
import { PlanetService } from './planet.service';
import { PlanetInput } from './dto/create-planet.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => Planet)
export class PlanetResolver {
  constructor(private readonly planetService: PlanetService) {}

  @Query(() => [PlanetDTO], {
    name: 'suitablePlanets',
    description:
      'Finds suitable planets for recharge stations by querying NASA API'
  })
  suitablePlanets() {
    return this.planetService.getPlanets();
  }

  @Mutation(() => PlanetDTO, {
    name: 'newPlanet',
    description:
      "Saves a new suitable planet to db. Maybe we're interesed in building stations there?"
  })
  newPlanet(@Args('planetData') planetData: PlanetInput) {
    return this.planetService.createPlanet(planetData);
  }

  @Query(() => [PlanetDTO], {
    name: 'registeredPlanets',
    description: 'Returns all registered planets and their stations, if any'
  })
  findRegisteredPlanets() {
    return this.planetService.findAllPlanets();
  }

  @Query(() => PlanetDTO, {
    name: 'findPlanetByID',
    description: 'Returns a unique planet by its UUID'
  })
  findPlanetById(@Args('id') planetId: string) {
    return this.planetService.findPlanetById(planetId);
  }
}
