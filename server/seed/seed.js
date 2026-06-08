require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');
const { FAQ } = require('../models/Misc');

const MONGO_URI = process.env.MONGO_URI;

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
    tags: ['black', 'embroidery', 'kurti', 'festive'],
    reviews: [
      { name: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning! The embroidery is so detailed.', verified: true },
      { name: 'Meena Patel', rating: 4, comment: 'Beautiful fabric, fits perfectly.', verified: true }
    ]
  },
  {
    name: 'Royal Blue Banarasi Silk Saree',
    price: 8500,
    originalPrice: 10000,
    description: 'Resplendent royal blue Banarasi silk saree with intricate gold zari weaving. A collector\'s piece that embodies the grandeur of Indian weaving traditions.',
    category: 'saree',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    badge: 'BEST SELLER',
    fabric: 'Pure Banarasi Silk',
    work: 'Zari Weaving',
    inStock: true,
    isBestSeller: true,
    isSpecialPrice: true,
    tags: ['saree', 'banarasi', 'silk', 'wedding', 'blue']
  },
  {
    name: 'Black Embroidered Kurta Set',
    price: 3900,
    description: 'Statement black kurta featuring bold embroidery with mirror work accents. Paired with straight pants and printed dupatta for a complete ensemble.',
    category: 'kurta-set',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    badge: 'NEW',
    fabric: 'Raw Silk',
    work: 'Embroidery with Mirror Work',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    tags: ['black', 'mirror work', 'festive', 'party wear']
  },
  {
    name: 'Royal Blue Banarasi Silk Saree',
    price: 8500,
    originalPrice: 10000,
    description: 'Resplendent royal blue Banarasi silk saree with intricate gold zari weaving. A collector\'s piece that embodies the grandeur of Indian weaving traditions.',
    category: 'saree',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    badge: 'BEST SELLER',
    fabric: 'Pure Banarasi Silk',
    work: 'Zari Weaving',
    inStock: true,
    isBestSeller: true,
    isSpecialPrice: true,
    tags: ['saree', 'banarasi', 'silk', 'wedding', 'blue']
  },
  {
    name: 'Pink Bandhani Kurti Set',
    price: 2200,
    description: 'Cheerful pink kurti with traditional Gujarati bandhani print. Lightweight and comfortable, perfect for casual and semi-formal occasions.',
    category: 'kurti-set',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'],
    badge: 'HANDMADE',
    fabric: 'Mul Cotton',
    work: 'Bandhani',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    tags: ['pink', 'bandhani', 'casual', 'summer']
  },
  {
    name: 'Orange Embroidered Kurti',
    price: 1850,
    description: 'Vibrant orange kurti with contrasting thread embroidery. Features a flared silhouette with side slits. A perfect blend of tradition and contemporary style.',
    category: 'kurti-set',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'],
    badge: 'NEW ARRIVAL',
    fabric: 'Rayon',
    work: 'Thread Embroidery',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    tags: ['orange', 'embroidery', 'casual', 'flared']
  },
  {
    name: 'Royal Blue Banarasi Silk Saree',
    price: 8500,
    originalPrice: 10000,
    description: 'Resplendent royal blue Banarasi silk saree with intricate gold zari weaving. A collector\'s piece that embodies the grandeur of Indian weaving traditions.',
    category: 'saree',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    badge: 'BEST SELLER',
    fabric: 'Pure Banarasi Silk',
    work: 'Zari Weaving',
    inStock: true,
    isBestSeller: true,
    isSpecialPrice: true,
    tags: ['saree', 'banarasi', 'silk', 'wedding', 'blue']
  },
  {
    name: 'Royal Blue Banarasi Silk Saree',
    price: 8500,
    originalPrice: 10000,
    description: 'Resplendent royal blue Banarasi silk saree with intricate gold zari weaving. A collector\'s piece that embodies the grandeur of Indian weaving traditions.',
    category: 'saree',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    badge: 'BEST SELLER',
    fabric: 'Pure Banarasi Silk',
    work: 'Zari Weaving',
    inStock: true,
    isBestSeller: true,
    isSpecialPrice: true,
    tags: ['saree', 'banarasi', 'silk', 'wedding', 'blue']
  },
  {
    name: 'Mustard Phulkari Dupatta Set',
    price: 2800,
    description: 'Vibrant mustard suit set with authentic Punjabi phulkari embroidery dupatta. The geometric floral patterns are hand-embroidered by artisans from Punjab.',
    category: 'kurta-set',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'],
    badge: 'HANDMADE',
    fabric: 'Cotton Silk',
    work: 'Phulkari',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isSpecialPrice: true,
    tags: ['mustard', 'phulkari', 'punjabi', 'dupatta']
  },
  {
    name: 'Royal Blue Banarasi Silk Saree',
    price: 8500,
    originalPrice: 10000,
    description: 'Resplendent royal blue Banarasi silk saree with intricate gold zari weaving. A collector\'s piece that embodies the grandeur of Indian weaving traditions.',
    category: 'saree',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    badge: 'BEST SELLER',
    fabric: 'Pure Banarasi Silk',
    work: 'Zari Weaving',
    inStock: true,
    isBestSeller: true,
    isSpecialPrice: true,
    tags: ['saree', 'banarasi', 'silk', 'wedding', 'blue']
  },
  {
    name: 'Wine Velvet Lehenga Choli',
    price: 12000,
    description: 'Opulent wine velvet lehenga choli with heavy zardosi work. An heirloom-quality piece perfect for weddings and grand celebrations.',
    category: 'little-wonders',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'],
    fabric: 'Velvet',
    work: 'Zardosi',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isLittleWonders: true,
    isBestSeller: true,
    tags: ['wine', 'velvet', 'lehenga', 'wedding', 'bridal']
  },
  {
    name: 'Green Chanderi Suit Set',
    price: 3600,
    originalPrice: 4200,
    description: 'Ethereal green Chanderi suit with delicate silver butti print. The lightweight fabric drapes beautifully, making it ideal for summer weddings.',
    category: 'kurta-set',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'],
    badge: 'SALE',
    fabric: 'Chanderi Silk',
    work: 'Butti Print',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isSpecialPrice: true,
    tags: ['green', 'chanderi', 'lightweight', 'summer wedding']
  }
];

