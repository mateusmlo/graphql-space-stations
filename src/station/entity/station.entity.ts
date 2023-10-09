import { Planet } from 'src/planet/entities/planet.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Planet, (planet) => planet.stations, { nullable: false })
  planet: Planet;
}
