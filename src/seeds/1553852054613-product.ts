import {MigrationInterface, QueryRunner} from "typeorm";
import DatabaseService from "../DatabaseService";
import {Place} from "../models/Place";
import {Product, ProductServiceCategory, ProductCategory} from "../models/Product";

export class product1553852054613 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // await DatabaseService.createConnection("seed");
    const productRepository = queryRunner.connection.getRepository(Product);
    const placeRepository = queryRunner.connection.getRepository(Place);
    const firstProduct = productRepository.create({
      name: "Snorkeling",
      description: "Ini itu Snorkeling, tetapi Snorkeling bukan ini",
      price: 100000,
      image_url: "https://airebobichon.files.wordpress.com/2018/02/9-tempatwisataindonesia-id.jpg",
      category: ProductCategory.SERVICE,
      service_category: ProductServiceCategory.SNORKELING,
      place: await placeRepository.findOne(1)
    });
    const secondProduct = productRepository.create({
      name: "Diving",
      description: "Ini itu Diving, tetapi Diving bukan ini",
      price: 100000,
      image_url: "https://airebobichon.files.wordpress.com/2018/02/9-tempatwisataindonesia-id.jpg",
      category: ProductCategory.SERVICE,
      service_category: ProductServiceCategory.DIVING,
      place: await placeRepository.findOne(1)
    });
    const thirdProduct = productRepository.create({
      name: "Oleh-oleh",
      description: "Ini itu oleh-oleh khas Banyuwangi yang top markotop!",
      price: 50000,
      image_url: "https://airebobichon.files.wordpress.com/2018/02/9-tempatwisataindonesia-id.jpg",
      category: ProductCategory.SOUVENIR,
      place: await placeRepository.findOne(3)
    });
    const fourthProduct = productRepository.create({
      name: "Ikan Bakar",
      description: "Ini itu Ikan Bakar khas Banyuwangi yang top markotop!",
      price: 50000,
      image_url: "https://airebobichon.files.wordpress.com/2018/02/9-tempatwisataindonesia-id.jpg",
      category: ProductCategory.FOOD,
      place: await placeRepository.findOne(4)
    });
    await productRepository.save(firstProduct);
    await productRepository.save(secondProduct);
    await productRepository.save(thirdProduct);
    await productRepository.save(fourthProduct);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
