import { hashPassword } from "@/lib/auth";
import { PrismaClient, ProductCategory } from "../generated/prisma";

const prisma = new PrismaClient();

type SeedProduct = {
  title: string;
  description: string;
  category: ProductCategory;
  price: number;
  imgUrl: string;
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateInLastDays(days: number): Date {
  const now = new Date();
  const past = new Date(now);
  past.setDate(now.getDate() - randomInt(0, days));
  past.setHours(randomInt(0, 23), randomInt(0, 59), randomInt(0, 59), randomInt(0, 999));
  return past;
}


const productCatalog: SeedProduct[] = [
	// ELECTRONICS
	{ title: "4K Smart TV 55\"", description: "Ultra HD HDR TV with voice control", category: ProductCategory.ELECTRONICS, price: 699.99, imgUrl: "https://picsum.photos/seed/tv55/800/600" },
	{ title: "Noise-Cancelling Headphones", description: "Over-ear ANC headphones with 30h battery", category: ProductCategory.ELECTRONICS, price: 199.99, imgUrl: "https://picsum.photos/seed/headphones/800/600" },
	{ title: "Wireless Mouse Pro", description: "Ergonomic 2.4G + Bluetooth mouse", category: ProductCategory.ELECTRONICS, price: 39.99, imgUrl: "https://picsum.photos/seed/mouse/800/600" },
	{ title: "Gaming Keyboard RGB", description: "Mechanical keyboard with hot-swappable switches", category: ProductCategory.ELECTRONICS, price: 89.99, imgUrl: "https://picsum.photos/seed/keyboard/800/600" },
	{ title: "USB-C Hub 8-in-1", description: "HDMI, USB-A, SD, and PD charging", category: ProductCategory.ELECTRONICS, price: 59.99, imgUrl: "https://picsum.photos/seed/hub/800/600" },

	// BEAUTY
	{ title: "Vitamin C Serum", description: "Brightening face serum 30ml", category: ProductCategory.BEAUTY, price: 24.5, imgUrl: "https://picsum.photos/seed/vitc/800/600" },
	{ title: "Hydrating Face Cream", description: "Daily moisturizer for all skin types", category: ProductCategory.BEAUTY, price: 18.75, imgUrl: "https://picsum.photos/seed/cream/800/600" },
	{ title: "Matte Lipstick", description: "Long-wear matte finish", category: ProductCategory.BEAUTY, price: 12.99, imgUrl: "https://picsum.photos/seed/lipstick/800/600" },

	// FOOD
	{ title: "Organic Granola", description: "Crunchy oats with nuts and honey", category: ProductCategory.FOOD, price: 6.99, imgUrl: "https://picsum.photos/seed/granola/800/600" },
	{ title: "Dark Roast Coffee Beans", description: "Whole beans 1kg", category: ProductCategory.FOOD, price: 17.99, imgUrl: "https://picsum.photos/seed/coffee/800/600" },
	{ title: "Green Tea Assortment", description: "Assorted green tea bags", category: ProductCategory.FOOD, price: 9.49, imgUrl: "https://picsum.photos/seed/greentea/800/600" },
	{ title: "Protein Bars (12)", description: "Chocolate peanut butter flavor", category: ProductCategory.FOOD, price: 21.0, imgUrl: "https://picsum.photos/seed/proteinbar/800/600" },

	// ACCESSORIES
	{ title: "Leather Wallet", description: "RFID-blocking bifold", category: ProductCategory.ACCESSORIES, price: 29.99, imgUrl: "https://picsum.photos/seed/wallet/800/600" },
	{ title: "Canvas Backpack", description: "Water-resistant 20L", category: ProductCategory.ACCESSORIES, price: 49.99, imgUrl: "https://picsum.photos/seed/backpack/800/600" },
	{ title: "Stainless Water Bottle", description: "Insulated 1L", category: ProductCategory.ACCESSORIES, price: 22.5, imgUrl: "https://picsum.photos/seed/bottle/800/600" },

	// CLOTHING
	{ title: "Men's Crewneck Tee", description: "100% cotton, classic fit", category: ProductCategory.CLOTHING, price: 14.99, imgUrl: "https://picsum.photos/seed/tee/800/600" },
	{ title: "Women's Joggers", description: "Soft fleece jogger pants", category: ProductCategory.CLOTHING, price: 34.99, imgUrl: "https://picsum.photos/seed/joggers/800/600" },
	{ title: "Hoodie Oversized", description: "Heavyweight pullover hoodie", category: ProductCategory.CLOTHING, price: 44.99, imgUrl: "https://picsum.photos/seed/hoodie/800/600" },

	// FURNITURE
	{ title: "Standing Desk", description: "Electric height-adjustable desk", category: ProductCategory.FURNITURE, price: 349.0, imgUrl: "https://picsum.photos/seed/desk/800/600" },
	{ title: "Ergonomic Office Chair", description: "Lumbar support and mesh back", category: ProductCategory.FURNITURE, price: 199.0, imgUrl: "https://picsum.photos/seed/chair/800/600" },
	{ title: "Bookshelf 5-Tier", description: "Industrial wood and metal", category: ProductCategory.FURNITURE, price: 119.0, imgUrl: "https://picsum.photos/seed/bookshelf/800/600" },

	// DECOR
	{ title: "LED String Lights", description: "Warm white 10m", category: ProductCategory.DECOR, price: 15.99, imgUrl: "https://picsum.photos/seed/lights/800/600" },
	{ title: "Framed Wall Art", description: "Abstract print 40x50cm", category: ProductCategory.DECOR, price: 39.99, imgUrl: "https://picsum.photos/seed/wallart/800/600" },
	{ title: "Woven Throw Blanket", description: "Soft cotton blend", category: ProductCategory.DECOR, price: 29.5, imgUrl: "https://picsum.photos/seed/blanket/800/600" },

	// OTHERS
	{ title: "Yoga Mat", description: "Non-slip 6mm thick", category: ProductCategory.OTHERS, price: 24.0, imgUrl: "https://picsum.photos/seed/yogamat/800/600" },
	{ title: "Board Game Strategy", description: "2-4 players, 60-90 mins", category: ProductCategory.OTHERS, price: 34.0, imgUrl: "https://picsum.photos/seed/boardgame/800/600" },
	{ title: "Portable Air Pump", description: "Rechargeable, compact", category: ProductCategory.OTHERS, price: 27.99, imgUrl: "https://picsum.photos/seed/pump/800/600" },
];

async function seed() {
  console.log("Seeding multi-tenant database with users, products, and sales...");

  // Clean existing data
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  // Create tenants
  const tenantA = await prisma.tenant.create({ data: { name: "Tech Corp" } });
  const tenantB = await prisma.tenant.create({ data: { name: "Fashion Inc" } });
  const tenants = [tenantA, tenantB];

  for (const tenant of tenants) {
    // Create Admin user
    const hashedPassword = await hashPassword(`admin_${tenant.name.toLowerCase()}`);
    await prisma.user.create({
      data: {
        name: `${tenant.name} Admin`,
        email: `admin@${tenant.name.replace(/\s+/g, "").toLowerCase()}.com`,
        username: `admin_${tenant.name.replace(/\s+/g, "").toLowerCase()}`,
        password: hashedPassword,
        role: "ADMIN",
        tenantId: tenant.id,
      },
    });

    // Create Managers
    for (let i = 1; i <= 2; i++) {
      const hashedPassword = await hashPassword(`manager${i}_${tenant.name.toLowerCase()}`);

      await prisma.user.create({
        data: {
          name: `${tenant.name} Manager ${i}`,
          email: `manager${i}@${tenant.name.replace(/\s+/g, "").toLowerCase()}.com`,
          username: `manager${i}_${tenant.name.replace(/\s+/g, "").toLowerCase()}`,
          password: hashedPassword,
          role: "MANAGER",
          tenantId: tenant.id,
        },
      });
    }

    // Create Staff
    for (let i = 1; i <= 3; i++) {

      const hashedPassword = await hashPassword(`staff${i}_${tenant.name.toLowerCase()}`);

      await prisma.user.create({
        data: {
          name: `${tenant.name} Staff ${i}`,
          email: `staff${i}@${tenant.name.replace(/\s+/g, "").toLowerCase()}.com`,
          username: `staff${i}_${tenant.name.replace(/\s+/g, "").toLowerCase()}`,
          password: hashedPassword,
          role: "STAFF",
          tenantId: tenant.id,
        },
      });
    }

    // Create Products for this tenant
    for (const p of productCatalog) {
      const initialStock = randomInt(120, 600);
      const numberOfSales = randomInt(40, 220);
      const salesQuantities: number[] = Array.from({ length: numberOfSales }, () => randomInt(1, 5));
      const totalSold = salesQuantities.reduce((a, b) => a + b, 0);
      const finalStock = Math.max(0, initialStock - totalSold);

      const product = await prisma.product.create({
        data: {
          title: p.title,
          description: p.description,
          category: p.category,
          price: p.price,
          stock: finalStock,
          imgUrl: p.imgUrl,
          tenantId: tenant.id,
        },
      });

      // Create sales for this product
      const salesData = salesQuantities.map((q) => ({
        productId: product.id,
        quantity: q,
        createdAt: randomDateInLastDays(210),
        tenantId: tenant.id,
      }));

      if (salesData.length > 0) {
        await prisma.sale.createMany({ data: salesData });
      }
    }

    console.log(`Seeded tenant: ${tenant.name} with admin, managers, staff, products, and sales.`);
  }

  console.log("Multi-tenant seed completed!");
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

