import {Column, Entity, ManyToOne, JoinColumn, ManyToMany} from "typeorm";
import BaseModel from "./BaseModel";
import {Place} from "./Place";
import {Schedule} from "./Schedule";

export enum ProductType {
  SERVICE = "service",
  SOUVENIR = "souvenir"
}

@Entity("products")
export class Product extends BaseModel {

  @Column({ type: "string" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "string" })
  price: number;

  @Column({ type: "string" })
  image_url: string;

  @Column({ type: "enum", enum: ProductType, default: ProductType.SERVICE })
  product_type: ProductType;

  @ManyToOne(() => Place, place => place.products)
  @JoinColumn({ name: "place_id" })
  place: Place;

  @ManyToMany(() => Schedule, schedule => schedule.products)
  schedules: Schedule[];

}
