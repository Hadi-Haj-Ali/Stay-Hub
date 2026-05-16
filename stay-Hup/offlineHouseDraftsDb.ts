import * as SQLite from 'expo-sqlite';
import type { AddFormData } from '@/services/addHouseService';

const DB_NAME = 'house_drafts.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME);
  }

  return dbPromise;
}

export type OfflineHouseDraft = {
  id: string;
  data: string;
  createdAt: string;
};

export async function initDraftsDb() {
  const db = await getDb();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS house_drafts (
      id TEXT PRIMARY KEY NOT NULL,
      data TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);

  return db;
}

export async function saveHouseDraftOffline(data: AddFormData) {
  const db = await initDraftsDb();

  const id = String(Date.now());
  const createdAt = new Date().toLocaleString();

  await db.runAsync(
    `
    INSERT INTO house_drafts (id, data, createdAt)
    VALUES (?, ?, ?);
    `,
    [id, JSON.stringify(data), createdAt]
  );
}

export async function getHouseDraftsOffline() {
  const db = await initDraftsDb();

  const rows = await db.getAllAsync<OfflineHouseDraft>(`
    SELECT * FROM house_drafts
    ORDER BY createdAt DESC;
  `);

  return rows.map((row) => ({
    id: row.id,
    createdAt: row.createdAt,
    data: JSON.parse(row.data) as AddFormData,
  }));
}

export async function deleteHouseDraftOffline(id: string) {
  const db = await initDraftsDb();

  await db.runAsync(
    `
    DELETE FROM house_drafts
    WHERE id = ?;
    `,
    [id]
  );
}