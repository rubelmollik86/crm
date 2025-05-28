
// Initial data for the CRM system
export const initialClients = [
  {
    id: "client-1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    status: "active",
    notes: "Frequent traveler, prefers luxury accommodations",
    avatar: "JS",
    createdAt: "2023-01-15T10:30:00Z",
    lastContact: "2023-05-20T14:45:00Z"
  },
  {
    id: "client-2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Park Ave, Boston, MA 02108",
    status: "active",
    notes: "Interested in adventure tours, budget-conscious",
    avatar: "SJ",
    createdAt: "2023-02-10T09:15:00Z",
    lastContact: "2023-06-05T11:20:00Z"
  },
  {
    id: "client-3",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Oak St, San Francisco, CA 94102",
    status: "inactive",
    notes: "Prefers cultural experiences, speaks Mandarin",
    avatar: "MC",
    createdAt: "2023-03-05T16:45:00Z",
    lastContact: "2023-04-12T10:30:00Z"
  },
  {
    id: "client-4",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "+1 (555) 234-5678",
    address: "321 Elm St, Chicago, IL 60007",
    status: "active",
    notes: "Family traveler, needs child-friendly options",
    avatar: "ER",
    createdAt: "2023-01-20T13:10:00Z",
    lastContact: "2023-06-18T15:40:00Z"
  },
  {
    id: "client-5",
    name: "David Wilson",
    email: "d.wilson@example.com",
    phone: "+1 (555) 876-5432",
    address: "654 Pine St, Miami, FL 33101",
    status: "active",
    notes: "Business traveler, prefers direct flights",
    avatar: "DW",
    createdAt: "2023-02-28T08:20:00Z",
    lastContact: "2023-05-30T09:15:00Z"
  }
];

export const initialBookings = [
  {
    id: "booking-1",
    clientId: "client-1",
    destination: "Paris, France",
    startDate: "2023-07-15T00:00:00Z",
    endDate: "2023-07-22T00:00:00Z",
    status: "confirmed",
    totalAmount: 2450.00,
    paymentStatus: "paid",
    bookingType: "vacation",
    notes: "Eiffel Tower tour booked for July 17",
    createdAt: "2023-05-10T14:30:00Z"
  },
  {
    id: "booking-2",
    clientId: "client-2",
    destination: "Bali, Indonesia",
    startDate: "2023-08-05T00:00:00Z",
    endDate: "2023-08-15T00:00:00Z",
    status: "pending",
    totalAmount: 1850.00,
    paymentStatus: "partial",
    bookingType: "adventure",
    notes: "Volcano hiking tour requested",
    createdAt: "2023-06-01T10:15:00Z"
  },
  {
    id: "booking-3",
    clientId: "client-4",
    destination: "Orlando, Florida",
    startDate: "2023-09-10T00:00:00Z",
    endDate: "2023-09-17T00:00:00Z",
    status: "confirmed",
    totalAmount: 3200.00,
    paymentStatus: "paid",
    bookingType: "family",
    notes: "Theme park tickets included",
    createdAt: "2023-05-25T09:45:00Z"
  },
  {
    id: "booking-4",
    clientId: "client-5",
    destination: "Tokyo, Japan",
    startDate: "2023-10-05T00:00:00Z",
    endDate: "2023-10-12T00:00:00Z",
    status: "confirmed",
    totalAmount: 2800.00,
    paymentStatus: "paid",
    bookingType: "business",
    notes: "Business class flights booked",
    createdAt: "2023-06-15T16:20:00Z"
  },
  {
    id: "booking-5",
    clientId: "client-3",
    destination: "Rome, Italy",
    startDate: "2023-11-12T00:00:00Z",
    endDate: "2023-11-19T00:00:00Z",
    status: "pending",
    totalAmount: 2100.00,
    paymentStatus: "unpaid",
    bookingType: "cultural",
    notes: "Colosseum private tour requested",
    createdAt: "2023-06-20T11:30:00Z"
  }
];

export const initialDestinations = [
  {
    id: "dest-1",
    name: "Paris",
    country: "France",
    description: "The City of Light featuring iconic landmarks like the Eiffel Tower and Louvre Museum.",
    popularAttractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    bestTimeToVisit: "April to June, September to October",
    averageCost: "High",
    category: "Cultural",
    imageDescription: "Eiffel Tower with spring blossoms"
  },
  {
    id: "dest-2",
    name: "Bali",
    country: "Indonesia",
    description: "Tropical paradise with beautiful beaches, lush rice terraces, and spiritual temples.",
    popularAttractions: ["Ubud Monkey Forest", "Tanah Lot Temple", "Kuta Beach"],
    bestTimeToVisit: "April to October",
    averageCost: "Medium",
    category: "Beach",
    imageDescription: "Bali rice terraces at sunset"
  },
  {
    id: "dest-3",
    name: "Tokyo",
    country: "Japan",
    description: "Ultra-modern metropolis with a perfect blend of traditional culture and cutting-edge technology.",
    popularAttractions: ["Tokyo Skytree", "Shibuya Crossing", "Meiji Shrine"],
    bestTimeToVisit: "March to May, September to November",
    averageCost: "High",
    category: "Urban",
    imageDescription: "Tokyo skyline with Mount Fuji"
  },
  {
    id: "dest-4",
    name: "Rome",
    country: "Italy",
    description: "Eternal City with ancient ruins, Renaissance art, and delicious cuisine.",
    popularAttractions: ["Colosseum", "Vatican Museums", "Trevi Fountain"],
    bestTimeToVisit: "April to May, September to October",
    averageCost: "Medium",
    category: "Cultural",
    imageDescription: "Roman Colosseum at sunset"
  },
  {
    id: "dest-5",
    name: "Santorini",
    country: "Greece",
    description: "Stunning island with white-washed buildings, blue domes, and breathtaking sunsets.",
    popularAttractions: ["Oia Village", "Red Beach", "Ancient Thera"],
    bestTimeToVisit: "April to May, September to October",
    averageCost: "High",
    category: "Beach",
    imageDescription: "Santorini blue domes overlooking the sea"
  },
  {
    id: "dest-6",
    name: "New York City",
    country: "United States",
    description: "The Big Apple offering world-class shopping, dining, and iconic landmarks.",
    popularAttractions: ["Times Square", "Central Park", "Empire State Building"],
    bestTimeToVisit: "April to June, September to November",
    averageCost: "Very High",
    category: "Urban",
    imageDescription: "New York City skyline at night"
  }
];

// Helper function to generate a unique ID
export const generateId = (prefix) => {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Data storage and retrieval functions
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
    return false;
  }
};

export const getFromLocalStorage = (key, defaultValue) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving from localStorage: ${error}`);
    return defaultValue;
  }
};

// Initialize data if not already in localStorage
export const initializeData = () => {
  if (!getFromLocalStorage('clients', null)) {
    saveToLocalStorage('clients', initialClients);
  }
  
  if (!getFromLocalStorage('bookings', null)) {
    saveToLocalStorage('bookings', initialBookings);
  }
  
  if (!getFromLocalStorage('destinations', null)) {
    saveToLocalStorage('destinations', initialDestinations);
  }
};
