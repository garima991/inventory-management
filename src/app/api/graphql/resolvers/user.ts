import { prismaClient } from "@/services/prisma";
import { RoleType } from "../../../../../generated/prisma";
import { generateToken } from "@/lib/auth";
import { cookies } from "next/headers";
import getUserFromCookies from "@/lib/helper";

export const loginUser = async (_: any, args: {
    userCred: string, password: string
}) => {

    try {
        const cookieStore = await cookies();
        const { userCred, password } = args;
        const user = await prismaClient.user.findFirst({
            where: {
                OR: [{ email: userCred }, { username: userCred }]
            }
        })

        if(!user){
            return false;
        }
        if(user.password == password){
            const token = await generateToken({
                id: user.id,
                email: user.email,
                role: user.role,
                username: user.username
            });
            cookieStore.set("token" , token);
            return true;
        }
        else{
            return false;
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}




export const createUser = async (_:any, args : {
    name: string,
    username: string,
    email: string,
    password: string
    role: RoleType
}) => {
    try{
        const user = await getUserFromCookies();
        if(user?.role != "ADMIN"){
            return null;
        }

        const {name, username, email, password, role} = args;
        const createdUser = await prismaClient.user.create({
            data: {
                name,
                username,
                email,
                password,
                role
            }
        })
        return createdUser;
    }
    catch(error){
        console.log(error);
        return null;
    }
}


export const updateUserRole = async (_: any, args: { id: string, role: RoleType }) => {
    try {
        const user = await getUserFromCookies();
        if (user?.role !== "ADMIN") {
            return null;
        }

        const { id, role } = args;
        const updatedUser = await prismaClient.user.update({
            where: { id },
            data: { role}
        });
        return updatedUser ? true : false;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const updateUserProfile = async (_: any, args: { id: string, name?: string, username?: string, email?: string , avatar?: string}) => {
    try {
        const user = await getUserFromCookies();
        if (!user) {
            return null;
        }
        if (user.id !== args.id && user.role !== "ADMIN") {
            return false;
        }
        const { id, name, username, email, avatar } = args;
        const updatedUser = await prismaClient.user.update({
            where: { id },
            data: { name, username, email, avatar }
        });
        return updatedUser;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const getAllUsers = async () => {
    try{
        const currentUser = await getUserFromCookies();
        if(!currentUser){
            return [];
        }
        if(currentUser.role === "STAFF"){
            return [];
        }
        const users = await prismaClient.user.findMany({
            where:{
                role :{
                    not: "ADMIN"
                }
            }
        })
        return users;
    }
    catch(error){
        console.log(error);
        return [];
    }
}