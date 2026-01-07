import { User, Pet } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      pet?: Pet;
    }
  }
}

export {};
