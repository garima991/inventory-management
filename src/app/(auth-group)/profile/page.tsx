"use client";

import { use, useContext, useState } from "react";
import {
  Card,
  Flex,
  Text,
  Button,
  TextField,
  Avatar,
  Box,
  Spinner,
} from "@radix-ui/themes";
import { UserContext } from "@/contexts/UserContextProvider";
import { gqlClient } from "@/services/graphql";
import { UPDATE_USER_PROFILE } from "@/lib/gql/mutation";
import { AvatarUploader } from "@/components/AvatarUploader";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, setUser }  = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  async function handleSave() {
    if (!user) return;
    try {
      const updated : { updateUserProfile: any } = await gqlClient.request(UPDATE_USER_PROFILE, {
        id: user.id,
        name: user.name,
        email: user.email,
      });

      setUser?.(updated.updateUserProfile);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile", err);
    }
  }

  if(!user) {
    router.replace("/login");
  }

  return (
    <div className="mx-auto pt-10">
      <Card size="3" style={{ maxWidth: 600, margin: "auto" }}>
        <Flex direction="column" gap="4" justify="center">
          <Flex align="center" justify="center" direction="column" gap="2">
            <div className="relative">
              <Avatar
                size="9"
                src={user?.avatar || ""}
                fallback={user?.name?.[0] || "?"}
                radius="full"
              />
              {isUpdating && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                  <Spinner size="3" />
                </div>
              )}
            </div>

            <AvatarUploader
              onUploadSuccess={async (url) => {
                try {
                  setIsUpdating(true);
                  const data : { updateUserProfile: any } = await gqlClient.request(UPDATE_USER_PROFILE, {
                    id: user?.id,
                    avatar: url,
                  });
                  setUser?.(data.updateUserProfile);
                } catch (err) {
                  console.error("Error updating avatar", err);
                } finally {
                  setIsUpdating(false);
                }
              }}
            />
          </Flex>

          <Flex direction="column" gap="3">
            <Flex direction="column" gap="1">
              <Text weight="bold">Full Name</Text>
              {isEditing ? (
                <TextField.Root
                  value={user?.name}
                  onChange={(e) =>
                    setUser?.({ ...user!, name: e.target.value })
                  }
                  className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2"
                />
              ) : (
                <Box className="border border-white/10 rounded p-3">
                  {user?.name}
                </Box>
              )}
            </Flex>

            <Flex direction="column" gap="1">
              <Text weight="bold">Username</Text>
              <Box className="border border-white/10 rounded p-3">
                {user?.username}
              </Box>
            </Flex>

            <Flex direction="column" gap="1">
              <Text weight="bold">Email</Text>
              {isEditing ? (
                <TextField.Root
                  value={user?.email}
                  onChange={(e) =>
                    setUser?.({ ...user!, email: e.target.value })
                  }
                  className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2"
                />
              ) : (
                <Box className="border border-white/10 rounded p-3">
                  {user?.email}
                </Box>
              )}
            </Flex>

            <Flex direction="column" gap="1">
              <Text weight="bold">Role</Text>
              <Box className="border border-white/10 rounded p-3">{user?.role}</Box>
            </Flex>
          </Flex>

          <Flex justify="end" gap="3">
            {isEditing ? (
              <>
                <Button variant="soft" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="solid" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="solid" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}
