import {Avatar, Box, Card, Flex, Text, Badge} from '@radix-ui/themes';
import {User} from "../../generated/prisma"

const roleColor: Record<string, any> = {
    ADMIN: 'red',
    MANAGER: 'indigo',
    STAFF: 'gray',
};

const UserCard = ({user}: {user: User}) => {
    return (
        <Box mb="3" width="100%">
            <Card>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src={user.avatar}
                  radius="full"
                  fallback={user.name.charAt(0)}
                />
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {user.name}
                  </Text>
                  <Flex align="center" gap="2">
                    <Text as="div" size="1" color="gray">
                      @{user.username}
                    </Text>
                    <Badge color={roleColor[user.role] || 'gray'} radius="full" highContrast>
                      {user.role}
                    </Badge>
                  </Flex>
                  <Text as="div" size="1" color="gray">
                    {user.email}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
    )
}

export default UserCard;