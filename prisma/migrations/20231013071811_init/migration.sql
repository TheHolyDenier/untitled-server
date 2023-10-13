/*
  Warnings:

  - You are about to drop the column `newEndDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `newStartDate` on the `events` table. All the data in the column will be lost.
  - Made the column `startDate` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "newEndDate",
DROP COLUMN "newStartDate",
ALTER COLUMN "startDate" SET NOT NULL;
