/*
  Warnings:

  - Added the required column `desc` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "desc" TEXT NOT NULL;
