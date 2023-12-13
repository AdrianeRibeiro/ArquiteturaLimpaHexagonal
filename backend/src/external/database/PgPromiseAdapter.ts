import pgPromise from "pg-promise";
import Connection from "./Connection";

export default class PgPromiseAdapter implements Connection {
  private pgp: any
  private connection: any

  constructor() {
    this.pgp = pgPromise()
    this.connect()
  }

  async connect(): Promise<void> {
    this.connection = this.pgp({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    })
  }

  async query(sql: string, params?: any[]): Promise<any> {
    return await this.connection.query(sql, params)
  }
}
