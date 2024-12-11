/*
  Warnings:

  - You are about to drop the column `cuerpo` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `user` table. All the data in the column will be lost.
  - Added the required column `body` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `cuerpo`,
    DROP COLUMN `titulo`,
    ADD COLUMN `body` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `nombre`,
    ADD COLUMN `bio` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
