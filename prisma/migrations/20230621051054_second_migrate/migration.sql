/*
  Warnings:

  - You are about to drop the column `attachment_id` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `comment_id` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `timesheet_id` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `attachment_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `comment_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `issue_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `timesheet_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `issue_id` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `attachment_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `comment_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `issueAssignedById` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `issueAssignedToId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timesheet_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `issue_id` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issue_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assigned_by` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assigned_to` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issue_id` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Timesheet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_attachment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_timesheet_id_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_attachment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_issue_id_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_timesheet_id_fkey`;

-- DropForeignKey
ALTER TABLE `Status` DROP FOREIGN KEY `Status_issue_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_attachment_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_issueAssignedById_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_issueAssignedToId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_timesheet_id_fkey`;

-- AlterTable
ALTER TABLE `Attachment` ADD COLUMN `issue_id` INTEGER NOT NULL,
    ADD COLUMN `project_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `issue_id` INTEGER NOT NULL,
    ADD COLUMN `project_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `attachment_id`,
    DROP COLUMN `comment_id`,
    DROP COLUMN `timesheet_id`,
    ADD COLUMN `assigned_by` INTEGER NOT NULL,
    ADD COLUMN `assigned_to` INTEGER NOT NULL,
    ADD COLUMN `project_id` INTEGER NOT NULL,
    ADD COLUMN `status_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `attachment_id`,
    DROP COLUMN `comment_id`,
    DROP COLUMN `issue_id`,
    DROP COLUMN `timesheet_id`,
    ADD COLUMN `owner_id` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Status` DROP COLUMN `issue_id`;

-- AlterTable
ALTER TABLE `Timesheet` ADD COLUMN `issue_id` INTEGER NOT NULL,
    ADD COLUMN `project_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `attachment_id`,
    DROP COLUMN `comment_id`,
    DROP COLUMN `issueAssignedById`,
    DROP COLUMN `issueAssignedToId`,
    DROP COLUMN `project_id`,
    DROP COLUMN `timesheet_id`,
    MODIFY `password` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
