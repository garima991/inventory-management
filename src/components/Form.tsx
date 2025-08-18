'use client';

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
  Link,
  TextField
} from "@radix-ui/themes";

const fieldsArray = [
                  { label: 'First Name', key: 'firstName', type: 'text' },
                  { label: 'Last Name', key: 'lastName', type: 'text' },
                  { label: 'Username', key: 'username', type: 'text' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Phone Number', key: 'phone', type: 'tel' },
                  { label: 'Password', key: 'password', type: 'password' },
                  { label: 'Confirm Password', key: 'confirmPassword', type: 'password' },
                  { label: 'Address', key: 'address', type: 'text' },
                  { label: 'City', key: 'city', type: 'text' },
                  { label: 'Zip Code', key: 'zipCode', type: 'text' }
                ]

const Form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

   
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center p-4"
    >
      <Container size="1" className="w-full max-w-lg mx-auto">
        <Card size="4" className="shadow-lg rounded-xl">
          <Flex direction="column" gap="6">
            {/* Title */}
            <Box className="text-center">
              <Heading size={{ initial: "6", sm: "7" }}>Registration</Heading>
              <Text size="2">Fill out all fields to continue</Text>
            </Box>

            {error && (
              <Box
                className="rounded-md p-3"
                style={{
                  background: "rgba(255,0,0,0.1)",
                  border: "1px solid rgba(255,0,0,0.3)"
                }}
              >
                <Text size="2" color="red">{error}</Text>
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="4">
                {fieldsArray.map(({ label, key, type }) => (
                  <Box key={key}>
                    <Text as="label" size="2" weight="medium" className="mb-1 block">
                      {label}
                    </Text>
                    <TextField.Root
                      type={type}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                      value={(formData as any)[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      required
                      size="3"
                      className="w-full"
                    />
                  </Box>
                ))}

                <Button
                  type="submit"
                  size="3"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </Flex>
            </form>

            <Separator my="4" size="4" />

            <Box className="text-center">
              <Text size="2">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:underline">
                  Log in here
                </Link>
              </Text>
            </Box>
          </Flex>
        </Card>
      </Container>
    </Box>
  );
};

export default Form;


