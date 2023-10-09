import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { PlanetDTO } from 'src/planet/dto/planet.dto';

export type PlanetPayload = {
  pl_name: string;
  pl_bmassj: number;
};

@Injectable()
export class NasaService {
  private logger = new Logger('Nasa Service');

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async fetchBigPlanets(): Promise<PlanetDTO[]> {
    try {
      const cachedRes = await this.cacheManager.get<string>('planets');

      if (!cachedRes) {
        let planets: PlanetDTO[] = [];
        const { data } = await firstValueFrom(
          this.httpService.get<PlanetPayload[]>(
            '/sync?query=select+pl_name,pl_bmassj+from+ps+where+pl_bmassj>10&format=json'
          )
        );

        data.map((planet) => {
          planets = planets.concat({
            name: planet.pl_name,
            bMassj: planet.pl_bmassj
          });
        });

        //* cache is valid for a day to give NASA plenty of time to discover new planets since this is a pretty slow request 😉
        await this.cacheManager.set('planets', JSON.stringify(planets), 8.64e7);

        return planets;
      }

      return JSON.parse(cachedRes);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
