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
  past.setHours(
    randomInt(0, 23),
    randomInt(0, 59),
    randomInt(0, 59),
    randomInt(0, 999)
  );
  return past;
}

const productCatalog: SeedProduct[] = [
  // ELECTRONICS
  {
    title: 'Samsung 80 cm (32 inches) HD Ready Smart LED TV UA32T4380AKXXL (Glossy Black)',
    description: `
    Resolution: HD Ready (1366x768) | Refresh Rate: 60 hertz
    Connectivity: 2 HDMI ports to connect set top box, Blu Ray players, gaming console | 1 USB ports to connect hard drives and other USB devices
    Sound : 20 Watts Output | Dolby Digital Plus
    Smart TV Features : Personal Computer | Screen Share | Music System | Content Guide | Connect Share Movie
    Display : LED Panel | Mega Contrast | PurColor | HD Picture Quality | Slim & Stylish Design
    Warranty Information: 1-year manufacturer warranty and 1 year additional on Panel from date of purchase on the television set and 12-month warranty on the remote control. Warranty claims can be processed using the Amazon e-invoice
    Additional information: Brand Warranty can be availed using amazon invoice and User manual can be accessed from brand website`,
    category: ProductCategory.ELECTRONICS,
    price: 699.99,
    imgUrl: "https://m.media-amazon.com/images/I/71JQ3kUrR9L._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
  },
  {
    title: "boAt Airdopes 311 Pro, 50HRS Battery, Fast Charge, Dual Mics ENx Tech, Transparent LID, Low Latency, IPX4, IWP Tech, v5.3 Bluetooth Earbuds, TWS Ear Buds Wireless Earphones with mic (Active Black)description: ",
    description: `Up to 50 hours of Playback: Stay entertained non-stop with up to 50 hours of massive playtime. Pop in boAt Airdopes 311 Pro TWS Earbuds and make commutes fun with your favorite tunes for company.
                  ENx Technology: ENx-powered dual mics in these earbuds make attending calls in public spaces a breeze. Speak and listen from busy roads, airport lounges, cafés, and more without pesky background sounds.
                  ASAP Charging: Charge for just 10 minutes and hit play on entertainment for 150 minutes. Finish the latest OTT releases or relive your old favorites with swift charging
                  boAt Signature Sound: Delve into the content with boAt Signature Sound. Featuring powerful 10 mm drivers, you can experience sound the way it was intended with Airdopes 311 Pro!
                  BEAST Mode: Raise adrenaline levels with boAtâ€s gaming BEAST mode. The 50 ms low latency lets you game lag-free to your heartâ€s content!`,
    category: ProductCategory.ELECTRONICS,
    price: 199.99,
    imgUrl: "https://m.media-amazon.com/images/I/614gbl-O98L._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    title: "Wireless Mouse Pro",
    description: `The WM118 Wireless Optical Mouse from Dell offers you wireless performance every day with an excellent battery life
                  Designed to create a clutter-free workspace with a reliable, plug-and-play RF wireless connection
                  This wireless mouse provides reliable performance and a stable wireless connection through the USB anchored RF wireless dongle
                  Its Plug and play feature allow for easy installation so users can get started using their mouse within minutes, with no confusing software or setup requirements
                  The small size and wireless performance help to make WM118 wireless optical mouse a great option for on-the-go users`,
    category: ProductCategory.ELECTRONICS,
    price: 39.99,
    imgUrl: "https://m.media-amazon.com/images/I/41rIY4opa3L._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    title: "Portronics Hydra 10 Mechanical Wireless Gaming Keyboard with Bluetooth 5.0 + 2.4 GHz, RGB Lights 16.8 Million Colors, Type C Charging, Compatible with PCs, Smartphones and Tablets(Red)",
    description: `[2-WAY CONNECT] : Hydra 10 is made for an experience without wires the wireless keyboard allows you to connect over Bluetooth 5.0 or 2.4 GHz with a USB nano dongle. Connect the way you want with Hydra 10.
                  [COMPATIBILITY GALORE] : With the mechanical keyboard finishes tasks over multiple devices like PCs, Laptops, smartphones(iOS & Android) and tablets.Hydra 10 allows you to work effortlessly.
                  [EASY SWITCH] : You can pair 4 devices with the Bluetooth keyboard. 3 over Bluetooth with key commands, you can easily pair or switch between devices.
                  [ADD SOME COLOURS] : The keypad has RGB lights, broadly speaking RGB lights is a combination of 3 colours red green and blue that combine to form 16 million colours.You can customize the lighting with Key commands up to 20 light modes.
                  [BRING ON THE GAME] : Built for gaming the mechanical keyboard has anti - ghosting, this feature helps you to game better with linear red keys.While gaming it is often required to press many keys at once or in sequence with Hydra 10 you can get the best of typing and gaming.The linear red keys make for a more efficient mechanical keyboard.
                  [ERGONOMIC DESIGN] : The white laptop keyboard weighs 586 grams and has a mini design with 68 keys.The mechanical keyboard can accompany you anywhere be it for work or leisure or gaming.
                  [TYPE C CHARGING] : The mechanical keyboard has a Type C charge port and can also be used as a wired keyboard while on charge.A one - hour charge offers playback of 5 days.`,
    category: ProductCategory.ELECTRONICS,
    price: 89.99,
    imgUrl: "https://m.media-amazon.com/images/I/61HKzrmiCzL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    title: "BlueRigger 8K DisplayPort (DP to DP) Cable - 6 feet - (up to 32.4 Gbit/s, UHD with 8 K / 60 Hz or 4 K / 120 Hz, Supports HBR3, DSC 1.2, HDR 10, Black) Series",
    description: `➤ DISPLAYPORT 1.4 CABLE: BlueRigger 8K DP to DP cord is great for video streaming and gaming. It supports bandwidth of 32.4Gbps, 3D, Dynamic HDR, and resolution up to 8K 60Hz, 4K 144Hz, 2K 165Hz, 1080P 240Hz. Backwards compatible with DisplayPort 1.3/1.2/1.1
                  ➤IMMERSIVE GAMING EXPERIENCE: BlueRigger DP cable is perfect for FPS, MOBA, RTS, racing games. Its latest game mode supports variable refresh rate, maximizes the value of the graphics card and CPU. Supports DP, DP++, and DisplayPort++
                  ➤ DURABLE CONSTRUCTION: Corrosion resistant 24K gold-plated connectors and 100% pure copper conductors maximize signal strength. The BlueRigger Display port cable has an aluminum alloy shell and cotton braid to ensure durability and stable transmission
                  ➤ UNIVERSAL COMPATIBILITY: BlueRigger DP to DP cord is ideal for gamers, graphic designers, IT & more. Compatible with desktop, laptops, high-end TVs, monitors, graphic cards & projectors equipped with DP interface. DisplayPort technology can connect multiple screens to a single port via Multi-Stream Transport (MST)
                  ➤ [WARRANTY] - BlueRigger cable comes with 2 Year Warranty with technical support available Monday-Friday, 10AM-6PM IST to assist with any questions or issues`,
    category: ProductCategory.ELECTRONICS,
    price: 59.99,
    imgUrl: "https://m.media-amazon.com/images/I/81lyrQYg7CL._SL1500_.jpg",
  },

  // BEAUTY
  {
    title: "JustLatest Scalp Massage, Solar Powered Scalp Massager (Marble Pink), Head Massager, Hair Massager For Hair Growth",
    description: `
    Soothing Relief: Gently massage away stress and tension with flexible silicone fingers that knead and stimulate the scalp.
    Portable Pleasure: Compact, lightweight design makes this scalp massager perfect for on-the-go relaxation anywhere you need it.
    Custom Comfort: Ergonomic handle with soft-touch grip provides full control to target tight muscles with just the right pressure.
    Invigorating Stimulation: Flexible silicone nubs reach all over the head and neck to awaken hair follicles and boost circulation for healthier hair.
    Easy to Use Scalp Massage: No batteries needed - press fingers against the scalp and glide over the head for an instantly rejuvenating experience.`,
    category: ProductCategory.BEAUTY,
    price: 24.5,
    imgUrl: "https://m.media-amazon.com/images/I/61JeMF3xF-L._SL1446_.jpg",
  },
  {
    title: "Minimalist Marula Oil 5% Face Moisturizer For Dry Skin With Hyaluronic Acid For Deep Nourishment & Hydration, For Men & Women",
    description: "Hydrating Moisturizer",
    category: ProductCategory.BEAUTY,
    price: 18.75,
    imgUrl: "https://m.media-amazon.com/images/I/51EeuzB4Q7L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    title: "Ghar Soaps Sandalwood & Saffron Magic Soaps For Bath (100 Gms Pack Of 1) | Paraben Free | Chandan & Kesar Bath Soap | Handmade Soaps For Glowing | Skin Brightening Soap For Men & Women",
    description: `
    Ethical Formulation: Ghar Soaps for Bath / Bath Soap as a beacon of ethical skincare, embodying a commitment to purity. Our formulations are devoid of parabens, sulphates, and cruelty, aligning seamlessly with conscientious consumers who seek a skincare experience rooted in nature and compassion.
    Handcrafted Excellence: Elevate your bathing ritual with Ghar Soaps for Bath, where each bar is a testament to meticulous craftsmanship. By being entirely handmade, our Bath Soap / Tan Removal Soap go beyond the ordinary, delivering an exclusive touch that mass-produced alternatives simply cannot replicate. The dedication to handmade excellence ensures that each herbal soaps for bath or natural soaps for bath is a unique work of art, created with care and precision.
    Premium Ingredients: The discerning choice of premium ingredients sets Ghar Soaps apart. We consciously avoid harmful and cheaper chemicals in our skin lightening soap/ skin brightening soap, opting instead for components that contribute to the richness and efficacy of our products. 
    The result is a luxurious handmade soaps / tan removal soap that not only cleanses but also pampers your skin with the goodness of high-quality, thoughtfully selected ingredients.`,
    category: ProductCategory.BEAUTY,
    price: 12.99,
    imgUrl: "https://m.media-amazon.com/images/I/71cBR5Rj3iL._AC_UL480_FMwebp_QL65_.jpg",
  },

  // FOOD
  {
    title: "Nourish Organics Cinnamon Oats Granola, 270g Pack | Healthy and Nutritious Breakfast Cereals with Whole Nuts | No Refined Sugar | Clean Label",
    description: `
    Warm Cinnamon & Vanilla Flavor – Enjoy the comforting taste of classic toasted oats crusted with real cinnamon and vanilla, blended with crunchy superfood seeds and nuts for a wholesome, delicious start to your day.
    High Protein & Fibre Rich – Packed with 12.75% protein and rich in dietary fibre to help support energy, muscle recovery, and digestive health – ideal for breakfast, post-workout, or healthy snacking.
    100% Clean & Natural – Made with no preservatives, no artificial sweeteners, no unnatural flavourings, and absolutely no trans fats or cholesterol – clean eating never tasted this good!
    Wheat-Free Goodness – A great alternative to traditional cereals, this wheat-free granola is suitable for those avoiding wheat or looking for lighter, easier-to-digest options.
    Versatile & Satisfying – Perfect with milk, yogurt, smoothie bowls, or as a straight-from-the-pack snack – a crunchy, nutritious companion to fuel your day, anytime, anywhere.`,
    category: ProductCategory.FOOD,
    price: 6.99,
    imgUrl: "https://m.media-amazon.com/images/I/71QO0IRhf9L._SL1500_.jpg",
  },
  {
    title: "Nescafe Intenso Whole Roasted Coffee Beans, Arabica and Robusta Blend, 1kg, Bag",
    description: `
    INTENSE & BALANCED BLEND: Experience an intense, well-balanced blend with a perfect harmony of chocolate, fruity notes, and a hint of spice
    CRAFTED FOR PERFECTION: Enjoy the deep, aromatic taste of NESCAFÉ Intenso, crafted from handpicked, high-quality beans, expertly roasted to bring out the best flavors
    PERFECT FOR COFFEE VENDING MACHINES: NESCAFÉ Intenso is perfect for coffee vending machines, offering a bold and flavorful coffee experience
    80 YEARS OF COFFEE EXCELLENCE: NESCAFÉ has been innovating for decades to deliver the best coffee experience, now enjoyed in over 180 countries`,
    category: ProductCategory.FOOD,
    price: 17.99,
    imgUrl: "https://m.media-amazon.com/images/I/61IEkgsJ7ZL._SL1500_.jpg",
  },
  {
    title: "Organic Green Tea Assortment - 20 Count Variety Pack",
    description: "Discover a curated collection of 20 organic green tea bags, featuring four unique blends: **Jasmine Green**, **Sencha**, **Mint Matcha**, and **Ginger Citrus**. Each tea bag is individually sealed to preserve freshness, offering a calming, antioxidant-rich beverage perfect for any time of day. This assortment is sourced from sustainable farms and is non-GMO and gluten-free.",
    category: ProductCategory.FOOD,
    price: 9.49,
    imgUrl: "https://m.media-amazon.com/images/I/51XzWEz911L._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    title: "Chocolate Peanut Butter Protein Bars - 12-Pack",
    description: "Fuel your active lifestyle with this 12-pack of delicious, high-protein bars. Each bar delivers **20g of protein** and is coated in rich, dark chocolate with a creamy peanut butter core. Made with all-natural ingredients, they are perfect for a post-workout recovery snack or a satisfying meal replacement.",
    category: ProductCategory.FOOD,
    price: 21.0,
    imgUrl: "https://m.media-amazon.com/images/I/61gGjd+tPdL._AC_UL480_FMwebp_QL65_.jpg"
  },

  // ACCESSORIES
  {
    title: "Men's Slim RFID-Blocking Bifold Wallet",
    description: "Crafted from full-grain genuine leather, this sleek bifold wallet is designed for both style and security. It features **6 card slots**, a dedicated ID window, and a full-length cash compartment. The integrated **RFID-blocking technology** protects your personal information from electronic theft.",
    category: ProductCategory.ACCESSORIES,
    price: 29.99,
    imgUrl: "https://m.media-amazon.com/images/I/61zGEyao2EL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    title: "Classic 20L Water-Resistant Canvas Backpack",
    description: "This durable and stylish backpack is built for daily adventures. Made from heavy-duty waxed canvas, it's **water-resistant** and features a spacious **20L main compartment**, a padded sleeve that fits up to a **15-inch laptop**, and two side pockets for water bottles. The adjustable padded straps ensure comfortable carrying.",
    category: ProductCategory.ACCESSORIES,
    price: 49.99,
    imgUrl: "https://m.media-amazon.com/images/I/81inOWivlCL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    title: "1-Liter Insulated Stainless Steel Water Bottle",
    description: "Stay perfectly hydrated with this 1-liter, double-walled stainless steel water bottle. It uses vacuum insulation technology to keep drinks **cold for 24 hours** and **hot for 12 hours**. The leak-proof screw-on cap and sweat-proof exterior make it the ideal companion for the gym, office, or outdoor activities.",
    category: ProductCategory.ACCESSORIES,
    price: 22.5,
    imgUrl: "https://m.media-amazon.com/images/I/713ix8Ej91L._AC_UL480_FMwebp_QL65_.jpg"
  },

  // CLOTHING
  {
    title: "Men's Everyday 100% Cotton Crewneck Tee",
    description: "An essential for any wardrobe, this classic fit crewneck tee is made from **100% premium Pima cotton** for superior softness and durability. The fabric is preshrunk to maintain its shape and features a ribbed collar for a refined look. Available in multiple colors.",
    category: ProductCategory.CLOTHING,
    price: 14.99,
    imgUrl: "https://m.media-amazon.com/images/I/81csgfZcMmL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    title: "Women's Ultra-Soft Fleece Jogger Pants",
    description: "Experience ultimate comfort in these soft fleece jogger pants. Designed with a modern tapered fit, they feature a wide elastic waistband with an adjustable drawstring, and deep side pockets. The plush fleece lining provides warmth, making them perfect for both lounging and running errands.",
    category: ProductCategory.CLOTHING,
    price: 34.99,
    imgUrl: "https://m.media-amazon.com/images/I/51BlpfwscbL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    title: "Unisex Heavyweight Oversized Pullover Hoodie",
    description: "Stay warm and stylish with this heavyweight, oversized pullover hoodie. Made from a premium cotton-polyester blend, it features a double-lined hood, a large front kangaroo pocket, and ribbed cuffs and hem. The relaxed fit is perfect for layering and creating a casual, modern look.",
    category: ProductCategory.CLOTHING,
    price: 44.99,
    imgUrl: "https://m.media-amazon.com/images/I/61+UDWZaflL._AC_UL480_FMwebp_QL65_.jpg"
  },

  // FURNITURE
  {
    title: "Electric Height-Adjustable Standing Desk",
    description: "Transform your workspace with this ergonomic electric standing desk. With a powerful motor and digital control panel, you can easily adjust the height from **28 to 47 inches**. The durable desktop is scratch-resistant, and the sturdy steel frame supports up to **150 lbs**.",
    category: ProductCategory.FURNITURE,
    price: 349.0,
    imgUrl: "https://m.media-amazon.com/images/I/91CRdhwg60L._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    title: "Ergonomic Mesh Office Chair with Lumbar Support",
    description: "Designed for all-day comfort, this ergonomic office chair features a breathable mesh back that promotes airflow and a cushioned seat. The built-in **adjustable lumbar support** helps maintain proper posture, while the adjustable armrests and seat height provide a customized fit.",
    category: ProductCategory.FURNITURE,
    price: 199.0,
    imgUrl: "https://ik.imagekit.io/2xkwa8s1i/img/chairs/office-chair/WSCHRMASTPGBPBWEBKBKML.jpg?tr=w-3072",
  },
  {
    title: "5-Tier Industrial Wood and Metal Bookshelf",
    description: "Add a touch of modern industrial style to your home with this versatile 5-tier bookshelf. The shelves are made from high-quality MDF wood with a rustic finish, supported by a strong black metal frame. It provides ample space for books, plants, and decorative items, and includes an anti-tipping kit for safety.",
    category: ProductCategory.FURNITURE,
    price: 119.0,
    imgUrl: "https://m.media-amazon.com/images/I/71CqZbq22aL._AC_UL480_FMwebp_QL65_.jpg"
  },

  // DECOR
  {
    title: "10-Meter Warm White LED String Lights",
    description: "Create a cozy and inviting atmosphere with these 10-meter (33-foot) LED string lights. Featuring **100 warm white LEDs** on a flexible copper wire, they are perfect for decorating bedrooms, patios, or holiday events. The lights are **battery-powered** and include a remote with **8 different lighting modes**.",
    category: ProductCategory.DECOR,
    price: 15.99,
    imgUrl: "https://m.media-amazon.com/images/I/71NOeS8nUYL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    title: "Abstract Framed Wall Art (40x50cm)",
    description: "Instantly elevate your home decor with this elegant, framed abstract wall art. The subtle color palette and modern print make it a versatile piece for any room. The art is printed on high-quality canvas and comes professionally mounted in a sleek **40x50cm** wooden frame with a glass front.",
    category: ProductCategory.DECOR,
    price: 39.99,
    imgUrl: "https://m.media-amazon.com/images/I/81oTPQu3rtL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    title: "Soft Cotton Blend Woven Throw Blanket",
    description: "Cozy up with this super soft woven throw blanket. Made from a luxurious cotton and acrylic blend, it features a beautiful woven texture and fringed edges. The **50x60 inch** size is perfect for draping over a sofa or bed, adding both warmth and a decorative touch.",
    category: ProductCategory.DECOR,
    price: 29.5,
    imgUrl: "https://m.media-amazon.com/images/I/81vrmt8x4SL._AC_UL480_FMwebp_QL65_.jpg"
  },

  // OTHERS
  {
    title: "Non-Slip Yoga Mat (6mm Thick)",
    description: "Find your balance and stability with this high-density **6mm thick** yoga mat. The specially designed non-slip textured surface provides excellent grip, while the extra cushioning protects your joints during any workout, from yoga and Pilates to general stretching. It's lightweight and includes a carrying strap for easy transport.",
    category: ProductCategory.OTHERS,
    price: 24.0,
    imgUrl: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Strategy Board Game: 'The Catan Settlers'",
    description: "Gather your friends for 'The Catan Settlers,' a thrilling and popular strategy board game. Designed for **3-4 players** with a playtime of **60-90 minutes**, players compete to build and settle the island of Catan. This classic game includes all necessary game pieces, cards, and a detailed rulebook.",
    category: ProductCategory.OTHERS,
    price: 34.0,
    imgUrl: "https://m.media-amazon.com/images/I/810XrJArbhL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    title: "Compact Portable Rechargeable Air Pump",
    description: "This compact and lightweight portable air pump is a must-have for emergencies and everyday use. It features a powerful rechargeable lithium battery, an LCD display for pressure readings, and multiple nozzles to inflate car tires, bike tires, sports balls, and more. It fits easily in your glove compartment or backpack.",
    category: ProductCategory.OTHERS,
    price: 27.99,
    imgUrl: "https://m.media-amazon.com/images/I/61+kM4hft0L._AC_UL480_FMwebp_QL65_.jpg"
  }
];

