import {MigrationInterface, QueryRunner} from "typeorm";
import {User, UserType} from "../models/User";
import DatabaseService from "../DatabaseService";

export class user1553844530632 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // await DatabaseService.createConnection("seed");
    const userRepository =  queryRunner.connection.getRepository(User);
    const customer = await userRepository.create({
      username: "customer",
      password: "12345",
      email: "customer@jbanyu.com",
      phone_num: "081212341234",
      image_url: "http://www.gradmentor.com.au/wp-content/uploads/2018/06/no-user.jpg",
      user_type: UserType.CUSTOMER
    });
    const company = await userRepository.create({
      username: "company",
      password: "12345",
      email: "company@jbanyu.com",
      phone_num: "081243214321",
      image_url: "http://www.gradmentor.com.au/wp-content/uploads/2018/06/no-user.jpg",
      user_type: UserType.COMPANY
    });
    await userRepository.save(customer);
    await userRepository.save(company);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
