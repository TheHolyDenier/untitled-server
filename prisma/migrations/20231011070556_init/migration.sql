/*
  Warnings:

  - You are about to drop the column `accessToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_accessToken_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accessToken",
DROP COLUMN "expires_at";
