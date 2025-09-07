'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Text,
    Heading,
    Separator,
    Link
} from "@radix-ui/themes";
import { gqlClient } from '@/services/graphql';
import { GET_CURRENT_USER, LOGIN_USER } from '@/lib/gql/queries';

const LoginPage = () => {
    const [userCred, setUserCred] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ message?: string }>({});
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({});
        setIsLoading(true);

        try {
            const data: { loginUser: { role: string } } =
                await gqlClient.request(LOGIN_USER, { userCred, password });

            if (data.loginUser) {
                // get user info from server using cookie
                const { currentUser } = await gqlClient.request<{ currentUser: { role: string } }>(GET_CURRENT_USER);

                if (currentUser) {
                    const role = currentUser.role.toLowerCase();
                    router.push(`/${role}/dashboard`); // redirect based on role
                }
                else {
                    setError({ message: "Failed to fetch user info" });
                }
            } else {
                setError({ message: "Failed to fetch user info" });
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
                            <Heading
                                size={{ initial: "8", sm: "6" }}
                                className="mb-7"
                            >
                                Welcome Back
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
                                        <Text size="2">
                                            {error?.message}
                                        </Text>
                                    </Box>
                                )}

                                <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    <Text
                                        as="label"
                                        size="2"
                                        weight="medium"
                                        className="mb-4 block"
                                    >
                                        Email Address or Username
                                    </Text>

                                    <input
                                        type="text"
                                        placeholder="Enter your email or username"
                                        value={userCred}
                                        onChange={(e) => setUserCred(e.target.value)}
                                        className=" w-full pl-4 pr-4 py-3 border rounded-lg"
                                        required
                                    />
                                </Box>


                                <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    <Text
                                        as="label"
                                        size="2"
                                        weight="medium"
                                        className="mb-2 block"
                                    >
                                        Password
                                    </Text>

                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className=" w-full pl-4 pr-4 py-3 border rounded-lg"
                                        required
                                    />

                                </Box>

                                <button
                                    type="submit"
                                    className="my-4 p-3 bg-blue-600 cursor-pointer rounded-md"
                                // disabled = {isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Log In'}
                                </button>
                            </Flex>
                        </form>
                    </Flex>
                </Card>
            </Container>
        </Box>
    );
};

export default LoginPage;
