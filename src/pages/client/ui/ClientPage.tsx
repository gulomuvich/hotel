import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Container,
  Group,
  Stack,
  Title,
  Text,
  Button,
  Badge,
  Card,
  Image,
  Grid,
  Modal,
  Drawer,
  TextInput,
  Select,
  Checkbox,
  Table,
  ActionIcon,
  Tabs,
  Menu,
  SimpleGrid,
  Box,
  Paper,
  Avatar,
  SegmentedControl,
  ScrollArea,
  Switch,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconCrown,
  IconBed,
  IconCar,
  IconToolsKitchen2,
  IconUsers,
  IconGlobe,
  IconShoppingBag,
  IconCalendar,
  IconSearch,
  IconSparkles,
  IconShieldCheck,
  IconClock,
  IconTrash,
  IconStar,
  IconCheck,
  IconPrinter,
  IconQrcode,
  IconSend,
  IconUserPlus,
  IconIdBadge2,
  IconDiamond,
  IconRobot,
  IconWand,
  IconMenu2,
  IconSun,
  IconMoon,
  IconMicrophone,
  IconMicrophoneOff,
  IconPlane,
  IconCreditCard,
  IconPhone,
  IconMail,
  IconMapPin,
  IconVolume,
  IconPlayerStop,
} from "@tabler/icons-react";
import {
  calculateBookingTotal,
  calculateNights,
} from "../../../shared/lib/booking";
import { formatMoney as formatCurrency } from "../../../shared/lib/currency";
import {
  addDishToCart,
  calculateCartTotal,
  updateCartQuantity,
} from "../../../features/restaurant";
import type {
  AdminUser,
  CartItem,
  ChatMessage,
  ClientUser,
  FlightRoute,
  FleetItem,
  MenuItem,
  Room,
} from "../../../entities/hotel/model/types";

// ============================================================
// DATA — ROOMS (16 rooms)
// ============================================================
const ALL_ROOMS: Room[] = [
  // STANDARD (3)
  {
    id: "std-1",
    category: "standard",
    title: "Classic Comfort Room",
    desc: "Zamonaviy dizayn, yumshoq to'shaklar va bepul Wi-Fi bilan qulay xona.",
    priceUSD: 180,
    sqm: 32,
    guests: "2 Mehmon",
    bed: "Queen Bed",
    floor: "3-8 Qavat",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["Wi-Fi", "Mini Bar", "Smart TV", "Safe"],
    badge: "Iqtisodiy",
    available: true,
  },
  {
    id: "std-2",
    category: "standard",
    title: "Superior Garden View",
    desc: "Bog' manzarasi, yengiltirib bezatilgan interyeri va katta vanna bilan xona.",
    priceUSD: 240,
    sqm: 40,
    guests: "2 Mehmon",
    bed: "King Bed",
    floor: "5-10 Qavat",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    amenities: ["Bog' Manzarasi", "Hammom", "Wi-Fi", "Lounge"],
    badge: "Yangi",
    available: true,
  },
  {
    id: "std-3",
    category: "standard",
    title: "Premier City View Room",
    desc: "Shahar panoramasi, yozuv stoli va premium kofe mashinasi bilan biznes xona.",
    priceUSD: 290,
    sqm: 45,
    guests: "2 Mehmon",
    bed: "King Bed",
    floor: "10-15 Qavat",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    amenities: ["Shahar Manzarasi", "Nespresso", "Work Desk", "Ironing"],
    badge: "Biznes",
    available: true,
  },
  // DELUXE (4)
  {
    id: "dlx-1",
    category: "deluxe",
    title: "Deluxe King Ocean Suite",
    desc: "Qirollik karavoti, panoramik dengiz manzarasi va italyan marmaridan vanna.",
    priceUSD: 450,
    sqm: 65,
    guests: "2 Mehmon",
    bed: "1 King Bed",
    floor: "15-20 Qavat",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    amenities: ["Dengiz Manzarasi", "Smart Home", "Balkon", "Jacuzzi"],
    badge: "Mashhur",
    available: true,
  },
  {
    id: "dlx-2",
    category: "deluxe",
    title: "Executive Panoramic Suite",
    desc: "Shaxsiy ish kabineti, keng mehmonxona va to'liq bar bilan jihozlangan.",
    priceUSD: 580,
    sqm: 85,
    guests: "2 Mehmon",
    bed: "1 King Bed",
    floor: "18-22 Qavat",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    amenities: ["Panoramik Oyna", "Espresso Bar", "Sound System", "Butler"],
    badge: "Biznes VIP",
    available: true,
  },
  {
    id: "dlx-3",
    category: "deluxe",
    title: "Grand Azure Corner Suite",
    desc: "270° ko'rfaz manzarasi, xususiy jakuzi va mini-spa vanna xonasi.",
    priceUSD: 650,
    sqm: 95,
    guests: "2 Mehmon",
    bed: "1 Super King Bed",
    floor: "20-25 Qavat",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    amenities: ["270° Manzara", "Oltin Bezaklar", "Xususiy Bar", "Hermès"],
    badge: "Yangi Dizayn",
    available: true,
  },
  {
    id: "dlx-4",
    category: "deluxe",
    title: "Luxury Terrace Suite",
    desc: "90 m² shaxsiy ochiq terrasasi, hammom va sun lounger bilan jihozlangan.",
    priceUSD: 720,
    sqm: 110,
    guests: "3 Mehmon",
    bed: "King + Sofa",
    floor: "22-26 Qavat",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    amenities: ["Shaxsiy Terrace", "Outdoor Jacuzzi", "Day Bed", "Sea View"],
    badge: "Terrace VIP",
    available: true,
  },
  // PRESIDENTIAL (4)
  {
    id: "prs-1",
    category: "presidential",
    title: "Junior Presidential Suite",
    desc: "180 m² hashamat, shaxsiy kutish xonasi va maxsus oshpaz xizmati.",
    priceUSD: 950,
    sqm: 180,
    guests: "3 Mehmon",
    bed: "2 King Beds",
    floor: "25-28 Qavat",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    amenities: ["Shaxsiy Butler", "Maybach", "Keng Jacuzzi", "Lift"],
    badge: "Junior President",
    available: true,
  },
  {
    id: "prs-2",
    category: "presidential",
    title: "Grand Presidential Suite",
    desc: "Diplomatlar uchun 220 m² hashamat, shaxsiy majlis va xususiy oshpaz.",
    priceUSD: 1250,
    sqm: 220,
    guests: "4 Mehmon",
    bed: "2 King Beds",
    floor: "28-30 Qavat",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["Majlis Xonasi", "24/7 Butler", "Wine Cellar", "Sauna"],
    badge: "Grand President",
    available: true,
  },
  {
    id: "prs-3",
    category: "presidential",
    title: "Imperial Ambassador Suite",
    desc: "Oltin bezakli interyer, shaxsiy sharob podvali va 360° dengiz manzarasi.",
    priceUSD: 1600,
    sqm: 260,
    guests: "4 Mehmon",
    bed: "2 Master Suites",
    floor: "30-32 Qavat",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    amenities: [
      "360° View",
      "Sharob Zaxirasi",
      "Shaxsiy Sauna",
      "Heli Transfer",
    ],
    badge: "Imperial",
    available: true,
  },
  {
    id: "prs-4",
    category: "presidential",
    title: "Monarch Sovereign Suite",
    desc: "Monarxlar darajasidagi hashamat, xususiy kutubxona va diplomatik xavfsizlik.",
    priceUSD: 1950,
    sqm: 300,
    guests: "5 Mehmon",
    bed: "2 King + 1 Queen",
    floor: "32-34 Qavat",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    amenities: ["Shaxsiy Lift", "Armed Security", "Library", "Ballroom Access"],
    badge: "Monarx",
    available: false,
  },
  // ROYAL PENTHOUSE (3)
  {
    id: "rph-1",
    category: "royal",
    title: "Sky Penthouse 35th Floor",
    desc: "35-qavatda shaxsiy infinity hovuz va butun shaharni ko'ruvchi panoramik terassa.",
    priceUSD: 2200,
    sqm: 300,
    guests: "4 Mehmon",
    bed: "2 Master",
    floor: "35 Qavat",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    amenities: ["Infinity Pool", "Private Chef", "Gym", "Home Cinema"],
    badge: "Sky Penthouse",
    available: true,
  },
  {
    id: "rph-2",
    category: "royal",
    title: "Royal Crown Penthouse",
    desc: "Tomdagi shaxsiy infinity basseyn, grand piano va gelokopter maydonchasiga ega.",
    priceUSD: 2800,
    sqm: 380,
    guests: "6 Mehmon",
    bed: "3 Master Beds",
    floor: "38 Qavat",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    amenities: ["Rooftop Pool", "Grand Piano", "Helipad", "24/7 Chef"],
    badge: "Royal Crown",
    available: true,
  },
  {
    id: "rph-3",
    category: "royal",
    title: "Dynasty Palace Penthouse",
    desc: "Dunyodagi eng hashamatlilardan biri: 420 m², shaxsiy kinoteatr va 4 ta master bedroom.",
    priceUSD: 3400,
    sqm: 420,
    guests: "8 Mehmon",
    bed: "4 Master Suites",
    floor: "40 Qavat (Top)",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["Home Cinema", "Cryo Sauna", "Rolls-Royce", "VIP Security"],
    badge: "Ultra Elita",
    available: true,
  },
  // PRIVATE VILLA (2)
  {
    id: "vil-1",
    category: "villa",
    title: "Oceanfront Sovereign Villa",
    desc: "Shaxsiy plyaj, 25 metrli basseyn va tropik bog' ichidagi yakka villa.",
    priceUSD: 4200,
    sqm: 550,
    guests: "8 Mehmon",
    bed: "4 King Villas",
    floor: "Ground Level",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    amenities: ["Shaxsiy Plyaj", "25m Pool", "Yacht", "BBQ Pavilion"],
    badge: "Ocean Villa",
    available: true,
  },
  {
    id: "vil-2",
    category: "villa",
    title: "Royal Emerald Estate Villa",
    desc: "5 ta master-syuit, shaxsiy sport zali, pier va 2 ta basseynli grand estate.",
    priceUSD: 5500,
    sqm: 750,
    guests: "12 Mehmon",
    bed: "5 Master Villas",
    floor: "Private Estate",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    amenities: ["Shaxsiy Pier", "Spa Center", "Maybach Park", "Full Staff"],
    badge: "Grand Estate",
    available: true,
  },
];

// ============================================================
// DATA — FLEET (12 vehicles)
// ============================================================
const ALL_FLEET: FleetItem[] = [
  {
    id: "rr_phantom",
    name: "Rolls-Royce Phantom VIII",
    priceUSD: 450,
    category: "sedan",
    seats: "4",
    engine: "V12 6.75L Twin-Turbo 563HP",
    image:
      "https://images.unsplash.com/photo-1631295868223-63265840d001?w=600&q=80",
    badge: "Ultra VIP",
  },
  {
    id: "rr_cullinan",
    name: "Rolls-Royce Cullinan Black Badge",
    priceUSD: 520,
    category: "suv",
    seats: "5",
    engine: "V12 Twin-Turbo 592HP",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    badge: "Black Badge",
  },
  {
    id: "maybach_s680",
    name: "Mercedes-Maybach S680",
    priceUSD: 320,
    category: "sedan",
    seats: "4",
    engine: "V12 Bi-Turbo 4MATIC",
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&q=80",
    badge: "First Class",
  },
  {
    id: "bentley_fs",
    name: "Bentley Flying Spur Mulliner",
    priceUSD: 390,
    category: "sedan",
    seats: "4",
    engine: "W12 635HP",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    badge: "Gran Tourer",
  },
  {
    id: "lamborghini_urus",
    name: "Lamborghini Urus Mansory",
    priceUSD: 480,
    category: "supercar",
    seats: "4",
    engine: "4.0L V8 Twin-Turbo 650HP",
    image:
      "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=600&q=80",
    badge: "Super SUV",
  },
  {
    id: "aston_db12",
    name: "Aston Martin DB12",
    priceUSD: 420,
    category: "supercar",
    seats: "2",
    engine: "4.0L Twin-Turbo V8 680HP",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    badge: "British Icon",
  },
  {
    id: "porsche_taycan",
    name: "Porsche Taycan Turbo S",
    priceUSD: 280,
    category: "sedan",
    seats: "4",
    engine: "Electric 761HP 0-100 in 2.8s",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    badge: "Electric VIP",
  },
  {
    id: "range_rover_sv",
    name: "Range Rover SV Autobiography",
    priceUSD: 260,
    category: "suv",
    seats: "5",
    engine: "V8 530HP Dynamic",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    badge: "British SUV",
  },
  {
    id: "cadillac_esv",
    name: "Cadillac Escalade ESV Platinum",
    priceUSD: 290,
    category: "suv",
    seats: "7",
    engine: "6.2L V8 420HP",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
    badge: "VIP SUV",
  },
  {
    id: "bmw_armored",
    name: "BMW 7-Series Armored B7",
    priceUSD: 350,
    category: "armored",
    seats: "4",
    engine: "V8 Turbo + Armor Plating B6/B7",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    badge: "Armored",
  },
  {
    id: "limo_stretch",
    name: "Stretch Limousine Royal",
    priceUSD: 380,
    category: "limo",
    seats: "8-12",
    engine: "V8 Custom Stretch 9 metre",
    image:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80",
    badge: "Limuzin",
  },
  {
    id: "vclass_vip",
    name: "Mercedes V-Class VIP Edition",
    priceUSD: 200,
    category: "suv",
    seats: "6",
    engine: "2.0L Turbo Business Class Interior",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    badge: "Group VIP",
  },
];

