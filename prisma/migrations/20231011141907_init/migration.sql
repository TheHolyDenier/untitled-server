-- AlterTable
ALTER TABLE "elements" ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "elements-on-elements" ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "elements-on-events" ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "project-on-user" ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "updatedById" TEXT;
