import { generateToken, hashPassword } from "@/lib/auth";
import { CreateTenantArgs } from "@/lib/types";
import { prismaClient } from "@/services/prisma";
import { cookies } from "next/headers";



export const createTenant = async (_: any, args: CreateTenantArgs) => {
    const { orgName, adminName, adminEmail, adminUsername, adminPassword } = args;
    const cookieStore = await cookies();

    try {
            const tenant = await prismaClient.tenant.create({ data: { name: orgName } });

            const hashedPassword = await hashPassword(adminPassword);

            const admin = await prismaClient.user.create({
                data: {
                    name: adminName,
                    email: adminEmail,
                    username: adminUsername,
                    password: hashedPassword,
                    role: "ADMIN",
                    tenantId: tenant.id,
                },
            });

        // Generate auth token for admin
        const token = await generateToken({
            id: admin.id,
            email: admin.email,
            role: admin.role,
            username: admin.username,
            tenantId: tenant.id,
        });

        cookieStore.set("token", token);

        return tenant; 

    } catch (error) {
        console.error("Error creating tenant:", error);
        throw new Error("Failed to create tenant. Please check the console for details.");
    }
};
