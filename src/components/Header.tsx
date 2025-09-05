"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropDown from "./UserDropDown";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/sales", label: "Sales" },
    { href: "/products", label: "Products" },
  ];

  return (
    <header className="sticky top-0 z-40 px-6 py-2">
      <Box
        width="100%"
        p="3"
        className="glass-panel rounded-xl border border-white/10 shadow-sm backdrop-blur-md"
      >
        <Flex
          justify="between"
          align="center"
          wrap="wrap"
          className="gap-4 sm:flex-row flex-col"
        >
          {/* Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <Text
              size="5"
              weight="bold"
              className="text-shadow-white"
            >
              Inventory
            </Text>
          </Link>

          {/* Navigation */}
          <Flex gap="5" align="center" className="flex-wrap justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                  pathname === link.href
                    ? "text-indigo-400 font-medium bg-white/5"
                    : "opacity-80 hover:opacity-100 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <UserDropDown />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}
