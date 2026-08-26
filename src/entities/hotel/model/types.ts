export interface Room {
  id: string;
  category: "standard" | "deluxe" | "presidential" | "royal" | "villa";
  title: string;
  desc: string;
  priceUSD: number;
  sqm: number;
  guests: string;
  bed: string;
  floor: string;
  image: string;
  amenities: string[];
  badge: string;
  available: boolean;
}

export interface FleetItem {
  id: string;
  name: string;
  priceUSD: number;
  category: "sedan" | "suv" | "supercar" | "limo" | "armored";
  seats: string;
  engine: string;
  image: string;
  badge: string;
}

export interface FlightRoute {
  id: string;
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  classType: "private_jet" | "first_class" | "business" | "helicopter";
  priceUSD: number;
  duration: string;
  airline: string;
  image: string;
  badge: string;
}

export interface MenuItem {
  id: string;
  category: "breakfast" | "mains" | "seafood" | "desserts" | "drinks";
  title: string;
  desc: string;
  priceUSD: number;
  prepTime: string;
  image: string;
  badge: string;
}

export interface ClientUser {
  id: string;
  name: string;
  tier: "Diamond VIP" | "Royal Platinum" | "Gold Elite";
  room: string;
  spentUSD: number;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  status: "Joylashgan" | "Kutilmoqda" | "Tugallangan";
}

export interface AdminUser {
  id: string;
  name: string;
  role: string;
  email: string;
  access: "Super Admin" | "Menejer" | "Operator";
  lastActive: string;
}

export interface ChatMessage {
  id: string;
  sender: "client" | "admin" | "ai";
  senderName: string;
  text: string;
  time: string;
  isRead: boolean;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
}

export type BookingData = {
  room: { title: string };
  checkIn: string;
  checkOut: string;
  nights: number;
  guestName: string;
  guestPhone: string;
  guestCount: string;
  total: number;
};
