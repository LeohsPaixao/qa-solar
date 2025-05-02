-- CreateTable
CREATE TABLE "webhookSubscription" (
    "id" SERIAL NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webhookSubscription_pkey" PRIMARY KEY ("id")
);
