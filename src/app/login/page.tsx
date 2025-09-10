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
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { gqlClient } from '@/services/graphql';
import { GET_CURRENT_USER, LOGIN_USER } from '@/lib/gql/queries';
import ThemeToggle from "@/components/ThemeToggle";

const LoginPage = () => {
    const [userCred, setUserCred] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
                console.log(data.loginUser);
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
            className="min-h-screen flex items-center justify-center py-8 px-4 sm:p-6 bg-surface text-default"
        >
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>
            <Container size="1" className="w-full max-w-md mx-auto">

                <Card size="4" className="relative z-10 bg-surface border border-default">
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
                                        className=" w-full pl-4 pr-4 py-3 border rounded-lg bg-surface text-default border-default"
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

                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className=" w-full pl-4 pr-10 py-3 border rounded-lg bg-surface text-default border-default"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-2 my-auto p-1 text-default/70 hover:text-default"
                                        >
                                            {showPassword ? <EyeClosedIcon width={20} height={20} /> : <EyeOpenIcon width={20} height={20} />}
                                        </button>
                                    </div>

                                </Box>

                                <button
                                    type="submit"
                                    className="my-4 p-3 bg-[var(--accent)] text-white cursor-pointer rounded-md"
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
