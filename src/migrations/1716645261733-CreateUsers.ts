import { MigrationInterface, QueryRunner } from "typeorm";
import { encrypt } from "../helpers/encypt.helper";
import * as dotenv from "dotenv";

dotenv.config()
const { ADMIN_USER, ADMIN_PW } = process.env;

export class CreateUsers1716645261733 implements MigrationInterface {
  name = "CreateUsers1716645261733";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );

    // Create an admin user
    const hashedPassword = await encrypt.encryptpass(ADMIN_PW as string);
    await queryRunner.query(
      `INSERT INTO "users" ("name", "email", "password", "role") VALUES ('admin', '${ADMIN_USER as string}', $1, 'admin')`,
      [hashedPassword],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
