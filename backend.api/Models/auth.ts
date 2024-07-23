import pool from '../database';

interface User {
	username: string;
	email: string;
  	password: string;
}

interface Callback {
  	(error: Error | null, results?: any): void;
}

const executeQuery = async (query: string, params: any[], callback: Callback) => {
	try {
		const [results] = await pool.query(query, params);
		callback(null, results);
	} catch (error) {
		if (error instanceof Error) callback(error);
	}
};

export const userService = {
	create: (data: User, callback: Callback) => {
		const query = `
			INSERT INTO registration(username, email, password) 
			VALUES(?,?,?)
		`;
		executeQuery(query, [data.username, data.email, data.password], callback);
	},
	getUserByEmail: (email: string, callback: Callback) => {
		const query = `
			SELECT * 
			FROM registration 
			WHERE email = ?
		`;
		executeQuery(query, [email], (error, results) => {
			if (error) return callback(error);
			callback(null, results[0]);
		});
	},
	getUserById: (id: number, callback: Callback) => {
		const query = `
			SELECT * 
			FROM registration 
			WHERE id = ?
		`;
		executeQuery(query, [id], (error, results) => {
			if (error) return callback(error);
			callback(null, results[0]);
		});
	},
	getAllUsers: (callback: Callback) => {
		const query = `
			SELECT * 
			FROM registration
		`;
		executeQuery(query, [], callback);
	}
};