// ============================================================
// DATA — FLIGHTS
// ============================================================
const ALL_FLIGHTS: FlightRoute[] = [
  {
    id: "fl-1",
    from: "Toshkent",
    to: "Dubai",
    fromCode: "TAS",
    toCode: "DXB",
    classType: "private_jet",
    priceUSD: 18500,
    duration: "3 soat 20 daq",
    airline: "Gulfstream G700 Private",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    badge: "Private Jet",
  },
  {
    id: "fl-2",
    from: "Toshkent",
    to: "London",
    fromCode: "TAS",
    toCode: "LHR",
    classType: "first_class",
    priceUSD: 4200,
    duration: "7 soat 45 daq",
    airline: "Emirates First Class A380",
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80",
    badge: "First Class",
  },
  {
    id: "fl-3",
    from: "Toshkent",
    to: "Paris",
    fromCode: "TAS",
    toCode: "CDG",
    classType: "business",
    priceUSD: 2800,
    duration: "6 soat 30 daq",
    airline: "Air France Business",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    badge: "Business Class",
  },
  {
    id: "fl-4",
    from: "Toshkent",
    to: "Istanbul",
    fromCode: "TAS",
    toCode: "IST",
    classType: "business",
    priceUSD: 1800,
    duration: "4 soat 10 daq",
    airline: "Turkish Airlines Business",
    image:
      "https://images.unsplash.com/photo-1569150216988-94d2c50c77d1?w=600&q=80",
    badge: "Business",
  },
  {
    id: "fl-5",
    from: "Toshkent",
    to: "New York",
    fromCode: "TAS",
    toCode: "JFK",
    classType: "private_jet",
    priceUSD: 42000,
    duration: "13 soat 30 daq",
    airline: "Bombardier Global 7500",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    badge: "Transatlantic Jet",
  },
  {
    id: "fl-6",
    from: "Toshkent",
    to: "Maldives",
    fromCode: "TAS",
    toCode: "MLE",
    classType: "first_class",
    priceUSD: 5600,
    duration: "8 soat 20 daq",
    airline: "Qatar Airways First Class",
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80",
    badge: "Jannat Yo'nalish",
  },
  {
    id: "fl-7",
    from: "Mehmonxona",
    to: "Aeroport",
    fromCode: "RGP",
    toCode: "TAS",
    classType: "helicopter",
    priceUSD: 1200,
    duration: "12 daqiqa",
    airline: "Bell 525 VIP Helicopter",
    image:
      "https://images.unsplash.com/photo-1608321936778-d8d3a54e5ef5?w=600&q=80",
    badge: "Gelikopter",
  },
  {
    id: "fl-8",
    from: "Toshkent",
    to: "Monaco",
    fromCode: "TAS",
    toCode: "MCM",
    classType: "private_jet",
    priceUSD: 28000,
    duration: "6 soat 50 daq",
    airline: "Falcon 8X Private Jet",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    badge: "Monaco VIP",
  },
];

// ============================================================
// DATA — MENU
// ============================================================
const ALL_MENU: MenuItem[] = [
  {
    id: "dish-1",
    category: "mains",
    title: "Royal Wagyu A5 Ribeye Steak",
    desc: "Miyazaki A5 Wagyu, qora tryufel sousi va oltin barg bilan.",
    priceUSD: 145,
    prepTime: "25 daq",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    badge: "Michelin ⭐",
  },
  {
    id: "dish-2",
    category: "seafood",
    title: "Imperial Beluga Caviar & Blinis",
    desc: "Kaspiy Beluga ikrasi, yangi blinilar va smetana.",
    priceUSD: 260,
    prepTime: "15 daq",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80",
    badge: "VIP Signature",
  },
  {
    id: "dish-3",
    category: "seafood",
    title: "Brittany Blue Lobster Thermidor",
    desc: "Fransuz ko'k omar, konyakli qaymoqli sous va Gruyer pishlog'i.",
    priceUSD: 180,
    prepTime: "30 daq",
    image:
      "https://images.unsplash.com/photo-1559737558-245cb343a41b?w=600&q=80",
    badge: "Chef Choice",
  },
  {
    id: "dish-4",
    category: "breakfast",
    title: "Imperial Truffle Omelette",
    desc: "Tabiiy tuxumlar, yangi qora tryufel va qora ikra bilan.",
    priceUSD: 65,
    prepTime: "20 daq",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
    badge: "Royal Breakfast",
  },
  {
    id: "dish-5",
    category: "desserts",
    title: "24K Gold Chocolate Sphere",
    desc: "Valrhona shokolad shar, vanil moussi va karamel sousi.",
    priceUSD: 55,
    prepTime: "15 daq",
    image:
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&q=80",
    badge: "24K Oltin",
  },
  {
    id: "dish-6",
    category: "drinks",
    title: "Dom Pérignon Vintage Champagne",
    desc: "Fransiyaning afsonaviy shampani, sovutilgan muzli qadahlarda.",
    priceUSD: 420,
    prepTime: "5 daq",
    image:
      "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=600&q=80",
    badge: "Vintage 2013",
  },
  {
    id: "dish-7",
    category: "mains",
    title: "Château Filet Mignon Rossini",
    desc: "Foie gras, qora tryufel va 50 yillik Madeira sousi bilan.",
    priceUSD: 165,
    prepTime: "25 daq",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
    badge: "Chef Special",
  },
  {
    id: "dish-8",
    category: "desserts",
    title: "Madagascar Vanilla Soufflé",
    desc: "Havo yengil issiq sufle, oltin qoplangan malina sorbeti bilan.",
    priceUSD: 45,
    prepTime: "20 daq",
    image:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=80",
    badge: "Klassik Gurme",
  },
  {
    id: "dish-9",
    category: "breakfast",
    title: "Royal Continental Breakfast Set",
    desc: "Crossan, fresh-squeeze sharbat, Camembert, olcha murabbo va kofe.",
    priceUSD: 35,
    prepTime: "10 daq",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80",
    badge: "Nonushta",
  },
  {
    id: "dish-10",
    category: "drinks",
    title: "Rare Macallan 30 Year Whisky",
    desc: "30 yillik Macallan single malt, kristal qadah va muz shari bilan.",
    priceUSD: 380,
    prepTime: "3 daq",
    image:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&q=80",
    badge: "Ultra Rare",
  },
];

// ============================================================
// INITIAL DATA
// ============================================================
const INIT_CLIENTS: ClientUser[] = [
  {
    id: "cl-1",
    name: "Lord Alexander Wright",
    tier: "Diamond VIP",
    room: "Presidential Suite 701",
    spentUSD: 14200,
    phone: "+44 7911 123456",
    email: "alexander@wright.co.uk",
    checkIn: "2026-08-22",
    checkOut: "2026-08-29",
    status: "Joylashgan",
  },
  {
    id: "cl-2",
    name: "Kenji Takahashi",
    tier: "Royal Platinum",
    room: "Villa 4 (Ocean Sovereign)",
    spentUSD: 28500,
    phone: "+81 90 1234 5678",
    email: "kenji@tokyovip.jp",
    checkIn: "2026-08-20",
    checkOut: "2026-08-30",
    status: "Joylashgan",
  },
  {
    id: "cl-3",
    name: "Sheikh Mansoor Al-Nahyan",
    tier: "Diamond VIP",
    room: "Royal Penthouse 901",
    spentUSD: 65000,
    phone: "+971 50 123 4567",
    email: "mansoor@royal.ae",
    checkIn: "2026-08-25",
    checkOut: "2026-09-05",
    status: "Kutilmoqda",
  },
  {
    id: "cl-4",
    name: "Princess Charlotte De Bourbon",
    tier: "Diamond VIP",
    room: "Emerald Estate Villa",
    spentUSD: 48000,
    phone: "+33 6 12 34 56 78",
    email: "charlotte@royal.fr",
    checkIn: "2026-08-26",
    checkOut: "2026-09-02",
    status: "Kutilmoqda",
  },
  {
    id: "cl-5",
    name: "Sardor Qosimov",
    tier: "Gold Elite",
    room: "Suite 504 (Deluxe)",
    spentUSD: 3600,
    phone: "+998 90 777 00 11",
    email: "sardor@uz.com",
    checkIn: "2026-08-23",
    checkOut: "2026-08-26",
    status: "Joylashgan",
  },
];

const INIT_ADMINS: AdminUser[] = [
  {
    id: "adm-1",
    name: "Jasur Karimov",
    role: "Bosh Menejer",
    email: "gm@royalgrand.com",
    access: "Super Admin",
    lastActive: "Hozir faol",
  },
  {
    id: "adm-2",
    name: "Madina Umarova",
    role: "VIP Concierge Lead",
    email: "concierge@royalgrand.com",
    access: "Menejer",
    lastActive: "5 daq oldin",
  },
  {
    id: "adm-3",
    name: "Alain Ducasse",
    role: "Oshxona Boshlig'i",
    email: "chef@royalgrand.com",
    access: "Menejer",
    lastActive: "12 daq oldin",
  },
];

const INIT_CHAT: ChatMessage[] = [
  {
    id: "m-1",
    sender: "client",
    senderName: "Lord Alexander (Suite 701)",
    text: "Assalomu alaykum! Xonamizga soat 20:00 da Dom Pérignon va Beluga ikra yetkazib bera olasizmi?",
    time: "18:40",
    isRead: true,
  },
  {
    id: "m-2",
    sender: "ai",
    senderName: "🤖 Royal AI Concierge",
    text: "Hurmatli Lord Alexander, so'rovingiz qabul qilindi! Bosh sommelye taomni aynan 20:00 da shaxsan topshiradi. Boshqa istaklar?",
    time: "18:41",
    isRead: true,
  },
  {
    id: "m-3",
    sender: "client",
    senderName: "Lord Alexander (Suite 701)",
    text: "Ertaga soat 09:00 ga aeroportga Rolls-Royce Phantom kerak.",
    time: "18:45",
    isRead: false,
  },
];

// ============================================================
// AI BRAIN ENGINE
// ============================================================
function generateAIResponse(text: string, lang: string): string {
  const t = text.toLowerCase();

  const responses: Record<string, Record<string, string>> = {
    uz: {
      food: "Hurmatli mehmonimiz! Gurme taomlar bo'yicha buyurtmangiz Mishelin oshxonamizga uzatildi. Bosh oshpazimiz 20-30 daqiqa ichida taomni kumush idishlarda xonangizga yetkazadi. Yoqimli ishtaha! 🥂🍽️",
      transport:
        "VIP Haydovchi xizmati tasdiqlandi. Litsenziyali haydovchimiz belgilangan vaqtda asosiy kirish darvozasida kutib oladi. Haydovchi: +998 90 333 44 55. Xavfsiz va hashamatli safar! 🚗👑",
      room: "Xona xizmati guruhiga darhol xabar berildi. Navbatchi butlerimiz 5 daqiqa ichida xonangiz qulayligini 100% ideal darajaga keltiradi. Sizning huzur-halovatingiz bizning eng oliy burchimizdir! ✨🛎️",
      flight:
        "Parvoz xizmati bo'yicha so'rovingiz aviakassa menejerimizga yuborildi. 15 daqiqa ichida sizga muqobil variantlar va narxlar taqdim etiladi. VIP transfer ham talab qilinsa — ixtiyorimizda! ✈️👑",
      spa: "Royal Spa & Wellness majmuasida siz uchun maxsus xususiy sauna va yoshartirish seansi bron qilindi. Bosh spa-terapevtimiz sizni kutmoqda. Sog'lik va xotirjamlik hamrohingiz bo'lsin! 🌿",
      pay: "To'lov tizimiga doir so'rovingiz qabul qilindi. Barcha mashhur kartalar (Visa, Mastercard, Amex) qabul qilinadi. Xavfsiz to'lov uchun kassaga murojaat qiling yoki chaqiring: +998 71 234 56 78. 💳",
      greet:
        "Assalomu alaykum, muhtaram VIP mehmonimiz! Royal Grand Palace AI Yordamchisiman. Xonalar, Michelin oshxonasi, VIP transfer, parvoz yoki maxsus talablaringiz bo'yicha yordam berishdan baxtiyorman! 👑",
      default:
        "Hurmatli mehmon! So'rovingiz Bosh Menejer va VIP Concierge stantsiyasiga yuborildi. Barcha talablaringiz zudlik bilan eng yuqori darajada bajariladi. Qo'shimcha savollar uchun har doim xizmatingizdamiz! 🌟",
    },
    en: {
      food: "Dear guest, your gourmet order has been forwarded to our Michelin kitchen. Our executive chef will deliver your meal on silver service within 20-30 minutes. Bon appétit! 🥂🍽️",
      transport:
        "VIP Chauffeur service confirmed. Your licensed driver will await you at the main entrance at the specified time. Driver contact: +998 90 333 44 55. Safe and luxurious journey! 🚗👑",
      room: "Housekeeping & Butler Service team has been immediately notified. Your butler will arrive within 5 minutes to ensure your room comfort is at 100%. Your well-being is our highest duty! ✨🛎️",
      flight:
        "Your flight inquiry has been forwarded to our aviation concierge. Alternative options and pricing will be presented within 15 minutes. VIP helicopter transfer also available! ✈️👑",
      spa: "A private sauna and rejuvenating treatment have been reserved for you at Royal Spa & Wellness. Our lead therapist awaits you. Health and serenity be with you! 🌿",
      pay: "Payment inquiry received. All major cards accepted (Visa, Mastercard, Amex). For secure payment contact reception or call: +998 71 234 56 78. 💳",
      greet:
        "Welcome, esteemed VIP guest! I am the Royal Grand Palace AI Concierge. I'm delighted to assist with rooms, Michelin dining, VIP transfer, flights, or any special requests! 👑",
      default:
        "Dear guest! Your request has been forwarded to the General Manager and VIP Concierge. All requirements will be fulfilled immediately at the highest level. Always at your service! 🌟",
    },
  };

  const r = responses[lang] || responses.uz;

  if (
    t.includes("taom") ||
    t.includes("ovqat") ||
    t.includes("steyk") ||
    t.includes("nonushta") ||
    t.includes("food") ||
    t.includes("breakfast") ||
    t.includes("dinner")
  )
    return r.food;
  if (
    t.includes("mashina") ||
    t.includes("haydovchi") ||
    t.includes("rolls") ||
    t.includes("transfer") ||
    t.includes("car") ||
    t.includes("driver") ||
    t.includes("airport")
  )
    return r.transport;
  if (
    t.includes("xona") ||
    t.includes("tozalash") ||
    t.includes("sochiq") ||
    t.includes("vanna") ||
    t.includes("room") ||
    t.includes("clean")
  )
    return r.room;
  if (
    t.includes("parvoz") ||
    t.includes("samolyot") ||
    t.includes("aviakassa") ||
    t.includes("gelikopter") ||
    t.includes("flight") ||
    t.includes("plane") ||
    t.includes("jet")
  )
    return r.flight;
  if (t.includes("spa") || t.includes("massaj") || t.includes("sauna"))
    return r.spa;
  if (
    t.includes("karta") ||
    t.includes("to'lov") ||
    t.includes("payment") ||
    t.includes("card") ||
    t.includes("pay")
  )
    return r.pay;
  if (
    t.includes("salom") ||
    t.includes("assalom") ||
    t.includes("hello") ||
    t.includes("hi ")
  )
    return r.greet;
  return r.default;
}

