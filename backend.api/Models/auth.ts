import { RowDataPacket } from 'mysql2';
import pool from '../database';

interface User {
  username: string;
  email: string;
  password: string;
}

interface Callback {
  (error: any | null, results?: any): void;
}

export const userService = {
  create: async (data: User, callBack: Callback) => {
    try {
      const [results] = await pool.query(
        `INSERT INTO registration(username, email, password) VALUES(?,?,?)`,
        [data.username, data.email, data.password]
      );
      callBack(null, results);
    } catch (error: any) {
      callBack(error);
    }
  },
  getUserByUserEmail: async (email: string, callBack: Callback) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT * FROM registration WHERE email = ?`,
        [email]
      );
      callBack(null, rows[0]);
    } catch (error: any) {
      callBack(error);
    }
  },
  getUserByUserId: async (id: number, callBack: Callback) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT * FROM registration WHERE id = ?`,
        [id]
      );
      callBack(null, rows[0]);
    } catch (error: any) {
      callBack(error);
    }
  },
  getUsers: async (callBack: Callback) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT * FROM registration`
      );
      callBack(null, rows);
    } catch (error: any) {
      callBack(error);
    }
  }
};
