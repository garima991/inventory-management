import { Avatar, Box, Card, Flex, Text, Badge, IconButton } from '@radix-ui/themes';
import { User } from "../../generated/prisma";
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'; 

const roleColor: Record<string, string> = {
  ADMIN: 'red',
  MANAGER: 'indigo',
  STAFF: 'gray',
};

const UserCard = ({ user }: { user: User }) => {
  return (
    <Box mb="3" width="100%">
      <Card className="group p-3 rounded-xl border border-white/10">
        <Flex justify="between" align="center">
          
          {/* User info */}
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src={user.avatar}
              radius="full"
              fallback={user.name?.[0] ?? "U"}
            />
            <Box>
              <Text as="div" size="2" weight="bold">{user.name}</Text>
              <Flex align="center" gap="2">
                <Text as="div" size="1" color="gray">@{user.username}</Text>
                <Badge color={roleColor[user.role] || 'gray'} radius="full" highContrast>
                  {user.role}
                </Badge>
              </Flex>
              <Text as="div" size="1" color="gray">{user.email}</Text>
            </Box>
          </Flex>

          <Flex gap="2" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <IconButton variant="soft" color="indigo" size="2">
              <Pencil1Icon />
            </IconButton>
            <IconButton variant="soft" color="red" size="2">
              <TrashIcon />
            </IconButton>
          </Flex>

        </Flex>
      </Card>
    </Box>
  );
};

export default UserCard;
