-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
