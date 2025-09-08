"use client";

import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { gqlClient } from "@/services/graphql";
import { CREATE_USER, UPDATE_USER_PROFILE, UPDATE_USER_ROLE } from "@/lib/gql/mutation";
import { RoleType, User } from "../../../generated/prisma";

type UserDialogButtonProps = {
  mode: "create" | "edit";
  user?: User; // for edit mode
  triggerLabel?: string; 
  onOptimisticCreate?: (tempUser: User) => void;
  onOptimisticEdit?: (updatedUser: User) => void;
  onServerConfirm: (tempId: string, confirmed: User) => void;
  onErrorRollback: (user : User) => void;
};

type UpdateUserRoleResponse = { updateUserRole: User };

const UserDialogButton = ({
  mode,
  user,
  triggerLabel = mode === "create" ? "Add member" : "Edit",
  onOptimisticCreate,
  onOptimisticEdit,
  onServerConfirm,
  onErrorRollback,
}: UserDialogButtonProps) => {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleType>(user?.role ?? "STAFF");

  useEffect(() => {
    if (mode === "edit" && user) {
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setUsername(user.username ?? "");
      setRole(user.role ?? "STAFF");
    }
  }, [user, mode]);

  async function handleSaveUser() {
    const tempId = `temp-${Date.now()}`;
    let tempUser: User | null = null ;

    try {
      if (mode === "create") {
        tempUser = {
          id: tempId as any,
          name,
          email,
          username,
          password: "" as any,
          avatar: null as any,
          role: role as any,
          tenantId: "" as any,
        };
        onOptimisticCreate?.(tempUser);

        const data: { createUser: User } = await gqlClient.request(CREATE_USER, {
          name,
          email,
          username,
          password,
          role,
        });

        if (data.createUser) {
          onServerConfirm?.(tempId, data.createUser);
          resetForm();
        } else {
          onErrorRollback?.(tempUser);
        }
      } else {
        // update mode
         const updatedUser: User = {
          ...user!,
          name,
          email,
          username,
          role,
        };
        tempUser = updatedUser;
        onOptimisticEdit?.(updatedUser);
        
        
        const profileUpdate: { updateUserProfile: User } = await gqlClient.request(
          UPDATE_USER_PROFILE,
          { id: user?.id, name, email, username }
        );

       
        const roleUpdate: UpdateUserRoleResponse | null =
          role !== user?.role
            ? await gqlClient.request<UpdateUserRoleResponse>(UPDATE_USER_ROLE, { id: user?.id, role })
            : null;

        if (profileUpdate.updateUserProfile || roleUpdate?.updateUserRole) {
          onServerConfirm?.(user!.id, updatedUser);
          resetForm();
        } else {
          onErrorRollback?.(user!);
        }
      }
    } catch (error) {
      console.error(error);
      if(tempUser){
          onErrorRollback?.(tempUser);
      } 
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setRole("STAFF");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>{triggerLabel}</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>
          {mode === "create" ? "Add new member" : "Edit member"}
        </Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {mode === "create"
            ? "Add member in your organisation"
            : "Update member details"}
        </Dialog.Description>

        <Flex direction="column" gap="2">
          <label>
            <Text as="div" size="2" weight="bold">
              Name
            </Text>
            <TextField.Root
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" weight="bold">
              Email
            </Text>
            <TextField.Root
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" weight="bold">
              Username
            </Text>
            <TextField.Root
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          {mode === "create" && (
            <label>
              <Text as="div" size="2" weight="bold">
                Password
              </Text>
              <TextField.Root
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          )}

          <label className="flex flex-col flex-1 gap-1 ">
            <Text as="div" size="2" weight="bold">
              Role
            </Text>
            <Select.Root value={role} onValueChange={(value) => setRole(value as "ADMIN" | "MANAGER" | "STAFF")}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="MANAGER">Manager</Select.Item>
                  <Select.Item value="STAFF">Staff</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSaveUser}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserDialogButton;
