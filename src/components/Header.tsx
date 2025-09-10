import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import UserDropDown from "./UserDropDown";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 px-6 py-2">
      <Box
        width="100%"
        p="3"
        className="glass-panel rounded-xl border border-default shadow-sm backdrop-blur-md"
      >
        <Flex
          justify="between"
          align="center"
          wrap="wrap"
          className="gap-4 sm:flex-row flex-col"
        >
          <Link href="/" className="flex items-center gap-3 group">
            <Text
              size="5"
              weight="bold"
              className="text-default"
            >
              Inventory
            </Text>
          </Link>

          <Flex gap="5" align="center" className="flex-wrap justify-center">
            <ThemeToggle />
            <UserDropDown />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}
