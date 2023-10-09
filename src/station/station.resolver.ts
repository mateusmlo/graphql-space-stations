import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { StationService } from './station.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Station } from './entity/station.entity';
import { StationDTO } from './dto/station.dto';
import { CreateStationInput } from './dto/create-station.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => Station)
export class StationResolver {
  constructor(private readonly stationService: StationService) {}

  @Query(() => [StationDTO], {
    name: 'stations',
    description: 'Returns all stations built around the universe!'
  })
  findAllStations() {
    return this.stationService.findStations();
  }

  @Query(() => StationDTO, {
    name: 'planetStations',
    description: 'Returns all stations on a given planet.'
  })
  findPlanetStations(@Args('planetId') planetId: string) {
    return this.stationService.findPlanetStations(planetId);
  }

  @Mutation(() => StationDTO, {
    name: 'newStation',
    description: 'Installs a new recharge station on a planet'
  })
  newStation(@Args('stationData') stationData: CreateStationInput) {
    return this.stationService.createStation(stationData);
  }
}
