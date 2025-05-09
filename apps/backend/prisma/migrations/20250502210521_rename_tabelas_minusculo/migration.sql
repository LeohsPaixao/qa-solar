/*
  Warnings:

  - You are about to drop the `webhookSubscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "webhookSubscription";

-- CreateTable
CREATE TABLE "webhooksubscription" (
    "id" SERIAL NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webhooksubscription_pkey" PRIMARY KEY ("id")
);
