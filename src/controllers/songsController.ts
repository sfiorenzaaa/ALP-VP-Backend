import { Request, Response, NextFunction } from "express";
import * as songsService from "../services/songsService";
import { success } from "../utils/apiResponse";

export const getSongs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const songs = await songsService.getSongs();
    res.json(success("Songs retrieved", songs));
  } catch (err) {
    next(err);
  }
};

export const createSong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clue, options, correctAnswer } = req.body;

    if (!clue || !options || !correctAnswer) {
      res.status(400).json({ message: "Missing required fields" });
      return
    }

    const song = await songsService.createSong({ clue, options, correctAnswer });
    res.json(success("Song created", song));
  } catch (err) {
    next(err);
  }
};

