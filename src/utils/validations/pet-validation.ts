import { z } from "zod";
import { ActivityType } from "@prisma/client";

export const createPetSchema = z.object({
  name: z.string().min(1, "Pet name is required").max(50, "Pet name too long")
});

export const updatePetSchema = z.object({
  name: z.string().min(1, "Pet name is required").max(50, "Pet name too long").optional()
});

export const createActivitySchema = z.object({
  activityType: z.nativeEnum(ActivityType),
  description: z.string().min(1, "Description is required").max(200, "Description too long")
});