async function seed() {
  console.log(
    "Seeding multi-tenant database with users, products, and sales..."
  );

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
    const hashedPassword = await hashPassword(
      `admin_${tenant.name.replace(/\s+/g, "").toLowerCase()}`
    );
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
      const hashedPassword = await hashPassword(
        `manager${i}_${tenant.name.replace(/\s+/g, "").toLowerCase()}`
      );

      await prisma.user.create({
        data: {
          name: `${tenant.name} Manager ${i}`,
          email: `manager${i}@${tenant.name
            .replace(/\s+/g, "")
            .toLowerCase()}.com`,
          username: `manager${i}_${tenant.name
            .replace(/\s+/g, "")
            .toLowerCase()}`,
          password: hashedPassword,
          role: "MANAGER",
          tenantId: tenant.id,
        },
      });
    }

    // Create Staff
    for (let i = 1; i <= 3; i++) {
      const hashedPassword = await hashPassword(
        `staff${i}_${tenant.name.replace(/\s+/g, "").toLowerCase()}`
      );

      await prisma.user.create({
        data: {
          name: `${tenant.name} Staff ${i}`,
          email: `staff${i}@${tenant.name
            .replace(/\s+/g, "")
            .toLowerCase()}.com`,
          username: `staff${i}_${tenant.name
            .replace(/\s+/g, "")
            .toLowerCase()}`,
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
      const salesQuantities: number[] = Array.from(
        { length: numberOfSales },
        () => randomInt(1, 5)
      );
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

    console.log(
      `Seeded tenant: ${tenant.name} with admin, managers, staff, products, and sales.`
    );
  }

  console.log("Multi-tenant seed completed!");
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
