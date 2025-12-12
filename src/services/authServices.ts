import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

export const register = async (data: { name: string; email: string; password: string }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }
  const hashed = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      username: data.name,
      email: data.email,
      password: hashed,
    },
  });

  return { id: user.id, email: user.email };
};

export const login = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) throw new Error("Email not found");

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "7d",
  });

  return { token };
};
