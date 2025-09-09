"use client";

import { UserContext } from "@/contexts/UserContextProvider";
import { LOGOUT_USER } from "@/lib/gql/mutation";
import { gqlClient } from "@/services/graphql";
import { Avatar, Box, Card, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useContext } from "react";

const UserDropDown = () => {
  const { user } = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const data : { logoutUser: boolean } = await gqlClient.request(LOGOUT_USER);
      if (data.logoutUser) {
        router.replace("/login");
      }
    } catch (err) {
      console.error("Error logging out", err);
    }
  };


  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="outline-none">
          <Box>
            <Flex gap="3" align="center">
              <Avatar
                radius="full"
                fallback={user?.name?.[0] || "U"}
                src={user?.avatar ?? undefined}
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
          </Box>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-[--color-panel-solid] min-w-[150px] mt-1">
        <DropdownMenu.Item>Notifications</DropdownMenu.Item>
        {pathname != "/admin/settings" ?
          <DropdownMenu.Item
            className={user?.role !== "STAFF" ? "block" : "hidden"}
          >
            <Link href="/admin/settings">Settings</Link>
          </DropdownMenu.Item>
          : <></>
        }
        {pathname != "/profile" ? <DropdownMenu.Item><Link href="/profile">Profile</Link></DropdownMenu.Item> : <></>}
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" onClick={handleLogout}>Logout</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserDropDown;
