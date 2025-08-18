import { Box, Flex, Text} from "@radix-ui/themes";
import Link from "next/link";
import UserDropDown from "./UserDropDown";

export default function Header() {

  return (
    <header className="sticky top-0 z-40 px-6 py-2">
      <Box width="100%" p="3" className="glass-panel rounded-xl border border-white/10 shadow-sm">
        <Flex
          justify="between"
          align="center"
          wrap="wrap"
          className="gap-4 sm:flex-row flex-col"
        >
          <Link href="/" className="flex items-center gap-3 group">
            <Text size="5" weight="bold" className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Inventory
            </Text>
          </Link>

          <Flex gap="5" align="center" className="flex-wrap justify-center">
            <Link
              href="/sales"
              className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-all duration-200"
            >
              Sales
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-all duration-200"
            >
              Products
            </Link>
            <UserDropDown />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}