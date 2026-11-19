export interface ProfileInternal {
  id: string;
  name: string;
  age: number;
  gender: 'female' | 'male' | 'non-binary';
  photo: string;
  bio: string;
  college: string;
  city: string;
  interests: string[];
  hasLikedUser: boolean; // SERVER-SIDE ONLY: Never sent to client in /feed
}

export type ProfilePublic = Omit<ProfileInternal, 'hasLikedUser'>;

export const SEED_PROFILES: ProfileInternal[] = [
  {
    id: "prof_1",
    name: "Aanya Sharma",
    age: 21,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Design student who will judge your font choices. Chai over coffee, sunsets over sunrises.",
    college: "NID Ahmedabad",
    city: "Ahmedabad",
    interests: ["Typography", "Ceramics", "Indie Music", "Film Photography", "Chai"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_2",
    name: "Rohan Varma",
    age: 22,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "Computer Science nerd by day, indie guitarist by night. Currently building things that probably don't scale.",
    college: "IIT Bombay",
    city: "Mumbai",
    interests: ["Acoustic Guitar", "Open Source", "Filter Coffee", "Bouldering", "Sci-Fi"],
    hasLikedUser: false
  },
  {
    id: "prof_3",
    name: "Diya Patel",
    age: 20,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Architecture major. Probably sketching on a napkin somewhere in Bandra. Teach me how to surf?",
    college: "KRVIA Mumbai",
    city: "Mumbai",
    interests: ["Architecture", "Analog Cameras", "Matcha", "Art Galleries", "Tote Bags"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_4",
    name: "Kabir Mehta",
    age: 23,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Aspiring filmmaker. Can quote every Wes Anderson movie verbatim. Let's debate plot twists over tacos.",
    college: "Whistling Woods International",
    city: "Pune",
    interests: ["Cinema", "Screenwriting", "Vinyl Records", "Street Food", "Tennis"],
    hasLikedUser: false
  },
  {
    id: "prof_5",
    name: "Tara Sen",
    age: 22,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bio: "Literature & history nerd. If you love second-hand bookstores and rain, we'll get along just fine.",
    college: "St. Stephen's College",
    city: "Delhi",
    interests: ["Classic Lit", "Poetry", "Rainy Days", "Thrifting", "Jazz"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_6",
    name: "Aditya Nair",
    age: 21,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "Finance by degree, chef by passion. Best sourdough baker in Koramangala (self-certified).",
    college: "Christ University",
    city: "Bengaluru",
    interests: ["Sourdough", "Culinary Arts", "Basketball", "Podcasts", "Dog Lover"],
    hasLikedUser: false
  },
  {
    id: "prof_7",
    name: "Meera Krishnan",
    age: 21,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    bio: "Bioengineering researcher. Fluent in sarcasm, Taylor Swift lyrics, and obscure biology trivia.",
    college: "IISc Bangalore",
    city: "Bengaluru",
    interests: ["Biotech", "Taylor Swift", "Museums", "Badminton", "Pastries"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_8",
    name: "Arjun Singhal",
    age: 23,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    bio: "Product designer & amateur marathoner. Looking for someone who won't laugh when I trip over my own sneakers.",
    college: "IIT Delhi",
    city: "Delhi",
    interests: ["Running", "Figma", "EDM", "Ramen", "Startups"],
    hasLikedUser: false
  },
  {
    id: "prof_9",
    name: "Ananya Roy",
    age: 20,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    bio: "Psychology student trying to figure out why people ghost. Also I make top-tier Spotify playlists.",
    college: "Lady Shri Ram College",
    city: "Delhi",
    interests: ["Psychology", "Curated Playlists", "Coffee Tasting", "Cats", "Concerts"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_10",
    name: "Dev Malhotra",
    age: 22,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bio: "Mechanical engineering student. I build race cars for formula student and break things for fun.",
    college: "BITS Pilani",
    city: "Goa",
    interests: ["Motorsports", "Go-Karting", "Drone Racing", "EDM Festivals", "Fitness"],
    hasLikedUser: false
  },
  {
    id: "prof_11",
    name: "Zoya Alvi",
    age: 22,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    bio: "Fashion styling and creative direction. 90% of my wardrobe is black and thrifty.",
    college: "Pearl Academy",
    city: "Mumbai",
    interests: ["Vintage Fashion", "Editorial", "Dark Academia", "Sushi", "Travel"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_12",
    name: "Siddharth Bose",
    age: 24,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Economics research fellow. I like spontaneous weekend treks and long discussions about game theory.",
    college: "Ashoka University",
    city: "Sonipat",
    interests: ["Economics", "Trekking", "Chess", "Board Games", "Espresso"],
    hasLikedUser: false
  },
  {
    id: "prof_13",
    name: "Rhea Chawla",
    age: 21,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    bio: "Law student with a mild case of courtroom drama addiction. Send me your controversial hot takes.",
    college: "NLSIU Bengaluru",
    city: "Bengaluru",
    interests: ["Debate", "Legal Thrillers", "Late Night Drives", "Stand-Up Comedy", "Boba"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_14",
    name: "Kunal Deshmukh",
    age: 22,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=800&q=80",
    bio: "Data science nerd and amateur astronomer. Let's go stargazing away from city lights.",
    college: "COEP Pune",
    city: "Pune",
    interests: ["Astronomy", "Astrophotography", "Neural Networks", "Cycling", "Campfires"],
    hasLikedUser: false
  },
  {
    id: "prof_15",
    name: "Isha Sundaram",
    age: 20,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=800&q=80",
    bio: "Journalism student. Looking for good stories, eccentric coffee shops, and people who don't text back in one word.",
    college: "Symbiosis Institute of Media",
    city: "Pune",
    interests: ["Podcasts", "Investigative Journalism", "Documentaries", "Yoga", "Baking"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_16",
    name: "Nikhil Joshi",
    age: 23,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    bio: "Electronic music producer. Give me 3 words and I will produce a synth track out of it.",
    college: "NMIMS Mumbai",
    city: "Mumbai",
    interests: ["Synthesizers", "Sound Design", "DJing", "Streetwear", "Thai Food"],
    hasLikedUser: false
  },
  {
    id: "prof_17",
    name: "Pooja Reddy",
    age: 22,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bio: "Full-stack developer who loves clean code and dirty martinis. Tell me your favorite keyboard switch.",
    college: "IIIT Hyderabad",
    city: "Hyderabad",
    interests: ["Web Dev", "Mechanical Keyboards", "Gaming", "Biryani", "Anime"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_18",
    name: "Varun Kashyap",
    age: 23,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80",
    bio: "Civil engineer who loves rock climbing and concrete poetry. Yes, concrete poetry exists.",
    college: "IIT Madras",
    city: "Chennai",
    interests: ["Bouldering", "Structural Design", "Kayaking", "Coffee", "Classical Rock"],
    hasLikedUser: false
  },
  {
    id: "prof_19",
    name: "Shreya Mukherjee",
    age: 21,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=800&q=80",
    bio: "Kolkata native in Delhi. Bengali cinema buff, amateur watercolor painter, and avid believer in dessert first.",
    college: "Jadavpur University",
    city: "Kolkata",
    interests: ["Watercolors", "Satyajit Ray", "Rabindra Sangeet", "Art Cafes", "Desserts"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_20",
    name: "Yashvardhan Kulkarni",
    age: 24,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    bio: "MBA candidate with a penchant for startup memes, cold brew, and impulsive travel bookings.",
    college: "IIM Ahmedabad",
    city: "Ahmedabad",
    interests: ["Venture Capital", "Memes", "Squash", "Travel Vlogging", "Espresso"],
    hasLikedUser: false
  },
  {
    id: "prof_21",
    name: "Kavya Menon",
    age: 20,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80",
    bio: "Environmental science student. Save the corals, pet the street dogs, and don't forget to hydrate.",
    college: "St. Xavier's College",
    city: "Mumbai",
    interests: ["Marine Biology", "Scuba Diving", "Hiking", "Animal Rescue", "Plants"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_22",
    name: "Sameer Taneja",
    age: 22,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?auto=format&fit=crop&w=800&q=80",
    bio: "Stand-up comic and copywriter. I make fun of my own life before anyone else can.",
    college: "Delhi University",
    city: "Delhi",
    interests: ["Stand-Up", "Improv", "Podcasts", "Pizza", "Pop Culture"],
    hasLikedUser: false
  },
  {
    id: "prof_23",
    name: "Nandini Gupta",
    age: 22,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    bio: "Math major. If our conversation gets awkward, I will start calculating probabilities of random things.",
    college: "Miranda House",
    city: "Delhi",
    interests: ["Pure Math", "Sudoku", "Crochet", "Indie Pop", "Museum Hopping"],
    hasLikedUser: false
  },
  {
    id: "prof_24",
    name: "Gaurav Sen",
    age: 23,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "Architectural photographer. I spend hours waiting for the golden hour shadows to align properly.",
    college: "SPA Delhi",
    city: "Delhi",
    interests: ["Photography", "Brutalism", "Urban Sketching", "Filter Coffee", "Cycling"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_25",
    name: "Tanvi Kapoor",
    age: 21,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=800&q=80",
    bio: "Medical student running purely on caffeine and dreams of unbroken 8-hour sleep.",
    college: "AIIMS New Delhi",
    city: "Delhi",
    interests: ["Medicine", "Neuroscience", "Piano", "Baking Cookies", "Lofi Music"],
    hasLikedUser: false
  },
  {
    id: "prof_26",
    name: "Vikramaditya Rao",
    age: 23,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "Aerospace engineer. Yes, it IS rocket science, but talking to your crush is definitely harder.",
    college: "IIST Thiruvananthapuram",
    city: "Bengaluru",
    interests: ["Rockets", "Physics", "Aviation", "Board Games", "Swimming"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_27",
    name: "Simran Gill",
    age: 20,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Graphic novelist and digital artist. Show me your most ridiculous Spotify Wrapped and I won't judge.",
    college: "Srishti Institute of Art",
    city: "Bengaluru",
    interests: ["Illustration", "Comics", "K-Dramas", "Matcha Lattes", "Stickers"],
    hasLikedUser: false
  },
  {
    id: "prof_28",
    name: "Pranav Pillai",
    age: 22,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Culinary explorer and food blogger. On a mission to discover the crunchiest dosa in South India.",
    college: "Manipal Academy",
    city: "Manipal",
    interests: ["Street Food", "Food Photography", "Surfing", "Indie Rock", "Badminton"],
    hasLikedUser: false
  },
  {
    id: "prof_29",
    name: "Alisha Fernandes",
    age: 21,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Goa native studying marine conservation. Looking for a partner in crime for sunset beach volleyball.",
    college: "Goa University",
    city: "Panaji",
    interests: ["Beach Volleyball", "Marine Life", "Sunsets", "Acoustic Pop", "Pasta"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_30",
    name: "Dhruv Saxena",
    age: 23,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    bio: "Cybersecurity researcher and ethical hacker. Don't worry, your secrets are safe with me.",
    college: "IIT Roorkee",
    city: "Roorkee",
    interests: ["Cryptography", "CTF Challenges", "Cyberpunk", "Gym", "Heavy Metal"],
    hasLikedUser: false
  },
  {
    id: "prof_31",
    name: "Sneha Bharadwaj",
    age: 22,
    gender: "female",
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    bio: "Kathak dancer and theater actress. Life is too short to watch movies with bad dialogue.",
    college: "National School of Drama",
    city: "Delhi",
    interests: ["Classical Dance", "Theater", "Plays", "Poetry", "Street Plays"],
    hasLikedUser: true // Mutual match trigger!
  },
  {
    id: "prof_32",
    name: "Arman Qureshi",
    age: 24,
    gender: "male",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bio: "Architect & urban planner. Obsessed with pedestrian-friendly cities and good rooftop cafes.",
    college: "CEPT Ahmedabad",
    city: "Ahmedabad",
    interests: ["Urban Design", "Heritage Walks", "Coffee", "Sketching", "House Music"],
    hasLikedUser: false
  }
];
