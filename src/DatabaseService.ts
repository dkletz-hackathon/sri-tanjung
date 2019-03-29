import {Connection, createConnection} from "typeorm";
import "reflect-metadata";

class DatabaseService {

  private static conn: Connection;

  static async createConnection(name: string = null) {
    if (this.conn == null) {
      this.conn = await createConnection(name ? name : "main");
    }
    return this.conn;
  }

  static getConnection() {
    return this.conn;
  }

}

export default DatabaseService;
