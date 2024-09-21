import { openDB } from "idb";

const DB_NAME = "drivingTestConfigDB";
const DB_VERSION = 1;
const STORE_NAME = "mainStore";
const EXCLUDED_KEY = "excludedQuestions";

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
  return db;
};

export const getExcludedFromDB = async () => {
  const db = await initDB();
  const excluded = await db.get(STORE_NAME, EXCLUDED_KEY);
  return excluded || [];
};

export const updateExcludedToDB = async (ids) => {
  const db = await initDB();
  await db.put(STORE_NAME, ids, EXCLUDED_KEY);
};
