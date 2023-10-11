import { Planet } from 'src/planet/entities/planet.entity';
import { Recharge } from 'src/recharge/entity/recharge.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Planet, (planet) => planet.stations, { nullable: false })
  planet: Planet;

  @OneToMany(() => Recharge, (recharge) => recharge.station)
  recharges?: Recharge[];
}
