import type { AxisModel } from "@syncfusion/ej2-react-charts";
import {formatDate} from "~/lib/utils";

export const sidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 3,
    icon: "/assets/icons/users.svg",
    label: "All Users",
    href: "/all-users",
  },
  {
    id: 4,
    icon: "/assets/icons/itinerary.svg",
    label: "AI Trips",
    href: "/trips",
  },
];

export const chartOneData: object[] = [
  {
    x: "Jan",
    y1: 0.5,
    y2: 1.5,
    y3: 0.7,
  },
  {
    x: "Feb",
    y1: 0.8,
    y2: 1.2,
    y3: 0.9,
  },
  {
    x: "Mar",
    y1: 1.2,
    y2: 1.8,
    y3: 1.5,
  },
  {
    x: "Apr",
    y1: 1.5,
    y2: 2.0,
    y3: 1.8,
  },
  {
    x: "May",
    y1: 1.8,
    y2: 2.5,
    y3: 2.0,
  },
  {
    x: "Jun",
    y1: 2.0,
    y2: 2.8,
    y3: 2.5,
  },
];

export const travelStyles = [
  "Relaxed",
  "Luxury",
  "Adventure",
  "Cultural",
  "Nature & Outdoors",
  "City Exploration",
];

export const interests = [
  "Food & Culinary",
  "Historical Sites",
  "Hiking & Nature Walks",
  "Beaches & Water Activities",
  "Museums & Art",
  "Nightlife & Bars",
  "Photography Spots",
  "Shopping",
  "Local Experiences",
];

export const budgetOptions = ["Budget", "Mid-range", "Luxury", "Premium"];

export const groupTypes = ["Solo", "Couple", "Family", "Friends", "Business"];

export const footers = ["Terms & Condition", "Privacy Policy"];

export const selectItems = [
  "groupType",
  "travelStyle",
  "interest",
  "budget",
] as (keyof TripFormData)[];

export const comboBoxItems = {
  groupType: groupTypes,
  travelStyle: travelStyles,
  interest: interests,
  budget: budgetOptions,
} as Record<keyof TripFormData, string[]>;

export const userXAxis: AxisModel = { valueType: "Category", title: "Day" };
export const useryAxis: AxisModel = {
  minimum: 0,
  maximum: 10,
  interval: 2,
  title: "Count",
};

export const tripXAxis: AxisModel = {
  valueType: "Category",
  title: "Travel Styles",
  majorGridLines: { width: 0 },
};

export const tripyAxis: AxisModel = {
  minimum: 0,
  maximum: 10,
  interval: 2,
  title: "Count",
};

export const CONFETTI_SETTINGS = {
  particleCount: 200, // Number of confetti pieces
  spread: 60, // Spread of the confetti burst
  colors: ["#ff0", "#ff7f00", "#ff0044", "#4c94f4", "#f4f4f4"], // Confetti colors
  decay: 0.95, // Gravity decay of the confetti
};

export const LEFT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 45, // Direction of the confetti burst (90 degrees is top)
  origin: { x: 0, y: 1 }, // Center of the screen
};

export const RIGHT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 135,
  origin: { x: 1, y: 1 },
};

