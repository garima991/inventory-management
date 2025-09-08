"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Flex,
  Text,
  TextField,
  Button,
  Box,
  Separator,
} from "@radix-ui/themes";
import { gqlClient } from "@/services/graphql";
import { GET_TENANT } from "@/lib/gql/queries";

export default function TenantDetail() {
    const [loading, setLoading] = useState(true);
  const [tenant, setTenant] = useState<{
    name: string;
    admin: { email: string };
  } | null>(null);

  useEffect(() => {
    async function fetchTenant() {
      try {
        const data = await gqlClient.request(GET_TENANT);
        setTenant(data.getTenant || null);
      } catch (e) {
        console.error("Error while fetching tenant", e);
      }
      finally{
        setLoading(false);
      }
    }
    fetchTenant();
  }, []);

  
  return (
    <div className="border border-white/10 rounded-md p-5 max-h-fit">
       
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 mb-2">
        <Text size="4" weight="bold">
          Company Details
        </Text>
      </div>

         {loading ? (
            <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="h-14 rounded-lg bg-white/10 animate-pulse" />
          ))}
        </div>
        ): tenant ? (
             <Flex direction="column" gap="4">
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <Text weight="regular">Company Name</Text>
          </Flex>

          <Box className="border border-white/10 rounded p-3 bg-white/5 transition text-white/30">
            {tenant.name}
          </Box>
        </Flex>

        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <Text weight="regular">Admin Email</Text>
          </Flex>

          <Box className="border border-white/10 rounded p-3 bg-white/5 transition text-white/30">
            {tenant.admin.email}
          </Box>
        </Flex>
      </Flex>
        ):( 
          <p className="text-sm text-gray-500">No tenant found.</p>
        )}
     
    </div>
  );
}
