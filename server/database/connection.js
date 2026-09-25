import mysql from 'mysql2/promise';
import { config } from '../config/config.js';

let pool = null;

export async function initializePool(dbConfig = {}) {
  const mergedConfig = {
    host:               dbConfig.host ?? config.DB_HOST,
    port:               dbConfig.port ?? config.DB_PORT,
    user:               dbConfig.user ?? config.DB_USER,
    password:           dbConfig.password ?? config.DB_PASSWORD,
    database:           dbConfig.database ?? config.DB_NAME,
    waitForConnections: true,
    connectionLimit:    15,
    queueLimit:         0,
    enableKeepAlive:    true,
    keepAliveInitialDelay: 0,
    ssl:                dbConfig.ssl ?? (config.DB_SSL ? { rejectUnauthorized: false } : false),
  };

  pool = mysql.createPool(mergedConfig);
  return pool;
}

export async function executeQuery(sql, params = []) {
  if (!pool) {
    await initializePool();
  }
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    connection.release();
  }
}

export async function beginTransaction() {
  if (!pool) {
    await initializePool();
  }
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  return connection;
}

export async function getConnection() {
  if (!pool) {
    await initializePool();
  }
  return await pool.getConnection();
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
