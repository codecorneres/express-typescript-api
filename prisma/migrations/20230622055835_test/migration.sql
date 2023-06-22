-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_owner_id_fkey`;

-- AlterTable
ALTER TABLE `Issue` MODIFY `assigned_by` INTEGER NULL,
    MODIFY `assigned_to` INTEGER NULL;