export const user = { name: 'Tushar Vashishtha'};
export const dashboardStats = {
  totalUsers: 12450,
  usersJoined: { currentMonth: 218, lastMonth: 176 },
  totalTrips: 3210,
  tripsCreated: { currentMonth: 150, lastMonth: 250},
  userRole: { total: 62, currentMonth: 25, lastMonth: 15},
}
export const allTrips = [
  {
    id: "1",
    name: "Ancient Ruins & Aegean Coast",
    description: "Immerse yourself in classical antiquity and sun-drenched coastlines. Explore ancient citadels, historic temples, and exquisite local culinary traditions.",
    duration: 5,
    budget: "Moderate",
    travelStyle: "Solo",
    country: "Greece",
    interests: "Adventure & Culture",
    groupType: "Solo",
    estimatedPrice: "$1,250",
    imageUrls: [
      "/assets/images/card-img-3.png",
      "/assets/images/card-img-1.png",
      "/assets/images/card-img-2.png",
    ],
    tags: ["Adventure", "Culture"],
    bestTimeToVisit: [
      "🌸 Spring (April to June): Mild temperatures and blooming wildflowers",
      "☀️ Summer (July to August): Vibrant nightlife and warm coastal waters",
      "🍁 Autumn (September to October): Peaceful ancient sites and pleasant swimming",
      "❄️ Winter (November to March): Quiet historical exploration with fewer crowds",
    ],
    weatherInfo: [
      "☀️ Summer: 28°C - 35°C (82°F - 95°F)",
      "🌦️ Spring: 18°C - 24°C (64°F - 75°F)",
      "🌧️ Autumn: 17°C - 23°C (63°F - 73°F)",
      "❄️ Winter: 10°C - 15°C (50°F - 59°F)",
    ],
    itinerary: [
      {
        day: 1,
        location: "Athens",
        activities: [
          { time: "Morning", description: "🏛️ Tour the Acropolis and the iconic Parthenon" },
          { time: "Afternoon", description: "🏺 Explore the world-class Acropolis Museum artifacts" },
          { time: "Evening", description: "🍷 Traditional Greek dinner in the historic Plaka district" },
        ],
      },
      {
        day: 2,
        location: "Delphi",
        activities: [
          { time: "Morning", description: "⛰️ Journey to Mount Parnassus and the sanctuary of Apollo" },
          { time: "Afternoon", description: "📜 Visit the archaeological museum of Delphi" },
          { time: "Evening", description: "🌅 Sunset views over the Gulf of Corinth" },
        ],
      },
      {
        day: 3,
        location: "Santorini",
        activities: [
          { time: "Morning", description: "⛵ Catamaran sailing along the volcanic caldera" },
          { time: "Afternoon", description: "🏖️ Relax on the black sand beaches of Kamari" },
          { time: "Evening", description: "🌇 World-famous sunset views in the cliffside village of Oia" },
        ],
      },
      {
        day: 4,
        location: "Mykonos",
        activities: [
          { time: "Morning", description: "💨 Stroll through Little Venice and iconic white windmills" },
          { time: "Afternoon", description: "🏊 Coastal swimming and water sports at Paradise Beach" },
          { time: "Evening", description: "🍽️ Fresh seafood dining overlooking the Aegean Sea" },
        ],
      },
      {
        day: 5,
        location: "Crete",
        activities: [
          { time: "Morning", description: "👑 Walk the Minoan Palace of Knossos" },
          { time: "Afternoon", description: "🌿 Trek through scenic olive groves and ancient gorges" },
          { time: "Evening", description: "🥂 Farewell dinner with local Cretan wine and music" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Venetian Gondola & Canal Discovery",
    description: "Glide through the floating city's serene waterways, admire Renaissance architecture, and savor artisanal Italian gelato along the Grand Canal.",
    duration: 4,
    budget: "Luxury",
    travelStyle: "Family",
    country: "Italy",
    interests: "Relaxation & Culinary",
    groupType: "Family",
    estimatedPrice: "$2,100",
    imageUrls: [
      "/assets/images/card-img-4.png",
      "/assets/images/card-img-5.png",
      "/assets/images/card-img-6.png",
    ],
    tags: ["Relaxation", "Culinary"],
    bestTimeToVisit: [
      "🌸 Spring (April to May): Crisp spring air and vibrant canal life",
      "☀️ Summer (June to August): Lively piazzas and outdoor concerts",
      "🍁 Autumn (September to October): Golden light and harvest food festivals",
      "❄️ Winter (November to February): Romantic mist and the famous Carnival",
    ],
    weatherInfo: [
      "☀️ Summer: 25°C - 30°C (77°F - 86°F)",
      "🌦️ Spring: 14°C - 20°C (57°F - 68°F)",
      "🌧️ Autumn: 13°C - 19°C (55°F - 66°F)",
      "❄️ Winter: 4°C - 9°C (39°F - 48°F)",
    ],
    itinerary: [
      {
        day: 1,
        location: "Venice",
        activities: [
          { time: "Morning", description: "🛶 Private gondola ride through historic quiet canals" },
          { time: "Afternoon", description: "⛪ Visit Saint Mark's Basilica and Doge's Palace" },
          { time: "Evening", description: "🍕 Artisanal pizza and pasta tasting by Rialto Bridge" },
        ],
      },
      {
        day: 2,
        location: "Murano & Burano",
        activities: [
          { time: "Morning", description: "🔥 Live glassblowing demonstration in Murano" },
          { time: "Afternoon", description: "🎨 Photography walk among colorful pastel houses in Burano" },
          { time: "Evening", description: "🍰 Espresso and traditional Venetian pastries" },
        ],
      },
      {
        day: 3,
        location: "Grand Canal",
        activities: [
          { time: "Morning", description: "🚤 Vaporetto cruise along Venetian palazzos" },
          { time: "Afternoon", description: "🖼️ Modern art at Peggy Guggenheim Collection" },
          { time: "Evening", description: "🎻 Classical Vivaldi concert in a historic church" },
        ],
      },
      {
        day: 4,
        location: "Lido Island",
        activities: [
          { time: "Morning", description: "🚲 Bike ride along the Adriatic coastline" },
          { time: "Afternoon", description: "🏖️ Seaside relaxation on golden sand beaches" },
          { time: "Evening", description: "🍷 Sunset aperitivo with scenic panoramic views" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Amalfi Coast & Positano Hideaway",
    description: "Perched atop dramatic cliffs, experience the glamour of Positano and Capri with panoramic Mediterranean views and world-class hospitality.",
    duration: 6,
    budget: "Luxury",
    travelStyle: "Couple",
    country: "Italy",
    interests: "Shopping & Luxury",
    groupType: "Couple",
    estimatedPrice: "$3,450",
    imageUrls: [
      "/assets/images/card-img-5.png",
      "/assets/images/card-img-6.png",
      "/assets/images/card-img-1.png",
    ],
    tags: ["Shopping", "Luxury"],
    bestTimeToVisit: [
      "🌸 Spring (May): Warm sunny days before peak tourist season",
      "☀️ Summer (June to August): High-energy beach clubs and boating",
      "🍁 Autumn (September to October): Warm waters and grape harvest",
      "❄️ Winter (November to March): Serene coastal quiet",
    ],
    weatherInfo: [
      "☀️ Summer: 27°C - 34°C (81°F - 93°F)",
      "🌦️ Spring: 18°C - 23°C (64°F - 73°F)",
      "🌧️ Autumn: 17°C - 22°C (63°F - 72°F)",
      "❄️ Winter: 9°C - 14°C (48°F - 57°F)",
    ],
    itinerary: [
      {
        day: 1,
        location: "Positano",
        activities: [
          { time: "Morning", description: "🏡 Check into cliffside villa with sweeping sea views" },
          { time: "Afternoon", description: "🛍️ Boutique shopping for handcrafted linen and ceramics" },
          { time: "Evening", description: "🍝 Candlelit dinner with homemade limoncello" },
        ],
      },
      {
        day: 2,
        location: "Capri",
        activities: [
          { time: "Morning", description: "🛥️ Private speedboat tour around the Faraglioni rocks" },
          { time: "Afternoon", description: "🌊 Swim into the mystical Blue Grotto" },
          { time: "Evening", description: "🍸 Cocktails in the bustling Capri town piazza" },
        ],
      },
      {
        day: 3,
        location: "Ravello",
        activities: [
          { time: "Morning", description: "🌺 Explore the breathtaking cliffside gardens of Villa Rufolo" },
          { time: "Afternoon", description: "🎼 Walk through the scenic terrace of infinity at Villa Cimbrone" },
          { time: "Evening", description: "🍷 Wine tasting at an organic coastal vineyard" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Kingdom of Siam Cultural Voyage",
    description: "Discover majestic gilded temples, floating markets, and tropical paradise in Southeast Asia's culinary and spiritual heartland.",
    duration: 5,
    budget: "Budget",
    travelStyle: "Friends",
    country: "Thailand",
    interests: "Historical & Culture",
    groupType: "Friends",
    estimatedPrice: "$980",
    imageUrls: [
      "/assets/images/card-img-6.png",
      "/assets/images/card-img-2.png",
      "/assets/images/card-img-3.png",
    ],
    tags: ["Historical", "Culture"],
    bestTimeToVisit: [
      "🌸 Cool Season (November to February): Ideal pleasant weather for touring",
      "☀️ Hot Season (March to May): Vibrant Songkran water festival celebrations",
      "🌧️ Green Season (June to October): Lush landscapes and lowest hotel rates",
    ],
    weatherInfo: [
      "☀️ Hot Season: 32°C - 38°C (90°F - 100°F)",
      "🌦️ Cool Season: 24°C - 30°C (75°F - 86°F)",
      "🌧️ Rainy Season: 26°C - 32°C (79°F - 90°F)",
    ],
    itinerary: [
      {
        day: 1,
        location: "Bangkok",
        activities: [
          { time: "Morning", description: "🛕 Marvel at the Temple of the Emerald Buddha and Grand Palace" },
          { time: "Afternoon", description: "🛶 Longtail boat tour along the historic Chao Phraya canals" },
          { time: "Evening", description: "🍲 Street food feast at Chinatown's vibrant Yaowarat Road" },
        ],
      },
      {
        day: 2,
        location: "Ayutthaya",
        activities: [
          { time: "Morning", description: "🚲 Cycling through UNESCO World Heritage temple ruins" },
          { time: "Afternoon", description: "🗿 View the iconic Buddha head entwined in banyan tree roots" },
          { time: "Evening", description: "🌅 Sunset river cruise watching illuminated riverbanks" },
        ],
      },
      {
        day: 3,
        location: "Chiang Mai",
        activities: [
          { time: "Morning", description: "🐘 Ethical rescue elephant sanctuary visit and river bath" },
          { time: "Afternoon", description: "⛰️ Hike up to Wat Phra That Doi Suthep mountain temple" },
          { time: "Evening", description: "🏮 Explore the lively Chiang Mai Sunday Night Market" },
        ],
      },
    ],
  },
];
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    imageUrl: "/assets/images/david.webp",
    dateJoined: formatDate("2025-01-01"),
    itineraryCreated: 10,
    status: "user",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    imageUrl: "/assets/images/david.webp",
    dateJoined: formatDate("2025-01-02"),
    itineraryCreated: 4,
    status: "user",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@example.com",
    imageUrl: "/assets/images/david.webp",
    dateJoined: formatDate("2025-01-03"),
    itineraryCreated: 8,
    status: "admin",
  },
];