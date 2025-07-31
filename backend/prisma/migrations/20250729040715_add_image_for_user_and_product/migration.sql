-- AlterTable
ALTER TABLE "product" ADD COLUMN     "productImagePath" TEXT,
ADD COLUMN     "productImageURL" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "profileImagePath" TEXT,
ADD COLUMN     "profileImageURL" TEXT;
