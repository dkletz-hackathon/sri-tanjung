import {Column, Entity, ManyToOne, JoinColumn, ManyToMany} from "typeorm";
import BaseModel from "./BaseModel";
import {Place} from "./Place";
import {Schedule} from "./Schedule";

export enum ProductCategory {
  SERVICE = "service",
  SOUVENIR = "souvenir"
}

export enum ProductServiceCategory {
  SURFING = "surfing",
  SNORKELING = "snorkeling",
  DIVING = "diving",
  TRACKING = "tracking",
  HIKING = "hiking",
  BANANA_BOAT = "banana_boat"
}

@Entity("products")
export class Product extends BaseModel {

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar" })
  price: number;

  @Column({ type: "varchar" })
  image_url: string;

  @Column({ type: "enum", enum: ProductCategory, default: ProductCategory.SERVICE })
  category: ProductCategory;

  @Column({ type: "enum", enum: ProductServiceCategory, nullable: true})
  service_category: ProductServiceCategory;

  @ManyToOne(() => Place, place => place.products)
  @JoinColumn({ name: "place_id" })
  place: Place;

  @ManyToMany(() => Schedule, schedule => schedule.products)
  schedules: Schedule[];

}
