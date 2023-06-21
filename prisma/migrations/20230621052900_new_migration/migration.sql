-- AlterTable
ALTER TABLE `Issue` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Project` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;
