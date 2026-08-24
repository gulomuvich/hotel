import React, { useState, useEffect } from 'react';
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
  ScrollArea
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
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
  IconMessageDots,
  IconSend,
  IconUserPlus,
  IconIdBadge2,
  IconDiamond
} from '@tabler/icons-react';

// --- TYPES ---
interface Room {
  id: string;
  category: 'deluxe' | 'presidential' | 'royal' | 'villa';
  title: string;
  desc: string;
  priceUSD: number;
  sqm: number;
  guests: string;
  bed: string;
  image: string;
  amenities: string[];
  badge: string;
}

interface FleetItem {
  id: string;
  name: string;
  priceUSD: number;
  type: string;
  seats: string;
  speed: string;
  image: string;
}

interface MenuItem {
  id: string;
  category: 'breakfast' | 'mains' | 'seafood' | 'desserts' | 'drinks';
  title: string;
  desc: string;
  priceUSD: number;
  prepTime: string;
  image: string;
  badge: string;
}

interface ClientUser {
  id: string;
  name: string;
  tier: 'Diamond VIP' | 'Royal Platinum' | 'Gold Elite';
  room: string;
  spentUSD: number;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  status: 'Joylashgan' | 'Kutilmoqda' | 'Tugallangan';
}

interface AdminUser {
  id: string;
  name: string;
  role: 'Bosh Menejer' | 'VIP Concierge Lead' | 'Tizim Administratori' | 'Oshxona Boshlig\'i';
  email: string;
  access: 'Super Admin' | 'Menejer' | 'Operator';
  lastActive: string;
}

interface ChatMessage {
  id: string;
  sender: 'client' | 'admin';
  senderName: string;
  text: string;
  time: string;
  isRead: boolean;
}

interface CartItem {
  dish: MenuItem;
  quantity: number;
}

// --- ENRICHED DATASETS ---
const EXPANDED_ROOMS: Room[] = [
  {
    id: 'deluxe-1',
    category: 'deluxe',
    title: 'Deluxe King Ocean Suite',
    desc: 'Yumshoq qirollik karavoti, panoramik dengiz manzarasi va italyan marmaridan vanna.',
    priceUSD: 450,
    sqm: 65,
    guests: '2 Mehmon',
    bed: '1 King Bed',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    amenities: ['Dengiz Manzarasi', 'Smart Home', 'Balkon', 'Wi-Fi 6E', 'Jacuzzi'],
    badge: 'Mashhur Tanlov'
  },
  {
    id: 'deluxe-2',
    category: 'deluxe',
    title: 'Executive Panoramic Suite',
    desc: 'Keng shaxsiy mehmonxona zonasi, shaxsiy ish kabineti va to\'liq bar bilan jihozlangan.',
    priceUSD: 580,
    sqm: 85,
    guests: '2 Mehmon',
    bed: '1 King Bed',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    amenities: ['Panoramik Oyna', 'Espresso Bar', 'Sound System', 'Butler Call'],
    badge: 'Biznes VIP'
  },
  {
    id: 'deluxe-3',
    category: 'deluxe',
    title: 'Grand Azure Deluxe Corner',
    desc: 'Burchakli 270 daraja ko\'rfaz manzarasi, xususiy jakuzi va mini-spa vanna xonasi.',
    priceUSD: 650,
    sqm: 95,
    guests: '2 Mehmon',
    bed: '1 Super King Bed',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    amenities: ['270° Manzara', 'Oltin Bezaklar', 'Xususiy Bar', 'Hermès Kosmetika'],
    badge: 'Yangi Dizayn'
  },
  {
    id: 'presidential-1',
    category: 'presidential',
    title: 'Grand Presidential Suite',
    desc: 'Diplomatlar va nufuzli mehmonlar uchun 180 m² hashamat, shaxsiy majlis xonasi va oshpaz.',
    priceUSD: 1250,
    sqm: 180,
    guests: '4 Mehmon',
    bed: '2 King Beds',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Shaxsiy Butler', '24/7 Maybach', 'Keng Jacuzzi', 'Xususiy Lift'],
    badge: 'Prezident Tanlovi'
  },
  {
    id: 'presidential-2',
    category: 'presidential',
    title: 'Imperial Ambassador Suite',
    desc: 'Oltin bezakli interyer, shaxsiy sharob podvali va 360 darajali shahar/dengiz manzarasi.',
    priceUSD: 1600,
    sqm: 220,
    guests: '4 Mehmon',
    bed: '2 Master Suites',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    amenities: ['Sharob Kolleksiyasi', 'Shaxsiy Sauna', 'Marmar Kamin', 'Heli Transfer'],
    badge: 'Imperial Hashamat'
  },
  {
    id: 'presidential-3',
    category: 'presidential',
    title: 'Monarch Sovereign Suite',
    desc: 'Monarxlar darajasidagi hashamat: xususiy kutubxona, shaxsiy lift va diplomatik xavfsizlik.',
    priceUSD: 1950,
    sqm: 260,
    guests: '5 Mehmon',
    bed: '2 King + 1 Queen',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
    amenities: ['Shaxsiy Lift', 'Qurolli Xavfsizlik', 'Xususiy Zal', 'Kutubxona'],
    badge: 'Qirollik Darajasi'
  },
  {
    id: 'royal-1',
    category: 'royal',
    title: 'Royal Crown Penthouse',
    desc: 'Eng yuqori qavatdagi shaxsiy infinity basseyn, ochiq osmon ostidagi terrasaga ega.',
    priceUSD: 2800,
    sqm: 350,
    guests: '6 Mehmon',
    bed: '3 Master Bedrooms',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    amenities: ['Tomdagi Basseyn', 'Shaxsiy Pianino', 'Vertolyot Maydonchasi', '24/7 Oshpaz'],
    badge: 'Qirollik Toji'
  },
  {
    id: 'royal-2',
    category: 'royal',
    title: 'Dynasty Palace Penthouse',
    desc: 'Dunyodagi eng hashamatli penthauslardan biri: 420 m², shaxsiy kinoteatr va SPA xonasi.',
    priceUSD: 3400,
    sqm: 420,
    guests: '8 Mehmon',
    bed: '4 Master Suites',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    amenities: ['Shaxsiy Kinoteatr', 'Kriosauna', 'Eksklyuziv Rolls-Royce', 'Maxsus Qo\'riqlash'],
    badge: 'Ultra Elita'
  },
  {
    id: 'villa-1',
    category: 'villa',
    title: 'Oceanfront Sovereign Villa',
    desc: 'Shaxsiy plyaj hududi, 25 metrli shaxsiy basseyn va tropik bog\' ichidagi yakka villa.',
    priceUSD: 4200,
    sqm: 550,
    guests: '8 Mehmon',
    bed: '4 King Villas',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    amenities: ['Shaxsiy Plyaj', '25m Basseyn', 'Shaxsiy Yaxta', 'Barbekyu Paviloni'],
    badge: 'Sohil Villasi'
  },
  {
    id: 'villa-2',
    category: 'villa',
    title: 'Royal Emerald Estate Villa',
    desc: 'Mehmonxonaning eng yirik mulki: 5 ta alohida master-syuit, shaxsiy sport zali va pier.',
    priceUSD: 5500,
    sqm: 750,
    guests: '12 Mehmon',
    bed: '5 Master Villas',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    amenities: ['Shaxsiy Pier', 'Fitnes & Spa Markazi', 'Shaxsiy Maybach Park', 'To\'liq Xodimlar'],
    badge: 'Mutlaq Hashamat'
  }
];

const EXPANDED_FLEET: FleetItem[] = [
  {
    id: 'rolls_phantom',
    name: 'Rolls-Royce Phantom VIII',
    priceUSD: 450,
    type: 'Sedan Ultra VIP',
    seats: '4 O\'rin',
    speed: 'V12 6.75L Twin-Turbo',
    image: 'https://images.unsplash.com/photo-1631295868223-63265840d001?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mercedes_maybach',
    name: 'Mercedes-Maybach S680',
    priceUSD: 320,
    type: 'First-Class Executive',
    seats: '4 O\'rin',
    speed: 'V12 Bi-Turbo 4MATIC',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cadillac_escalade',
    name: 'Cadillac Escalade Platinum',
    priceUSD: 280,
    type: 'VIP SUV Armored',
    seats: '7 O\'rin',
    speed: '6.2L V8 Supercharged',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bentley_flying_spur',
    name: 'Bentley Flying Spur Mulliner',
    priceUSD: 390,
    type: 'Luxury Gran Tourer',
    seats: '4 O\'rin',
    speed: 'W12 635 HP',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'lamborghini_urus',
    name: 'Lamborghini Urus Mansory',
    priceUSD: 480,
    type: 'Super SUV VIP',
    seats: '4 O\'rin',
    speed: '4.0L V8 Twin-Turbo 650HP',
    image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'range_rover_sv',
    name: 'Range Rover SV Autobiography',
    priceUSD: 260,
    type: 'Luxury British SUV',
    seats: '5 O\'rin',
    speed: 'V8 530 HP Dynamic',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80'
  }
];

