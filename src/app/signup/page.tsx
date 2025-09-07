'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Box, Card, Container, Flex, Text, Heading } from "@radix-ui/themes";
import { gqlClient } from '@/services/graphql';
import { CREATE_TENANT } from '@/lib/gql/mutation'

const CreateCompanyPage = () => {
    const [orgName, setOrgName] = useState("");
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminUsername, setAdminUsername] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ message?: string }>({});
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({});
        setIsLoading(true);

        try {
            const data = await gqlClient.request(CREATE_TENANT, {
                orgName,
                adminName,
                adminEmail,
                adminUsername,
                adminPassword
            });

            if (data.createTenant) {
                alert("Tenant and Admin Created Successfully");
                router.push('/admin/dashboard'); 
            } else {
                setError({ message: "Failed to create tenant" });
            }
        } catch (err) {
            console.log(err);
            setError({ message: "Something went wrong" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            className="min-h-screen flex items-center justify-center py-8 px-4 sm:p-6"
            style={{ background: "var(--background)" }}
        >
            <Container size="1" className="w-full max-w-md mx-auto">
                <Card size="4" className="relative z-10">
                    <Flex direction="column" gap="4 sm:gap-6">
                        <Box className="text-center mb-10">
                            <Heading size={{ initial: "8", sm: "6" }} className="mb-7">
                                Create Your Company's Account
                            </Heading>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <Flex direction="column" gap="4">
                                {error?.message && (
                                    <Box
                                        className="rounded-md p-3"
                                        style={{
                                            background: "rgba(255,0,0,0.1)",
                                            border: "1px solid rgba(255,0,0,0.3)",
                                        }}
                                    >
                                        <Text size="2">{error?.message}</Text>
                                    </Box>
                                )}

                                <Box className="flex flex-col gap-2">
                                    <Text as="label" size="2" weight="medium">Company Name</Text>
                                    <input
                                        type="text"
                                        placeholder="Enter company name"
                                        value={orgName}
                                        onChange={(e) => setOrgName(e.target.value)}
                                        className="w-full pl-4 pr-4 py-3 border rounded-lg"
                                        required
                                    />
                                </Box>

                                <Box className="flex flex-col gap-2">
                                    <Text as="label" size="2" weight="medium">Admin Name</Text>
                                    <input
                                        type="text"
                                        placeholder="Admin full name"
                                        value={adminName}
                                        onChange={(e) => setAdminName(e.target.value)}
                                        className="w-full pl-4 pr-4 py-3 border rounded-lg"
                                        required
                                    />
                                </Box>

                                <Box className="flex flex-col gap-2">
                                    <Text as="label" size="2" weight="medium">Admin Email</Text>
                                    <input
                                        type="email"
                                        placeholder="Admin email"
                                        value={adminEmail}
                                        onChange={(e) => setAdminEmail(e.target.value)}
                                        className="w-full pl-4 pr-4 py-3 border rounded-lg"
                                        required
                                    />
                                </Box>

                                <Box className="flex flex-col gap-2">
                                    <Text as="label" size="2" weight="medium">Admin Username</Text>
                                    <input
                                        type="text"
                                        placeholder="Admin username"
                                        value={adminUsername}
                                        onChange={(e) => setAdminUsername(e.target.value)}
                                        className="w-full pl-4 pr-4 py-3 border rounded-lg"
                                        required
                                    />
                                </Box>

                                <Box className="flex flex-col gap-2">
                                    <Text as="label" size="2" weight="medium">Admin Password</Text>
                                    <input
                                        type="password"
                                        placeholder="Admin password"
                                        value={adminPassword}
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                        className="w-full pl-4 pr-4 py-3 border rounded-lg"
                                        required
                                    />
                                </Box>

                                <button
                                    type="submit"
                                    className="my-4 p-3 bg-blue-600 cursor-pointer rounded-md"
                                >
                                    {isLoading ? 'Creating...' : 'Create Company Account'}
                                </button>
                            </Flex>
                        </form>
                    </Flex>
                </Card>
            </Container>
        </Box>
    );
};

export default CreateCompanyPage;
