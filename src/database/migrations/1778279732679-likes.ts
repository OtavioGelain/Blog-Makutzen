import { MigrationInterface, QueryRunner } from "typeorm";

export class Likes1778279732679 implements MigrationInterface {
    name = 'Likes]1778279732679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "likes" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD "likes" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "likes"`);
    }

}
