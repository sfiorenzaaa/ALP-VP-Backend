import { z } from "zod";

export const createJournalSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
});

export const updateJournalSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
});


