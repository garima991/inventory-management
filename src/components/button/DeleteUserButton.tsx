"use client"

import { Button } from "@radix-ui/themes";
import { User } from "../../../generated/prisma";
import { gqlClient } from "@/services/graphql";
import { DELETE_USER } from "@/lib/gql/mutation";

type DeleteUserButtonProps = {
    user: User;
    onOptimisticDelete: (id: string) => void;
    onRollbackDelete: (user: User) => void;
  };


export default function DeleteUserButton({ user, onOptimisticDelete, onRollbackDelete } : DeleteUserButtonProps) {
    async function handleDelete() {
       try{
            onOptimisticDelete?.(user?.id);
            const data : { deleteUser: boolean } = await gqlClient.request(DELETE_USER, { deleteUserId: user.id });
            if(data.deleteUser){
                console.log("User deleted successfully");
            }
            else{
                onRollbackDelete(user);
            }
        }
        catch(error){
            console.error("Error deleting user", error);
            onRollbackDelete(user);
        }

    }

    return (
        <Button onClick={handleDelete} variant="soft" color="red" size="2">
            Delete
        </Button>
    )



}