import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { PetNotFoundError } from "../error/pet-error";

export const checkPetExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const pet = await prisma.pet.findUnique({
      where: { userId }
    });

    if (!pet) {
      throw new PetNotFoundError();
    }

    req.pet = pet;
    next();
  } catch (error) {
    next(error);
  }
};