const EXPANDED_MENU: MenuItem[] = [
  {
    id: 'dish-1',
    category: 'mains',
    title: 'Royal Wagyu A5 Ribeye Steak',
    desc: 'Yaponiyaning Miyazaki prefekturasidan A5 Wagyu, qora tryufel sousi va oltin barg bilan.',
    priceUSD: 145,
    prepTime: '25 daqiqa',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    badge: 'Michelin Star'
  },
  {
    id: 'dish-2',
    category: 'seafood',
    title: 'Imperial Beluga Caviar & Blinis',
    desc: 'Kaspiy dengizining sara Beluga ikrasi, yangi pishirilgan blinilar va smetana bilan.',
    priceUSD: 260,
    prepTime: '15 daqiqa',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    badge: 'VIP Signature'
  },
  {
    id: 'dish-3',
    category: 'seafood',
    title: 'Brittany Blue Lobster Thermidor',
    desc: 'Fransuz ko\'k omar go\'shti, konyakli qaymoqli sous va Gruyer pishlog\'i bilan pishirilgan.',
    priceUSD: 180,
    prepTime: '30 daqiqa',
    image: 'https://images.unsplash.com/photo-1559737558-245cb343a41b?auto=format&fit=crop&w=600&q=80',
    badge: 'Chef Choice'
  },
  {
    id: 'dish-4',
    category: 'breakfast',
    title: 'Imperial Caviar & Truffle Omelette',
    desc: 'Tabiiy tuxumlar, yangi qora tryufel bo\'laklari va qora ikra, bir bokal shampan bilan.',
    priceUSD: 65,
    prepTime: '20 daqiqa',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    badge: 'Royal Nonushta'
  },
  {
    id: 'dish-5',
    category: 'desserts',
    title: '24K Gold Royal Chocolate Sphere',
    desc: 'Valrhona qora shokoladli shar, ichida vanil moussi va ustidan issiq karamel quyiladi.',
    priceUSD: 55,
    prepTime: '15 daqiqa',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    badge: '24K Oltin'
  },
  {
    id: 'dish-6',
    category: 'drinks',
    title: 'Dom Pérignon Vintage Champagne (Bottle)',
    desc: 'Fransiyaning afsonaviy shampani, sovitilgan muzli qadahlarda taqdim etiladi.',
    priceUSD: 420,
    prepTime: '5 daqiqa',
    image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=600&q=80',
    badge: 'Vintage 2013'
  },
  {
    id: 'dish-7',
    category: 'mains',
    title: 'Château Filet Mignon Rossini',
    desc: 'Foie gras, qora tryufel shavings va 50 yillik Madeira sousi bilan elita go\'sht taomi.',
    priceUSD: 165,
    prepTime: '25 daqiqa',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    badge: 'Chef Special'
  },
  {
    id: 'dish-8',
    category: 'desserts',
    title: 'Grand Madagascar Vanilla Soufflé',
    desc: 'Havo kabi yengil issiq sufle, oltin qoplangan malina sorbeti bilan.',
    priceUSD: 45,
    prepTime: '20 daqiqa',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    badge: 'Klassik Gurme'
  }
];

const INITIAL_CLIENTS: ClientUser[] = [
  { id: 'cl-1', name: 'Lord Alexander Wright', tier: 'Diamond VIP', room: 'Suite 701 (Presidential)', spentUSD: 14200, phone: '+44 7911 123456', email: 'alexander@wright.co.uk', checkIn: '2026-08-22', checkOut: '2026-08-29', status: 'Joylashgan' },
  { id: 'cl-2', name: 'Kenji Takahashi', tier: 'Royal Platinum', room: 'Villa 4 (Ocean Sovereign)', spentUSD: 28500, phone: '+81 90 1234 5678', email: 'kenji@tokyovip.jp', checkIn: '2026-08-20', checkOut: '2026-08-30', status: 'Joylashgan' },
  { id: 'cl-3', name: 'Elena Rostova', tier: 'Royal Platinum', room: 'Penthouse 802', spentUSD: 19800, phone: '+377 93 12 34 56', email: 'elena@monacovip.mc', checkIn: '2026-08-24', checkOut: '2026-08-31', status: 'Joylashgan' },
  { id: 'cl-4', name: 'Sheikh Mansoor Al-Nahyan', tier: 'Diamond VIP', room: 'Royal Penthouse 901', spentUSD: 65000, phone: '+971 50 123 4567', email: 'mansoor@emiratesroyal.ae', checkIn: '2026-08-25', checkOut: '2026-09-05', status: 'Kutilmoqda' },
  { id: 'cl-5', name: 'Princess Charlotte De Bourbon', tier: 'Diamond VIP', room: 'Emerald Estate Villa', spentUSD: 48000, phone: '+33 6 12 34 56 78', email: 'charlotte@parisroyal.fr', checkIn: '2026-08-26', checkOut: '2026-09-02', status: 'Kutilmoqda' },
  { id: 'cl-6', name: 'Sardor Qosimov', tier: 'Gold Elite', room: 'Suite 504 (Deluxe Ocean)', spentUSD: 3600, phone: '+998 90 777 00 11', email: 'sardor@tashkent.uz', checkIn: '2026-08-23', checkOut: '2026-08-26', status: 'Joylashgan' }
];

const INITIAL_ADMINS: AdminUser[] = [
  { id: 'adm-1', name: 'Jasur Karimov', role: 'Bosh Menejer', email: 'gm@royalgrandpalace.com', access: 'Super Admin', lastActive: 'Hozir faol' },
  { id: 'adm-2', name: 'Madina Umarova', role: 'VIP Concierge Lead', email: 'concierge@royalgrandpalace.com', access: 'Menejer', lastActive: '5 daq oldin' },
  { id: 'adm-3', name: 'Alain Ducasse', role: 'Oshxona Boshlig\'i', email: 'chef@royalgrandpalace.com', access: 'Menejer', lastActive: '12 daq oldin' },
  { id: 'adm-4', name: 'Sardor Maxmudov', role: 'Tizim Administratori', email: 'admin@royalgrandpalace.com', access: 'Super Admin', lastActive: 'Hozir faol' }
];

const INITIAL_CHAT_MSGS: ChatMessage[] = [
  { id: 'm-1', sender: 'client', senderName: 'Lord Alexander (Suite 701)', text: 'Assalomu alaykum! Xonamizga soat 20:00 da Dom Pérignon va Beluga ikra yetkazib bera olasizmi?', time: '18:40', isRead: true },
  { id: 'm-2', sender: 'admin', senderName: 'VIP Concierge (Madina)', text: 'Hurmatli Lord Alexander, buyurtmangiz qabul qilindi! Bosh sommelye taomni aynan 20:00 da shaxsan topshiradi.', time: '18:42', isRead: true },
  { id: 'm-3', sender: 'client', senderName: 'Lord Alexander (Suite 701)', text: 'Katta rahmat! Ertaga ertalab soat 09:00 ga aeroportga Rolls-Royce Phantom tayyor bo\'lsin iltimos.', time: '18:45', isRead: false }
];

