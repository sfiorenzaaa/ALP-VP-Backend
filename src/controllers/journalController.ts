import { Request, Response, NextFunction } from "express";
import * as journalService from "../services/journalService";
import { success } from "../utils/apiResponse";

export const createJournal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const journal = await journalService.createJournal(userId!, {
      content: req.body.content,
    });

    res.json(success("Journal created", journal));
  } catch (err) {
    next(err);
  }
};

export const getMyJournals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const journals = await journalService.getMyJournals(userId!);

    res.json(success("Your journals", journals));
  } catch (err) {
    next(err);
  }
};
