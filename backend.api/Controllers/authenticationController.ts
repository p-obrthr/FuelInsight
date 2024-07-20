import { Request, Response } from "express";
import { userService } from "../Models/auth";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

export const userController = {
  createUser: async (req: Request, res: Response) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    try {
      await userService.create(body, (err: any, results: any) => {
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

  login: async (req: Request, res: Response) => {
    const body = req.body;
    try {
      await userService.getUserByUserEmail(body.email, (err: any, results: any) => {
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
          const jsontoken = sign({ result: results }, "qwe1234", {
            expiresIn: "1h"
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

  getUserByUserId: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await userService.getUserByUserId(parseInt(id), (err: any, results: any) => {
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

  getUsers: async (req: Request, res: Response) => {
    try {
      await userService.getUsers((err: any, results: any) => {
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
