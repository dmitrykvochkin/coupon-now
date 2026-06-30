import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, "..", "src", "fixtures");

const categories = [
  { slug: "fashion", name: "Fashion & Apparel" },
  { slug: "electronics", name: "Electronics" },
  { slug: "home-garden", name: "Home & Garden" },
  { slug: "beauty", name: "Beauty & Personal Care" },
  { slug: "health", name: "Health & Wellness" },
  { slug: "food", name: "Food & Grocery" },
  { slug: "travel", name: "Travel & Hotels" },
  { slug: "sports", name: "Sports & Outdoors" },
  { slug: "toys", name: "Toys & Kids" },
  { slug: "automotive", name: "Automotive" },
  { slug: "pets", name: "Pet Supplies" },
  { slug: "office", name: "Office & Business" },
  { slug: "jewelry", name: "Jewelry & Watches" },
  { slug: "furniture", name: "Furniture" },
  { slug: "shoes", name: "Shoes" },
  { slug: "books", name: "Books & Media" },
  { slug: "software", name: "Software & SaaS" },
  { slug: "gaming", name: "Gaming" },
  { slug: "gifts", name: "Gifts & Flowers" },
  { slug: "subscription", name: "Subscriptions" },
  { slug: "education", name: "Education" },
  { slug: "finance", name: "Finance & Insurance" },
];

