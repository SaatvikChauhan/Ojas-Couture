require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Collection = require('../models/Collection');
const Homepage = require('../models/Homepage');

// ── optional models ──────────────────────────
let Testimonial, Blog, FAQ;
try { Testimonial = require('../models/Testimonial'); } catch { }
try { Blog = require('../models/Blog'); } catch { }
try { const Misc = require('../models/Misc'); FAQ = Misc.FAQ; } catch { }

const MONGO_URI = process.env.MONGO_URI;

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN USER
// ─────────────────────────────────────────────────────────────────────────────
const adminUser = {
  name: 'Pratibha Rajput',
  email: process.env.ADMIN_EMAIL || 'admin@ojascouture.com',
  password: process.env.ADMIN_PASSWORD || 'OjasCouture@2026',
  isAdmin: true,
};

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────
const categories = [
  { name: 'Kurta', slug: 'kurta', description: 'Elegant kurtas for every occasion' },
  { name: 'Bottoms', slug: 'bottoms', description: 'Palazzos, salwars, and more' },
  { name: 'Unstitched Dress Material', slug: 'dress-material', description: 'Premium fabric sets to stitch your way' },
  { name: 'Lehenga', slug: 'lehenga', description: 'Bridal and festive lehengas' },
  { name: 'Saree', slug: 'saree', description: 'From Banarasi silk to lightweight georgette' },
  { name: 'Anarkali', slug: 'anarkali', description: 'Floor-length anarkali suits' },
  { name: 'Co-ord Sets', slug: 'co-ord-sets', description: 'Matching sets for an effortless look' },
  { name: 'Dupatta', slug: 'dupatta', description: 'Handcrafted dupattas in every style' },
  { name: 'Potlis', slug: 'potlis', description: 'Handmade potli bags for every outfit' },
];

