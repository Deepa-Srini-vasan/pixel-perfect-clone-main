/**
 * MySQL Database Module
 * Provides connection pooling and query execution for production
 */
import mysql from 'mysql2/promise';

let pool;

export async function initializePool(config) {
  pool = mysql.createPool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: config.DB_SSL ? { rejectUnauthorized: false } : false,
  });

  return pool;
}

export async function executeQuery(sql, params = []) {
  if (!pool) throw new Error('Database pool not initialized');
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    connection.release();
  }
}

export async function beginTransaction() {
  if (!pool) throw new Error('Database pool not initialized');
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  return connection;
}

export async function getConnection() {
  if (!pool) throw new Error('Database pool not initialized');
  return await pool.getConnection();
}

export async function closePool() {
  if (pool) await pool.end();
}
