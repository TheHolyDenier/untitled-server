-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "passwordHash" TEXT NOT NULL,
    "accessToken" TEXT,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "projects" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "cover" TEXT,
    "isFavorite" BOOLEAN,
    "createdById" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "project-on-user" (
    "_id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "project-on-user_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "elements" (
    "_id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "cover" TEXT,
    "isFavorite" BOOLEAN,
    "exists" BOOLEAN,
    "type" TEXT,
    "createdById" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "elements_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "cover" TEXT,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "projectId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "elements-on-elements" (
    "_id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "elementId" TEXT NOT NULL,
    "relatesToElementId" TEXT NOT NULL,

    CONSTRAINT "elements-on-elements_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "elements-on-events" (
    "_id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "elementId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "elements-on-events_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_accessToken_key" ON "users"("accessToken");

-- AddForeignKey
ALTER TABLE "project-on-user" ADD CONSTRAINT "project-on-user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project-on-user" ADD CONSTRAINT "project-on-user_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "elements" ADD CONSTRAINT "elements_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "elements-on-elements" ADD CONSTRAINT "elements-on-elements_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "elements"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "elements-on-elements" ADD CONSTRAINT "elements-on-elements_relatesToElementId_fkey" FOREIGN KEY ("relatesToElementId") REFERENCES "elements"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "elements-on-events" ADD CONSTRAINT "elements-on-events_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "elements"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "elements-on-events" ADD CONSTRAINT "elements-on-events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
