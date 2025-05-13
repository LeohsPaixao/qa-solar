/*
  Warnings:

  - A unique constraint covering the columns `[api_key]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `api_key` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "api_key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_api_key_key" ON "user"("api_key");
