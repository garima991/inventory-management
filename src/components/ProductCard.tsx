import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes'
import { Product } from "../../generated/prisma"

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const price = Number(product.price || 0)
  const stock = Number(product.stock || 0)
  const category = String(product.category || 'Others')
  const titleInitial = String(product.title || '?').charAt(0)

  const stockBadgeClass =
    stock === 0
      ? 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400'
      : stock <= 5
      ? 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
      : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'

  return (
    <Box mb="3">
      <Card className="group rounded-xl border border-white/10 hover:border-indigo-500/40 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden">
      
        {product.imgUrl ? (
          <div className="h-36 w-full overflow-hidden">
            <img
              src={product.imgUrl}
              alt={String(product.title || 'Product image')}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-16 w-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
        )}

        <Box p="3" className="min-w-0">
          <Flex align="center" gap="3" wrap="wrap">
            <Box className="min-w-0 flex-1">
              <Flex align="stretch" gap="2" wrap="wrap">
                <Text as="div" size="3" weight="bold" className="truncate">
                  {product.title}
                </Text>
                <span className="px-2 py-0.5 text-[10px] rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {category}
                </span>
              </Flex>
              <Flex align="center" justify="between" className="mt-1">
                <Text as="div" size="2" weight="medium" className="opacity-90">
                  ${price.toFixed(2)}
                </Text>
                <span className={`px-2 py-0.5 text-[10px] rounded-full border ${stockBadgeClass}`}>
                  {stock === 0 ? 'Out of stock' : stock <= 5 ? 'Low stock' : 'In stock'}
                </span>
              </Flex>
              {stock > 0 && (
                <Text as="div" size="1" className="mt-1 text-foreground/60">
                  {stock} in stock
                </Text>
              )}
            </Box>
          </Flex>
        </Box>
      </Card>
    </Box>
  )
}

export default ProductCard
