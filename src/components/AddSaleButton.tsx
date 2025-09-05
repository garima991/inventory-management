'use client'

import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { Product, Sale } from "../../generated/prisma"
import {gqlClient} from "@/services/graphql"
import {ADD_SALE} from "@/lib/gql/mutation";


type AddSaleButtonProps = {
    product: Product;
    onOptimisticSale?: (productId: string, quantity: number, tempSaleId: string) => void;
    onRollbackSale?: (productId: string, quantity: number, tempSaleId: string) => void;
    onSaleSuccess?: () => void;
}

const AddSaleButton = ({product, onOptimisticSale, onRollbackSale, onSaleSuccess}: AddSaleButtonProps) => {
	const [quantity, setQuantity] = useState(1);

	async function handleSale () {
        if(product.stock < quantity) {
            alert("Insufficient stock for this sale");
			return;
        }
		try{
			// optimistic stock decrement + temp sale id
			const tempSaleId = `temp-sale-${Date.now()}`;
			onOptimisticSale?.(product.id, quantity, tempSaleId);
			const data : {createSale : boolean } = await gqlClient.request(ADD_SALE, {
                productId: product.id,
				quantity
			})
			if(data.createSale){
				alert("Sale Added Successfully");
				setQuantity(1);
				onSaleSuccess?.();
			}
			else{
				onRollbackSale?.(product.id, quantity, tempSaleId);
				alert("something went wrong");
			}
		}
		catch(error){
			const tempSaleId = `temp-sale-${Date.now()}`;
			onRollbackSale?.(product.id, quantity, tempSaleId);
			console.log(error);
		}
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button variant="soft" color="indigo" size="3">Add Sale</Button>
			</Dialog.Trigger>

			<Dialog.Content maxWidth="480px" className="rounded-xl">
				<Dialog.Title>Add sale</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Add this product to sale
				</Dialog.Description>

				<Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" weight="bold">
                            Quantity
                        </Text>
                        <TextField.Root
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        </label>
				</Flex>

				<Flex gap="3" mt="4" justify="end">
					<Dialog.Close>
						<Button variant="soft" color="gray">
							Cancel
						</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button onClick = {handleSale} color="indigo">Add Sale</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>

	)
}


export default AddSaleButton;