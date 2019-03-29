import {MigrationInterface, QueryRunner} from "typeorm";
import DatabaseService from "../DatabaseService";
import {Place, PlaceCategory} from "../models/Place";
import {User} from "../models/User";

export class place1553845176921 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await DatabaseService.createConnection();
    const placeRepository = DatabaseService.getConnection().getRepository(Place);
    const userRepository = DatabaseService.getConnection().getRepository(User);
    const firstPlace = placeRepository.create({
      name: "Pantai Teluk Biru",
      address: "Banyuwangi",
      phone_num: "081254325432",
      image_url: "https://airebobichon.files.wordpress.com/2018/02/1-malangtransport-com.jpg",
      description: "Pantai yang sangat indah",
      geo_x: 0.0,
      geo_y: 0.0,
      category: PlaceCategory.TOURISM,
      user: await userRepository.findOne(2)
    });
    const secondPlace = placeRepository.create({
      name: "Alas Purwo",
      address: "Banyuwangi",
      phone_num: "082123453425",
      image_url: "https://airebobichon.files.wordpress.com/2018/02/1-malangtransport-com.jpg",
      description: "Alas yang sangat bagus",
      geo_x: 10.0,
      geo_y: 10.0,
      category: PlaceCategory.TOURISM,
      user: await userRepository.findOne(2)
    });
    await placeRepository.save(firstPlace);
    await placeRepository.save(secondPlace);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
