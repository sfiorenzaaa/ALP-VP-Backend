import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authServices";
import { success } from "../utils/apiResponse";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.register(req.body);
    res.json(success("Register successful", data));
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.login(req.body);
    res.json(success("Login successful", data));
  } catch (err) {
    next(err);
  }
};
