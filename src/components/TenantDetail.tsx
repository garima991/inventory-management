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
        const data : { getTenant: { name: string; admin: { email: string } } | null } = await gqlClient.request(GET_TENANT);
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
    <div className="border border-default rounded-md p-5 max-h-fit bg-surface text-default">
       
      <div className="flex items-center justify-between gap-3 border-b border-default pb-2 mb-2">
        <Text size="4" weight="bold">
          Company Details
        </Text>
      </div>

         {loading ? (
            <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="h-14 rounded-lg bg-surface-2 animate-pulse border border-default" />
          ))}
        </div>
        ): tenant ? (
             <Flex direction="column" gap="4">
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <Text weight="regular">Company Name</Text>
          </Flex>

          <Box className="border border-default rounded p-3 bg-surface-2 transition text-muted">
            {tenant.name}
          </Box>
        </Flex>

        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <Text weight="regular">Admin Email</Text>
          </Flex>

          <Box className="border border-default rounded p-3 bg-surface-2 transition text-muted">
            {tenant.admin.email}
          </Box>
        </Flex>
      </Flex>
        ):( 
          <p className="text-sm text-muted">No tenant found.</p>
        )}
     
    </div>
  );
}
