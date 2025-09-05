'use client'

import { UserContext } from "@/contexts/UserContextProvider";
import { Avatar, Box, Card, DropdownMenu, Flex, Text } from "@radix-ui/themes"
import Link from "next/link"
import { useContext } from "react"

const UserDropDown = () => {
  const { user } = useContext(UserContext);

  return (
    <DropdownMenu.Root asChild>
      <DropdownMenu.Trigger>
        <button className="outline-none">
          <Box>
            {/* <Card> */}
              <Flex gap="3" align="center">
                <Avatar
                  radius="full"
                  fallback={user?.name?.[0] || "U"}
                  color="gray"
                />
                <Box>
                  <Text as="div" size="2">
                    {user?.name}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {user?.role}
                  </Text>
                </Box>
              </Flex>
            {/* </Card> */}
          </Box>

        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="bg-[--color-panel-solid] min-w-[150px]">
        <DropdownMenu.Item>Edit profile</DropdownMenu.Item>
        <DropdownMenu.Item>Logout</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserDropDown;
