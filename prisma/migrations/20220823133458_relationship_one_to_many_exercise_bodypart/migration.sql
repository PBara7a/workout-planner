/*
  Warnings:

  - Added the required column `bodyPartId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "bodyPartId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "BodyPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
