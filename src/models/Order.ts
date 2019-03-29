import BaseModel from "./BaseModel";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {User} from "./User";
import {Product} from "./Product";

export enum OrderState {
  CREATED = "created",
  PAID = "paid",
  REJECTED = "rejected",
  ACCEPTED = "accepted"
}

@Entity("orders")
export class Order extends BaseModel {

  @Column({ type: "timestamp with time zone" })
  start_date: Date | String;

  @Column({ type: "timestamp with time zone" })
  end_date: Date | String;

  @Column({ type: "varchar" })
  name: string;

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

  @OneToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

}