const testimonials = [
  { name: 'Aarti Mehta', location: 'Mumbai', message: 'I ordered the Beige Chikankari set and it was beyond my expectations! The fabric quality is exceptional and the embroidery is museum-worthy. Pratibha didi has truly outdone herself. Will definitely be a repeat customer!', rating: 5, approved: true, featured: true },
  { name: 'Ritu Bajaj', location: 'Delhi', message: 'The Black Embroidered Kurti arrived beautifully packaged. The stitching quality and attention to detail is remarkable. I wore it to a family function and received so many compliments. Thank you Ojas Couture!', rating: 5, approved: true, featured: true },
  { name: 'Shalini Krishnan', location: 'Bangalore', message: 'Found Ojas Couture through Instagram and so glad I did. The Purple applique dress material is gorgeous — the handwork is clearly done with love and expertise. Already planning my next purchase!', rating: 5, approved: true, featured: true },
  { name: 'Prerna Singh', location: 'Jaipur', message: 'The Little Wonders collection is absolute perfection. Pratibha ji understands Indian aesthetics so deeply. My lehenga was custom-stitched perfectly and arrived on time. Superb service!', rating: 5, approved: true, featured: true },
  { name: 'Divya Agarwal', location: 'Kolkata', message: 'Outstanding quality and beautiful designs. The clothes feel luxurious yet are priced very reasonably. Customer service is also top-notch — they were very helpful with size queries.', rating: 5, approved: true, featured: true },
  { name: 'Pooja Nair', location: 'Chennai', message: 'Ordered for my sister\'s wedding and the whole family loved the outfits. The packaging was so thoughtful and the outfit was even more beautiful in person than in photos!', rating: 5, approved: true, featured: false }
];

