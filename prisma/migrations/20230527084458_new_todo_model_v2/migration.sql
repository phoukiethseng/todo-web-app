/*
  Warnings:

  - You are about to drop the column `checked` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" RENAME COLUMN "checked" to "completed";
ALTER TABLE "Todo" ALTER COLUMN "completed" DROP NOT NULL;
ALTER TABLE "Todo" DROP COLUMN "content";
ALTER TABLE "Todo" RENAME COLUMN "name" to "title";
ALTER TABLE "Todo" ADD COLUMN "deadline" TIMESTAMP(3);
ALTER TABLE "Todo" ALTER COLUMN "deadline" SET DEFAULT '1970-01-01T00:00:00.000Z';
ALTER TABLE "Todo" ADD COLUMN "priority" INTEGER DEFAULT 0;
