import {MigrationInterface, QueryRunner} from "typeorm";
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
      description: "Teluk Biru Banyuwangi merupakan sebuah taman wisata laut yang memiliki keindahan air dan panorama dasar laut yang memukau. Suasana di teluk ini masih sangat alami, baik air laut maupun lokasi nya. Tak heran jika warna air laut nya sangat jernih, dan nama Teluk Biru sendiri dilatar-belakangi oleh kejernihan airnya yang nampak kebiru biruan.",
      geo_x: 0.0,
      geo_y: 0.0,
      category: PlaceCategory.TOURISM,
      user: await userRepository.findOne(2)
    });
    const secondPlace = placeRepository.create({
      name: "Alas Purwo",
      address: "Banyuwangi",
      phone_num: "082123453425",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmircRc-f4Hw333j5KW_VI11z7FtnOP4Dd1P23Gy8BaoAGlbdz",
      description: "Terletak di Kecamatan Tegaldlimo dan Kecamatan Purwoharjo, Kabupaten Banyuwangi, Alas Purwo memiliki keindahan yang tak terelakkan. Memiliki luas hingga 434 Km², Taman Nasional Alas Purwo menyimpan berjuta pesona alam. Mulai dari floranya yang lebih dari 500 spesies tanaman hingga pesona binatang liar yang hidup bebas di sana.",
      geo_x: 10.0,
      geo_y: 10.0,
      category: PlaceCategory.TOURISM,
      user: await userRepository.findOne(2)
    });
    const thirdPlace = placeRepository.create({
      name: "Osing Deles",
      address: "Banyuwangi",
      phone_num: "081254325432",
      image_url: "https://www.suaramerdeka.com/storage/images/2018/07/31/osing-deles-5b5ff80323104.jpg",
      description: "Osing Deles merupakan salah satu brand pusat oleh-oleh di Banyuwangi yang sudah terkenal. Brand ini menawarkan tempat belanja yang lengkap dengan berbagai barang khas Banyuwangi. Produk yang dijual berupa makanan, camilan, batik, kaos etnik, souvenir, dan kerajinan tangan lainnya.",
      geo_x: 5.0,
      geo_y: 5.0,
      category: PlaceCategory.SOUVENIR,
      user: await userRepository.findOne(2)
    });
    const fourthPlace = placeRepository.create({
      name: "Nasi Tempong Mbok Nah",
      address: "Banyuwangi",
      phone_num: "081254325432",
      image_url: "https://blue.kumparan.com/kumpar/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1499847676/xnltufqhfxyxrdwwkyyt.jpg",
      description: "Tempat Wisata Kuliner di Banyuwangi yang satu ini yaitu Nasi tempong merupakan masakan tradisional khas Banyuwangi selain rujak soto dan pecel rawon. Nasi tempong merupakan nasi hangat yang disajikan dengan lalapan sayuran, kemangi,timun dan lauk pauk seperti telur dadar, ayam goreng,jeroan ayam dan lainnya. Ciri utama nasi tempong ini adalah sambel terasinya yang pedas banget hingga terasa di tampar (tempong).",
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
