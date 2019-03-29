import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import BaseModel from "./BaseModel";
import {User} from "./User";

@Entity("cards")
export class Card extends BaseModel {

  @Column({ type: "varchar", length: 100, unique: true })
  card_number: string;

  @ManyToOne(() => User, user => user.cards)
  @JoinColumn({ name: "user_id" })
  user: User;

}

