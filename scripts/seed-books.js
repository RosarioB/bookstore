const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

const reviewerNames = [
  "Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson", "Emma Brown",
  "Frank Miller", "Grace Lee", "Henry Taylor", "Ivy Chen", "Jack Robinson",
  "Kate Anderson", "Liam O'Connor", "Mia Garcia", "Noah Martinez", "Olivia White",
  "Paul Thompson", "Quinn Roberts", "Rachel Green", "Sam Parker", "Tina Lopez"
];

const generateRandomReviews = () => {
  const usedNames = new Set();
  
  return Array.from({ length: 5 }, () => {
    let name;
    // Generate a random name that is not already in the usedNames set
    do {
      name = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
    } while (usedNames.has(name));
    usedNames.add(name);
    
    return {
      name,
      rating: Math.floor(Math.random() * 5) + 1,
      // Generate a random date within the last 3 years (3 * 365 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
      date: new Date(Date.now() - Math.random() * 3 * 365 * 24 * 60 * 60 * 1000)
        .toLocaleDateString('en-US'),
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort reviews by date in descending order
};


const books = [
  
  {
    category: "fiction",
    title: "The Midnight Library",
    author: "Matt Haig",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 15.99,
    imageSrc:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    stock: 25,
  },
  {
    category: "travel",
    title: "A Walk in the Woods",
    author: "Bill Bryson",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.99,
    imageSrc:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
    stock: 18,
  },
  {
    category: "food",
    title: "Salt, Fat, Acid, Heat",
    author: "Samin Nosrat",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 24.99,
    imageSrc:
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400",
    stock: 35,
  },
  {
    category: "health",
    title: "Atomic Habits",
    author: "James Clear",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 21.99,
    imageSrc:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    stock: 45,
  },
  {
    category: "business",
    title: "The Lean Startup",
    author: "Eric Ries",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 24.99,
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    stock: 28,
  },
  {
    category: "fiction",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.99,
    imageSrc: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    stock: 30,
  },
  {
    category: "travel",
    title: "Into the Wild",
    author: "Jon Krakauer",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.5,
    imageSrc:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    stock: 22,
  },
  {
    category: "food",
    title: "Kitchen Confidential",
    author: "Anthony Bourdain",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.99,
    imageSrc: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400",
    stock: 28,
  },
  {
    category: "health",
    title: "The Blue Zones",
    author: "Dan Buettner",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.75,
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    stock: 32,
  },
  {
    category: "business",
    title: "Good to Great",
    author: "Jim Collins",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 22.5,
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    stock: 32,
  },
  {
    category: "fiction",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.99,
    imageSrc:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    stock: 20,
  },
  {
    category: "travel",
    title: "Eat, Pray, Love",
    author: "Elizabeth Gilbert",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.99,
    imageSrc:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    stock: 25,
  },
  {
    category: "food",
    title: "The Food Lab",
    author: "J. Kenji López-Alt",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 32.5,
    imageSrc: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
    stock: 15,
  },
  {
    category: "health",
    title: "How Not to Die",
    author: "Michael Greger",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 22.5,
    imageSrc:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400",
    stock: 28,
  },
  {
    category: "business",
    title: "The Innovator's Dilemma",
    author: "Clayton M. Christensen",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 26.75,
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    stock: 20,
  },
  {
    category: "fiction",
    title: "Educated",
    author: "Tara Westover",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.99,
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    stock: 15,
  },
  {
    category: "travel",
    title: "The Geography of Bliss",
    author: "Eric Weiner",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.25,
    imageSrc:
      "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=400",
    stock: 15,
  },
  {
    category: "food",
    title: "Julie & Julia",
    author: "Julie Powell",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.75,
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    stock: 22,
  },
  {
    category: "health",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.99,
    imageSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    stock: 35,
  },
  {
    category: "business",
    title: "Zero to One",
    author: "Peter Thiel",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 21.99,
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    stock: 25,
  },
  {
    category: "fiction",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 14.99,
    imageSrc:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400",
    stock: 35,
  },
  {
    category: "travel",
    title: "Wild",
    author: "Cheryl Strayed",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.75,
    imageSrc:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    stock: 20,
  },
  {
    category: "food",
    title: "The Omnivore's Dilemma",
    author: "Michael Pollan",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.99,
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    stock: 20,
  },
  {
    category: "health",
    title: "Mindset",
    author: "Carol S. Dweck",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.25,
    imageSrc:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
    stock: 30,
  },
  {
    category: "business",
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 23.25,
    imageSrc:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    stock: 22,
  },
  {
    category: "fiction",
    title: "Circe",
    author: "Madeline Miller",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.5,
    imageSrc:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400",
    stock: 22,
  },
  {
    category: "travel",
    title: "The Great Railway Bazaar",
    author: "Paul Theroux",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.5,
    imageSrc: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
    stock: 12,
  },
  {
    category: "food",
    title: "My Life in France",
    author: "Julia Child",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.5,
    imageSrc: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400",
    stock: 25,
  },
  {
    category: "health",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.5,
    imageSrc:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    stock: 40,
  },
  {
    category: "business",
    title: "Built to Last",
    author: "Jim Collins",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 20.5,
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    stock: 30,
  },
  {
    category: "fiction",
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.99,
    imageSrc:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    stock: 18,
  },
  {
    category: "travel",
    title: "In a Sunburned Country",
    author: "Bill Bryson",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.99,
    imageSrc:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400",
    stock: 16,
  },
  {
    category: "food",
    title: "The Joy of Cooking",
    author: "Irma S. Rombauer",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 29.99,
    imageSrc:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400",
    stock: 18,
  },
  {
    category: "health",
    title: "Why We Sleep",
    author: "Matthew Walker",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 20.75,
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    stock: 25,
  },
  {
    category: "business",
    title: "The Tipping Point",
    author: "Malcolm Gladwell",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.99,
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    stock: 35,
  },
  {
    category: "fiction",
    title: "Normal People",
    author: "Sally Rooney",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 15.5,
    imageSrc: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    stock: 28,
  },
  {
    category: "travel",
    title: "The Beach",
    author: "Alex Garland",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 15.99,
    imageSrc:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400",
    stock: 28,
  },
  {
    category: "food",
    title: "Heat",
    author: "Bill Buford",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.25,
    imageSrc:
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400",
    stock: 24,
  },
  {
    category: "health",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 23.99,
    imageSrc:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400",
    stock: 22,
  },
  {
    category: "business",
    title: "Outliers",
    author: "Malcolm Gladwell",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.75,
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    stock: 33,
  },
  {
    category: "fiction",
    title: "Little Fires Everywhere",
    author: "Celeste Ng",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.25,
    imageSrc:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    stock: 24,
  },
  {
    category: "travel",
    title: "On the Road",
    author: "Jack Kerouac",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.5,
    imageSrc:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
    stock: 24,
  },
  {
    category: "food",
    title: "The Art of Simple Food",
    author: "Alice Waters",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 22.5,
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    stock: 16,
  },
  {
    category: "health",
    title: "Breath",
    author: "James Nestor",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.5,
    imageSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    stock: 33,
  },
  {
    category: "business",
    title: "The E-Myth Revisited",
    author: "Michael E. Gerber",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.5,
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    stock: 28,
  },
  {
    category: "fiction",
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.75,
    imageSrc: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400",
    stock: 32,
  },
  {
    category: "travel",
    title: "The Art of Travel",
    author: "Alain de Botton",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.99,
    imageSrc:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    stock: 19,
  },
  {
    category: "food",
    title: "Fast Food Nation",
    author: "Eric Schlosser",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.99,
    imageSrc: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
    stock: 30,
  },
  {
    category: "health",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.25,
    imageSrc:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
    stock: 38,
  },
  {
    category: "business",
    title: "Start With Why",
    author: "Simon Sinek",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 21.25,
    imageSrc:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    stock: 26,
  },
  {
    category: "fiction",
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.5,
    imageSrc:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    stock: 15,
  },
  {
    category: "travel",
    title: "Turn Right at Machu Picchu",
    author: "Mark Adams",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.75,
    imageSrc:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    stock: 14,
  },
  {
    category: "food",
    title: "In Defense of Food",
    author: "Michael Pollan",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.75,
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    stock: 21,
  },
  {
    category: "health",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 21.5,
    imageSrc:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    stock: 27,
  },
  {
    category: "business",
    title: "Crossing the Chasm",
    author: "Geoffrey A. Moore",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 24.5,
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    stock: 18,
  },
  {
    category: "fiction",
    title: "Gone Girl",
    author: "Gillian Flynn",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 15.75,
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    stock: 27,
  },
  {
    category: "travel",
    title: "The Lost City of Z",
    author: "David Grann",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.25,
    imageSrc:
      "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=400",
    stock: 17,
  },
  {
    category: "food",
    title: "The Making of a Chef",
    author: "Michael Ruhlman",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.25,
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    stock: 19,
  },
  {
    category: "health",
    title: "The Happiness Hypothesis",
    author: "Jonathan Haidt",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.75,
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    stock: 24,
  },
  {
    category: "business",
    title: "The 4-Hour Workweek",
    author: "Timothy Ferriss",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.99,
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    stock: 40,
  },
  {
    category: "fiction",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 12.99,
    imageSrc: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    stock: 40,
  },
  {
    category: "travel",
    title: "Dark Star Safari",
    author: "Paul Theroux",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 20.5,
    imageSrc:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    stock: 11,
  },
  {
    category: "food",
    title: "Cooked",
    author: "Michael Pollan",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 20.5,
    imageSrc: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400",
    stock: 17,
  },
  {
    category: "health",
    title: "Flow",
    author: "Mihaly Csikszentmihalyi",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.99,
    imageSrc:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400",
    stock: 29,
  },
  {
    category: "business",
    title: "Purple Cow",
    author: "Seth Godin",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.75,
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    stock: 42,
  },
  {
    category: "fiction",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 14.5,
    imageSrc:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400",
    stock: 35,
  },
  {
    category: "travel",
    title: "The Snow Leopard",
    author: "Peter Matthiessen",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.5,
    imageSrc: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
    stock: 13,
  },
  {
    category: "food",
    title: "The French Laundry Cookbook",
    author: "Thomas Keller",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 39.99,
    imageSrc:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400",
    stock: 12,
  },
  {
    category: "health",
    title: "The Upward Spiral",
    author: "Alex Korb",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.25,
    imageSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    stock: 31,
  },
  {
    category: "business",
    title: "The First 90 Days",
    author: "Michael Watkins",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 22.99,
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    stock: 24,
  },
  {
    category: "fiction",
    title: "1984",
    author: "George Orwell",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 13.99,
    imageSrc:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    stock: 38,
  },
  {
    category: "travel",
    title: "Blue Highways",
    author: "William Least Heat-Moon",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.25,
    imageSrc:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400",
    stock: 21,
  },
  {
    category: "food",
    title: "Animal, Vegetable, Miracle",
    author: "Barbara Kingsolver",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.99,
    imageSrc:
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400",
    stock: 26,
  },
  {
    category: "health",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 22.25,
    imageSrc:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
    stock: 20,
  },
  {
    category: "business",
    title: "Delivering Happiness",
    author: "Tony Hsieh",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 20.25,
    imageSrc:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    stock: 29,
  },
  {
    category: "fiction",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 11.99,
    imageSrc:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400",
    stock: 42,
  },
  {
    category: "travel",
    title: "The Tao of Travel",
    author: "Paul Theroux",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.75,
    imageSrc:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400",
    stock: 15,
  },
  {
    category: "food",
    title: "The Flavor Bible",
    author: "Karen Page",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 25.99,
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    stock: 14,
  },
  {
    category: "health",
    title: "The Stress-Proof Brain",
    author: "Melanie Greenberg",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.75,
    imageSrc:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    stock: 26,
  },
  {
    category: "business",
    title: "The Art of War",
    author: "Sun Tzu",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 14.99,
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    stock: 45,
  },
  {
    category: "fiction",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 13.5,
    imageSrc:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    stock: 30,
  },
  {
    category: "travel",
    title: "Neither Here nor There",
    author: "Bill Bryson",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.99,
    imageSrc:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
    stock: 26,
  },
  {
    category: "food",
    title: "Mastering the Art of French Cooking",
    author: "Julia Child",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 28.5,
    imageSrc: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
    stock: 20,
  },
  {
    category: "health",
    title: "Grit",
    author: "Angela Duckworth",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 19.5,
    imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    stock: 34,
  },
  {
    category: "business",
    title: "Blue Ocean Strategy",
    author: "W. Chan Kim",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 25.5,
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    stock: 21,
  },
  {
    category: "fiction",
    title: "Lord of the Flies",
    author: "William Golding",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 12.75,
    imageSrc: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    stock: 25,
  },
  {
    category: "travel",
    title: "The Old Patagonian Express",
    author: "Paul Theroux",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.25,
    imageSrc:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    stock: 18,
  },
  {
    category: "food",
    title: "The Bread Baker's Apprentice",
    author: "Peter Reinhart",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 23.75,
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    stock: 18,
  },
  {
    category: "health",
    title: "The Molecule of More",
    author: "Daniel Z. Lieberman",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.25,
    imageSrc:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400",
    stock: 23,
  },
  {
    category: "business",
    title: "The Lean Six Sigma Pocket Toolbook",
    author: "Michael L. George",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 28.75,
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    stock: 15,
  },
  {
    category: "fiction",
    title: "The Book Thief",
    author: "Markus Zusak",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 16.25,
    imageSrc:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    stock: 20,
  },
  {
    category: "travel",
    title: "Video Night in Kathmandu",
    author: "Pico Iyer",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.5,
    imageSrc:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    stock: 23,
  },
  {
    category: "food",
    title: "Flour Water Salt Yeast",
    author: "Ken Forkish",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 26.99,
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    stock: 13,
  },
  {
    category: "health",
    title: "Educated",
    author: "Tara Westover",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 20.99,
    imageSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    stock: 18,
  },
  {
    category: "business",
    title: "Never Eat Alone",
    author: "Keith Ferrazzi",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 18.5,
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    stock: 37,
  },
  {
    category: "fiction",
    title: "Brave New World",
    author: "Aldous Huxley",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 14.75,
    imageSrc: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400",
    stock: 33,
  },
  {
    category: "travel",
    title: "The Motorcycle Diaries",
    author: "Ernesto Che Guevara",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 15.75,
    imageSrc:
      "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=400",
    stock: 29,
  },
  {
    category: "food",
    title: "The Professional Chef",
    author: "The Culinary Institute of America",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 45.0,
    imageSrc: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400",
    stock: 8,
  },
  {
    category: "health",
    title: "The Gifts of Imperfection",
    author: "Brené Brown",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 17.99,
    imageSrc:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
    stock: 36,
  },
  {
    category: "business",
    title: "The Richest Man in Babylon",
    author: "George S. Clason",
    avgRating: 0,
    reviews: generateRandomReviews(),
    price: 15.25,
    imageSrc:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    stock: 50,
  },
];

// Calculate the average rating of the books
books.forEach((book) => {
  book.avgRating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;
});


async function seedBooks() {
  let client;
  try {
    console.log("🔗 Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    console.log("Connected to MongoDB successfully!");

    const db = client.db("bookstore");
    const collection = db.collection("books");

    console.log("Clearing existing books...");
    await collection.deleteMany({});

    console.log("Inserting 100 books...");
    const result = await collection.insertMany(books);

    console.log(`Successfully inserted ${result.insertedCount} books!`);
  } catch (error) {
    console.error("Error seeding books:", error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("Disconnected from MongoDB");
    }
  }
}

seedBooks();
