import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './entity/station.entity';
import { Repository } from 'typeorm';
import { PlanetService } from 'src/planet/planet.service';
import { CreateStationInput } from './dto/create-station.input';

@Injectable()
export class StationService {
  private logger = new Logger('Station Service');

  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
    private readonly planetService: PlanetService
  ) {}

  async createStation(stationData: CreateStationInput) {
    try {
      const planet = await this.planetService.findPlanetById(
        stationData.planetId
      );

      if (!planet) throw new NotFoundException('Planet not registered');

      const station = this.stationRepository.create(stationData);
      station.planet = planet;

      return await this.stationRepository.save(station);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  async findStations() {
    try {
      return await this.stationRepository.find({ relations: ['planet'] });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  async findPlanetStations(planetId: string) {
    try {
      return await this.stationRepository.findOne({
        where: { planet: { id: planetId } },
        relations: ['planet']
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }
}
