import { MigrationInterface, QueryRunner } from "typeorm";

export class Date1776622134699 implements MigrationInterface {
    name = 'Date1776622134699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
