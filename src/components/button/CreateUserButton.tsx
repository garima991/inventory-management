'use client'

import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import {gqlClient} from "@/services/graphql"
import {CREATE_USER} from "@/lib/gql/mutation"
import { User } from "../../../generated/prisma"//

type CreateUserButtonProps = {
    onOptimisticCreate?: (tempUser: User) => void;
    onServerConfirm?: (tempId: string, confirmed: User) => void;
    onErrorRollback?: (tempId: string) => void;
}

const CreateUserButton = ({ onOptimisticCreate, onServerConfirm, onErrorRollback }: CreateUserButtonProps) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("STAFF");

	async function handleAddUser () {
		const tempId = `temp-${Date.now()}`;
		try{
			const tempUser : User = {
				id: tempId as unknown as any,
				name,
				email,
				username,
				password: undefined as any,
				avatar: null as any,
				role: role as any,
				tenantId: "" as any 
			};
			onOptimisticCreate?.(tempUser);
			const data : {createUser : User } = await gqlClient.request(CREATE_USER, {
				name, email, username, password, role
			})
			if(data.createUser){
				onServerConfirm?.(tempId, data.createUser);
				// alert("User Created Successfully");
				setName("");
				setEmail("");
				setUsername("");
				setRole("STAFF");
			}
			else{
				onErrorRollback?.(tempId);
				// alert("something went wrong");
			}
		}
		catch(error){
			onErrorRollback?.(tempId);
			console.log(error);
		}
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>Add member</Button>
			</Dialog.Trigger>

			<Dialog.Content maxWidth="450px">
				<Dialog.Title>Add new user</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Add new user to your app
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

					<label className='flex flex-col flex-1 gap-1 '>
						<Text as="div" size="2" weight="bold">
							Role
						</Text>
						<Select.Root value={role} onValueChange={(value) => setRole(value)}>
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
						<Button onClick = {handleAddUser}>Save</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>

	)
}


export default CreateUserButton;