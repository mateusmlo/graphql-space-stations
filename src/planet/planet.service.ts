import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { NasaService } from 'src/providers/NasaProvider/nasa.service';
import { PlanetInput } from './dto/create-planet.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanetService {
  private logger = new Logger('Planet Service');

  constructor(
    private readonly nasaService: NasaService,
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>
  ) {}

  async getPlanets() {
    try {
      return await this.nasaService.fetchBigPlanets();
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(err);
    }
  }

  async createPlanet(planetData: PlanetInput) {
    try {
      const planet = this.planetRepository.create(planetData);

      return await this.planetRepository.save(planet);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  async findAllPlanets() {
    try {
      return this.planetRepository.find();
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  async findPlanetById(id: string) {
    try {
      return this.planetRepository.findOne({ where: { id } });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }
}
