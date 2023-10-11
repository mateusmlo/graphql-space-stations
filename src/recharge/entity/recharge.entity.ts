import { Station } from 'src/station/entity/station.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum RechargeStatus {
  CHARGING = 'CHARGING',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED'
}

@Entity()
export class Recharge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.recharges, {
    eager: true,
    nullable: false
  })
  user: User;

  @ManyToOne(() => Station, (station) => station.recharges, {
    eager: true,
    nullable: false
  })
  station!: Station;

  @Column({
    nullable: false,
    default: RechargeStatus.CHARGING
  })
  rechargeStatus!: RechargeStatus;

  @CreateDateColumn()
  startedAt!: Date;

  @Column({ nullable: false })
  finishAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
