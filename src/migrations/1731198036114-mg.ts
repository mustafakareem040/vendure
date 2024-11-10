import {MigrationInterface, QueryRunner} from "typeorm";

export class Mg1731198036114 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "favorite" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "customerId" integer, "productId" integer, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customFieldsFavorites" boolean`, undefined);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_543e20855ce2bde06d0acb29b51" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_b8e337759b77baa0a4055d1894e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_b8e337759b77baa0a4055d1894e"`, undefined);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_543e20855ce2bde06d0acb29b51"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customFieldsFavorites"`, undefined);
        await queryRunner.query(`DROP TABLE "favorite"`, undefined);
   }

}
