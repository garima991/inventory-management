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

        return { ...tenant, admin }; 

    } catch (error) {
        console.error("Error creating tenant:", error);
        throw new Error("Failed to create tenant. Please check the console for details.");
    }
};


export const getTenant = async (_: any, args: { id?: string }, context: any) => {
  const user = context.user;
  const tenantId = args.id ?? user?.tenantId;

  if (!tenantId) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Unauthorized");
    }
    throw new Error("No tenantId in args or context.user — provide id in query for local testing");
  }

  if (args.id && process.env.NODE_ENV === "production") {
    throw new Error("Providing id is not allowed in production");
  }

  const tenant = await prismaClient.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) throw new Error("Tenant not found");

  return {
    id: tenant.id,
    name: tenant.name,
    createdAt: tenant.createdAt.toISOString(),
    admin: user,
  };
};


