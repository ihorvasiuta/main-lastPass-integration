-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "admin" BOOLEAN,
    "last_login" TIMESTAMP(3),
    "last_pw_change" TIMESTAMP(3) NOT NULL,
    "sites" INTEGER NOT NULL,
    "disabled" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
