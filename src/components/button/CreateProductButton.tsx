'use client'

import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import {gqlClient} from "@/services/graphql"
import { Product } from "../../generated/prisma"
import {ADD_PRODUCT} from "@/lib/gql/mutation"


type CreateProductButtonProps = {
    onOptimisticCreate?: (tempProduct: Product) => void;
    onServerConfirm?: (tempId: string, confirmed: Product) => void;
    onErrorRollback?: (tempId: string) => void;
}

const CreateProductButton = ({ onOptimisticCreate, onServerConfirm, onErrorRollback }: CreateProductButtonProps) => {
	const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("OTHERS");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [imgUrl, setImgUrl] = useState("");

	async function handleAddProduct () {
		const tempId = `temp-${Date.now()}`;
		try{
			const tempProduct: Product = {
				id: tempId as any,
				title,
				description,
				category: category as any,
				price: price as any,
				stock: stock as any,
				imgUrl,
				sales: [] as any
			};
			onOptimisticCreate?.(tempProduct);
			const data : {createProduct : Product } = await gqlClient.request(ADD_PRODUCT, {
				title, description, category, price, stock, imgUrl
			})
			if(data.createProduct){
				onServerConfirm?.(tempId, data.createProduct);
				alert("Product Added Successfully !")
                setTitle("");
                setDescription("");
                setCategory("OTHERS");
                setPrice(0);
                setStock(1);
                setImgUrl("");
			}
			else{
				onErrorRollback?.(tempId);
				alert("something went wrong");
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
				<Button variant="soft" color="indigo" size="3">Add Product</Button>
			</Dialog.Trigger>

			<Dialog.Content maxWidth="560px" className="rounded-xl">
				<Dialog.Title>Add new product</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Add new product to your app
				</Dialog.Description>

				<Flex direction="column" gap="2">
					<label>
						<Text as="div" size="2" weight="bold">
							Title
						</Text>
						<TextField.Root
							placeholder="Enter title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</label>
					<label>
						<Text as="div" size="2" weight="bold">
							Description
						</Text>
						<TextField.Root
							placeholder="Enter Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</label>

                    <label className='flex flex-col flex-1 gap-1 '>
						<Text as="div" size="2" weight="bold">
							Category
						</Text>
						<Select.Root value={category} onValueChange={(value) => setCategory(value)}>
							<Select.Trigger />
							<Select.Content>
								<Select.Group>
									<Select.Item value="ELECTRONICS">Electronics</Select.Item>
									<Select.Item value="BEAUTY">Beauty</Select.Item>
                                    <Select.Item value="FOOD">Food</Select.Item>
									<Select.Item value="ACCESSORIES">Accessories</Select.Item>
                                    <Select.Item value="CLOTHING">Clothing</Select.Item>
									<Select.Item value="FURNITURE">Furniture</Select.Item>
                                    <Select.Item value="DECOR">Decor</Select.Item>
									<Select.Item value="OTHERS">Others</Select.Item>
                                </Select.Group>
							</Select.Content>
						</Select.Root>
					</label>

					<label>
						<Text as="div" size="2" weight="bold">
							Price
						</Text>
						<TextField.Root
                        type = "number"
							placeholder="Enter price"
							value={price}
							onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
						/>
					</label>

					<label>
						<Text as="div" size="2" weight="bold">
							Stock
						</Text>
						<TextField.Root
							placeholder="Enter Stock"
							value={stock}
							onChange={(e) => setStock(Number.parseInt(e.target.value))}
						/>
					</label>
                    <label>
						<Text as="div" size="2" weight="bold">
						Image
						</Text>
						<TextField.Root
							placeholder="Enter Image URL"
							value={imgUrl}
							onChange={(e) => setImgUrl(e.target.value)}
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
						<Button onClick = {handleAddProduct} color="indigo">Save</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>

	)
}


export default CreateProductButton;