export default function App() {
  // Current Mode: 'client' (Mehmon) vs 'admin' (Boshqaruv/Admin CRM)
  const [activePortal, setActivePortal] = useState<'client' | 'admin'>('client');
  const [currency, setCurrency] = useState<'USD' | 'UZS' | 'EUR'>('USD');
  const [lang, setLang] = useState<'uz' | 'en' | 'ru'>('uz');

  // Datasets
  const [rooms] = useState<Room[]>(EXPANDED_ROOMS);
  const [fleet] = useState<FleetItem[]>(EXPANDED_FLEET);
  const [menu] = useState<MenuItem[]>(EXPANDED_MENU);
  const [clients, setClients] = useState<ClientUser[]>(() => {
    const saved = localStorage.getItem('rgp_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });
  const [admins, setAdmins] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('rgp_admins');
    return saved ? JSON.parse(saved) : INITIAL_ADMINS;
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('rgp_chat');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MSGS;
  });
  const [chatInput, setChatInput] = useState('');
  const [clientChatOpen, setClientChatOpen] = useState(false);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rgp_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Filters & Modals
  const [roomFilter, setRoomFilter] = useState('all');
  const [menuFilter, setMenuFilter] = useState('all');
  const [clientSearch, setClientSearch] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [voucherData, setVoucherData] = useState<any>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);

  // Form states
  const [checkIn, setCheckIn] = useState('2026-08-25');
  const [checkOut, setCheckOut] = useState('2026-08-28');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [extraTransfer, setExtraTransfer] = useState(false);
  const [extraChampagne, setExtraChampagne] = useState(false);
  const [extraSpa, setExtraSpa] = useState(false);
  const [extraButler, setExtraButler] = useState(false);

  // Chauffeur Form
  const [chauffeurCar, setChauffeurCar] = useState('mercedes_maybach');
  const [chauffeurServiceType, setChauffeurServiceType] = useState('airport_vip');
  const [chauffeurPickup, setChauffeurPickup] = useState('Royal Grand Palace Asosiy Kirish');
  const [chauffeurContact, setChauffeurContact] = useState('');

  // Add Client Form
  const [newClientName, setNewClientName] = useState('');
  const [newClientTier, setNewClientTier] = useState<'Diamond VIP' | 'Royal Platinum' | 'Gold Elite'>('Royal Platinum');
  const [newClientRoom, setNewClientRoom] = useState('Suite 602');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');

  // Add Admin Form
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'Bosh Menejer' | 'VIP Concierge Lead' | 'Tizim Administratori' | 'Oshxona Boshlig\'i'>('VIP Concierge Lead');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminAccess, setNewAdminAccess] = useState<'Super Admin' | 'Menejer' | 'Operator'>('Menejer');

  // Room delivery
  const [roomNumber, setRoomNumber] = useState('');
  const [tableName, setTableName] = useState('');
  const [tableZone, setTableZone] = useState('terrace');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('rgp_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('rgp_admins', JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem('rgp_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('rgp_cart', JSON.stringify(cart));
  }, [cart]);

  // Currency Converter
  const formatMoney = (amountUSD: number) => {
    if (currency === 'UZS') return Math.round(amountUSD * 12850).toLocaleString('uz-UZ') + " so'm";
    if (currency === 'EUR') return '€' + Math.round(amountUSD * 0.92).toLocaleString('de-DE');
    return '$' + amountUSD.toLocaleString('en-US');
  };

  // Chat message send handler
  const handleSendMessage = (senderType: 'client' | 'admin') => {
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: senderType,
      senderName: senderType === 'client' ? 'Mehmon (Lord Alexander)' : 'VIP Concierge Boshqaruvi',
      text: chatInput.trim(),
      time: timeStr,
      isRead: false
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    notifications.show({
      title: 'Xabar yuborildi',
      message: `${newMsg.senderName}: "${newMsg.text}"`,
      color: senderType === 'client' ? 'gold' : 'teal'
    });
  };

  // Cart operations
  const addToCart = (dish: MenuItem) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.dish.id === dish.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { dish, quantity: 1 }];
    });
    notifications.show({
      title: 'Savatga qo\'shildi',
      message: `${dish.title} gurme savatchaga qo'shildi`,
      color: 'gold'
    });
    setCartDrawerOpen(true);
  };

  const updateCartQuantity = (dishId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.dish.id === dishId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  const cartTotalUSD = cart.reduce((sum, item) => sum + item.dish.priceUSD * item.quantity, 0);

  // Booking calculations
  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
    return isNaN(diff) || diff < 1 ? 1 : diff;
  };

  const calculateBookingTotal = () => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    let extras = 0;
    if (extraTransfer) extras += 150;
    if (extraChampagne) extras += 95;
    if (extraSpa) extras += 120;
    if (extraButler) extras += 80;
    return selectedRoom.priceUSD * nights + extras;
  };

  const handleRoomBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const voucher = {
      code: 'GP-' + Math.floor(10000 + Math.random() * 90000),
      guestName,
      roomTitle: selectedRoom.title,
      checkIn,
      checkOut,
      nights: calculateNights(),
      guests: guestCount,
      totalPrice: formatMoney(calculateBookingTotal())
    };

    // Auto add to clients
    const newCl: ClientUser = {
      id: 'cl-' + Date.now(),
      name: guestName,
      tier: 'Royal Platinum',
      room: selectedRoom.title,
      spentUSD: calculateBookingTotal(),
      phone: guestPhone,
      email: 'guest@vip.com',
      checkIn,
      checkOut,
      status: 'Joylashgan'
    };
    setClients(prev => [newCl, ...prev]);

    setVoucherData(voucher);
    setBookingModalOpen(false);
    setVoucherModalOpen(true);
    notifications.show({
      title: 'Bron Tasdiqlandi!',
      message: `Hurmatli ${guestName}, sizning vaucheringiz tayyorlandi.`,
      color: 'teal'
    });
  };

  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cl: ClientUser = {
      id: 'cl-' + Date.now(),
      name: newClientName,
      tier: newClientTier,
      room: newClientRoom,
      spentUSD: 8500,
      phone: newClientPhone,
      email: newClientEmail,
      checkIn: '2026-08-25',
      checkOut: '2026-09-01',
      status: 'Joylashgan'
    };
    setClients(prev => [cl, ...prev]);
    notifications.show({
      title: 'Yangi VIP Mijoz Qo\'shildi',
      message: `${newClientName} bazaga muvaffaqiyatli kiritildi`,
      color: 'gold'
    });
    setAddClientModalOpen(false);
    setNewClientName('');
    setNewClientPhone('');
    setNewClientEmail('');
  };

  const handleAddAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adm: AdminUser = {
      id: 'adm-' + Date.now(),
      name: newAdminName,
      role: newAdminRole,
      email: newAdminEmail,
      access: newAdminAccess,
      lastActive: 'Hozir faol'
    };
    setAdmins(prev => [adm, ...prev]);
    notifications.show({
      title: 'Yangi Admin Tayinlandi',
      message: `${newAdminName} tizimga ${newAdminRole} sifatida qo'shildi`,
      color: 'teal'
    });
    setAddAdminModalOpen(false);
    setNewAdminName('');
    setNewAdminEmail('');
  };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.room.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.tier.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const filteredRooms = roomFilter === 'all' ? rooms : rooms.filter(r => r.category === roomFilter);
  const filteredMenu = menuFilter === 'all' ? menu : menu.filter(m => m.category === menuFilter);

  return (
    <Box style={{ position: 'relative', minHeight: '100vh', background: '#080c14', color: '#f8fafc' }}>
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />
      <div className="ambient-glow glow-3" />

      {/* TOP NAVIGATION & PORTAL SWITCHER */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(8, 12, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '0.8rem 1.5rem'
      }}>
        <Container size="xl" px={0}>
          <Group justify="space-between">
            {/* Logo */}
            <Group gap="sm" style={{ cursor: 'pointer' }} onClick={() => setActivePortal('client')}>
              <Box style={{
                width: 42,
                height: 42,
                background: 'var(--gold-gradient)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0b0f19',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
              }}>
                <IconCrown size={24} />
              </Box>
              <Stack gap={0}>
                <Text style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, letterSpacing: 2, fontSize: '1.15rem', lineHeight: 1.1 }}>
                  ROYAL GRAND PALACE
                </Text>
                <Text size="xs" c="gold" fw={700} style={{ letterSpacing: 1.5 }}>
                  ★★★★★ RESORT & LUXURY SUITES
                </Text>
              </Stack>
            </Group>

            {/* Portal Switcher (Client vs Admin) */}
            <SegmentedControl
              value={activePortal}
              onChange={(val: any) => {
                setActivePortal(val);
                notifications.show({
                  title: val === 'admin' ? '🛡️ Admin & CRM Boshqaruv Markazi' : '👑 VIP Mehmon Portali',
                  message: `Rejim almashtirildi: ${val === 'admin' ? 'Boshqaruv Paneli' : 'Mehmon Ko\'rinishi'}`,
                  color: val === 'admin' ? 'blue' : 'gold'
                });
              }}
              data={[
                { label: '👑 VIP Mehmon Portali', value: 'client' },
                { label: '🛡️ Admin & CRM Markazi', value: 'admin' }
              ]}
              color={activePortal === 'admin' ? 'blue' : 'gold'}
              radius="md"
            />

            {/* Global Actions */}
            <Group gap="sm">
              <Menu shadow="md" width={140}>
                <Menu.Target>
                  <Button variant="default" size="xs" leftSection={<IconGlobe size={14} />}>
                    {lang.toUpperCase()}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => setLang('uz')}>🇺🇿 O'zbekcha</Menu.Item>
                  <Menu.Item onClick={() => setLang('en')}>🇬🇧 English</Menu.Item>
                  <Menu.Item onClick={() => setLang('ru')}>🇷🇺 Русский</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Menu shadow="md" width={130}>
                <Menu.Target>
                  <Button variant="default" size="xs">
                    {currency === 'USD' ? '$ USD' : currency === 'UZS' ? 'UZS so\'m' : '€ EUR'}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => setCurrency('USD')}>$ USD</Menu.Item>
                  <Menu.Item onClick={() => setCurrency('UZS')}>UZS so'm</Menu.Item>
                  <Menu.Item onClick={() => setCurrency('EUR')}>€ EUR</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {activePortal === 'client' && (
                <ActionIcon
                  variant="filled"
                  color="dark"
                  size="lg"
                  onClick={() => setCartDrawerOpen(true)}
                  style={{ border: '1px solid rgba(212, 175, 55, 0.4)', position: 'relative' }}
                >
                  <IconShoppingBag size={20} color="#d4af37" />
                  {cart.length > 0 && (
                    <Badge size="xs" circle color="red" style={{ position: 'absolute', top: -5, right: -5 }}>
                      {cart.reduce((s, i) => s + i.quantity, 0)}
                    </Badge>
                  )}
                </ActionIcon>
              )}

              <Button
                className="btn-gold"
                size="xs"
                leftSection={<IconSparkles size={16} />}
                onClick={() => {
                  setSelectedRoom(rooms[0]);
                  setBookingModalOpen(true);
                }}
              >
                Xona Band Qilish
              </Button>
            </Group>
          </Group>
        </Container>
      </header>

      {/* =========================================================================
          VIEW A: VIP MEHMON PORTALI (CLIENT EXPERIENCE)
          ========================================================================= */}
      {activePortal === 'client' && (
        <Box>
          {/* HERO SECTION */}
          <Box className="hero-section">
            <Container size="lg" style={{ position: 'relative', zIndex: 2 }}>
              <Badge
                size="lg"
                variant="outline"
                color="gold"
                leftSection={<IconCrown size={14} />}
                mb="lg"
                style={{ letterSpacing: 2, padding: '0.6rem 1.4rem' }}
              >
                5-YULDUZLI QIROLLIK HASHAMATI
              </Badge>

              <Title style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', lineHeight: 1.15, textShadow: '0 4px 30px rgba(0,0,0,0.9)' }} mb="md">
                ORZUYINGIZDAGI <span className="gold-gradient-text">ENG HASHAMATLI</span> MEHMONXONA
              </Title>

              <Text size="lg" c="gray.3" maw={820} mx="auto" mb="xl">
                Royal Grand Palace — 24/7 shaxsiy Butler va Concierge, Rolls-Royce va Maybach avtoparki hamda 3 ta Mishelin yulduzli gurme oshxona xizmati.
              </Text>

              <Group justify="center" gap="md" mb="xl">
                <Button size="lg" className="btn-gold" component="a" href="#rooms" leftSection={<IconBed size={20} />}>
                  Xonalarni Tanlash
                </Button>
                <Button size="lg" className="btn-outline-gold" component="a" href="#chauffeur" leftSection={<IconCar size={20} />}>
                  VIP Transfer Chaqirish
                </Button>
                <Button size="lg" variant="default" onClick={() => setClientChatOpen(true)} leftSection={<IconMessageDots size={20} color="#d4af37" />}>
                  Shaxsiy Butler bilan Chat
                </Button>
              </Group>

              {/* Quick Search Widget */}
              <Paper className="hero-search-box">
                <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} spacing="md">
                  <TextInput label="Kelish Sanasi" type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} leftSection={<IconCalendar size={16} />} />
                  <TextInput label="Ketish Sanasi" type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} leftSection={<IconCalendar size={16} />} />
                  <Select
                    label="Xona Toifasi"
                    value={roomFilter}
                    onChange={v => setRoomFilter(v || 'all')}
                    data={[
                      { value: 'all', label: 'Barcha Xonalar' },
                      { value: 'deluxe', label: 'Deluxe Suites' },
                      { value: 'presidential', label: 'Presidential Suites' },
                      { value: 'royal', label: 'Royal Penthouse' },
                      { value: 'villa', label: 'Private Villas' }
                    ]}
                  />
                  <Select
                    label="Mehmonlar"
                    value={guestCount}
                    onChange={v => setGuestCount(v || '2')}
                    data={[{ value: '1', label: '1 Mehmon' }, { value: '2', label: '2 Mehmon' }, { value: '4', label: '4+ Mehmon' }]}
                  />
                  <Button
                    className="btn-gold"
                    style={{ height: 'auto', alignSelf: 'flex-end', padding: '0.85rem' }}
                    leftSection={<IconSearch size={18} />}
                    onClick={() => {
                      document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Joy Tekshirish
                  </Button>
                </SimpleGrid>
              </Paper>
            </Container>
          </Box>

          {/* ROOMS CATALOG */}
          <Box className="section-container" id="rooms">
            <Container size="xl">
              <Stack align="center" ta="center" mb="xl">
                <span className="section-tag">HASHAMAT VA QULAYLIK</span>
                <h2 className="section-title">Qirollik Xonalari va Shaxsiy Villalar ({rooms.length})</h2>
                <Text className="section-desc">
                  Har bir xona shaxsiy did, zamonaviy Smart-Home tizimi, to'liq panelli dengiz manzarasi va 24/7 shaxsiy Butler xizmati bilan jihozlangan.
                </Text>

                <Tabs value={roomFilter} onChange={v => setRoomFilter(v || 'all')} mt="md">
                  <Tabs.List>
                    <Tabs.Tab value="all">Barchasi ({rooms.length})</Tabs.Tab>
                    <Tabs.Tab value="deluxe">Deluxe Suites</Tabs.Tab>
                    <Tabs.Tab value="presidential">Presidential Suites</Tabs.Tab>
                    <Tabs.Tab value="royal">Royal Penthouse</Tabs.Tab>
                    <Tabs.Tab value="villa">Private Villas</Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
                {filteredRooms.map(room => (
                  <Card key={room.id} className="luxury-card" padding="lg" radius="lg">
                    <Card.Section style={{ position: 'relative', height: 250, overflow: 'hidden' }}>
                      <Image src={room.image} alt={room.title} height={250} style={{ transition: 'transform 0.5s ease' }} />
                      <Badge style={{ position: 'absolute', top: 15, left: 15 }} color="dark" variant="filled">
                        {room.badge}
                      </Badge>
                      <Box style={{
                        position: 'absolute',
                        bottom: 15,
                        right: 15,
                        background: 'rgba(8, 12, 20, 0.9)',
                        border: '1px solid rgba(212, 175, 55, 0.5)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: 8
                      }}>
                        <Text fw={800} c="gold" size="lg" style={{ fontFamily: 'Cinzel, serif', display: 'inline-block' }}>
                          {formatMoney(room.priceUSD)}
                        </Text>
                        <Text size="xs" c="dimmed" span> / kecha</Text>
                      </Box>
                    </Card.Section>

                    <Stack mt="md" gap="xs">
                      <Title order={3} size="h4">{room.title}</Title>
                      <Text size="sm" c="dimmed" lineClamp={2}>{room.desc}</Text>
                      <Group gap="md" py="xs" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <Text size="xs" c="gray.4">{room.sqm} m²</Text>
                        <Text size="xs" c="gray.4">• {room.guests}</Text>
                        <Text size="xs" c="gray.4">• {room.bed}</Text>
                      </Group>
                      <Group gap={6} my="xs">
                        {room.amenities.map((a, i) => (
                          <Badge key={i} size="sm" variant="dot" color="gold">{a}</Badge>
                        ))}
                      </Group>
                      <Button
                        fullWidth
                        className="btn-gold"
                        mt="sm"
                        leftSection={<IconCheck size={16} />}
                        onClick={() => {
                          setSelectedRoom(room);
                          setBookingModalOpen(true);
                        }}
                      >
                        Joy Band Qilish
                      </Button>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Container>
          </Box>

          {/* CHAUFFEUR FLEET */}
          <Box className="section-container" id="chauffeur" style={{ background: 'rgba(15, 22, 38, 0.4)' }}>
            <Container size="xl">
              <Stack mb="xl">
                <span className="section-tag">PREMIUM TRANSFER</span>
                <h2 className="section-title">VIP Haydovchi va Hashamatli Avtopark ({fleet.length})</h2>
                <Text className="section-desc">
                  Aeroportdan VIP kutib olish, maxsus xizmat safari yoki shahar bo'ylab shaxsiy Rolls-Royce, Maybach va Bentley bilan qirollarga xos transfer.
                </Text>
              </Stack>

              <Grid>
                <Grid.Col span={{ base: 12, lg: 7 }}>
                  <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                    {fleet.map(car => (
                      <Card key={car.id} className="luxury-card" padding="sm">
                        <Card.Section style={{ position: 'relative', height: 140 }}>
                          <Image src={car.image} height={140} alt={car.name} />
                          <Badge style={{ position: 'absolute', top: 8, right: 8 }} color="gold" variant="filled" size="xs">
                            {formatMoney(car.priceUSD)}/kun
                          </Badge>
                        </Card.Section>
                        <Stack gap={4} mt="xs">
                          <Title order={5} size="xs" lineClamp={1}>{car.name}</Title>
                          <Text size="xs" c="dimmed">{car.seats} • {car.speed}</Text>
                          <Button
                            size="compact-xs"
                            variant="outline"
                            color="gold"
                            onClick={() => {
                              setChauffeurCar(car.id);
                              notifications.show({ title: 'Avtomobil tanlandi', message: car.name, color: 'gold' });
                            }}
                          >
                            Tanlash
                          </Button>
                        </Stack>
                      </Card>
                    ))}
                  </SimpleGrid>
                </Grid.Col>

                <Grid.Col span={{ base: 12, lg: 5 }}>
                  <Paper className="luxury-card" p="xl" style={{ border: '1px solid rgba(212, 175, 55, 0.4)' }}>
                    <Group gap="md" mb="lg">
                      <Box style={{ width: 44, height: 44, background: 'var(--gold-gradient)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0b0f19' }}>
                        <IconCar size={24} />
                      </Box>
                      <Stack gap={0}>
                        <Title order={3} size="h4">VIP Haydovchi Chaqirish</Title>
                        <Text size="xs" c="dimmed">24/7 tayyor diplomatik haydovchilar</Text>
                      </Stack>
                    </Group>

                    <Stack gap="sm">
                      <Select
                        label="Avtomobilni Tanlang"
                        value={chauffeurCar}
                        onChange={v => setChauffeurCar(v || 'mercedes_maybach')}
                        data={fleet.map(f => ({ value: f.id, label: `${f.name} (${formatMoney(f.priceUSD)}/kun)` }))}
                      />
                      <Select
                        label="Xizmat Turi"
                        value={chauffeurServiceType}
                        onChange={v => setChauffeurServiceType(v || 'airport_vip')}
                        data={[
                          { value: 'airport_vip', label: 'VIP Aeroport Transferi' },
                          { value: 'hourly_city', label: 'Shahar bo\'ylab soatbay (4+ soat)' },
                          { value: 'full_day', label: 'To\'liq kunlik xizmat (24 soat)' },
                          { value: 'intercity', label: 'Shaharlararo VIP sayohat' }
                        ]}
                      />
                      <TextInput label="Olish Manzili" value={chauffeurPickup} onChange={e => setChauffeurPickup(e.target.value)} required />
                      <TextInput label="Telefon & Ism" value={chauffeurContact} onChange={e => setChauffeurContact(e.target.value)} placeholder="+998 90 123 45 67 (Alisher Qodirov)" required />
                      <Button
                        className="btn-gold"
                        size="md"
                        onClick={() => {
                          notifications.show({ title: 'VIP Transfer Tasdiqlandi', message: 'Haydovchi belgilangan vaqtda yetib boradi.', color: 'gold' });
                          setChauffeurContact('');
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

          {/* GOURMET RESTAURANT */}
          <Box className="section-container" id="restaurant">
            <Container size="xl">
              <Stack align="center" ta="center" mb="xl">
                <span className="section-tag">GURME OSHXONA & RESTORAN</span>
                <h2 className="section-title">Mishelin Yulduzli Gurme Menyu ({menu.length})</h2>
                <Text className="section-desc">24 soatlik xonaga yetkazish xizmati va restoranda stol band qilish imkoniyati.</Text>

                <Group justify="space-between" w="100%" p="md" style={{ background: 'rgba(18,27,46,0.6)', borderRadius: 14 }}>
                  <Group gap="xl">
                    <Text size="sm"><IconClock size={16} /> Yetkazish: 20-30 daqiqa</Text>
                    <Text size="sm"><IconStar size={16} /> 3 Mishelin Oshpazlar</Text>
                  </Group>
                  <Button variant="outline" color="gold" onClick={() => setTableModalOpen(true)}>
                    Restoranda Stol Band Qilish
                  </Button>
                </Group>

                <Tabs value={menuFilter} onChange={v => setMenuFilter(v || 'all')} mt="md">
                  <Tabs.List>
                    <Tabs.Tab value="all">Barchasi</Tabs.Tab>
                    <Tabs.Tab value="mains">Asosiy Taomlar & Steyk</Tabs.Tab>
                    <Tabs.Tab value="seafood">Dengiz Mahsulotlari & Ikra</Tabs.Tab>
                    <Tabs.Tab value="breakfast">Qirollik Nonushtasi</Tabs.Tab>
                    <Tabs.Tab value="desserts">24K Shirinliklar</Tabs.Tab>
                    <Tabs.Tab value="drinks">Vintage Shampanlar</Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </Stack>

              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
                {filteredMenu.map(dish => (
                  <Card key={dish.id} className="luxury-card" padding="sm">
                    <Card.Section style={{ position: 'relative', height: 180 }}>
                      <Image src={dish.image} height={180} alt={dish.title} />
                      <Badge style={{ position: 'absolute', top: 10, left: 10 }} color="gold" variant="filled" size="xs">
                        {dish.badge}
                      </Badge>
                    </Card.Section>
                    <Stack mt="xs" gap={4}>
                      <Group justify="space-between">
                        <Title order={5} size="sm" lineClamp={1}>{dish.title}</Title>
                        <Text fw={800} c="gold" size="sm">{formatMoney(dish.priceUSD)}</Text>
                      </Group>
                      <Text size="xs" c="dimmed" lineClamp={2}>{dish.desc}</Text>
                      <Button size="xs" className="btn-gold" mt="xs" onClick={() => addToCart(dish)}>
                        Savatga Qo'shish
                      </Button>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Container>
          </Box>

          {/* FLOATING BUTLER CHAT BUTTON (FOR CLIENTS) */}
          <Box style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
            <Button
              className="btn-gold"
              size="lg"
              radius="xl"
              leftSection={<IconMessageDots size={22} />}
              onClick={() => setClientChatOpen(true)}
              style={{ boxShadow: '0 10px 35px rgba(212, 175, 55, 0.6)' }}
            >
              Shaxsiy Butler Chat
              {chatMessages.filter(m => m.sender === 'admin' && !m.isRead).length > 0 && (
                <Badge size="xs" circle color="red" ml="xs">
                  {chatMessages.filter(m => m.sender === 'admin' && !m.isRead).length}
                </Badge>
              )}
            </Button>
          </Box>
        </Box>
      )}

      {/* =========================================================================
          VIEW B: ADMIN & CRM BOSHQARUV MARKAZI (ADMIN MANAGEMENT & CRM)
          ========================================================================= */}
      {activePortal === 'admin' && (
        <Box py="xl">
          <Container size="xl">
            {/* Top Admin Bar */}
            <Group justify="space-between" mb="xl" p="lg" style={{ background: 'rgba(18,27,46,0.85)', borderRadius: 16, border: '1px solid rgba(56,189,248,0.3)' }}>
              <Stack gap={2}>
                <Group gap="xs">
                  <Badge color="blue" size="lg" leftSection={<IconShieldCheck size={16} />}>ADMIN & CRM OPERATSIYALAR MARKAZI</Badge>
                  <Badge color="teal" variant="dot">Jonli Tizim Faol</Badge>
                </Group>
                <Title order={2} style={{ fontFamily: 'Cinzel, serif' }}>Mehmonxona boshqaruvi, Mijozlar CRM va Jonli Aloqa</Title>
              </Stack>
              <Group>
                <Button className="btn-gold" leftSection={<IconUserPlus size={16} />} onClick={() => setAddClientModalOpen(true)}>
                  Yangi VIP Mijoz Qo'shish
                </Button>
                <Button variant="outline" color="blue" leftSection={<IconIdBadge2 size={16} />} onClick={() => setAddAdminModalOpen(true)}>
                  Yangi Admin/Menejer
                </Button>
              </Group>
            </Group>

            {/* Admin Metric Cards */}
            <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md" mb="xl">
              <Card p="md" style={{ background: 'rgba(8,12,20,0.8)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 14 }}>
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">Faol VIP Mijozlar</Text>
                    <Title order={2} c="gold" style={{ fontFamily: 'Cinzel, serif' }}>{clients.length} nafar</Title>
                    <Text size="xs" c="teal">+2 yangi kelgan</Text>
                  </Stack>
                  <IconUsers size={32} color="#d4af37" />
                </Group>
              </Card>
              <Card p="md" style={{ background: 'rgba(8,12,20,0.8)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 14 }}>
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">Jami Tushum (Revenue)</Text>
                    <Title order={2} c="blue" style={{ fontFamily: 'Cinzel, serif' }}>
                      {formatMoney(clients.reduce((s, c) => s + c.spentUSD, 0))}
                    </Title>
                    <Text size="xs" c="teal">Oy bo'yicha yuqori</Text>
                  </Stack>
                  <IconDiamond size={32} color="#38bdf8" />
                </Group>
              </Card>
              <Card p="md" style={{ background: 'rgba(8,12,20,0.8)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 14 }}>
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">Tizim Administratorlari</Text>
                    <Title order={2} c="teal" style={{ fontFamily: 'Cinzel, serif' }}>{admins.length} nafar</Title>
                    <Text size="xs" c="dimmed">Barcha smenalar to'liq</Text>
                  </Stack>
                  <IconShieldCheck size={32} color="#10b981" />
                </Group>
              </Card>
              <Card p="md" style={{ background: 'rgba(8,12,20,0.8)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 14 }}>
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">Muloqot Xabarlari</Text>
                    <Title order={2} c="grape" style={{ fontFamily: 'Cinzel, serif' }}>{chatMessages.length} ta</Title>
                    <Text size="xs" c="gold">Jonli muloqot faol</Text>
                  </Stack>
                  <IconMessageDots size={32} color="#a855f7" />
                </Group>
              </Card>
            </SimpleGrid>

            {/* Split: Left CRM Clients & Admins, Right Live Chat Center */}
            <Grid>
              {/* Left Column: VIP Clients Database & Admins Table */}
              <Grid.Col span={{ base: 12, lg: 7 }}>
                {/* 1. VIP Clients CRM */}
                <Paper className="luxury-card" p="lg" mb="xl">
                  <Group justify="space-between" mb="md">
                    <Stack gap={0}>
                      <Title order={4} size="h5" c="gold">VIP Mehmonlar Ro'yxati (Client CRM Database)</Title>
                      <Text size="xs" c="dimmed">Ro'yxatdan o'tgan barcha VIP mijozlar, ularning xonalari va balansi</Text>
                    </Stack>
                    <Button size="xs" className="btn-gold" leftSection={<IconUserPlus size={14} />} onClick={() => setAddClientModalOpen(true)}>
                      Mijoz Qo'shish
                    </Button>
                  </Group>

                  <TextInput
                    placeholder="Mijoz ismi, xonasi yoki maqomi bo'yicha qidirish..."
                    value={clientSearch}
                    onChange={e => setClientSearch(e.target.value)}
                    leftSection={<IconSearch size={16} />}
                    mb="md"
                  />

                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>VIP Mehmon</Table.Th>
                        <Table.Th>Xona & Maqom</Table.Th>
                        <Table.Th>Jami Sarf</Table.Th>
                        <Table.Th>Holati</Table.Th>
                        <Table.Th>Amallar</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {filteredClients.map(cl => (
                        <Table.Tr key={cl.id}>
                          <Table.Td>
                            <Group gap="xs">
                              <Avatar color="gold" radius="xl">{cl.name.charAt(0)}</Avatar>
                              <Stack gap={0}>
                                <Text size="sm" fw={700}>{cl.name}</Text>
                                <Text size="xs" c="dimmed">{cl.phone}</Text>
                              </Stack>
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <Text size="xs" fw={700}>{cl.room}</Text>
                            <Badge size="xs" color="gold" variant="light">{cl.tier}</Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="xs" fw={800} c="gold">{formatMoney(cl.spentUSD)}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge size="xs" color={cl.status === 'Joylashgan' ? 'teal' : 'blue'}>{cl.status}</Badge>
                          </Table.Td>
                          <Table.Td>
                            <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="red"
                              onClick={() => {
                                setClients(prev => prev.filter(c => c.id !== cl.id));
                                notifications.show({ title: 'Mijoz o\'chirildi', message: `${cl.name} o'chirildi`, color: 'red' });
                              }}
                            >
                              <IconTrash size={14} />
                            </ActionIcon>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Paper>

                {/* 2. Admin & Staff Team Table */}
                <Paper className="luxury-card" p="lg">
                  <Group justify="space-between" mb="md">
                    <Stack gap={0}>
                      <Title order={4} size="h5" c="blue">Mehmonxona Administratorlari va Menejerlar</Title>
                      <Text size="xs" c="dimmed">Tizimga kirish huquqiga ega boshqaruv xodimlari</Text>
                    </Stack>
                    <Button size="xs" variant="outline" color="blue" leftSection={<IconIdBadge2 size={14} />} onClick={() => setAddAdminModalOpen(true)}>
                      Admin Qo'shish
                    </Button>
                  </Group>

                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Xodim</Table.Th>
                        <Table.Th>Lavozim</Table.Th>
                        <Table.Th>Huquq</Table.Th>
                        <Table.Th>Holati</Table.Th>
                        <Table.Th>O'chirish</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {admins.map(adm => (
                        <Table.Tr key={adm.id}>
                          <Table.Td>
                            <Group gap="xs">
                              <Avatar color="blue" radius="xl">{adm.name.charAt(0)}</Avatar>
                              <Stack gap={0}>
                                <Text size="sm" fw={700}>{adm.name}</Text>
                                <Text size="xs" c="dimmed">{adm.email}</Text>
                              </Stack>
                            </Group>
                          </Table.Td>
                          <Table.Td><Text size="xs">{adm.role}</Text></Table.Td>
                          <Table.Td><Badge size="xs" color="blue">{adm.access}</Badge></Table.Td>
                          <Table.Td><Text size="xs" c="teal">{adm.lastActive}</Text></Table.Td>
                          <Table.Td>
                            <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="red"
                              onClick={() => {
                                setAdmins(prev => prev.filter(a => a.id !== adm.id));
                              }}
                            >
                              <IconTrash size={14} />
                            </ActionIcon>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Paper>
              </Grid.Col>

              {/* Right Column: Live Chat & Communication Center (Admin <-> Client) */}
              <Grid.Col span={{ base: 12, lg: 5 }}>
                <Paper className="luxury-card" p="lg" style={{ border: '1px solid rgba(212, 175, 55, 0.4)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Group justify="space-between" pb="sm" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} mb="md">
                    <Group gap="xs">
                      <div className="pulse-indicator" />
                      <Stack gap={0}>
                        <Title order={4} size="h5" c="gold">Jonli Muloqot Markazi (Client &lt;-&gt; Admin Chat)</Title>
                        <Text size="xs" c="dimmed">Mijozlar bilan tezkor aloqa va xizmat so'rovlari</Text>
                      </Stack>
                    </Group>
                    <Badge color="gold">{chatMessages.length} xabar</Badge>
                  </Group>

                  {/* Messages Stream */}
                  <ScrollArea h={420} pr="sm" mb="md">
                    <Stack gap="sm">
                      {chatMessages.map(msg => (
                        <Box
                          key={msg.id}
                          p="sm"
                          style={{
                            background: msg.sender === 'client' ? 'rgba(212, 175, 55, 0.12)' : 'rgba(56, 189, 248, 0.12)',
                            borderRadius: 10,
                            borderLeft: `4px solid ${msg.sender === 'client' ? '#d4af37' : '#38bdf8'}`,
                            marginLeft: msg.sender === 'admin' ? 30 : 0,
                            marginRight: msg.sender === 'client' ? 30 : 0
                          }}
                        >
                          <Group justify="space-between" mb={2}>
                            <Text size="xs" fw={700} c={msg.sender === 'client' ? 'gold' : 'blue'}>
                              {msg.senderName} {msg.sender === 'client' ? '👑' : '🛡️'}
                            </Text>
                            <Text size="xs" c="dimmed">{msg.time}</Text>
                          </Group>
                          <Text size="sm">{msg.text}</Text>
                        </Box>
                      ))}
                    </Stack>
                  </ScrollArea>

                  {/* Admin Reply Box */}
                  <Stack gap="xs" mt="auto">
                    <Text size="xs" fw={700} c="dimmed">Admin nomidan tezkor javob yozish:</Text>
                    <Group gap="xs">
                      <TextInput
                        placeholder="Mehmon bilan muloqot qiling..."
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage('admin')}
                        style={{ flexGrow: 1 }}
                      />
                      <Button className="btn-gold" onClick={() => handleSendMessage('admin')} leftSection={<IconSend size={16} />}>
                        Yuborish
                      </Button>
                    </Group>
                  </Stack>
                </Paper>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
      )}

      {/* =========================================================================
          CLIENT LIVE CHAT DRAWER (CLIENT VIEW)
          ========================================================================= */}
      <Drawer
        opened={clientChatOpen}
        onClose={() => setClientChatOpen(false)}
        title={
          <Group gap="xs">
            <IconCrown color="#d4af37" size={22} />
            <Title order={4} size="h5" c="gold">24/7 Shaxsiy Butler & Concierge Desk</Title>
          </Group>
        }
        position="right"
        size="md"
        styles={{ content: { background: '#0f1626' } }}
      >
        <Stack justify="space-between" h="calc(100vh - 90px)">
          <ScrollArea h="calc(100vh - 220px)" pr="sm">
            <Stack gap="sm">
              {chatMessages.map(msg => (
                <Box
                  key={msg.id}
                  p="sm"
                  style={{
                    background: msg.sender === 'client' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                    borderRadius: 10,
                    borderLeft: `4px solid ${msg.sender === 'client' ? '#d4af37' : '#38bdf8'}`
                  }}
                >
                  <Group justify="space-between" mb={2}>
                    <Text size="xs" fw={700} c={msg.sender === 'client' ? 'gold' : 'blue'}>{msg.senderName}</Text>
                    <Text size="xs" c="dimmed">{msg.time}</Text>
                  </Group>
                  <Text size="sm">{msg.text}</Text>
                </Box>
              ))}
            </Stack>
          </ScrollArea>

          <Stack gap="xs" pt="sm" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Text size="xs" c="dimmed">Tezkor so'rovlar: Xona tozalash, Restoran buyurtmasi, Shaxsiy transfer</Text>
            <Group gap="xs">
              <TextInput
                placeholder="Butlerga xabar qoldiring..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage('client')}
                style={{ flexGrow: 1 }}
              />
              <Button className="btn-gold" onClick={() => handleSendMessage('client')}>
                <IconSend size={16} />
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Drawer>

      {/* =========================================================================
          MODALS
          ========================================================================= */}

      {/* 1. Add Client Modal */}
      <Modal
        opened={addClientModalOpen}
        onClose={() => setAddClientModalOpen(false)}
        title={<Title order={3} size="h4" c="gold">Yangi VIP Mehmonni Ro'yxatga Olish (CRM)</Title>}
        centered
        styles={{ content: { background: '#0f1626', border: '1px solid #d4af37' } }}
      >
        <form onSubmit={handleAddClientSubmit}>
          <Stack gap="md">
            <TextInput label="Mijoz To'liq Ismi" value={newClientName} onChange={e => setNewClientName(e.target.value)} placeholder="Lord Alexander Wright" required />
            <Select
              label="VIP Maqomi (Tier)"
              value={newClientTier}
              onChange={(v: any) => setNewClientTier(v)}
              data={[
                { value: 'Diamond VIP', label: '💎 Diamond VIP (Qirollik darajasi)' },
                { value: 'Royal Platinum', label: '👑 Royal Platinum' },
                { value: 'Gold Elite', label: '⭐ Gold Elite' }
              ]}
            />
            <TextInput label="Tayinlangan Xona" value={newClientRoom} onChange={e => setNewClientRoom(e.target.value)} placeholder="Suite 701 (Presidential)" required />
            <TextInput label="Telefon Raqam" value={newClientPhone} onChange={e => setNewClientPhone(e.target.value)} placeholder="+44 7911 123456" required />
            <TextInput label="Email" value={newClientEmail} onChange={e => setNewClientEmail(e.target.value)} placeholder="guest@vip.com" required />
            <Button type="submit" fullWidth className="btn-gold" size="md">Mijozni Saqlash</Button>
          </Stack>
        </form>
      </Modal>

      {/* 2. Add Admin Modal */}
      <Modal
        opened={addAdminModalOpen}
        onClose={() => setAddAdminModalOpen(false)}
        title={<Title order={3} size="h4" c="blue">Yangi Admin / Menejer Tayinlash</Title>}
        centered
        styles={{ content: { background: '#0f1626', border: '1px solid #38bdf8' } }}
      >
        <form onSubmit={handleAddAdminSubmit}>
          <Stack gap="md">
            <TextInput label="Admin / Menejer Ismi" value={newAdminName} onChange={e => setNewAdminName(e.target.value)} placeholder="Bobur Mirzaev" required />
            <Select
              label="Lavozimi"
              value={newAdminRole}
              onChange={(v: any) => setNewAdminRole(v)}
              data={[
                { value: 'Bosh Menejer', label: 'Bosh Menejer (General Manager)' },
                { value: 'VIP Concierge Lead', label: 'VIP Concierge Lead' },
                { value: 'Tizim Administratori', label: 'Tizim Administratori' },
                { value: 'Oshxona Boshlig\'i', label: 'Oshxona Boshlig\'i (Executive Chef)' }
              ]}
            />
            <TextInput label="Email Manzili" value={newAdminEmail} onChange={e => setNewAdminEmail(e.target.value)} placeholder="admin@royalgrandpalace.com" required />
            <Select
              label="Ruxsat Huquqi"
              value={newAdminAccess}
              onChange={(v: any) => setNewAdminAccess(v)}
              data={[
                { value: 'Super Admin', label: 'Super Admin (Cheksiz)' },
                { value: 'Menejer', label: 'Menejer (Boshqaruv)' },
                { value: 'Operator', label: 'Operator (Faqat xizmat)' }
              ]}
            />
            <Button type="submit" fullWidth color="blue" size="md">Adminni Saqlash</Button>
          </Stack>
        </form>
      </Modal>

      {/* 3. Room Booking Modal */}
      <Modal
        opened={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={<Title order={3} size="h4" c="gold">VIP Xonani Band Qilish</Title>}
        size="lg"
        centered
        styles={{ content: { background: '#0f1626', border: '1px solid #d4af37' } }}
      >
        {selectedRoom && (
          <form onSubmit={handleRoomBookSubmit}>
            <Stack gap="md">
              <Group p="sm" style={{ background: 'rgba(8,12,20,0.7)', borderRadius: 8 }}>
                <Image src={selectedRoom.image} width={100} height={70} radius="md" />
                <Stack gap={2}>
                  <Title order={4} size="h5">{selectedRoom.title}</Title>
                  <Text size="xs" c="gold" fw={700}>{formatMoney(selectedRoom.priceUSD)} / kecha</Text>
                </Stack>
              </Group>

              <SimpleGrid cols={2}>
                <TextInput label="Kelish Sanasi" type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
                <TextInput label="Ketish Sanasi" type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
              </SimpleGrid>

              <TextInput label="Passport bo'yicha To'liq Ism" placeholder="Alisher Qodirov" value={guestName} onChange={e => setGuestName(e.target.value)} required />
              <SimpleGrid cols={2}>
                <TextInput label="Telefon Raqam" placeholder="+998 90 123 45 67" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} required />
                <Select label="Mehmonlar" value={guestCount} onChange={v => setGuestCount(v || '2')} data={[{ value: '1', label: '1 Kishi' }, { value: '2', label: '2 Kishi' }, { value: '4', label: '4+ Kishi' }]} />
              </SimpleGrid>

              <Box p="sm" style={{ background: 'rgba(8,12,20,0.6)', borderRadius: 8 }}>
                <Text size="xs" fw={700} c="gold" mb="xs">Qo'shimcha VIP Xizmatlar:</Text>
                <SimpleGrid cols={2} spacing="xs">
                  <Checkbox checked={extraTransfer} onChange={e => setExtraTransfer(e.currentTarget.checked)} label="Rolls-Royce Transfer (+$150)" />
                  <Checkbox checked={extraChampagne} onChange={e => setExtraChampagne(e.currentTarget.checked)} label="Dom Pérignon Shampan (+$95)" />
                  <Checkbox checked={extraSpa} onChange={e => setExtraSpa(e.currentTarget.checked)} label="VIP Spa Kirish (+$120)" />
                  <Checkbox checked={extraButler} onChange={e => setExtraButler(e.currentTarget.checked)} label="24/7 Shaxsiy Butler (+$80)" />
                </SimpleGrid>
              </Box>

              <Group justify="space-between" p="md" style={{ background: 'rgba(8,12,20,0.9)', borderRadius: 8, border: '1px solid rgba(212,175,55,0.4)' }}>
                <Stack gap={0}>
                  <Text size="xs" c="dimmed">Kechalar soni: {calculateNights()} kecha</Text>
                  <Text size="md" fw={700}>Jami To'lov:</Text>
                </Stack>
                <Title order={2} c="gold" style={{ fontFamily: 'Cinzel, serif' }}>{formatMoney(calculateBookingTotal())}</Title>
              </Group>

              <Button type="submit" fullWidth className="btn-gold" size="lg">
                Band Qilishni Tasdiqlash & Vaucher Olish
              </Button>
            </Stack>
          </form>
        )}
      </Modal>

      {/* 4. Voucher Modal */}
      <Modal
        opened={voucherModalOpen}
        onClose={() => setVoucherModalOpen(false)}
        size="md"
        centered
        withCloseButton={false}
        styles={{ content: { background: '#0b111e', border: '2px solid #d4af37', padding: 0 } }}
      >
        {voucherData && (
          <Box p="xl" ta="center">
            <Box style={{ width: 48, height: 48, background: 'var(--gold-gradient)', borderRadius: '50%', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
              <IconCrown size={26} />
            </Box>
            <Title order={3} style={{ fontFamily: 'Cinzel, serif' }}>ROYAL GRAND PALACE</Title>
            <Badge color="teal" variant="light" size="sm" mt="xs" mb="md">RASMIY VIP BRON VAUCHERI (CONFIRMED)</Badge>

            <Box p="xs" my="md" style={{ border: '1px dashed #d4af37', borderRadius: 8, background: 'rgba(212,175,55,0.1)' }}>
              <Text fw={800} size="xl" c="gold" style={{ letterSpacing: 4 }}>{voucherData.code}</Text>
            </Box>

            <Stack gap="xs" ta="left" p="md" style={{ background: 'rgba(8,12,20,0.8)', borderRadius: 8 }} mb="lg">
              <Group justify="space-between"><Text size="xs" c="dimmed">Mehmon:</Text><Text size="xs" fw={700}>{voucherData.guestName}</Text></Group>
              <Group justify="space-between"><Text size="xs" c="dimmed">Xona:</Text><Text size="xs" fw={700}>{voucherData.roomTitle}</Text></Group>
              <Group justify="space-between"><Text size="xs" c="dimmed">Muddat:</Text><Text size="xs" fw={700}>{voucherData.checkIn} — {voucherData.checkOut} ({voucherData.nights} kecha)</Text></Group>
              <Group justify="space-between"><Text size="xs" c="dimmed">Jami Summa:</Text><Text size="sm" fw={800} c="gold">{voucherData.totalPrice}</Text></Group>
            </Stack>

            <Group justify="center" gap="md" mb="lg">
              <IconQrcode size={48} color="#d4af37" />
              <Text size="xs" c="dimmed">Mehmonxonaga kelganda ushbu vaucherni taqdim eting</Text>
            </Group>

            <Group gap="sm">
              <Button fullWidth className="btn-gold" leftSection={<IconPrinter size={16} />} onClick={() => window.print()}>
                Chop Etish / Saqlash
              </Button>
              <Button fullWidth variant="default" onClick={() => setVoucherModalOpen(false)}>
                Tayyor
              </Button>
            </Group>
          </Box>
        )}
      </Modal>

      {/* 5. Cart Drawer */}
      <Drawer
        opened={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        title={<Title order={3} size="h4" c="gold"><IconShoppingBag size={20} /> Gurme Oshxona Savatchasi</Title>}
        position="right"
        styles={{ content: { background: '#0f1626' } }}
      >
        <Stack justify="space-between" h="calc(100vh - 100px)">
          <Stack gap="md" style={{ overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <Stack align="center" mt="xl" c="dimmed">
                <IconToolsKitchen2 size={48} />
                <Text size="sm">Savatchangiz bo'sh. Mazali gurme taomlarni tanlang!</Text>
              </Stack>
            ) : (
              cart.map(item => (
                <Group key={item.dish.id} justify="space-between" p="xs" style={{ background: 'rgba(8,12,20,0.7)', borderRadius: 8 }}>
                  <Image src={item.dish.image} width={50} height={50} radius="sm" />
                  <Stack gap={2} style={{ flexGrow: 1 }}>
                    <Text size="sm" fw={700}>{item.dish.title}</Text>
                    <Text size="xs" c="gold">{formatMoney(item.dish.priceUSD)}</Text>
                  </Stack>
                  <Group gap={4}>
                    <ActionIcon size="sm" variant="default" onClick={() => updateCartQuantity(item.dish.id, -1)}>-</ActionIcon>
                    <Text size="xs" fw={700}>{item.quantity}</Text>
                    <ActionIcon size="sm" variant="default" onClick={() => updateCartQuantity(item.dish.id, 1)}>+</ActionIcon>
                  </Group>
                </Group>
              ))
            )}
          </Stack>

          <Stack gap="md" pt="md" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <TextInput label="Yetkazish Xonasi" placeholder="Masalan: Suite 701 yoki Villa 4" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} required />
            <Group justify="space-between">
              <Text fw={700}>Jami:</Text>
              <Title order={3} c="gold" style={{ fontFamily: 'Cinzel, serif' }}>{formatMoney(cartTotalUSD)}</Title>
            </Group>
            <Button
              fullWidth
              className="btn-gold"
              size="md"
              onClick={() => {
                if (cart.length === 0 || !roomNumber.trim()) return;
                notifications.show({ title: 'Buyurtma Yetkazilmoqda', message: `Taomlar 20-30 daqiqada ${roomNumber} ga yetkaziladi!`, color: 'teal' });
                setCart([]);
                setCartDrawerOpen(false);
                setRoomNumber('');
              }}
            >
              Xonaga Buyurtma Berish
            </Button>
          </Stack>
        </Stack>
      </Drawer>

      {/* 6. Table Reservation Modal */}
      <Modal
        opened={tableModalOpen}
        onClose={() => setTableModalOpen(false)}
        title={<Title order={3} size="h4" c="gold">Restoranda Stol Band Qilish</Title>}
        centered
        styles={{ content: { background: '#0f1626' } }}
      >
        <Stack gap="md">
          <TextInput label="Ism va Familiya" value={tableName} onChange={e => setTableName(e.target.value)} placeholder="Lord Alexander Wright" required />
          <Select
            label="Joylashuv Hududi"
            value={tableZone}
            onChange={v => setTableZone(v || 'terrace')}
            data={[
              { value: 'terrace', label: 'Panoramik Ochiq Terrasa (Dengiz manzarasi)' },
              { value: 'vip_hall', label: 'Royal VIP Zali (Jonli Royal Pianino)' },
              { value: 'sommelier', label: 'Sommelier Tasting Zonasi' }
            ]}
          />
          <TextInput label="Sana va Vaqt" type="datetime-local" defaultValue="2026-08-25T19:30" required />
          <Button
            className="btn-gold"
            onClick={() => {
              notifications.show({ title: 'Stol Band Qilindi', message: `Hurmatli ${tableName || 'Mehmon'}, stolingiz tasdiqlandi.`, color: 'teal' });
              setTableModalOpen(false);
              setTableName('');
            }}
          >
            Stolni Tasdiqlash
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
}
