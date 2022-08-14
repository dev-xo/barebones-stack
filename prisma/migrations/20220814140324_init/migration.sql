-- CreateTable
CREATE TABLE "Welcome" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