const blogs = [
  {
    title: 'How to Style a Chikankari Kurta for Every Occasion',
    slug: 'how-to-style-chikankari-kurta',
    excerpt: 'Chikankari is one of India\'s most beloved embroidery traditions. Here\'s how to make it work for every occasion from casual brunches to festive celebrations.',
    content: `<p>Chikankari, the delicate embroidery art from Lucknow, has been gracing Indian wardrobes for centuries. What makes it truly special is its versatility — a single chikankari kurta can take you from a casual coffee meet to a formal puja ceremony with just a few styling changes.</p>

<h2>Casual Daytime Look</h2>
<p>For a relaxed daytime outing, pair your ivory chikankari kurta with straight-cut jeans or linen trousers. Slip into kolhapuri sandals and add minimal jewellery — perhaps just pearl studs and a thin gold chain. The understated elegance speaks for itself.</p>

<h2>Office-Ready Ensemble</h2>
<p>Take your chikankari to work by pairing it with cigarette pants in a neutral tone. Block heels instantly elevate the look to boardroom-appropriate. A structured potli bag completes the professional yet ethnic aesthetic.</p>

<h2>Festive Celebrations</h2>
<p>For festivals and celebrations, layer your chikankari kurta with a contrast dupatta in a jewel tone — emerald green against ivory creates a stunning visual contrast. Stack bangles, wear a maang tikka, and opt for juttis for the complete festive look.</p>`,
    author: 'Pratibha Rajput',
    coverImage: 'https://images.unsplash.com/photo-1614285798449-02a33ee5e02b?w=800',
    category: 'styling-tips',
    tags: ['chikankari', 'styling', 'tips'],
    published: true
  },
  {
    title: 'A Guide to Indian Fabrics: What to Wear in Every Season',
    slug: 'guide-to-indian-fabrics-every-season',
    excerpt: 'From breezy cotton to luxurious silk — understanding which fabric to choose for which season can transform how comfortable and elegant you feel.',
    content: `<p>India's textile heritage is unparalleled — we have fabrics suited for every climate, occasion, and mood. Understanding the properties of each helps you dress comfortably and elegantly throughout the year.</p>

<h2>Summer Fabrics (March – June)</h2>
<p>Cotton is your best friend in the Indian summer. Pure cotton, mul cotton, and kota cotton allow maximum breathability. Chanderi silk, despite being a silk, is surprisingly lightweight and perfect for summer celebrations. Avoid synthetic fabrics entirely during peak summer.</p>

<h2>Monsoon Choices (July – September)</h2>
<p>Quick-drying fabrics like georgette, crepe, and tissue are ideal during monsoon. They're lightweight, don't cling when damp, and dry quickly. Stay away from heavily embellished pieces that may be damaged by unexpected showers.</p>

<h2>Winter Elegance (October – February)</h2>
<p>This is the season for silk, velvet, and wool-blends. Banarasi silk sarees, velvet kurta sets, and pashmina shawls all come into their own in winter. The heavy fabrics keep you warm while looking absolutely magnificent at winter weddings.</p>`,
    author: 'Pratibha Rajput',
    coverImage: 'https://images.unsplash.com/photo-1558171813-2f5bbbc3cf44?w=800',
    category: 'fabric-guide',
    tags: ['fabric', 'guide', 'seasons', 'cotton', 'silk'],
    published: true
  },
  {
    title: 'The Art of Applique: Behind Our Latest Collection',
    slug: 'art-of-applique-latest-collection',
    excerpt: 'Step inside the making of our signature applique collection and discover the skilled hands and patient hours that go into every piece.',
    content: `<p>When you hold an applique piece from Ojas Couture, you're holding hours of meticulous handwork. Applique — the art of cutting fabric into shapes and stitching them onto a base fabric — is one of India's most ancient textile crafts.</p>

<h2>The Artisans Behind the Work</h2>
<p>Our applique pieces are crafted by a group of women artisans from Rajasthan, many of whom have inherited the craft from their mothers and grandmothers. The geometric precision of their cutwork is breathtaking — each shape is cut freehand and stitched by eye, yet perfectly symmetric.</p>

<h2>From Concept to Creation</h2>
<p>Each applique design begins as a sketch, which is then translated into fabric templates. The artisans choose complementary fabrics, cut each piece with surgical precision, and spend hours hand-stitching each motif onto the base fabric. A single dupatta can take an entire day to complete.</p>

<h2>Why We Choose Handmade</h2>
<p>In an age of machine production, we remain committed to handmade because every piece carries a human story. The slight imperfections are not flaws — they are signatures of the human hands that created something beautiful.</p>`,
    author: 'Pratibha Rajput',
    coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
    category: 'behind-the-scenes',
    tags: ['applique', 'handmade', 'artisans', 'behind the scenes'],
    published: true
  }
];

const faqs = [
  { question: 'What sizes do you offer?', answer: 'We offer sizes XS to XXL (32 to 48 inches). Custom sizing is available for Little Wonders collection pieces — please contact us via WhatsApp to discuss your measurements.', category: 'sizing', order: 1 },
  { question: 'How long does delivery take?', answer: 'Standard delivery takes 5–7 business days across India. Express delivery (2–3 days) is available for select locations. International shipping is available — contact us for details.', category: 'shipping', order: 2 },
  { question: 'Do you accept returns or exchanges?', answer: 'We accept exchange requests within 7 days of delivery for manufacturing defects or size issues. Please note that items must be unworn and in original packaging. Custom-stitched pieces cannot be returned.', category: 'returns', order: 3 },
  { question: 'Are your products genuinely handmade?', answer: 'Yes! All items marked "HANDMADE" are crafted by skilled artisans. We work directly with artisan communities across India to ensure authenticity and fair compensation.', category: 'fabric', order: 4 },
  { question: 'Can I get a custom-stitched outfit?', answer: 'Absolutely! Our Little Wonders by Pratibha Rajput collection specialises in custom-stitched Indian suits. Contact us via WhatsApp with your measurements and design preferences for a personalised consultation.', category: 'customization', order: 5 },
  { question: 'How do I care for embroidered garments?', answer: 'Hand wash in cold water with mild detergent, or dry clean for heavily embellished pieces. Never wring or tumble dry. Store folded in a muslin cloth, away from direct sunlight. Iron on reverse side with low heat.', category: 'fabric', order: 6 },
  { question: 'Do you offer Cash on Delivery?', answer: 'Yes, COD is available for orders up to ₹5,000 within India. For higher value orders, we recommend prepaid payment via UPI, credit/debit card, or net banking.', category: 'ordering', order: 7 },
  { question: 'How can I track my order?', answer: 'Once your order is shipped, you will receive a tracking link via SMS and email. You can also WhatsApp us your order number for real-time updates.', category: 'shipping', order: 8 }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await Testimonial.deleteMany({});
    await Blog.deleteMany({});
    await FAQ.deleteMany({});

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded`);

    await Testimonial.insertMany(testimonials);
    console.log(`✅ ${testimonials.length} testimonials seeded`);

    await Blog.insertMany(blogs);
    console.log(`✅ ${blogs.length} blog posts seeded`);

    await FAQ.insertMany(faqs);
    console.log(`✅ ${faqs.length} FAQs seeded`);

    console.log('\n🌸 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
