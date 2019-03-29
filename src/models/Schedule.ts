import BaseModel from "./BaseModel";
import {Column, Entity, JoinColumn, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import {User} from "./User";
import {Product} from "./Product";

@Entity("schedules")
export class Schedule extends BaseModel {

  @Column({ type: "timestamp with time zone" })
  date: Date | String;

  @Column({ type: "varchar" })
  name: string;

  @ManyToOne(() => User, user => user.schedules)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToMany(() => Product, product => product.schedules)
  @JoinTable({
    name: "product_schedule_pivot",
    joinColumn: { name: "schedule_id" },
    inverseJoinColumn: { name: "product_id" }
  })
  products: Product[];

}

