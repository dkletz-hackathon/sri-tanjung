import {Entity, Column, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import {Product} from "./Product";
import BaseModel from "./BaseModel";
import {User} from "./User";

export enum PlaceCategory {
  TOURISM = "tourism",
  SOUVENIR = "souvenir",
  CULINARY = "culinary"
}

@Entity("places")
export class Place extends BaseModel {

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  address: string;

  @Column({ type: "varchar" })
  phone_num: string;

  @Column({ type: "varchar" })
  image_url: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "double precision" })
  geo_x: number;

  @Column({ type: "double precision" })
  geo_y: number;

  @Column({ type: "enum", enum: PlaceCategory, default: PlaceCategory.TOURISM })
  category: PlaceCategory;

  @OneToMany(() => Product, product => product.place)
  products: Product[];

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

}