const merchantNames = [
  "Nike", "Adidas", "Amazon", "Target", "Walmart", "Best Buy", "Apple", "Samsung",
  "Sephora", "Ulta", "Macy's", "Nordstrom", "Gap", "Old Navy", "H&M", "Zara",
  "ASOS", "Wayfair", "IKEA", "Home Depot", "Lowe's", "Bed Bath & Beyond", "Chewy",
  "Petco", "PetSmart", "Expedia", "Booking.com", "Hotels.com", "Airbnb", "Delta",
  "Southwest", "Uber Eats", "DoorDash", "Grubhub", "Starbucks", "Dunkin'", "Chipotle",
  "Domino's", "Pizza Hut", "McDonald's", "Subway", "CVS", "Walgreens", "Rite Aid",
  "GNC", "Vitamin Shoppe", "REI", "Dick's Sporting Goods", "Foot Locker", "Finish Line",
  "New Balance", "Under Armour", "Lululemon", "Patagonia", "North Face", "Columbia",
  "Coach", "Michael Kors", "Kate Spade", "Fossil", "Ray-Ban", "Warby Parker", "LensCrafters",
  "Etsy", "eBay", "Overstock", "Kohl's", "JCPenney", "Bloomingdale's", "Saks Fifth Avenue",
  "Neiman Marcus", "Revolve", "Shopbop", "Farfetch", "Nordstrom Rack", "TJ Maxx", "Marshalls",
  "Ross", "Dollar General", "Dollar Tree", "Costco", "Sam's Club", "BJ's", "Staples",
  "Office Depot", "HP", "Dell", "Lenovo", "Microsoft", "Adobe", "Canva", "Notion",
  "Spotify", "Hulu", "Disney+", "Netflix", "Audible", "Kindle", "Barnes & Noble",
  "GameStop", "PlayStation", "Xbox", "Nintendo", "LEGO", "Mattel", "Hasbro", "Crocs",
  "Skechers", "Vans", "Converse", "Brooks Running", "Hoka", "Allbirds", "Everlane",
  "Uniqlo", "Banana Republic", "J.Crew", "Anthropologie", "Free People", "Urban Outfitters",
  "Abercrombie", "Hollister", "American Eagle", "Aerie", "Victoria's Secret", "Bath & Body Works",
  "The Body Shop", "Kiehl's", "Clinique", "Estee Lauder", "MAC Cosmetics", "Fenty Beauty",
  "Glossier", "ColourPop", "Tarte", "Too Faced", "Anastasia Beverly Hills", "Olaplex",
  "Dyson", "Shark", "Ninja", "KitchenAid", "Cuisinart", "Instant Pot", "Keurig", "Nespresso",
  "Blue Apron", "HelloFresh", "Factor", "Graza", "Thrive Market", "Whole Foods",
  "Trader Joe's", "Instacart", "Shipt", "Blue Nile", "Brilliant Earth", "Pandora",
  "Tiffany & Co", "Kay Jewelers", "Zales", "Movado", "Citizen", "Seiko", "Casio",
  "GoPro", "Bose", "Sony", "JBL", "Beats", "Anker", "Ring", "Nest", "SimpliSafe",
  "TurboTax", "H&R Block", "QuickBooks", "FreshBooks", "Squarespace", "Wix", "Shopify",
  "Mailchimp", "HubSpot", "Salesforce", "Zoom", "Slack", "Asana", "Monday.com", "Todoist",
  "Grammarly", "Duolingo", "Coursera", "Udemy", "MasterClass", "Skillshare", "LinkedIn Learning",
  "Chegg", "Quizlet", "Rosetta Stone", "Babbel", "Calm", "Headspace", "Peloton", "Fitbit",
  "Garmin", "Whoop", "Oura", "Theragun", "Hyperice", "NordicTrack", "Bowflex", "Rogue Fitness",
  "Carhartt", "Timberland", "Dr. Martens", "Birkenstock", "Teva", "Osprey", "Yeti", "Hydro Flask",
  "Stanley", "Coleman", "Cabela's", "Bass Pro Shops", "Academy Sports", "Scheels", "Fanatics",
  "NFL Shop", "NBA Store", "MLB Shop", "NHL Shop", "Ticketmaster", "StubHub", "Vivid Seats",
  "SeatGeek", "Priceline", "Kayak", "Orbitz", "Travelocity", "Hertz", "Enterprise", "Avis",
  "Turo", "Lyft", "Zipcar", "Sixt", "Alamo", "National Car Rental", "Budget", "Thrifty",
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['.]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pickCategories(index) {
  const primary = categories[index % categories.length].slug;
  const secondary = categories[(index + 7) % categories.length].slug;
  return primary === secondary ? [primary] : [primary, secondary];
}

const discountTemplates = [
  { text: "10% off", codePrefix: "SAVE10" },
  { text: "15% off", codePrefix: "SAVE15" },
  { text: "20% off", codePrefix: "DEAL20" },
  { text: "25% off", codePrefix: "EXTRA25" },
  { text: "30% off", codePrefix: "FLASH30" },
  { text: "Free shipping", codePrefix: "FREESHIP" },
  { text: "$10 off $50+", codePrefix: "TENOFF50" },
  { text: "$20 off $100+", codePrefix: "TWENTY100" },
  { text: "Buy one get one 50% off", codePrefix: "BOGO50" },
  { text: "Up to 40% off sale", codePrefix: "SALE40" },
];

const merchants = merchantNames.map((name, index) => {
  const slug = slugify(name);
  const categorySlugs = pickCategories(index);
  const updatedAt = new Date(Date.now() - index * 86_400_000).toISOString();

  return {
    slug,
    name,
    summary: `Find verified ${name} coupon codes and promo deals. Save on popular products with updated discounts and limited-time offers.`,
    description: `${name} offers a wide selection of products online and in stores. Shoppers can use active coupon codes for percentage discounts, free shipping, and seasonal promotions. Check this page for the latest verified deals before checkout.`,
    websiteUrl: `https://www.${slug.replace(/-/g, "")}.com`,
    affiliateUrl: `https://affiliate.couponnow.example/out/${slug}`,
    logoUrl: `https://logo.clearbit.com/${slug.replace(/-/g, "")}.com`,
    categorySlugs,
    faq: [
      {
        question: `Does ${name} have coupon codes?`,
        answer: `Yes. ${name} frequently publishes coupon codes for online orders, including percentage-off deals and free-shipping promotions.`,
      },
      {
        question: `How often are ${name} coupons updated?`,
        answer: `We refresh ${name} offers regularly and remove expired codes so you see active promotions first.`,
      },
      {
        question: `Can I stack ${name} coupons?`,
        answer: `Most ${name} promotions cannot be combined. Apply one eligible code per order unless terms state otherwise.`,
      },
    ],
    updatedAt,
  };
});

const coupons = [];
let couponId = 1;

for (const merchant of merchants) {
  const couponCount = 2 + (couponId % 4);
  for (let i = 0; i < couponCount; i++) {
    const template = discountTemplates[(couponId + i) % discountTemplates.length];
    const daysUntilExpiry = 7 + ((couponId + i) % 90);
    const expiresAt = new Date(Date.now() + daysUntilExpiry * 86_400_000).toISOString();

    coupons.push({
      id: `coupon-${couponId}`,
      merchantSlug: merchant.slug,
      code: `${template.codePrefix}${(couponId % 100).toString().padStart(2, "0")}`,
      title: `${merchant.name} ${template.text}`,
      description: `Use this ${merchant.name} promo code at checkout for ${template.text.toLowerCase()} on eligible items.`,
      discountText: template.text,
      expiresAt,
      affiliateUrl: `${merchant.affiliateUrl}?coupon=${couponId}`,
      updatedAt: merchant.updatedAt,
    });
    couponId += 1;
  }
}

mkdirSync(fixturesDir, { recursive: true });
writeFileSync(join(fixturesDir, "categories.json"), JSON.stringify(categories, null, 2));
writeFileSync(join(fixturesDir, "merchants.json"), JSON.stringify(merchants, null, 2));
writeFileSync(join(fixturesDir, "coupons.json"), JSON.stringify(coupons, null, 2));

console.log(
  `Generated ${categories.length} categories, ${merchants.length} merchants, ${coupons.length} coupons`,
);
