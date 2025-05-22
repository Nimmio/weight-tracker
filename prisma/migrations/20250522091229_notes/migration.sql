/*
  Warnings:

  - You are about to drop the column `note` on the `Weighing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Weighing" DROP COLUMN "note",
ADD COLUMN     "notes" TEXT;
