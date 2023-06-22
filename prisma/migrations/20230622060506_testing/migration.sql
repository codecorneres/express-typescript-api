-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_owner_id_fkey`;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
