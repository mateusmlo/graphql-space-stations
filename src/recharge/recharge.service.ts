import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RechargeStatus, Recharge } from './entity/recharge.entity';
import { Not, Repository } from 'typeorm';
import { StationService } from 'src/station/station.service';
import { RechargeInput } from './dto/create-recharge.input';
import { User } from 'src/user/entities/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { UserDto } from 'src/user/dto/user.dto';

export type HistoryData = {
  startedAt: string;
  finishAt?: string;
  elapsedTime?: string;
  rechargeStatus?: RechargeStatus;
  user: UserDto;
};

@Injectable()
export class RechargeService {
  private logger = new Logger('Recharge Service');

  constructor(
    @InjectRepository(Recharge)
    private rechargeRepository: Repository<Recharge>,
    private readonly stationService: StationService
  ) {}

  async createRecharge(rechargeData: RechargeInput) {
    try {
      const station = await this.stationService.findStationById(
        rechargeData.stationId
      );

      if (!station) throw new NotFoundException('Station not found');

      const rechargeFinishDate = DateTime.fromFormat(
        rechargeData.finishAt,
        'dd/MM/yyyy T',
        {
          locale: 'pt-BR',
          zone: 'America/Sao_Paulo'
        }
      ).toJSDate();

      if (rechargeFinishDate < new Date()) {
        throw new BadRequestException(
          "Recharge finish date can't be in the past."
        );
      }

      const stationHasRecharge = await this.rechargeRepository.findOne({
        where: [
          {
            station: { id: station.id },
            rechargeStatus: RechargeStatus.CHARGING
          }
        ]
      });

      const userHasRecharge = await this.findOngoingRecharge(
        rechargeData.user.id
      );

      if (userHasRecharge) {
        throw new UnauthorizedException(
          'User already has an ongoing recharge.'
        );
      }

      if (stationHasRecharge) {
        throw new UnauthorizedException(
          `This station is unavailable for new recharges until ${DateTime.fromJSDate(
            stationHasRecharge.finishAt
          )
            .setLocale('pt-BR')
            .toRFC2822()}`
        );
      }

      const recharge = this.rechargeRepository.create(rechargeData);
      recharge.station = station;
      recharge.user = rechargeData.user as User;
      recharge.finishAt = rechargeFinishDate;

      return await this.rechargeRepository.save(recharge);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  async findOngoingRecharge(userId: string) {
    try {
      return await this.rechargeRepository.findOne({
        where: {
          user: { id: userId },
          rechargeStatus: RechargeStatus.CHARGING
        },
        relations: ['station', 'station.planet']
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  async stationHistory(stationId: string) {
    try {
      const recharges = await this.rechargeRepository.find({
        where: { station: { id: stationId } },
        relations: ['user', 'station', 'station.planet']
      });

      const historyData = recharges.map((re) => {
        const historyData: HistoryData = {
          startedAt: null,
          finishAt: null,
          elapsedTime: null,
          user: null,
          rechargeStatus: null
        };

        if (re.rechargeStatus === RechargeStatus.FINISHED) {
          const elapsedTime =
            DateTime.fromJSDate(re.startedAt).toMillis() -
            DateTime.fromJSDate(re.finishAt).toMillis();

          historyData.elapsedTime = DateTime.fromMillis(elapsedTime).toISOTime({
            suppressMilliseconds: true,
            includeOffset: false
          });
        }

        historyData.startedAt = re.startedAt.toLocaleDateString('pt-BR');
        historyData.finishAt = re.finishAt.toLocaleDateString('pt-BR');
        historyData.user = re.user;
        historyData.rechargeStatus = re.rechargeStatus;

        return historyData;
      });

      return historyData;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  //* updates recharges status every 30 minutes to check if they have finished and then reopen the station for new ones
  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleRechargeJobs() {
    this.logger.log('[CRON JOB] Updating ongoing recharges status...');

    const recharges = await this.rechargeRepository.find({
      where: { rechargeStatus: Not(RechargeStatus.FINISHED) }
    });

    if (!recharges.length) {
      this.logger.log('[CRON JOB] No recharges to update at the moment.');
      return;
    }

    let rechargeUpdates: Promise<Recharge>[] = [];

    recharges.map((recharge) => {
      const isRechargeFinished =
        DateTime.fromJSDate(recharge.finishAt).toMillis() <=
        DateTime.now().toMillis();

      if (isRechargeFinished) {
        const updatedRecharge: Recharge = {
          ...recharge,
          rechargeStatus: RechargeStatus.FINISHED
        };

        //* bad idea to run promises inside a loop due to massive overhead when DB starts to grow in data. So we concat to a promises array and run all of them at once later
        rechargeUpdates = rechargeUpdates.concat(
          this.rechargeRepository.save(updatedRecharge)
        );
      }
    });

    this.logger.log(
      `[CRON JOB] Found ${rechargeUpdates.length} recharges to process.`
    );

    try {
      await Promise.all(rechargeUpdates);
      this.logger.log('[CRON JOB] Recharges status update complete.');
    } catch (err) {
      this.logger.error('[CRON JOB] Failed to update recharges status.', err);
    }
  }
}
