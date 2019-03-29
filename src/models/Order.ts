import BaseModel from "./BaseModel";
import {AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {User} from "./User";
import {Product} from "./Product";
import * as moment from "moment-timezone";

export enum OrderState {
  CREATED = "created",
  PAID = "paid",
  REJECTED = "rejected",
  ACCEPTED = "accepted"
}

@Entity("orders")
export class Order extends BaseModel {

  @Column({ type: "timestamp with time zone" })
  start_date: Date | string;

  @Column({ type: "timestamp with time zone" })
  end_date: Date | string;

  @Column({ type: "timestamp with time zone" })
  expired_date: Date | string;

  @Column({ type: "integer", default: 1})
  total: number;

  @Column({ type: "integer" })
  total_price: number;

  @Column({ type: "varchar" })
  phone_num: string;

  @Column({ type: "enum", enum: OrderState, default: OrderState.CREATED })
  state: OrderState;

  @Column({ type: "integer" })
  user_id: number;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @AfterLoad()
  setDate() {
    this.start_date = moment(this.start_date).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ssZ");
    this.end_date = moment(this.end_date).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ssZ");
    this.expired_date = moment(this.expired_date).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ssZ");
  }

}

