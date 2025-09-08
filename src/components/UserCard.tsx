"use client";

import {
  Avatar,
  Box,
  Card,
  Flex,
  Text,
  Badge,
  IconButton,
} from "@radix-ui/themes";
import { User } from "../../generated/prisma";
import UpdateUserButton from "./button/UserDialogButton";
import { useUsers } from "@/hooks/useUsers";
import DeleteUserButton from "./button/DeleteUserButton";

const roleColor: Record<string, "red" | "indigo" | "gray"> = {
  ADMIN: "red",
  MANAGER: "indigo",
  STAFF: "gray",
};

const UserCard = ({ user }: { user: User }) => {
  const { optimisticEdit, rollbackEdit, confirmCreate, optimisticDelete, rollbackDelete } = useUsers();

  return (
    <Box mb="3" width="100%">
      <Card className="group p-3 rounded-xl border border-white/10">
        <Flex justify="between" align="center">
          {/* User info */}
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src={user.avatar ?? undefined}
              radius="full"
              fallback={user.name?.[0] ?? "U"}
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                {user.name}
              </Text>
              <Flex align="center" gap="2">
                <Text as="div" size="1" color="gray">
                  @{user.username}
                </Text>
                <Badge
                  color={roleColor[user.role] || "gray"}
                  radius="full"
                  highContrast
                >
                  {user.role}
                </Badge>
              </Flex>
              <Text as="div" size="1" color="gray">
                {user.email}
              </Text>
            </Box>
          </Flex>

          <Flex
            gap="2"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <UpdateUserButton
              mode="edit"
              user={user}
              onOptimisticEdit={optimisticEdit}
              onServerConfirm={confirmCreate}
              onErrorRollback={rollbackEdit}
            />
            
              <DeleteUserButton user = {user} onOptimisticDelete={optimisticDelete} onRollbackDelete={rollbackDelete} />
            
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};

export default UserCard;