// ============================================================
// MAIN APP
// ============================================================
export default function ClientPage() {
  // Theme & Layout
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePortal, setActivePortal] = useState<"client" | "admin">(
    "client",
  );
  const [activeSection, setActiveSection] = useState("rooms");
  const [currency, setCurrency] = useState<"USD" | "UZS" | "EUR">("USD");
  const [lang, setLang] = useState<"uz" | "en" | "ru">("uz");

  // Data
  const [clients, setClients] = useState<ClientUser[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("rgp_clients") || "");
    } catch {
      return INIT_CLIENTS;
    }
  });
  const [admins, setAdmins] = useState<AdminUser[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("rgp_admins") || "");
    } catch {
      return INIT_ADMINS;
    }
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("rgp_chat") || "");
    } catch {
      return INIT_CHAT;
    }
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("rgp_cart") || "");
    } catch {
      return [];
    }
  });

  // Filters
  const [roomFilter, setRoomFilter] = useState("all");
  const [fleetFilter, setFleetFilter] = useState("all");
  const [menuFilter, setMenuFilter] = useState("all");
  const [flightFilter, setFlightFilter] = useState("all");
  const [clientSearch, setClientSearch] = useState("");

  // Modals
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pendingBookingData, setPendingBookingData] = useState<any>(null);
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [voucherData, setVoucherData] = useState<any>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [clientChatOpen, setClientChatOpen] = useState(false);
  const [flightModalOpen, setFlightModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightRoute | null>(
    null,
  );
  const [roomFoodModalOpen, setRoomFoodModalOpen] = useState(false);
  const [roomFoodTarget, setRoomFoodTarget] = useState<Room | null>(null);
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);

  // Booking form
  const [checkIn, setCheckIn] = useState("2026-08-25");
  const [checkOut, setCheckOut] = useState("2026-08-28");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [extraTransfer, setExtraTransfer] = useState(false);
  const [extraChampagne, setExtraChampagne] = useState(false);
  const [extraSpa, setExtraSpa] = useState(false);
  const [extraButler, setExtraButler] = useState(false);

  // Payment form
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardType, setCardType] = useState("visa");

  // Fleet
  const [chauffeurCar, setChauffeurCar] = useState("maybach_s680");
  const [chauffeurService, setChauffeurService] = useState("airport_vip");
  const [chauffeurPickup, setChauffeurPickup] = useState(
    "Royal Grand Palace Main Entrance",
  );
  const [chauffeurContact, setChauffeurContact] = useState("");

  // Add forms
  const [newClientName, setNewClientName] = useState("");
  const [newClientTier, setNewClientTier] =
    useState<ClientUser["tier"]>("Royal Platinum");
  const [newClientRoom, setNewClientRoom] = useState("Suite 602");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("VIP Concierge Lead");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminAccess, setNewAdminAccess] =
    useState<AdminUser["access"]>("Menejer");

  // Chat
  const [chatInput, setChatInput] = useState("");
  const [aiAutoReply, setAiAutoReply] = useState(true);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Voice AI
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Other
  const [roomNumber, setRoomNumber] = useState("");
  const [tableName, setTableName] = useState("");
  const [tableZone, setTableZone] = useState("terrace");
  const [flightPassenger, setFlightPassenger] = useState("");
  const [flightDate, setFlightDate] = useState("2026-08-26");

  // ---- EFFECTS ----
  useEffect(() => {
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("rgp_clients", JSON.stringify(clients));
  }, [clients]);
  useEffect(() => {
    localStorage.setItem("rgp_admins", JSON.stringify(admins));
  }, [admins]);
  useEffect(() => {
    localStorage.setItem("rgp_chat", JSON.stringify(chatMessages));
  }, [chatMessages]);
  useEffect(() => {
    localStorage.setItem("rgp_cart", JSON.stringify(cart));
  }, [cart]);

  // Auto-scroll chat
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAiTyping]);

  // ---- UTILS ----
  const formatMoney = (usd: number) => {
    return formatCurrency(usd, currency);
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const detectCardType = (num: string) => {
    const n = num.replace(/\s/g, "");
    if (n.startsWith("4")) return "visa";
    if (n.startsWith("5") || n.startsWith("2")) return "mastercard";
    if (n.startsWith("3")) return "amex";
    return "visa";
  };

  const calcNights = () => {
    return calculateNights(checkIn, checkOut);
  };

  const calcBookingTotal = () => {
    return calculateBookingTotal(selectedRoom, checkIn, checkOut, {
      transfer: extraTransfer,
      champagne: extraChampagne,
      spa: extraSpa,
      butler: extraButler,
    });
  };

  // ---- VOICE AI ----
  const startVoiceInput = useCallback(() => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) {
      notifications.show({
        title: "Xatolik",
        message:
          "Brauzeringiz ovozli kiritishni qo'llab-quvvatlamaydi. Chrome ishlatib ko'ring.",
        color: "red",
      });
      return;
    }
    const recognition = new SR();
    recognition.lang =
      lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      handleSendMessage("client", transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    notifications.show({
      title: "🎤 Tinglamoqda...",
      message: "Gapirishni boshlang. AI sizning savolingizni qabul qiladi.",
      color: "grape",
    });
  }, [lang]);

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speakText = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "ru" ? "ru-RU" : "en-US";
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [lang],
  );

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  // ---- CHAT ----
  const handleSendMessage = useCallback(
    (senderType: "client" | "admin", customText?: string) => {
      const text = (customText || chatInput).trim();
      if (!text) return;

      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const msg: ChatMessage = {
        id: "msg-" + Date.now(),
        sender: senderType,
        senderName:
          senderType === "client" ? "Mehmon (VIP Guest)" : "Admin Concierge",
        text,
        time,
        isRead: false,
      };
      setChatMessages((prev) => [...prev, msg]);
      if (!customText) setChatInput("");

      if (senderType === "client" && aiAutoReply) {
        setIsAiTyping(true);
        const delay = 900 + Math.random() * 600;
        setTimeout(() => {
          const aiText = generateAIResponse(text, lang);
          const aiMsg: ChatMessage = {
            id: "ai-" + Date.now(),
            sender: "ai",
            senderName: "🤖 Royal AI Concierge",
            text: aiText,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isRead: false,
          };
          setChatMessages((prev) => [...prev, aiMsg]);
          setIsAiTyping(false);
          speakText(aiText);
        }, delay);
      }
    },
    [chatInput, aiAutoReply, lang, speakText],
  );

  const handleAdminAiSuggest = () => {
    const last = [...chatMessages].reverse().find((m) => m.sender === "client");
    if (!last) {
      setChatInput(
        "Hurmatli VIP mehmonimiz, Royal Grand Palace xizmatingizga tayyor!",
      );
      return;
    }
    setChatInput("[AI Tavsiya]: " + generateAIResponse(last.text, lang));
    notifications.show({
      title: "🤖 AI Copilot",
      message: "Tavsiya kiritish maydoniga joylandi. Tahrirlab yuboring.",
      color: "grape",
    });
  };

  // ---- CART ----
  const addToCart = (dish: MenuItem) => {
    setCart((prev) => addDishToCart(prev, dish));
    notifications.show({
      title: "Savatga qo'shildi",
      message: dish.title,
      color: "gold",
    });
    setCartDrawerOpen(true);
  };

  const updateCart = (dishId: string, delta: number) => {
    setCart((prev) => updateCartQuantity(prev, dishId, delta));
  };

  const cartTotal = calculateCartTotal(cart);

  // ---- BOOKING ----
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;
    const total = calcBookingTotal();
    setPendingBookingData({
      room: selectedRoom,
      checkIn,
      checkOut,
      nights: calcNights(),
      guestName,
      guestPhone,
      guestCount,
      total,
    });
    setBookingModalOpen(false);
    setPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingBookingData) return;
    const code = "GP-" + Math.floor(10000 + Math.random() * 90000);
    const voucher = {
      ...pendingBookingData,
      code,
      totalPrice: formatMoney(pendingBookingData.total),
    };

    setClients((prev) => [
      {
        id: "cl-" + Date.now(),
        name: pendingBookingData.guestName,
        tier: "Royal Platinum" as const,
        room: pendingBookingData.room.title,
        spentUSD: pendingBookingData.total,
        phone: pendingBookingData.guestPhone,
        email: `${pendingBookingData.guestName.toLowerCase().replace(" ", ".")}@vip.com`,
        checkIn: pendingBookingData.checkIn,
        checkOut: pendingBookingData.checkOut,
        status: "Joylashgan" as const,
      },
      ...prev,
    ]);

    setVoucherData(voucher);
    setPaymentModalOpen(false);
    setVoucherModalOpen(true);
    notifications.show({
      title: "✅ To'lov Tasdiqlandi!",
      message: `Bron kodi: ${code}`,
      color: "teal",
    });
  };

  const handleFlightBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFlight) return;
    setPendingBookingData({
      room: { title: selectedFlight.from + " → " + selectedFlight.to },
      checkIn: flightDate,
      checkOut: flightDate,
      nights: 0,
      guestName: flightPassenger,
      guestPhone: chauffeurContact,
      guestCount: "1",
      total: selectedFlight.priceUSD,
    });
    setFlightModalOpen(false);
    setPaymentModalOpen(true);
  };

  // Filtered data
  const filtRooms =
    roomFilter === "all"
      ? ALL_ROOMS
      : ALL_ROOMS.filter((r) => r.category === roomFilter);
  const filtFleet =
    fleetFilter === "all"
      ? ALL_FLEET
      : ALL_FLEET.filter((f) => f.category === fleetFilter);
  const filtMenu =
    menuFilter === "all"
      ? ALL_MENU
      : ALL_MENU.filter((m) => m.category === menuFilter);
  const filtFlights =
    flightFilter === "all"
      ? ALL_FLIGHTS
      : ALL_FLIGHTS.filter((f) => f.classType === flightFilter);
  const filtClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.room.toLowerCase().includes(clientSearch.toLowerCase()),
  );

  // Sidebar nav items
  const navItems = [
    {
      id: "rooms",
      label: "Xonalar & Bronlash",
      icon: <IconBed size={20} />,
      section: "rooms",
    },
    {
      id: "restaurant",
      label: "Gurme Restoran",
      icon: <IconToolsKitchen2 size={20} />,
      section: "restaurant",
    },
    {
      id: "chauffeur",
      label: "VIP Transfer",
      icon: <IconCar size={20} />,
      section: "chauffeur",
    },
    {
      id: "flights",
      label: "Aviakassa & Parvozlar",
      icon: <IconPlane size={20} />,
      section: "flights",
    },
    {
      id: "chat",
      label: "AI Butler & Muloqot",
      icon: <IconRobot size={20} />,
      section: "chat",
    },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false);
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: darkMode ? "#080c14" : "#f5f0e8",
        color: darkMode ? "#f8fafc" : "#1a1208",
        position: "relative",
      }}
    >
      {darkMode && (
        <>
          <div className="ambient-glow glow-1" />
          <div className="ambient-glow glow-2" />
          <div className="ambient-glow glow-3" />
        </>
      )}

      {/* ============================
          SIDEBAR
          ============================ */}
      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Stack gap={0} pt="md">
          <Box px="lg" pb="md">
            <Group gap="sm">
              <Box
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--gold-gradient)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                }}
              >
                <IconCrown size={20} />
              </Box>
              <Text
                style={{
                  fontFamily: "Cinzel,serif",
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  color: "#d4af37",
                  letterSpacing: 1,
                }}
              >
                ROYAL GRAND
              </Text>
            </Group>
          </Box>
          <div className="sidebar-divider" />

          <div className="sidebar-section-label">Mehmon Xizmatlari</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => scrollTo(item.section)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="sidebar-divider" />
          <div className="sidebar-section-label">Boshqaruv</div>
          <button
            className={`sidebar-nav-item ${activePortal === "admin" ? "active" : ""}`}
            onClick={() => {
              setActivePortal("admin");
              setSidebarOpen(false);
            }}
          >
            <IconShieldCheck size={20} />
            <span>Admin & CRM Markazi</span>
          </button>

          <div className="sidebar-divider" />
          <div className="sidebar-section-label">Sozlamalar</div>
          <Box px="lg" py="sm">
            <Group justify="space-between">
              <Group gap="xs">
                {darkMode ? (
                  <IconMoon size={18} color="#d4af37" />
                ) : (
                  <IconSun size={18} color="#d4af37" />
                )}
                <Text size="sm" c="rgba(255,255,255,0.7)">
                  {darkMode ? "Dark Mode" : "Light Mode"}
                </Text>
              </Group>
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.currentTarget.checked)}
                color="gold"
                size="sm"
              />
            </Group>
          </Box>
        </Stack>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ============================
          HEADER
          ============================ */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: darkMode
            ? "rgba(8,12,20,0.96)"
            : "rgba(245,240,232,0.97)",
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid rgba(212,175,55,${darkMode ? "0.3" : "0.4"})`,
          padding: "0.75rem 1.5rem",
        }}
      >
        <Container size="xl" px={0}>
          <Group justify="space-between">
            <Group gap="md">
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ color: "#d4af37" }}
              >
                <IconMenu2 size={22} />
              </ActionIcon>
              <Group
                gap="sm"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActivePortal("client");
                  setActiveSection("rooms");
                }}
              >
                <Box
                  style={{
                    width: 40,
                    height: 40,
                    background: "var(--gold-gradient)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0b0f19",
                    boxShadow: "0 0 15px rgba(212,175,55,0.4)",
                  }}
                >
                  <IconCrown size={22} />
                </Box>
                <Stack gap={0}>
                  <Text
                    style={{
                      fontFamily: "Cinzel,serif",
                      fontWeight: 800,
                      letterSpacing: 2,
                      fontSize: "1.05rem",
                      lineHeight: 1.1,
                      color: darkMode ? "#f8fafc" : "#1a1208",
                    }}
                  >
                    ROYAL GRAND PALACE
                  </Text>
                  <Text
                    size="xs"
                    c="gold"
                    fw={700}
                    style={{ letterSpacing: 1.5 }}
                  >
                    ★★★★★ AI CONCIERGE RESORT
                  </Text>
                </Stack>
              </Group>
            </Group>

            <SegmentedControl
              value={activePortal}
              onChange={(v: any) => setActivePortal(v)}
              data={[
                { label: "👑 VIP Mehmon", value: "client" },
                { label: "🛡️ Admin & CRM", value: "admin" },
              ]}
              color={activePortal === "admin" ? "blue" : "gold"}
              radius="md"
              size="xs"
            />

            <Group gap="sm">
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={() => setDarkMode(!darkMode)}
                style={{ color: "#d4af37" }}
              >
                {darkMode ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>

              <Menu shadow="md" width={130}>
                <Menu.Target>
                  <Button
                    variant="default"
                    size="xs"
                    leftSection={<IconGlobe size={13} />}
                  >
                    {lang.toUpperCase()}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => setLang("uz")}>
                    🇺🇿 O'zbekcha
                  </Menu.Item>
                  <Menu.Item onClick={() => setLang("en")}>
                    🇬🇧 English
                  </Menu.Item>
                  <Menu.Item onClick={() => setLang("ru")}>
                    🇷🇺 Русский
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Menu shadow="md" width={130}>
                <Menu.Target>
                  <Button variant="default" size="xs">
                    {currency === "USD"
                      ? "$USD"
                      : currency === "UZS"
                        ? "UZS so'm"
                        : "€EUR"}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => setCurrency("USD")}>
                    $ USD
                  </Menu.Item>
                  <Menu.Item onClick={() => setCurrency("UZS")}>
                    UZS so'm
                  </Menu.Item>
                  <Menu.Item onClick={() => setCurrency("EUR")}>
                    € EUR
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {activePortal === "client" && (
                <ActionIcon
                  variant="filled"
                  color="dark"
                  size="lg"
                  onClick={() => setCartDrawerOpen(true)}
                  style={{
                    border: "1px solid rgba(212,175,55,0.4)",
                    position: "relative",
                  }}
                >
                  <IconShoppingBag size={19} color="#d4af37" />
                  {cart.length > 0 && (
                    <Badge
                      size="xs"
                      circle
                      color="red"
                      style={{ position: "absolute", top: -5, right: -5 }}
                    >
                      {cart.reduce((s, i) => s + i.quantity, 0)}
                    </Badge>
                  )}
                </ActionIcon>
              )}

              <Button
                className="btn-gold"
                size="xs"
                leftSection={<IconSparkles size={14} />}
                onClick={() => {
                  setSelectedRoom(ALL_ROOMS[0]);
                  setBookingModalOpen(true);
                }}
              >
                Xona Band Qilish
              </Button>
            </Group>
          </Group>
        </Container>
      </header>

      {/* ============================
          CLIENT VIEW
          ============================ */}
      {activePortal === "client" && (
        <Box>
          {/* HERO */}
          <Box className="hero-section">
            <Container
              size="lg"
              style={{ position: "relative", zIndex: 2, textAlign: "center" }}
            >
              <Badge
                size="lg"
                variant="outline"
                color="gold"
                leftSection={<IconRobot size={14} />}
                mb="lg"
                style={{ letterSpacing: 2, padding: "0.5rem 1.2rem" }}
              >
                ROYAL AI 24/7 AQLLI BUTLER BILAN JIQOZLANGAN
              </Badge>
              <Title
                style={{
                  fontSize: "clamp(2.2rem,5vw,4.2rem)",
                  lineHeight: 1.12,
                  textShadow: "0 4px 30px rgba(0,0,0,0.9)",
                }}
                mb="md"
                c="white"
              >
                ORZUYINGIZDAGI{" "}
                <span className="gold-gradient-text">ENG HASHAMATLI</span>{" "}
                MEHMONXONA
              </Title>
              <Text size="lg" c="gray.3" maw={760} mx="auto" mb="xl">
                16 ta lyuks xona, 12 ta premium avtomobil, 8 ta parvoz
                yo'nalishi, Michelin oshxona va 24/7 AI Butler.
              </Text>
              <Group justify="center" gap="md" mb="xl" wrap="wrap">
                <Button
                  size="md"
                  className="btn-gold"
                  leftSection={<IconBed size={18} />}
                  onClick={() => scrollTo("rooms")}
                >
                  Xonalarni Ko'rish
                </Button>
                <Button
                  size="md"
                  className="btn-outline-gold"
                  leftSection={<IconPlane size={18} />}
                  onClick={() => scrollTo("flights")}
                >
                  Aviakassa & Parvozlar
                </Button>
                <Button
                  size="md"
                  className="btn-outline-gold"
                  leftSection={<IconCar size={18} />}
                  onClick={() => scrollTo("chauffeur")}
                >
                  VIP Transfer
                </Button>
                <Button
                  size="md"
                  variant="default"
                  leftSection={<IconRobot size={18} color="#d4af37" />}
                  onClick={() => setClientChatOpen(true)}
                >
                  🎤 AI Butler Chat
                </Button>
              </Group>

              {/* Quick Search */}
              <Paper className="hero-search-box">
                <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} spacing="md">
                  <TextInput
                    label="Kelish Sanasi"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    leftSection={<IconCalendar size={15} />}
                  />
                  <TextInput
                    label="Ketish Sanasi"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    leftSection={<IconCalendar size={15} />}
                  />
                  <Select
                    label="Xona Toifasi"
                    value={roomFilter}
                    onChange={(v) => setRoomFilter(v || "all")}
                    data={[
                      { value: "all", label: "Barchasi" },
                      { value: "standard", label: "Standard" },
                      { value: "deluxe", label: "Deluxe" },
                      { value: "presidential", label: "Presidential" },
                      { value: "royal", label: "Royal Penthouse" },
                      { value: "villa", label: "Private Villa" },
                    ]}
                  />
                  <Select
                    label="Mehmonlar"
                    value={guestCount}
                    onChange={(v) => setGuestCount(v || "2")}
                    data={["1", "2", "3", "4", "5", "6+"].map((v) => ({
                      value: v,
                      label: v + " Kishi",
                    }))}
                  />
                  <Button
                    className="btn-gold"
                    style={{ alignSelf: "flex-end", height: 36 }}
                    leftSection={<IconSearch size={16} />}
                    onClick={() => scrollTo("rooms")}
                  >
                    Qidirish
                  </Button>
                </SimpleGrid>
              </Paper>
            </Container>
          </Box>

          {/* ROOMS SECTION */}
          <Box className="section-container" id="rooms">
            <Container size="xl">
              <Stack align="center" ta="center" mb="xl">
                <span className="section-tag">HASHAMAT VA QULAYLIK</span>
                <h2 className="section-title">
                  Qirollik Xonalari & Shaxsiy Villalar ({ALL_ROOMS.length} xona)
                </h2>
                <Text className="section-desc">
                  Smart-Home tizimi, to'liq panoramik dengiz manzarasi va 24/7
                  AI Butler xizmati.
                </Text>
                <Tabs
                  value={roomFilter}
                  onChange={(v) => setRoomFilter(v || "all")}
                  mt="sm"
                >
                  <Tabs.List>
                    <Tabs.Tab value="all">
                      Barchasi ({ALL_ROOMS.length})
                    </Tabs.Tab>
                    <Tabs.Tab value="standard">Standard</Tabs.Tab>
                    <Tabs.Tab value="deluxe">Deluxe</Tabs.Tab>
                    <Tabs.Tab value="presidential">Presidential</Tabs.Tab>
                    <Tabs.Tab value="royal">Royal Penthouse</Tabs.Tab>
                    <Tabs.Tab value="villa">Private Villa</Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
                {filtRooms.map((room) => (
                  <Card
                    key={room.id}
                    className="luxury-card"
                    padding="lg"
                    radius="lg"
                  >
                    <Card.Section
                      style={{
                        position: "relative",
                        height: 240,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={room.image}
                        alt={room.title}
                        h={240}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        fallbackSrc="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
                      />
                      <Badge
                        style={{ position: "absolute", top: 12, left: 12 }}
                        color={room.available ? "teal" : "red"}
                        variant="filled"
                        size="xs"
                      >
                        {room.available ? room.badge : "Band"}
                      </Badge>
                      {!room.available && (
                        <Box
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Badge color="red" size="xl">
                            BAND QILINGAN
                          </Badge>
                        </Box>
                      )}
                      <Box
                        style={{
                          position: "absolute",
                          bottom: 12,
                          right: 12,
                          background: "rgba(8,12,20,0.92)",
                          border: "1px solid rgba(212,175,55,0.5)",
                          padding: "0.35rem 0.75rem",
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          fw={800}
                          c="gold"
                          size="md"
                          span
                          style={{ fontFamily: "Cinzel,serif" }}
                        >
                          {formatMoney(room.priceUSD)}
                        </Text>
                        <Text size="xs" c="dimmed" span>
                          {" "}
                          /kecha
                        </Text>
                      </Box>
                    </Card.Section>
                    <Stack mt="sm" gap="xs">
                      <Group justify="space-between">
                        <Title order={3} size="h5">
                          {room.title}
                        </Title>
                        <Badge size="xs" color="dark" variant="light">
                          {room.floor}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed" lineClamp={2}>
                        {room.desc}
                      </Text>
                      <Group
                        gap="sm"
                        py="xs"
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <Text size="xs" c="gray.5">
                          {room.sqm} m²
                        </Text>
                        <Text size="xs" c="gray.5">
                          • {room.guests}
                        </Text>
                        <Text size="xs" c="gray.5">
                          • {room.bed}
                        </Text>
                      </Group>
                      <Group gap={5} py="xs">
                        {room.amenities.slice(0, 4).map((a, i) => (
                          <Badge key={i} size="xs" variant="dot" color="gold">
                            {a}
                          </Badge>
                        ))}
                      </Group>
                      <SimpleGrid cols={2} spacing="xs">
                        <Button
                          size="xs"
                          variant="outline"
                          color="gold"
                          leftSection={<IconToolsKitchen2 size={14} />}
                          onClick={() => {
                            setRoomFoodTarget(room);
                            setRoomFoodModalOpen(true);
                          }}
                        >
                          Taom Buyurtmasi
                        </Button>
                        <Button
                          size="xs"
                          className="btn-gold"
                          leftSection={<IconCheck size={14} />}
                          disabled={!room.available}
                          onClick={() => {
                            setSelectedRoom(room);
                            setBookingModalOpen(true);
                          }}
                        >
                          Band Qilish
                        </Button>
                      </SimpleGrid>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Container>
          </Box>

          {/* RESTAURANT */}
          <Box
            className="section-container"
            id="restaurant"
            style={{
              background: darkMode
                ? "rgba(15,22,38,0.4)"
                : "rgba(220,210,190,0.3)",
            }}
          >
            <Container size="xl">
              <Stack align="center" ta="center" mb="xl">
                <span className="section-tag">GURME OSHXONA & RESTORAN</span>
                <h2 className="section-title">Michelin Yulduzli Gurme Menyu</h2>
                <Group
                  justify="space-between"
                  w="100%"
                  p="md"
                  style={{
                    background: darkMode
                      ? "rgba(18,27,46,0.6)"
                      : "rgba(255,252,240,0.7)",
                    borderRadius: 14,
                  }}
                >
                  <Group gap="lg">
                    <Text size="sm">
                      <IconClock size={15} /> Yetkazish: 20-30 daq
                    </Text>
                    <Text size="sm">
                      <IconStar size={15} color="#d4af37" /> 3 Michelin Star
                    </Text>
                  </Group>
                  <Button
                    variant="outline"
                    color="gold"
                    size="sm"
                    onClick={() => setTableModalOpen(true)}
                  >
                    Restoranda Stol Band Qilish
                  </Button>
                </Group>
                <Tabs
                  value={menuFilter}
                  onChange={(v) => setMenuFilter(v || "all")}
                  mt="sm"
                >
                  <Tabs.List>
                    <Tabs.Tab value="all">Barchasi</Tabs.Tab>
                    <Tabs.Tab value="mains">Asosiy Taomlar</Tabs.Tab>
                    <Tabs.Tab value="seafood">Dengiz Mahsulotlari</Tabs.Tab>
                    <Tabs.Tab value="breakfast">Qirollik Nonushta</Tabs.Tab>
                    <Tabs.Tab value="desserts">Shirinliklar</Tabs.Tab>
                    <Tabs.Tab value="drinks">Vintage Ichimliklar</Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </Stack>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
                {filtMenu.map((dish) => (
                  <Card key={dish.id} className="luxury-card" padding="sm">
                    <Card.Section
                      style={{
                        position: "relative",
                        height: 185,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={dish.image}
                        h={185}
                        alt={dish.title}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        fallbackSrc="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
                      />
                      <Badge
                        style={{ position: "absolute", top: 10, left: 10 }}
                        color="gold"
                        variant="filled"
                        size="xs"
                      >
                        {dish.badge}
                      </Badge>
                    </Card.Section>
                    <Stack mt="xs" gap={4}>
                      <Group justify="space-between">
                        <Title
                          order={5}
                          size="xs"
                          lineClamp={1}
                          style={{ flex: 1, marginRight: 8 }}
                        >
                          {dish.title}
                        </Title>
                        <Text
                          fw={800}
                          c="gold"
                          size="xs"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {formatMoney(dish.priceUSD)}
                        </Text>
                      </Group>
                      <Text size="xs" c="dimmed" lineClamp={2}>
                        {dish.desc}
                      </Text>
                      <Group gap="xs">
                        <Text size="xs" c="dimmed">
                          <IconClock size={11} /> {dish.prepTime}
                        </Text>
                      </Group>
                      <Button
                        size="xs"
                        className="btn-gold"
                        mt="xs"
                        onClick={() => addToCart(dish)}
                      >
                        Savatga Qo'shish
                      </Button>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Container>
          </Box>

          {/* CHAUFFEUR & FLEET */}
          <Box className="section-container" id="chauffeur">
            <Container size="xl">
              <Stack align="center" ta="center" mb="xl">
                <span className="section-tag">PREMIUM VIP TRANSFER</span>
                <h2 className="section-title">
                  Hashamatli Avtopark & VIP Haydovchi ({ALL_FLEET.length}{" "}
                  avtomobil)
                </h2>
                <Text className="section-desc">
                  Rolls-Royce, Maybach, Bentley, Lamborghini, Aston Martin va
                  ko'plab hashamatli avtomobillar.
                </Text>
                <Tabs
                  value={fleetFilter}
                  onChange={(v) => setFleetFilter(v || "all")}
                  mt="sm"
                >
                  <Tabs.List>
                    <Tabs.Tab value="all">
                      Barchasi ({ALL_FLEET.length})
                    </Tabs.Tab>
                    <Tabs.Tab value="sedan">Sedan VIP</Tabs.Tab>
                    <Tabs.Tab value="suv">SUV Premium</Tabs.Tab>
                    <Tabs.Tab value="supercar">Supercar</Tabs.Tab>
                    <Tabs.Tab value="armored">Armored</Tabs.Tab>
                    <Tabs.Tab value="limo">Limuzin</Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </Stack>

              <Grid>
                <Grid.Col span={{ base: 12, lg: 8 }}>
                  <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                    {filtFleet.map((car) => (
                      <Card key={car.id} className="luxury-card" padding="sm">
                        <Card.Section
                          style={{
                            position: "relative",
                            height: 155,
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src={car.image}
                            h={155}
                            alt={car.name}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                            fallbackSrc="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80"
                          />
                          <Badge
                            style={{ position: "absolute", top: 8, right: 8 }}
                            color="gold"
                            variant="filled"
                            size="xs"
                          >
                            {formatMoney(car.priceUSD)}/kun
                          </Badge>
                          <Badge
                            style={{ position: "absolute", top: 8, left: 8 }}
                            color="dark"
                            variant="filled"
                            size="xs"
                          >
                            {car.badge}
                          </Badge>
                        </Card.Section>
                        <Stack gap={3} mt="xs">
                          <Title order={6} size="xs" lineClamp={1}>
                            {car.name}
                          </Title>
                          <Text size="xs" c="dimmed" lineClamp={1}>
                            {car.seats} o'rin • {car.engine}
                          </Text>
                          <Button
                            size="compact-xs"
                            variant="outline"
                            color="gold"
                            mt={4}
                            onClick={() => {
                              setChauffeurCar(car.id);
                              notifications.show({
                                title: "Avtomobil tanlandi",
                                message: car.name,
                                color: "gold",
                              });
                            }}
                          >
                            Tanlash
                          </Button>
                        </Stack>
                      </Card>
                    ))}
                  </SimpleGrid>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 4 }}>
                  <Paper
                    className="luxury-card"
                    p="xl"
                    style={{ border: "1px solid rgba(212,175,55,0.4)" }}
                  >
                    <Group gap="sm" mb="lg">
                      <Box
                        style={{
                          width: 42,
                          height: 42,
                          background: "var(--gold-gradient)",
                          borderRadius: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#000",
                        }}
                      >
                        <IconCar size={22} />
                      </Box>
                      <Stack gap={0}>
                        <Title order={4} size="h5">
                          VIP Haydovchi Chaqirish
                        </Title>
                        <Text size="xs" c="dimmed">
                          24/7 diplomatik haydovchilar
                        </Text>
                      </Stack>
                    </Group>
                    <Stack gap="sm">
                      <Select
                        label="Avtomobil"
                        value={chauffeurCar}
                        onChange={(v) => setChauffeurCar(v || "maybach_s680")}
                        data={ALL_FLEET.map((f) => ({
                          value: f.id,
                          label: `${f.name} (${formatMoney(f.priceUSD)}/kun)`,
                        }))}
                      />
                      <Select
                        label="Xizmat Turi"
                        value={chauffeurService}
                        onChange={(v) =>
                          setChauffeurService(v || "airport_vip")
                        }
                        data={[
                          {
                            value: "airport_vip",
                            label: "VIP Aeroport Transferi",
                          },
                          {
                            value: "hourly",
                            label: "Soatbay xizmat (4+ soat)",
                          },
                          { value: "full_day", label: "To'liq kun (24 soat)" },
                          { value: "intercity", label: "Shaharlararo VIP" },
                          { value: "wedding", label: "To'y marosimi VIP" },
                        ]}
                      />
                      <TextInput
                        label="Olish Manzili"
                        value={chauffeurPickup}
                        onChange={(e) => setChauffeurPickup(e.target.value)}
                        leftSection={<IconMapPin size={14} />}
                      />
                      <TextInput
                        label="Telefon Raqam"
                        value={chauffeurContact}
                        onChange={(e) => setChauffeurContact(e.target.value)}
                        leftSection={<IconPhone size={14} />}
                        placeholder="+998 90 123 45 67"
                      />
                      <Button
                        className="btn-gold"
                        size="md"
                        onClick={() => {
                          if (!chauffeurContact) return;
                          notifications.show({
                            title: "VIP Transfer Tasdiqlandi ✅",
                            message: "Haydovchi siz bilan bog'lanadi.",
                            color: "gold",
                          });
                          setChauffeurContact("");
                        }}
                      >
                        Haydovchini Band Qilish
                      </Button>
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Container>
          </Box>

          {/* FLIGHTS */}
          <Box
            className="section-container"
            id="flights"
            style={{
              background: darkMode
                ? "rgba(10,15,28,0.6)"
                : "rgba(220,210,190,0.3)",
            }}
          >
            <Container size="xl">
              <Stack align="center" ta="center" mb="xl">
                <span className="section-tag">AVIAKASSA & PARVOZ XIZMATI</span>
                <h2 className="section-title">
                  Private Jet, Business Class & Gelikopter ({ALL_FLIGHTS.length}{" "}
                  yo'nalish)
                </h2>
                <Text className="section-desc">
                  Dunyoning istalgan nuqtasiga Private Jet, Emirates First
                  Class, Gelikopter yoki Business Class bilan hashamatli parvoz.
                </Text>
                <Tabs
                  value={flightFilter}
                  onChange={(v) => setFlightFilter(v || "all")}
                  mt="sm"
                >
                  <Tabs.List>
                    <Tabs.Tab value="all">Barchasi</Tabs.Tab>
                    <Tabs.Tab value="private_jet">✈️ Private Jet</Tabs.Tab>
                    <Tabs.Tab value="first_class">💎 First Class</Tabs.Tab>
                    <Tabs.Tab value="business">🏢 Business</Tabs.Tab>
                    <Tabs.Tab value="helicopter">🚁 Gelikopter</Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </Stack>
              <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="lg">
                {filtFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="flight-card"
                    onClick={() => {
                      setSelectedFlight(flight);
                      setFlightModalOpen(true);
                    }}
                  >
                    <Box
                      style={{
                        position: "relative",
                        height: 150,
                        borderRadius: 12,
                        overflow: "hidden",
                        marginBottom: 14,
                      }}
                    >
                      <Image
                        src={flight.image}
                        h={150}
                        alt={flight.to}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        fallbackSrc="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80"
                      />
                      <Box
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                        }}
                      />
                      <Badge
                        style={{ position: "absolute", top: 10, left: 10 }}
                        color={
                          flight.classType === "private_jet"
                            ? "gold"
                            : flight.classType === "first_class"
                              ? "grape"
                              : flight.classType === "helicopter"
                                ? "teal"
                                : "blue"
                        }
                        variant="filled"
                        size="xs"
                      >
                        {flight.badge}
                      </Badge>
                    </Box>
                    <Group justify="space-between" mb="xs">
                      <Group gap="xs">
                        <Stack gap={0}>
                          <Text fw={800} size="sm">
                            {flight.fromCode}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {flight.from}
                          </Text>
                        </Stack>
                        <IconPlane size={16} color="#d4af37" />
                        <Stack gap={0}>
                          <Text fw={800} size="sm">
                            {flight.toCode}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {flight.to}
                          </Text>
                        </Stack>
                      </Group>
                      <Stack gap={0} ta="right">
                        <Text fw={800} size="sm" c="gold">
                          {formatMoney(flight.priceUSD)}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {flight.duration}
                        </Text>
                      </Stack>
                    </Group>
                    <Text size="xs" c="dimmed" lineClamp={1}>
                      {flight.airline}
                    </Text>
                    <Button
                      size="xs"
                      className="btn-gold"
                      fullWidth
                      mt="sm"
                      leftSection={<IconPlane size={13} />}
                    >
                      Band Qilish
                    </Button>
                  </div>
                ))}
              </SimpleGrid>
            </Container>
          </Box>

          {/* FLOATING CHAT BUTTON */}
          <Box
            style={{ position: "fixed", bottom: 28, right: 28, zIndex: 1000 }}
          >
            <Stack gap="xs" align="flex-end">
              {isSpeaking && (
                <Button
                  size="xs"
                  color="red"
                  radius="xl"
                  leftSection={<IconPlayerStop size={14} />}
                  onClick={stopSpeaking}
                >
                  AI'ni Tinchitish
                </Button>
              )}
              <Button
                className="btn-gold"
                size="md"
                radius="xl"
                leftSection={<IconRobot size={20} />}
                onClick={() => setClientChatOpen(true)}
                style={{ boxShadow: "0 8px 30px rgba(212,175,55,0.5)" }}
              >
                🎤 AI Butler & Chat
                {chatMessages.filter((m) => !m.isRead && m.sender !== "client")
                  .length > 0 && (
                  <Badge size="xs" circle color="red" ml="xs">
                    {
                      chatMessages.filter(
                        (m) => !m.isRead && m.sender !== "client",
                      ).length
                    }
                  </Badge>
                )}
              </Button>
            </Stack>
          </Box>
        </Box>
      )}

      {/* ============================
          ADMIN VIEW
          ============================ */}
      {activePortal === "admin" && (
        <Box py="xl">
          <Container size="xl">
            <Group
              justify="space-between"
              mb="xl"
              p="lg"
              style={{
                background: darkMode
                  ? "rgba(18,27,46,0.85)"
                  : "rgba(255,252,240,0.85)",
                borderRadius: 16,
                border: "1px solid rgba(56,189,248,0.3)",
              }}
            >
              <Stack gap={2}>
                <Group gap="xs">
                  <Badge
                    color="blue"
                    size="md"
                    leftSection={<IconShieldCheck size={14} />}
                  >
                    ADMIN & CRM OPERATSIYALAR MARKAZI
                  </Badge>
                  <Badge color="teal" variant="dot">
                    AI Jonli Faol
                  </Badge>
                </Group>
                <Title
                  order={2}
                  size="h3"
                  style={{ fontFamily: "Cinzel,serif" }}
                >
                  Mehmonxona Boshqaruvi & AI Muloqot Markazi
                </Title>
              </Stack>
              <Group>
                <Button
                  className="btn-gold"
                  size="sm"
                  leftSection={<IconUserPlus size={14} />}
                  onClick={() => setAddClientModalOpen(true)}
                >
                  Yangi VIP Mijoz
                </Button>
                <Button
                  variant="outline"
                  color="blue"
                  size="sm"
                  leftSection={<IconIdBadge2 size={14} />}
                  onClick={() => setAddAdminModalOpen(true)}
                >
                  Yangi Admin
                </Button>
              </Group>
            </Group>

            <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md" mb="xl">
              {[
                {
                  label: "Faol VIP Mijozlar",
                  value: `${clients.length} nafar`,
                  color: "rgba(212,175,55,0.3)",
                  icon: <IconUsers size={28} color="#d4af37" />,
                  sub: "+3 yangi",
                },
                {
                  label: "Jami Tushum",
                  value: formatMoney(
                    clients.reduce((s, c) => s + c.spentUSD, 0),
                  ),
                  color: "rgba(56,189,248,0.3)",
                  icon: <IconDiamond size={28} color="#38bdf8" />,
                  sub: "Bu oy",
                },
                {
                  label: "Adminlar",
                  value: `${admins.length} nafar`,
                  color: "rgba(16,185,129,0.3)",
                  icon: <IconShieldCheck size={28} color="#10b981" />,
                  sub: "Barcha faol",
                },
                {
                  label: "Chat Xabarlari",
                  value: `${chatMessages.length} ta`,
                  color: "rgba(168,85,247,0.3)",
                  icon: <IconRobot size={28} color="#a855f7" />,
                  sub: "AI: Yoqilgan",
                },
              ].map((card, i) => (
                <Card
                  key={i}
                  p="md"
                  style={{
                    background: darkMode
                      ? "rgba(8,12,20,0.8)"
                      : "rgba(255,252,240,0.9)",
                    border: `1px solid ${card.color}`,
                    borderRadius: 14,
                  }}
                >
                  <Group justify="space-between">
                    <Stack gap={0}>
                      <Text size="xs" c="dimmed">
                        {card.label}
                      </Text>
                      <Title
                        order={3}
                        c={
                          i === 0
                            ? "gold"
                            : i === 1
                              ? "blue"
                              : i === 2
                                ? "teal"
                                : "grape"
                        }
                        style={{
                          fontFamily: "Cinzel,serif",
                          fontSize: "1.1rem",
                        }}
                      >
                        {card.value}
                      </Title>
                      <Text size="xs" c="teal">
                        {card.sub}
                      </Text>
                    </Stack>
                    {card.icon}
                  </Group>
                </Card>
              ))}
            </SimpleGrid>

            <Grid>
              <Grid.Col span={{ base: 12, lg: 7 }}>
                <Paper className="luxury-card" p="lg" mb="xl">
                  <Group justify="space-between" mb="md">
                    <Stack gap={0}>
                      <Title order={4} size="h5" c="gold">
                        VIP Mijozlar CRM Bazasi
                      </Title>
                      <Text size="xs" c="dimmed">
                        Barcha VIP mehmonlar, xonalari va balansi
                      </Text>
                    </Stack>
                    <Button
                      size="xs"
                      className="btn-gold"
                      leftSection={<IconUserPlus size={13} />}
                      onClick={() => setAddClientModalOpen(true)}
                    >
                      Qo'shish
                    </Button>
                  </Group>
                  <TextInput
                    placeholder="Ism yoki xona bo'yicha qidirish..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    leftSection={<IconSearch size={14} />}
                    mb="md"
                  />
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Mehmon</Table.Th>
                        <Table.Th>Xona & Tier</Table.Th>
                        <Table.Th>Sarf</Table.Th>
                        <Table.Th>Holat</Table.Th>
                        <Table.Th></Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {filtClients.map((cl) => (
                        <Table.Tr key={cl.id}>
                          <Table.Td>
                            <Group gap="xs">
                              <Avatar color="gold" radius="xl" size="sm">
                                {cl.name.charAt(0)}
                              </Avatar>
                              <Stack gap={0}>
                                <Text size="xs" fw={700}>
                                  {cl.name}
                                </Text>
                                <Text size="xs" c="dimmed">
                                  {cl.phone}
                                </Text>
                              </Stack>
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <Text size="xs">{cl.room}</Text>
                            <Badge size="xs" color="gold" variant="light">
                              {cl.tier}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="xs" fw={800} c="gold">
                              {formatMoney(cl.spentUSD)}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge
                              size="xs"
                              color={
                                cl.status === "Joylashgan" ? "teal" : "blue"
                              }
                            >
                              {cl.status}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="red"
                              onClick={() => {
                                setClients((prev) =>
                                  prev.filter((c) => c.id !== cl.id),
                                );
                                notifications.show({
                                  title: "O'chirildi",
                                  message: cl.name,
                                  color: "red",
                                });
                              }}
                            >
                              <IconTrash size={13} />
                            </ActionIcon>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Paper>

                <Paper className="luxury-card" p="lg">
                  <Group justify="space-between" mb="md">
                    <Stack gap={0}>
                      <Title order={4} size="h5" c="blue">
                        Administratorlar & Menejerlar
                      </Title>
                      <Text size="xs" c="dimmed">
                        Tizimga kirish huquqiga ega xodimlar
                      </Text>
                    </Stack>
                    <Button
                      size="xs"
                      variant="outline"
                      color="blue"
                      leftSection={<IconIdBadge2 size={13} />}
                      onClick={() => setAddAdminModalOpen(true)}
                    >
                      Qo'shish
                    </Button>
                  </Group>
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Xodim</Table.Th>
                        <Table.Th>Lavozim</Table.Th>
                        <Table.Th>Huquq</Table.Th>
                        <Table.Th>Holat</Table.Th>
                        <Table.Th></Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {admins.map((adm) => (
                        <Table.Tr key={adm.id}>
                          <Table.Td>
                            <Group gap="xs">
                              <Avatar color="blue" radius="xl" size="sm">
                                {adm.name.charAt(0)}
                              </Avatar>
                              <Stack gap={0}>
                                <Text size="xs" fw={700}>
                                  {adm.name}
                                </Text>
                                <Text size="xs" c="dimmed">
                                  {adm.email}
                                </Text>
                              </Stack>
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <Text size="xs">{adm.role}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge size="xs" color="blue">
                              {adm.access}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="xs" c="teal">
                              {adm.lastActive}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="red"
                              onClick={() =>
                                setAdmins((prev) =>
                                  prev.filter((a) => a.id !== adm.id),
                                )
                              }
                            >
                              <IconTrash size={13} />
                            </ActionIcon>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Paper>
              </Grid.Col>

              {/* ADMIN CHAT */}
              <Grid.Col span={{ base: 12, lg: 5 }}>
                <Paper
                  className="luxury-card"
                  p="lg"
                  style={{
                    border: "1px solid rgba(212,175,55,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Group
                    justify="space-between"
                    mb="md"
                    pb="sm"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Group gap="xs">
                      <IconRobot size={20} color="#d4af37" />
                      <Stack gap={0}>
                        <Title order={5} c="gold">
                          AI Muloqot Markazi
                        </Title>
                        <Text size="xs" c="dimmed">
                          Client ↔ Admin ↔ AI
                        </Text>
                      </Stack>
                    </Group>
                    <Group gap="xs">
                      <Switch
                        label="AI"
                        checked={aiAutoReply}
                        onChange={(e) =>
                          setAiAutoReply(e.currentTarget.checked)
                        }
                        color="gold"
                        size="xs"
                      />
                      <Badge color="gold" size="xs">
                        {chatMessages.length} xabar
                      </Badge>
                    </Group>
                  </Group>

                  <ScrollArea h={360} mb="md" pr="xs">
                    <Stack gap="sm">
                      {chatMessages.map((msg) => (
                        <Box
                          key={msg.id}
                          p="sm"
                          style={{
                            background:
                              msg.sender === "client"
                                ? "rgba(212,175,55,0.1)"
                                : msg.sender === "ai"
                                  ? "rgba(168,85,247,0.12)"
                                  : "rgba(56,189,248,0.1)",
                            borderRadius: 10,
                            borderLeft: `4px solid ${msg.sender === "client" ? "#d4af37" : msg.sender === "ai" ? "#a855f7" : "#38bdf8"}`,
                            marginLeft: msg.sender === "admin" ? 20 : 0,
                            marginRight: msg.sender === "client" ? 20 : 0,
                          }}
                        >
                          <Group justify="space-between" mb={2}>
                            <Text
                              size="xs"
                              fw={700}
                              c={
                                msg.sender === "client"
                                  ? "gold"
                                  : msg.sender === "ai"
                                    ? "grape"
                                    : "blue"
                              }
                            >
                              {msg.senderName}{" "}
                              {msg.sender === "client"
                                ? "👑"
                                : msg.sender === "ai"
                                  ? "🤖"
                                  : "🛡️"}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {msg.time}
                            </Text>
                          </Group>
                          <Text size="xs">{msg.text}</Text>
                        </Box>
                      ))}
                      {isAiTyping && (
                        <Group
                          gap="xs"
                          p="xs"
                          style={{
                            background: "rgba(168,85,247,0.1)",
                            borderRadius: 8,
                          }}
                        >
                          <Loader size="xs" color="grape" />
                          <Text size="xs" c="grape">
                            🤖 Royal AI yozmoqda...
                          </Text>
                        </Group>
                      )}
                      <div ref={chatEndRef} />
                    </Stack>
                  </ScrollArea>

                  <Stack gap="xs">
                    <Button
                      size="xs"
                      variant="light"
                      color="grape"
                      leftSection={<IconWand size={13} />}
                      onClick={handleAdminAiSuggest}
                    >
                      🤖 AI Copilot — Avtomatik Javob Yaratish
                    </Button>
                    <Group gap="xs">
                      <TextInput
                        placeholder="Admin nomidan javob yozing..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSendMessage("admin")
                        }
                        style={{ flexGrow: 1 }}
                        size="sm"
                      />
                      <Button
                        className="btn-gold"
                        size="sm"
                        onClick={() => handleSendMessage("admin")}
                      >
                        <IconSend size={15} />
                      </Button>
                    </Group>
                  </Stack>
                </Paper>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
      )}

      {/* ============================
          CLIENT AI CHAT DRAWER
          ============================ */}
      <Drawer
        opened={clientChatOpen}
        onClose={() => setClientChatOpen(false)}
        title={
          <Group gap="sm">
            <IconRobot color="#d4af37" size={22} />
            <Stack gap={0}>
              <Title order={4} size="h5" c="gold">
                Royal AI Butler & Concierge
              </Title>
              <Text size="xs" c="teal">
                ● 24/7 AI va Adminlar Onlayn • 🎤 Ovozli Muloqot
              </Text>
            </Stack>
          </Group>
        }
        position="right"
        size="md"
        styles={{ content: { background: darkMode ? "#0f1626" : "#f7f3ea" } }}
      >
        <Stack h="calc(100vh - 100px)" justify="space-between">
          <ScrollArea h="calc(100vh - 260px)" pr="xs">
            <Stack gap="sm">
              {chatMessages.map((msg) => (
                <Box
                  key={msg.id}
                  p="sm"
                  style={{
                    background:
                      msg.sender === "client"
                        ? "rgba(212,175,55,0.12)"
                        : msg.sender === "ai"
                          ? "rgba(168,85,247,0.15)"
                          : "rgba(56,189,248,0.12)",
                    borderRadius: 10,
                    borderLeft: `4px solid ${msg.sender === "client" ? "#d4af37" : msg.sender === "ai" ? "#a855f7" : "#38bdf8"}`,
                  }}
                >
                  <Group justify="space-between" mb={2}>
                    <Text
                      size="xs"
                      fw={700}
                      c={
                        msg.sender === "client"
                          ? "gold"
                          : msg.sender === "ai"
                            ? "grape"
                            : "blue"
                      }
                    >
                      {msg.senderName}{" "}
                      {msg.sender === "client"
                        ? "👑"
                        : msg.sender === "ai"
                          ? "🤖"
                          : "🛡️"}
                    </Text>
                    <Group gap={4}>
                      <Text size="xs" c="dimmed">
                        {msg.time}
                      </Text>
                      {msg.sender === "ai" && (
                        <ActionIcon
                          size="xs"
                          variant="subtle"
                          color="grape"
                          onClick={() => speakText(msg.text)}
                        >
                          <IconVolume size={12} />
                        </ActionIcon>
                      )}
                    </Group>
                  </Group>
                  <Text size="sm">{msg.text}</Text>
                </Box>
              ))}
              {isAiTyping && (
                <Group
                  gap="xs"
                  p="xs"
                  style={{
                    background: "rgba(168,85,247,0.1)",
                    borderRadius: 8,
                  }}
                >
                  <Loader size="xs" color="grape" />
                  <Text size="xs" c="grape">
                    🤖 Royal AI Butler yozmoqda...
                  </Text>
                </Group>
              )}
              <div ref={chatEndRef} />
            </Stack>
          </ScrollArea>

          <Stack
            gap="xs"
            pt="sm"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Text size="xs" c="dimmed" fw={600}>
              Tezkor so'rovlar:
            </Text>
            <Group gap={6} wrap="wrap">
              {[
                {
                  label: "☕ Nonushta buyurtmasi",
                  text: "Xonamga nonushta va qahva yetkazib bering",
                },
                {
                  label: "🚗 Rolls-Royce Transfer",
                  text: "Aeroportga Rolls-Royce Phantom kerak",
                },
                {
                  label: "🛎️ Xona tozalash",
                  text: "Xona tozalash xizmatini yuboring",
                },
                {
                  label: "✈️ Parvoz rezervatsiya",
                  text: "Dubaiga private jet bron qilmoqchiman",
                },
              ].map((chip, i) => (
                <Badge
                  key={i}
                  style={{ cursor: "pointer", userSelect: "none" }}
                  color={
                    i === 0
                      ? "gold"
                      : i === 1
                        ? "blue"
                        : i === 2
                          ? "teal"
                          : "grape"
                  }
                  variant="light"
                  onClick={() => handleSendMessage("client", chip.text)}
                >
                  {chip.label}
                </Badge>
              ))}
            </Group>

            {isSpeaking && (
              <Group
                gap="xs"
                p="xs"
                style={{ background: "rgba(168,85,247,0.15)", borderRadius: 8 }}
              >
                <div className="voice-wave">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} />
                  ))}
                </div>
                <Text size="xs" c="grape">
                  AI gapirmoqda...
                </Text>
                <ActionIcon
                  size="xs"
                  variant="subtle"
                  color="red"
                  onClick={stopSpeaking}
                >
                  <IconPlayerStop size={12} />
                </ActionIcon>
              </Group>
            )}

            {isListening && (
              <Group
                gap="xs"
                p="xs"
                style={{ background: "rgba(239,68,68,0.12)", borderRadius: 8 }}
              >
                <div className="voice-wave">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} />
                  ))}
                </div>
                <Text size="xs" c="red">
                  Tinglamoqda... Gapirishni davom ettiring
                </Text>
              </Group>
            )}

            <Group gap="xs">
              <ActionIcon
                size="lg"
                radius="xl"
                className={isListening ? "voice-recording" : ""}
                style={{
                  background: isListening ? "#ef4444" : "rgba(168,85,247,0.2)",
                  border: `1px solid ${isListening ? "#ef4444" : "#a855f7"}`,
                }}
                onClick={isListening ? stopVoiceInput : startVoiceInput}
              >
                {isListening ? (
                  <IconMicrophoneOff size={18} color="#fff" />
                ) : (
                  <IconMicrophone size={18} color="#a855f7" />
                )}
              </ActionIcon>
              <TextInput
                placeholder="AI Butlerga yozing yoki 🎤 tugmasini bosing..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSendMessage("client")
                }
                style={{ flexGrow: 1 }}
              />
              <Button
                className="btn-gold"
                onClick={() => handleSendMessage("client")}
              >
                <IconSend size={16} />
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Drawer>

      {/* ============================
          MODALS
          ============================ */}

      {/* 1. ROOM BOOKING MODAL */}
      <Modal
        opened={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={
          <Title order={3} size="h4" c="gold">
            VIP Xonani Band Qilish
          </Title>
        }
        size="lg"
        centered
        styles={{
          content: {
            background: darkMode ? "#0f1626" : "#f7f3ea",
            border: "1px solid #d4af37",
          },
        }}
      >
        {selectedRoom && (
          <form onSubmit={handleBooking}>
            <Stack gap="md">
              <Group
                p="sm"
                style={{ background: "rgba(8,12,20,0.5)", borderRadius: 10 }}
              >
                <Image
                  src={selectedRoom.image}
                  w={100}
                  h={70}
                  radius="md"
                  style={{ objectFit: "cover" }}
                  fallbackSrc="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80"
                />
                <Stack gap={2}>
                  <Title order={5}>{selectedRoom.title}</Title>
                  <Text size="xs" c="gold" fw={800}>
                    {formatMoney(selectedRoom.priceUSD)} / kecha •{" "}
                    {selectedRoom.sqm} m²
                  </Text>
                </Stack>
              </Group>
              <SimpleGrid cols={2}>
                <TextInput
                  label="Kelish Sanasi"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
                <TextInput
                  label="Ketish Sanasi"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </SimpleGrid>
              <TextInput
                label="Mehmon To'liq Ismi (Passport)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                placeholder="Alisher Qodirov"
              />
              <SimpleGrid cols={2}>
                <TextInput
                  label="Telefon Raqam"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  required
                  placeholder="+998 90 123 45 67"
                  leftSection={<IconPhone size={14} />}
                />
                <Select
                  label="Mehmonlar Soni"
                  value={guestCount}
                  onChange={(v) => setGuestCount(v || "2")}
                  data={["1", "2", "3", "4", "5", "6"].map((v) => ({
                    value: v,
                    label: v + " kishi",
                  }))}
                />
              </SimpleGrid>
              <Box
                p="sm"
                style={{ background: "rgba(8,12,20,0.4)", borderRadius: 8 }}
              >
                <Text size="xs" fw={700} c="gold" mb="xs">
                  Qo'shimcha VIP Xizmatlar:
                </Text>
                <SimpleGrid cols={2} spacing="xs">
                  <Checkbox
                    checked={extraTransfer}
                    onChange={(e) => setExtraTransfer(e.currentTarget.checked)}
                    label="Rolls-Royce Transfer (+$150)"
                    size="xs"
                  />
                  <Checkbox
                    checked={extraChampagne}
                    onChange={(e) => setExtraChampagne(e.currentTarget.checked)}
                    label="Dom Pérignon Shampan (+$95)"
                    size="xs"
                  />
                  <Checkbox
                    checked={extraSpa}
                    onChange={(e) => setExtraSpa(e.currentTarget.checked)}
                    label="VIP Spa Kirish (+$120)"
                    size="xs"
                  />
                  <Checkbox
                    checked={extraButler}
                    onChange={(e) => setExtraButler(e.currentTarget.checked)}
                    label="24/7 Shaxsiy Butler (+$80)"
                    size="xs"
                  />
                </SimpleGrid>
              </Box>
              <Group
                justify="space-between"
                p="md"
                style={{
                  background: "rgba(8,12,20,0.8)",
                  borderRadius: 10,
                  border: "1px solid rgba(212,175,55,0.4)",
                }}
              >
                <Stack gap={0}>
                  <Text size="xs" c="dimmed">
                    {calcNights()} kecha × {formatMoney(selectedRoom.priceUSD)}{" "}
                    + qo'shimcha
                  </Text>
                  <Text size="sm" fw={700}>
                    Jami To'lov:
                  </Text>
                </Stack>
                <Title
                  order={2}
                  c="gold"
                  style={{ fontFamily: "Cinzel,serif" }}
                >
                  {formatMoney(calcBookingTotal())}
                </Title>
              </Group>
              <Button
                type="submit"
                fullWidth
                className="btn-gold"
                size="lg"
                leftSection={<IconCreditCard size={18} />}
              >
                Davom Etish → Karta bilan To'lash
              </Button>
            </Stack>
          </form>
        )}
      </Modal>

      {/* 2. PAYMENT MODAL */}
      <Modal
        opened={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title={
          <Title order={3} size="h4" c="gold">
            <IconCreditCard size={20} /> Karta bilan To'lash
          </Title>
        }
        centered
        size="md"
        styles={{
          content: {
            background: darkMode ? "#0f1626" : "#f7f3ea",
            border: "1px solid #d4af37",
          },
        }}
      >
        <form onSubmit={handlePaymentSubmit}>
          <Stack gap="md">
            {/* Card Preview */}
            <div
              className="payment-card-preview"
              style={{
                background:
                  cardType === "visa"
                    ? "linear-gradient(135deg, #1a1a4e, #16213e, #0f3460)"
                    : cardType === "mastercard"
                      ? "linear-gradient(135deg, #8B1A1A, #3a1a1a, #1a0a0a)"
                      : "linear-gradient(135deg, #006EFF, #0050CC, #003399)",
              }}
            >
              <div className="card-chip" />
              <Text
                style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: 18,
                  letterSpacing: 3,
                  color: "rgba(255,255,255,0.9)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {cardNumber || "**** **** **** ****"}
              </Text>
              <Group
                justify="space-between"
                mt="md"
                style={{ position: "relative", zIndex: 1 }}
              >
                <Stack gap={0}>
                  <Text
                    size="xs"
                    c="rgba(255,255,255,0.5)"
                    style={{ letterSpacing: 1 }}
                  >
                    CARD HOLDER
                  </Text>
                  <Text size="sm" c="white" fw={600}>
                    {cardHolder || "YOUR NAME"}
                  </Text>
                </Stack>
                <Stack gap={0} align="flex-end">
                  <Text
                    size="xs"
                    c="rgba(255,255,255,0.5)"
                    style={{ letterSpacing: 1 }}
                  >
                    EXPIRES
                  </Text>
                  <Text size="sm" c="white" fw={600}>
                    {cardExpiry || "MM/YY"}
                  </Text>
                </Stack>
                <Text
                  size="lg"
                  fw={800}
                  c="white"
                  style={{ fontStyle: "italic" }}
                >
                  {cardType === "visa"
                    ? "VISA"
                    : cardType === "mastercard"
                      ? "MC"
                      : "AMEX"}
                </Text>
              </Group>
            </div>

            <TextInput
              label="Karta Raqami"
              value={cardNumber}
              onChange={(e) => {
                const f = formatCardNumber(e.target.value);
                setCardNumber(f);
                setCardType(detectCardType(f));
              }}
              placeholder="1234 5678 9012 3456"
              required
              maxLength={19}
              leftSection={<IconCreditCard size={14} />}
            />
            <TextInput
              label="Karta Egasining Ismi"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              placeholder="ALISHER QODIROV"
              required
            />
            <SimpleGrid cols={2}>
              <TextInput
                label="Amal Qilish Muddati"
                value={cardExpiry}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                  if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                  setCardExpiry(v);
                }}
                placeholder="MM/YY"
                required
                maxLength={5}
              />
              <TextInput
                label="CVV / CVC"
                value={cardCvv}
                onChange={(e) =>
                  setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="123"
                required
                maxLength={4}
                type="password"
              />
            </SimpleGrid>

            {pendingBookingData && (
              <Group
                justify="space-between"
                p="md"
                style={{
                  background: "rgba(8,12,20,0.8)",
                  borderRadius: 10,
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <Text size="sm">Jami To'lov Miqdori:</Text>
                <Title
                  order={3}
                  c="gold"
                  style={{ fontFamily: "Cinzel,serif" }}
                >
                  {formatMoney(pendingBookingData.total)}
                </Title>
              </Group>
            )}

            <Stack gap="xs">
              <Group
                gap="xs"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  borderRadius: 8,
                  padding: "8px 12px",
                }}
              >
                <IconShieldCheck size={16} color="#10b981" />
                <Text size="xs" c="teal">
                  256-bit SSL Shifrlash — To'lovingiz 100% Himoyalangan
                </Text>
              </Group>
              <Button type="submit" fullWidth className="btn-gold" size="lg">
                To'lovni Tasdiqlash & Bron Qilish ✅
              </Button>
            </Stack>
          </Stack>
        </form>
      </Modal>

      {/* 3. VOUCHER MODAL */}
      <Modal
        opened={voucherModalOpen}
        onClose={() => setVoucherModalOpen(false)}
        size="md"
        centered
        withCloseButton={false}
        styles={{
          content: {
            background: "#0b111e",
            border: "2px solid #d4af37",
            padding: 0,
          },
        }}
      >
        {voucherData && (
          <Box p="xl" ta="center">
            <Box
              style={{
                width: 50,
                height: 50,
                background: "var(--gold-gradient)",
                borderRadius: "50%",
                margin: "0 auto 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
              }}
            >
              <IconCrown size={28} />
            </Box>
            <Title order={3} style={{ fontFamily: "Cinzel,serif" }} c="white">
              ROYAL GRAND PALACE
            </Title>
            <Badge color="teal" size="sm" mt="xs" mb="md">
              ✅ RASMIY VIP BRON VAUCHERI TASDIQLANDI
            </Badge>
            <Box
              p="sm"
              my="md"
              style={{
                border: "1px dashed #d4af37",
                borderRadius: 10,
                background: "rgba(212,175,55,0.08)",
              }}
            >
              <Text fw={900} size="xl" c="gold" style={{ letterSpacing: 5 }}>
                {voucherData.code}
              </Text>
            </Box>
            <Stack
              gap="xs"
              ta="left"
              p="md"
              style={{ background: "rgba(8,12,20,0.8)", borderRadius: 10 }}
              mb="lg"
            >
              {[
                { label: "Mehmon:", value: voucherData.guestName },
                {
                  label: "Xona:",
                  value: voucherData.room?.title || voucherData.roomTitle,
                },
                {
                  label: "Muddati:",
                  value: `${voucherData.checkIn} — ${voucherData.checkOut} (${voucherData.nights} kecha)`,
                },
                { label: "To'lov:", value: voucherData.totalPrice },
              ].map((row, i) => (
                <Group key={i} justify="space-between">
                  <Text size="xs" c="dimmed">
                    {row.label}
                  </Text>
                  <Text size="xs" fw={700} c={i === 3 ? "gold" : undefined}>
                    {row.value}
                  </Text>
                </Group>
              ))}
            </Stack>
            <Group gap="xs" justify="center" mb="lg">
              <IconQrcode size={52} color="#d4af37" />
              <Text size="xs" c="dimmed">
                Mehmonxonaga kelganda ushbu vaucherni ko'rsating
              </Text>
            </Group>
            <Group gap="sm">
              <Button
                fullWidth
                className="btn-gold"
                leftSection={<IconPrinter size={16} />}
                onClick={() => window.print()}
              >
                Chop Etish / Saqlash
              </Button>
              <Button
                fullWidth
                variant="default"
                onClick={() => setVoucherModalOpen(false)}
              >
                Tayyor
              </Button>
            </Group>
          </Box>
        )}
      </Modal>

      {/* 4. FLIGHT BOOKING MODAL */}
      <Modal
        opened={flightModalOpen}
        onClose={() => setFlightModalOpen(false)}
        title={
          <Title order={3} size="h4" c="gold">
            <IconPlane size={20} /> Parvoz Band Qilish
          </Title>
        }
        centered
        size="md"
        styles={{
          content: {
            background: darkMode ? "#0f1626" : "#f7f3ea",
            border: "1px solid #d4af37",
          },
        }}
      >
        {selectedFlight && (
          <form onSubmit={handleFlightBook}>
            <Stack gap="md">
              <Group
                p="sm"
                style={{ background: "rgba(8,12,20,0.5)", borderRadius: 10 }}
              >
                <Box
                  style={{
                    background: "var(--gold-gradient)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#000",
                  }}
                >
                  <IconPlane size={24} />
                </Box>
                <Stack gap={2}>
                  <Title order={5}>
                    {selectedFlight.from} → {selectedFlight.to} (
                    {selectedFlight.fromCode} → {selectedFlight.toCode})
                  </Title>
                  <Text size="xs" c="dimmed">
                    {selectedFlight.airline} • {selectedFlight.duration}
                  </Text>
                  <Text size="sm" fw={800} c="gold">
                    {formatMoney(selectedFlight.priceUSD)} / Kishi
                  </Text>
                </Stack>
              </Group>
              <TextInput
                label="Yo'lovchi Ismi (Passport bo'yicha)"
                value={flightPassenger}
                onChange={(e) => setFlightPassenger(e.target.value)}
                required
                placeholder="Alisher Qodirov"
              />
              <SimpleGrid cols={2}>
                <TextInput
                  label="Parvoz Sanasi"
                  type="date"
                  value={flightDate}
                  onChange={(e) => setFlightDate(e.target.value)}
                  required
                />
                <TextInput
                  label="Telefon Raqam"
                  value={chauffeurContact}
                  onChange={(e) => setChauffeurContact(e.target.value)}
                  required
                  placeholder="+998 90 123 45 67"
                  leftSection={<IconPhone size={14} />}
                />
              </SimpleGrid>
              <Select
                label="Sinf"
                defaultValue="economy"
                data={[
                  { value: "economy", label: "Economy+ (Lounge kirishli)" },
                  { value: "business", label: "Business Class (Flat-bed)" },
                  { value: "first", label: "First Class / Private Suite" },
                ]}
              />
              <Button
                type="submit"
                fullWidth
                className="btn-gold"
                size="lg"
                leftSection={<IconCreditCard size={18} />}
              >
                Davom Etish → Karta bilan To'lash
              </Button>
            </Stack>
          </form>
        )}
      </Modal>

      {/* 5. ROOM FOOD ORDER MODAL */}
      <Modal
        opened={roomFoodModalOpen}
        onClose={() => setRoomFoodModalOpen(false)}
        title={
          <Title order={3} size="h4" c="gold">
            <IconToolsKitchen2 size={20} /> Xonaga Taom Buyurtmasi
          </Title>
        }
        size="xl"
        centered
        styles={{ content: { background: darkMode ? "#0f1626" : "#f7f3ea" } }}
      >
        {roomFoodTarget && (
          <Stack gap="md">
            <Group
              p="sm"
              style={{
                background: "rgba(212,175,55,0.1)",
                borderRadius: 10,
                border: "1px solid rgba(212,175,55,0.3)",
              }}
            >
              <IconBed size={20} color="#d4af37" />
              <Text fw={700}>{roomFoodTarget.title} — Xonaga Yetkazish</Text>
              <Badge color="teal">20-30 daqiqa</Badge>
            </Group>
            <TextInput
              label="Xona Raqami"
              placeholder="Masalan: Suite 701 yoki Villa 4"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
              leftSection={<IconBed size={14} />}
            />
            <Text fw={600} size="sm">
              Menyu ({ALL_MENU.length} taom):
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
              {ALL_MENU.map((dish) => {
                const inCart = cart.find((c) => c.dish.id === dish.id);
                return (
                  <Group
                    key={dish.id}
                    p="xs"
                    style={{
                      background: darkMode
                        ? "rgba(18,27,46,0.7)"
                        : "rgba(255,252,240,0.8)",
                      borderRadius: 10,
                      border: `1px solid ${inCart ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <Image
                      src={dish.image}
                      w={52}
                      h={52}
                      radius="sm"
                      style={{ objectFit: "cover" }}
                      fallbackSrc="https://images.unsplash.com/photo-1544025162-d76694265947?w=100&q=80"
                    />
                    <Stack gap={2} style={{ flex: 1 }}>
                      <Text size="xs" fw={700} lineClamp={1}>
                        {dish.title}
                      </Text>
                      <Text size="xs" c="gold">
                        {formatMoney(dish.priceUSD)}
                      </Text>
                    </Stack>
                    {inCart ? (
                      <Group gap={4}>
                        <ActionIcon
                          size="sm"
                          variant="default"
                          onClick={() => updateCart(dish.id, -1)}
                        >
                          -
                        </ActionIcon>
                        <Text size="xs" fw={700}>
                          {inCart.quantity}
                        </Text>
                        <ActionIcon
                          size="sm"
                          variant="default"
                          onClick={() => updateCart(dish.id, 1)}
                        >
                          +
                        </ActionIcon>
                      </Group>
                    ) : (
                      <ActionIcon
                        size="sm"
                        className="btn-gold"
                        onClick={() => addToCart(dish)}
                      >
                        <IconPlus size={14} />
                      </ActionIcon>
                    )}
                  </Group>
                );
              })}
            </SimpleGrid>
            {cart.length > 0 && (
              <Group
                justify="space-between"
                p="md"
                style={{
                  background: "rgba(8,12,20,0.8)",
                  borderRadius: 10,
                  border: "1px solid rgba(212,175,55,0.4)",
                }}
              >
                <Text fw={700}>
                  Savatcha Jami ({cart.reduce((s, i) => s + i.quantity, 0)} ta
                  taom):
                </Text>
                <Title order={3} c="gold">
                  {formatMoney(cartTotal)}
                </Title>
              </Group>
            )}
            <Button
              fullWidth
              className="btn-gold"
              size="lg"
              disabled={cart.length === 0 || !roomNumber.trim()}
              onClick={() => {
                notifications.show({
                  title: "Buyurtma Yuborildi ✅",
                  message: `Taomlar 20-30 daqiqada ${roomNumber} ga yetkaziladi!`,
                  color: "teal",
                });
                setCart([]);
                setRoomFoodModalOpen(false);
                setRoomNumber("");
              }}
            >
              Buyurtmani Tasdiqlash & Xonaga Yetkazish
            </Button>
          </Stack>
        )}
      </Modal>

      {/* 6. CART DRAWER */}
      <Drawer
        opened={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        title={
          <Title order={3} size="h4" c="gold">
            <IconShoppingBag size={20} /> Gurme Savatchasi
          </Title>
        }
        position="right"
        styles={{ content: { background: darkMode ? "#0f1626" : "#f7f3ea" } }}
      >
        <Stack h="calc(100vh - 100px)" justify="space-between">
          <Stack gap="md" style={{ overflowY: "auto" }}>
            {cart.length === 0 ? (
              <Stack align="center" mt="xl" c="dimmed" gap="sm">
                <IconToolsKitchen2 size={48} />
                <Text size="sm">Savatchangiz bo'sh.</Text>
              </Stack>
            ) : (
              cart.map((item) => (
                <Group
                  key={item.dish.id}
                  p="xs"
                  style={{ background: "rgba(8,12,20,0.5)", borderRadius: 8 }}
                >
                  <Image
                    src={item.dish.image}
                    w={50}
                    h={50}
                    radius="sm"
                    style={{ objectFit: "cover" }}
                    fallbackSrc="https://images.unsplash.com/photo-1544025162-d76694265947?w=100&q=80"
                  />
                  <Stack gap={2} style={{ flex: 1 }}>
                    <Text size="xs" fw={700} lineClamp={1}>
                      {item.dish.title}
                    </Text>
                    <Text size="xs" c="gold">
                      {formatMoney(item.dish.priceUSD)}
                    </Text>
                  </Stack>
                  <Group gap={4}>
                    <ActionIcon
                      size="sm"
                      variant="default"
                      onClick={() => updateCart(item.dish.id, -1)}
                    >
                      -
                    </ActionIcon>
                    <Text size="xs" fw={700}>
                      {item.quantity}
                    </Text>
                    <ActionIcon
                      size="sm"
                      variant="default"
                      onClick={() => updateCart(item.dish.id, 1)}
                    >
                      +
                    </ActionIcon>
                  </Group>
                </Group>
              ))
            )}
          </Stack>
          <Stack
            gap="sm"
            pt="md"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <TextInput
              label="Xona Raqami"
              placeholder="Suite 701 yoki Villa 4"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              leftSection={<IconBed size={14} />}
            />
            <Group justify="space-between">
              <Text fw={700}>Jami:</Text>
              <Title order={3} c="gold" style={{ fontFamily: "Cinzel,serif" }}>
                {formatMoney(cartTotal)}
              </Title>
            </Group>
            <Button
              fullWidth
              className="btn-gold"
              size="md"
              disabled={cart.length === 0 || !roomNumber.trim()}
              onClick={() => {
                notifications.show({
                  title: "Buyurtma Tasdiqlandi ✅",
                  message: `${roomNumber} ga 20-30 daqiqada yetkaziladi!`,
                  color: "teal",
                });
                setCart([]);
                setCartDrawerOpen(false);
                setRoomNumber("");
              }}
            >
              Xonaga Yetkazish Buyurtmasi
            </Button>
          </Stack>
        </Stack>
      </Drawer>

      {/* 7. TABLE RESERVATION MODAL */}
      <Modal
        opened={tableModalOpen}
        onClose={() => setTableModalOpen(false)}
        title={
          <Title order={3} size="h4" c="gold">
            Restoranda Stol Band Qilish
          </Title>
        }
        centered
        styles={{ content: { background: darkMode ? "#0f1626" : "#f7f3ea" } }}
      >
        <Stack gap="md">
          <TextInput
            label="Ism va Familiya"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
          <Select
            label="Joylashuv Hududi"
            value={tableZone}
            onChange={(v) => setTableZone(v || "terrace")}
            data={[
              {
                value: "terrace",
                label: "Panoramik Ochiq Terrasa (Dengiz manzarasi)",
              },
              {
                value: "vip_hall",
                label: "Royal VIP Zali (Jonli Royal Pianino)",
              },
              { value: "sommelier", label: "Sommelier Tasting Zonasi" },
            ]}
          />
          <TextInput
            label="Sana va Vaqt"
            type="datetime-local"
            defaultValue="2026-08-25T19:30"
            required
          />
          <Select
            label="Mehmonlar Soni"
            defaultValue="2"
            data={["1", "2", "3", "4", "5", "6", "7", "8"].map((v) => ({
              value: v,
              label: v + " kishi",
            }))}
          />
          <Button
            className="btn-gold"
            onClick={() => {
              notifications.show({
                title: "✅ Stol Band Qilindi",
                message: `Hurmatli ${tableName || "Mehmon"}, stolingiz tasdiqlandi.`,
                color: "teal",
              });
              setTableModalOpen(false);
              setTableName("");
            }}
          >
            Stolni Tasdiqlash
          </Button>
        </Stack>
      </Modal>

      {/* 8. ADD CLIENT MODAL */}
      <Modal
        opened={addClientModalOpen}
        onClose={() => setAddClientModalOpen(false)}
        title={
          <Title order={3} size="h4" c="gold">
            Yangi VIP Mehmon Qo'shish
          </Title>
        }
        centered
        styles={{
          content: {
            background: darkMode ? "#0f1626" : "#f7f3ea",
            border: "1px solid #d4af37",
          },
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setClients((prev) => [
              {
                id: "cl-" + Date.now(),
                name: newClientName,
                tier: newClientTier,
                room: newClientRoom,
                spentUSD: 8500,
                phone: newClientPhone,
                email: newClientEmail,
                checkIn: "2026-08-25",
                checkOut: "2026-09-01",
                status: "Joylashgan",
              },
              ...prev,
            ]);
            notifications.show({
              title: "Qo'shildi",
              message: newClientName,
              color: "gold",
            });
            setAddClientModalOpen(false);
            setNewClientName("");
            setNewClientPhone("");
            setNewClientEmail("");
          }}
        >
          <Stack gap="md">
            <TextInput
              label="To'liq Ismi"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              required
            />
            <Select
              label="VIP Tier"
              value={newClientTier}
              onChange={(v: any) => setNewClientTier(v)}
              data={[
                { value: "Diamond VIP", label: "💎 Diamond VIP" },
                { value: "Royal Platinum", label: "👑 Royal Platinum" },
                { value: "Gold Elite", label: "⭐ Gold Elite" },
              ]}
            />
            <TextInput
              label="Xona"
              value={newClientRoom}
              onChange={(e) => setNewClientRoom(e.target.value)}
              required
            />
            <TextInput
              label="Telefon"
              value={newClientPhone}
              onChange={(e) => setNewClientPhone(e.target.value)}
              required
              leftSection={<IconPhone size={14} />}
            />
            <TextInput
              label="Email"
              value={newClientEmail}
              onChange={(e) => setNewClientEmail(e.target.value)}
              required
              leftSection={<IconMail size={14} />}
            />
            <Button type="submit" fullWidth className="btn-gold">
              Saqlash
            </Button>
          </Stack>
        </form>
      </Modal>

      {/* 9. ADD ADMIN MODAL */}
      <Modal
        opened={addAdminModalOpen}
        onClose={() => setAddAdminModalOpen(false)}
        title={
          <Title order={3} size="h4" c="blue">
            Yangi Admin / Menejer
          </Title>
        }
        centered
        styles={{
          content: {
            background: darkMode ? "#0f1626" : "#f7f3ea",
            border: "1px solid #38bdf8",
          },
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAdmins((prev) => [
              {
                id: "adm-" + Date.now(),
                name: newAdminName,
                role: newAdminRole,
                email: newAdminEmail,
                access: newAdminAccess,
                lastActive: "Hozir faol",
              },
              ...prev,
            ]);
            notifications.show({
              title: "Admin Qo'shildi",
              message: newAdminName,
              color: "blue",
            });
            setAddAdminModalOpen(false);
            setNewAdminName("");
            setNewAdminEmail("");
          }}
        >
          <Stack gap="md">
            <TextInput
              label="Ismi"
              value={newAdminName}
              onChange={(e) => setNewAdminName(e.target.value)}
              required
            />
            <Select
              label="Lavozimi"
              value={newAdminRole}
              onChange={(v) => setNewAdminRole(v || "VIP Concierge Lead")}
              data={[
                "Bosh Menejer",
                "VIP Concierge Lead",
                "Tizim Administratori",
                "Oshxona Boshlig'i",
              ].map((v) => ({ value: v, label: v }))}
            />
            <TextInput
              label="Email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              required
              leftSection={<IconMail size={14} />}
            />
            <Select
              label="Ruxsat Huquqi"
              value={newAdminAccess}
              onChange={(v: any) => setNewAdminAccess(v)}
              data={[
                { value: "Super Admin", label: "Super Admin (Cheksiz)" },
                { value: "Menejer", label: "Menejer" },
                { value: "Operator", label: "Operator" },
              ]}
            />
            <Button type="submit" fullWidth color="blue">
              Adminni Saqlash
            </Button>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}

// Small helper (IconPlus wasn't imported separately)
function IconPlus({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
