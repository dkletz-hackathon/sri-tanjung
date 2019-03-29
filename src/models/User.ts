import {Column, Entity, AfterLoad, BeforeInsert, BeforeUpdate, OneToMany} from "typeorm";
import * as bcrypt from 'bcrypt';
import BaseModel from "./BaseModel";
import {Card} from "./Card";
import {Schedule} from "./Schedule";

export enum UserType {
  CUSTOMER = "customer",
  COMPANY = "company",
  ADMIN = "admin"
}

@Entity("products")
export class User extends BaseModel {

  @Column({ type: "varchar", length: 100 })
  username: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 15 })
  phone_num: string;

  @Column({ type: "varchar" })
  image_url: String;

  @Column({ type: "enum", enum: UserType, default: UserType.CUSTOMER })
  user_type: UserType;

  @OneToMany(() => Card, card => card.user)
  cards: Card[];

  @OneToMany(() => Schedule, schedule => schedule.user)
  schedules: Schedule[];

  private tempPassword: string = "";

  @AfterLoad()
  private loadTempPassword() {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password !== this.tempPassword) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

}

