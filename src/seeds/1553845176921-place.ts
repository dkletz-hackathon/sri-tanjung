import {MigrationInterface, QueryRunner} from "typeorm";
import DatabaseService from "../DatabaseService";
import {Place, PlaceCategory} from "../models/Place";
import {User} from "../models/User";

export class place1553845176921 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // await DatabaseService.createConnection("seed");
    const placeRepository = queryRunner.connection.getRepository(Place);
    const userRepository = queryRunner.connection.getRepository(User);
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
    const thirdPlace =  placeRepository.create({
      name: "Oleh-oleh Teluk Biru",
      address: "Banyuwangi",
      phone_num: "081254325432",
      image_url: "https://airebobichon.files.wordpress.com/2018/02/1-malangtransport-com.jpg",
      description: "Oleh-oleh dari pantai yang sangat indah. Mau kan??",
      geo_x: 5.0,
      geo_y: 5.0,
      category: PlaceCategory.SOUVENIR,
      user: await userRepository.findOne(2)
    });
    const fourthPlace = placeRepository.create({
      name: "Restoran Teluk Biru",
      address: "Banyuwangi",
      phone_num: "081254325432",
      image_url: "https://airebobichon.files.wordpress.com/2018/02/1-malangtransport-com.jpg",
      description: "Restoran di pantai yang sangat indah",
      geo_x: 3.0,
      geo_y: 3.0,
      category: PlaceCategory.CULINARY,
      user: await userRepository.findOne(2)
    });
    await placeRepository.save(firstPlace);
    await placeRepository.save(secondPlace);
    await placeRepository.save(thirdPlace);
    await placeRepository.save(fourthPlace);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
