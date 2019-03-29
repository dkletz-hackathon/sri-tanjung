import {Entity, Column, OneToMany} from "typeorm";
import {Product} from "./Product";

export enum PlaceType {
  TOURISM = "tourism",
  SOUVENIR = "souvenir",
  CULINARY = "culinary"
}

@Entity("places")
export class Place {

  @Column({ type: "string" })
  name: string;

  @Column({ type: "string" })
  address: string;

  @Column({ type: "string" })
  phone_num: string;

  @Column({ type: "string" })
  image_url: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "double" })
  geo_x: number;

  @Column({ type: "double" })
  geo_y: number;

  @Column({ type: "enum", enum: PlaceType, default: PlaceType.TOURISM })
  place_type: PlaceType;

  @OneToMany(() => Product, product => product.place)
  products: Product[];

}
