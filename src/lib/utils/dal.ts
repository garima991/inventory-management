import { prismaClient } from "@/services/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "../auth";

export default async function getUserFromCookies() {
    const cookieStore = await cookies();

    try {
        const token = await cookieStore.get('token')?.value;
        if (!token) {
            return null;
        }
        const data = await verifyToken(token);
        const user = await prismaClient.user.findUnique({
            where: {
                id: data?.id
            },
            omit: {
                password: true
            }
        })
        if (!user) {
            return null;
        }
        return user;
    }
    catch (error) {
        console.log(error);
    }
}