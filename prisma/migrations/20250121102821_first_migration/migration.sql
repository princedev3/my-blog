/*
  Warnings:

  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "categorySlug" AS ENUM ('technology', 'entertainment', 'othermatter');

-- DropTable
DROP TABLE "Ticket";

-- DropEnum
DROP TYPE "TicketPaid";

-- DropEnum
DROP TYPE "TicketStatus";

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "category" "categorySlug" NOT NULL,
    "imageUrls" TEXT[],
    "likes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
