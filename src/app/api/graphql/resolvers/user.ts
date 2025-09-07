import { prismaClient } from "@/services/prisma";
import { RoleType } from "../../../../../generated/prisma";
import { generateToken, hashPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export const loginUser = async (
  _: any,
  args: { userCred: string; password: string }
) => {
  const { userCred, password } = args;
  const cookieStore = await cookies();

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [{ email: userCred }, { username: userCred }],
      },
    });

    if (!user) throw new Error("User not found");
    const hashedPassword = await hashPassword(password) 
    if (user.password !== hashedPassword) throw new Error("Invalid password");

    const token = await generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      tenantId: user.tenantId,
    });

    cookieStore.set("token", token);

    return true;
  } catch (error) {
    console.error(error);
    return false
  }
};

export const createUser = async (
  _: any,
  args: {
    name: string;
    username: string;
    email: string;
    password: string;
    role: RoleType;
  },
  context: any
) => {
  const { user } = context;
  if (!user || user.role !== "ADMIN") return null;

  const { name, username, email, password, role } = args;
  const hashedPassword = await hashPassword(password);

  return await prismaClient.user.create({
    data: {
      name,
      username,
      email,
      password : hashedPassword,
      role,
      tenantId: user.tenantId,
    },
  });
};

export const updateUserRole = async (
  _: any,
  args: { id: string; role: RoleType },
  context: any
) => {
  const { user } = context;
  if (!user || user.role !== "ADMIN") return false;

  const updated = await prismaClient.user.updateMany({
    where: { id: args.id, tenantId: user.tenantId },
    data: { role: args.role },
  });

  return updated.count > 0;
};

export const updateUserProfile = async (
  _: any,
  args: {
    id: string;
    name?: string;
    username?: string;
    email?: string;
    avatar?: string;
  },
  context: any
) => {
  const { user } = context;
  if (!user) return null;
  if (user.id !== args.id && user.role !== "ADMIN") return false;

  const updated = await prismaClient.user.updateMany({
    where: { id: args.id, tenantId: user.tenantId },
    data: {
      name: args.name,
      username: args.username,
      email: args.email,
      avatar: args.avatar,
    },
  });

  return updated.count > 0 ? { ...args } : null;
};

export const getAllUsers = async (_: any, __: any, context: any) => {
  const { user } = context;
  if (!user || user.role === "STAFF") return [];

  return await prismaClient.user.findMany({
    where: {
      tenantId: user.tenantId,
      role: { not: "ADMIN" },
    },
  });
};
