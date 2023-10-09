/*
  Warnings:

  - You are about to drop the column `countryId` on the `Position` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reward" INTEGER,
    "companyId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    CONSTRAINT "Position_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Position_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Position" ("companyId", "description", "id", "regionId", "reward", "title") SELECT "companyId", "description", "id", "regionId", "reward", "title" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
CREATE UNIQUE INDEX "Position_title_companyId_regionId_key" ON "Position"("title", "companyId", "regionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
