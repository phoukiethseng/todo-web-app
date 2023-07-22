/*
  Warnings:

  - The `priority` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `completed` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/ -- CreateEnum

CREATE TYPE "Priority" AS ENUM ('NOT_IMPORTANT', 'IMPORTANT', 'URGENT');

-- AlterTable

ALTER TABLE "Todo"
ALTER COLUMN "completed"
SET NOT NULL,
    ADD COLUMN "new_priority" "Priority" NOT NULL DEFAULT 'NOT_IMPORTANT';


UPDATE "Todo"
SET "new_priority" = 'NOT_IMPORTANT'
WHERE "priority" = 0;


UPDATE "Todo"
SET "new_priority" = 'IMPORTANT'
WHERE "priority" = 1;


UPDATE "Todo"
SET "new_priority" = 'IMPORTANT'
WHERE "priority" = 2;


ALTER TABLE "Todo"
DROP COLUMN "priority";


ALTER TABLE "Todo" RENAME COLUMN "new_priority" TO "priority";