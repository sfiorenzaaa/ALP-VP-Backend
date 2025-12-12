import prisma from "../config/prisma";

export const createJournal = async (
  userId: number,
  data: { content: string }
) => {
  return prisma.journal.create({
    data: {
      userId,
      content: data.content,
    },
  });
};

export const getMyJournals = async (userId: number) => {
  return prisma.journal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