const products = [
  {
    name: 'Black Embroidered Kurti Set',
    price: 1699,
    description: 'Elegantly crafted black kurti with intricate gold embroidery. Features delicate floral motifs hand-stitched by skilled artisans. Includes matching dupatta.',
    category: 'kurti-set',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'],
    badge: 'NEW',
    fabric: 'Georgette',
    work: 'Embroidery',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isBestSeller: true,
    isLittleWonders: true,
    tags: ['black', 'embroidery', 'kurti', 'festive'],
    reviews: [
      { name: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning! The embroidery is so detailed.', verified: true },
      { name: 'Meena Patel', rating: 4, comment: 'Beautiful fabric, fits perfectly.', verified: true },
    ],
  },
  {
    name: 'Royal Blue Banarasi Silk Saree',
    price: 8500,
    originalPrice: 10000,
    description: 'Resplendent royal blue Banarasi silk saree with intricate gold zari weaving.',
    category: 'saree',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    badge: 'BEST SELLER',
    fabric: 'Pure Banarasi Silk',
    work: 'Zari Weaving',
    inStock: true,
    isBestSeller: true,
    isSpecialPrice: true,
    tags: ['saree', 'banarasi', 'silk', 'wedding', 'blue'],
  },
  {
    name: 'Black Embroidered Kurta Set',
    price: 3900,
    description: 'Statement black kurta featuring bold embroidery with mirror work accents.',
    category: 'kurta-set',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    badge: 'NEW',
    fabric: 'Raw Silk',
    work: 'Embroidery with Mirror Work',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isLittleWonders: true,
    tags: ['black', 'mirror work', 'festive', 'party wear'],
  },
  {
    name: 'Pink Bandhani Kurti Set',
    price: 2200,
    description: 'Cheerful pink kurti with traditional Gujarati bandhani print.',
    category: 'kurti-set',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'],
    badge: 'HANDMADE',
    fabric: 'Mul Cotton',
    work: 'Bandhani',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isLittleWonders: true,
    tags: ['pink', 'bandhani', 'casual', 'summer'],
  },
  {
    name: 'Orange Embroidered Kurti',
    price: 1850,
    description: 'Vibrant orange kurti with contrasting thread embroidery.',
    category: 'kurti-set',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'],
    badge: 'NEW ARRIVAL',
    fabric: 'Rayon',
    work: 'Thread Embroidery',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isLittleWonders: true,
    tags: ['orange', 'embroidery', 'casual', 'flared'],
  },
  {
    name: 'Mustard Phulkari Dupatta Set',
    price: 2800,
    description: 'Vibrant mustard suit set with authentic Punjabi phulkari embroidery dupatta.',
    category: 'kurta-set',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'],
    badge: 'HANDMADE',
    fabric: 'Cotton Silk',
    work: 'Phulkari',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isSpecialPrice: true,
    isLittleWonders: true,
    tags: ['mustard', 'phulkari', 'punjabi', 'dupatta'],
  },
  {
    name: 'Wine Velvet Lehenga Choli',
    price: 12000,
    description: 'Opulent wine velvet lehenga choli with heavy zardosi work.',
    category: 'little-wonders',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'],
    fabric: 'Velvet',
    work: 'Zardosi',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isLittleWonders: true,
    isBestSeller: true,
    tags: ['wine', 'velvet', 'lehenga', 'wedding', 'bridal'],
  },
  {
    name: 'Green Chanderi Suit Set',
    price: 3600,
    originalPrice: 4200,
    description: 'Ethereal green Chanderi suit with delicate silver butti print.',
    category: 'kurta-set',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'],
    badge: 'SALE',
    fabric: 'Chanderi Silk',
    work: 'Butti Print',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isSpecialPrice: true,
    tags: ['green', 'chanderi', 'lightweight', 'summer wedding'],
  },
  {
    name: 'Black Embroidered Kurti Set',
    price: 1699,
    description: 'Elegantly crafted black kurti with intricate gold embroidery.',
    category: 'kurti-set',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'],
    fabric: 'Georgette',
    work: 'Embroidery',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isBestSeller: true,
  },

  {
    name: 'Pink Bandhani Kurti Set',
    price: 2200,
    description: 'Cheerful pink kurti with traditional bandhani print.',
    category: 'kurti-set',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'],
    fabric: 'Mul Cotton',
    work: 'Bandhani',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },

  {
    name: 'Mustard Phulkari Dupatta Set',
    price: 2800,
    description: 'Mustard suit set with phulkari dupatta.',
    category: 'kurta-set',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'],
    fabric: 'Cotton Silk',
    work: 'Phulkari',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isSpecialPrice: true,
  },

  {
    name: 'Wine Velvet Lehenga Choli',
    price: 12000,
    description: 'Wine velvet lehenga with zardosi work.',
    category: 'little-wonders',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'],
    fabric: 'Velvet',
    work: 'Zardosi',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isBestSeller: true,
  }
];

const testimonials = [
  { name: 'Aarti Mehta', location: 'Mumbai', message: 'I ordered the Beige Chikankari set and it was beyond my expectations! The fabric quality is exceptional and the embroidery is museum-worthy.', rating: 5, approved: true, featured: true },
  { name: 'Ritu Bajaj', location: 'Delhi', message: 'The Black Embroidered Kurti arrived beautifully packaged. The stitching quality and attention to detail is remarkable. Received so many compliments!', rating: 5, approved: true, featured: true },
  { name: 'Shalini Krishnan', location: 'Bangalore', message: 'Found Ojas Couture through Instagram and so glad I did. The Purple applique dress material is gorgeous — the handwork is clearly done with love.', rating: 5, approved: true, featured: true },
  { name: 'Prerna Singh', location: 'Jaipur', message: 'The Little Wonders collection is absolute perfection. My lehenga was custom-stitched perfectly and arrived on time. Superb service!', rating: 5, approved: true, featured: true },
  { name: 'Divya Agarwal', location: 'Kolkata', message: 'Outstanding quality and beautiful designs. The clothes feel luxurious yet are priced very reasonably. Customer service is also top-notch.', rating: 5, approved: true, featured: true },
  { name: 'Pooja Nair', location: 'Chennai', message: 'Ordered for my sister\'s wedding and the whole family loved the outfits. The packaging was so thoughtful and the outfit was even more beautiful in person!', rating: 5, approved: true, featured: false },
];

const blogs = [
  {
    title: 'How to Style a Chikankari Kurta for Every Occasion',
    slug: 'how-to-style-chikankari-kurta',
    excerpt: 'Chikankari is one of India\'s most beloved embroidery traditions. Here\'s how to make it work for every occasion.',
    content: `<p>Chikankari, the delicate embroidery art from Lucknow, has been gracing Indian wardrobes for centuries.</p><h2>Casual Daytime Look</h2><p>Pair your ivory chikankari kurta with straight-cut jeans. Slip into kolhapuri sandals and add minimal jewellery.</p><h2>Festive Celebrations</h2><p>Layer with a contrast dupatta in a jewel tone — emerald green against ivory creates a stunning visual contrast.</p>`,
    author: 'Pratibha Rajput',
    coverImage: 'https://images.unsplash.com/photo-1614285798449-02a33ee5e02b?w=800',
    category: 'styling-tips',
    tags: ['chikankari', 'styling', 'tips'],
    published: true,
  },
  {
    title: 'A Guide to Indian Fabrics: What to Wear in Every Season',
    slug: 'guide-to-indian-fabrics-every-season',
    excerpt: 'From breezy cotton to luxurious silk — understanding which fabric to choose for which season.',
    content: `<p>India's textile heritage is unparalleled — we have fabrics suited for every climate, occasion, and mood.</p><h2>Summer (March–June)</h2><p>Cotton is your best friend. Mul cotton and kota cotton allow maximum breathability.</p><h2>Winter (October–February)</h2><p>Banarasi silk sarees, velvet kurta sets, and pashmina shawls come into their own.</p>`,
    author: 'Pratibha Rajput',
    coverImage: 'https://images.unsplash.com/photo-1558171813-2f5bbbc3cf44?w=800',
    category: 'fabric-guide',
    tags: ['fabric', 'guide', 'seasons'],
    published: true,
  },
];

const faqs = [
  { question: 'What sizes do you offer?', answer: 'We offer sizes XS to XXL (32–48 inches). Custom sizing is available for Little Wonders collection pieces.', category: 'sizing', order: 1 },
  { question: 'How long does delivery take?', answer: 'Standard delivery takes 5–7 business days across India. Express delivery (2–3 days) is available for select locations.', category: 'shipping', order: 2 },
  { question: 'Do you accept returns or exchanges?', answer: 'We accept exchange requests within 7 days of delivery for manufacturing defects or size issues. Custom-stitched pieces cannot be returned.', category: 'returns', order: 3 },
  { question: 'Are your products genuinely handmade?', answer: 'Yes! All items marked "HANDMADE" are crafted by skilled artisans. We work directly with artisan communities across India.', category: 'fabric', order: 4 },
  { question: 'Can I get a custom-stitched outfit?', answer: 'Absolutely! Contact us via WhatsApp with your measurements and design preferences for a personalised consultation.', category: 'customization', order: 5 },
  { question: 'Do you offer Cash on Delivery?', answer: 'Yes, COD is available for orders up to ₹5,000 within India. For higher value orders, prepaid payment via UPI or card is recommended.', category: 'ordering', order: 6 },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEED
// ─────────────────────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // ── Admin user ────────────────────────────────────────────────────────────
    const existing = await User.findOne({ email: adminUser.email });
    if (existing) {
      existing.isAdmin = true;
      await existing.save();
      console.log('⚡ Existing user promoted to admin:', adminUser.email);
    } else {
      const hashed = await bcrypt.hash(adminUser.password, 10);
      await User.create({ ...adminUser, password: hashed });
      console.log('✅ Admin user created:', adminUser.email);
      console.log('   Password:', adminUser.password, '← change this after first login\n');
    }

    // ── Categories ────────────────────────────────────────────────────────────
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log(`✅ ${categories.length} categories seeded`);

    // ── Products ──────────────────────────────────────────────────────────────
    await Product.deleteMany({});
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ ${insertedProducts.length} products seeded`);

    // ── Collections (uses real product IDs) ───────────────────────────────────
    await Collection.deleteMany({});

    const byName = (name) => insertedProducts.find(p => p.name === name)?._id;

    const collections = [
      {
        name: 'Festive Edit',
        slug: 'festive-edit',
        description: 'Curated pieces for every celebration — from Diwali to weddings.',
        products: [
          byName('Black Embroidered Kurti Set'),
          byName('Royal Blue Banarasi Silk Saree'),
          byName('Wine Velvet Lehenga Choli'),
          byName('Mustard Phulkari Dupatta Set'),
        ].filter(Boolean),
        isActive: true,
      },
      {
        name: 'Everyday Elegance',
        slug: 'everyday-elegance',
        description: 'Effortlessly stylish pieces for daily wear.',
        products: [
          byName('Pink Bandhani Kurti Set'),
          byName('Orange Embroidered Kurti'),
          byName('Green Chanderi Suit Set'),
        ].filter(Boolean),
        isActive: true,
      },
    ];

    await Collection.insertMany(collections);
    console.log(`✅ ${collections.length} collections seeded`);

    // ── Homepage defaults ─────────────────────────────────────────────────────
    await Homepage.deleteMany({});
    await Homepage.create({
      heroBanners: [],
      aboutTitle: 'About Ojas Couture',
      aboutText: 'Founded by Pratibha Rajput, Ojas Couture celebrates the rich craft traditions of India. Every piece is designed with love and crafted by skilled artisans — bringing handmade elegance to modern wardrobes.',
      contactEmail: 'hello@ojascouture.com',
      contactPhone: '+91 98765 43210',
      contactAddress: 'Jaipur, Rajasthan, India',
      instagramHandle: '@ojascouture',
      whatsappNumber: '+919876543210',
    });
    console.log('✅ Homepage defaults seeded');

    // ── Optional models ───────────────────────────────────────────────────────
    if (Testimonial) {
      await Testimonial.deleteMany({});
      await Testimonial.insertMany(testimonials);
      console.log(`✅ ${testimonials.length} testimonials seeded`);
    }

    if (Blog) {
      await Blog.deleteMany({});
      await Blog.insertMany(blogs);
      console.log(`✅ ${blogs.length} blog posts seeded`);
    }

    if (FAQ) {
      await FAQ.deleteMany({});
      await FAQ.insertMany(faqs);
      console.log(`✅ ${faqs.length} FAQs seeded`);
    }

    console.log('\n🌸 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();