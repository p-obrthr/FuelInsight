import { Request, Response } from "express";
import { userService } from "../Models/auth";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const userController = {
	createUser: (req: Request, res: Response) => {
		const body = req.body;
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);
		try {
			userService.create(body, (err: Error | null, results: any) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						success: 0,
						message: "Database connection error"
					});
				}
				return res.status(200).json({
					success: 1,
					data: results
				});
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: 0,
				message: "An error occurred"
			});
		}
	},

	login: (req: Request, res: Response) => {
		const body = req.body;
		try {
			userService.getUserByEmail(body.email, (err: Error | null, results: any) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						success: 0,
						message: "An error occurred"
					});
				}
				if (!results) {
					return res.json({
						success: 0,
						data: "Invalid email or password"
					});
				}
				const result = compareSync(body.password, results.password);
				if (result) {
					results.password = undefined;
					const jsontoken = sign({ result: results }, process.env.JWT_SECRET as string, {
						expiresIn: process.env.JWT_EXPIRES_IN
					});
					return res.json({
						success: 1,
						message: "Login successful",
						token: jsontoken
					});
				} else {
					return res.json({
						success: 0,
						data: "Invalid email or password"
					});
				}
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: 0,
				message: "An error occurred"
			});
		}
	},

	getUserByUserId: (req: Request, res: Response) => {
		const id = req.params.id;
		try {
			userService.getUserById(parseInt(id), (err: Error | null, results: any) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						success: 0,
						message: "An error occurred"
					});
				}
				if (!results) {
					return res.json({
						success: 0,
						message: "Record not Found"
					});
				}
				results.password = undefined;
				return res.json({
					success: 1,
					data: results
				});
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: 0,
				message: "An error occurred"
			});
		}
	},

	getUsers: (req: Request, res: Response) => {
		try {
			userService.getAllUsers((err: Error | null, results: any) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						success: 0,
						message: "An error occurred"
					});
				}
				return res.json({
					success: 1,
					data: results
				});
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: 0,
				message: "An error occurred"
			});
		}
	}
};
