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
  Divider,
  Paper,
  Tooltip
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCrown,
  IconBed,
  IconCar,
  IconCarSuv,
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
  IconRefresh,
  IconPlus,
  IconStar,
  IconCheck,
  IconPrinter,
  IconQrcode,
  IconHelicopter,
  IconSailboat,
  IconBuildingSkyscraper
} from '@tabler/icons-react';

// --- DATA TYPES ---
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

interface StaffMember {
  id: string;
  name: string;
  role: string;
  dept: string;
  shift: string;
  status: 'Navbatchilikda' | 'Dam olishda' | 'Tanaffusda';
  rating: string;
  phone: string;
}

interface CartItem {
  dish: MenuItem;
  quantity: number;
}

// Initial Data
const INITIAL_ROOMS: Room[] = [
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

const INITIAL_FLEET: FleetItem[] = [
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
  }
];

const INITIAL_MENU: MenuItem[] = [
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
  }
];

const INITIAL_STAFF: StaffMember[] = [
  { id: 'emp-1', name: 'Jasur Karimov', role: 'Bosh Konsyerj & VIP Protokol', dept: 'Qabulxona & Konsyerj', shift: 'Kunduzgi (08:00 - 18:00)', status: 'Navbatchilikda', rating: '5.0 ★', phone: '+998 90 111 22 33' },
  { id: 'emp-2', name: 'Alain Ducasse', role: 'Bosh Oshpaz (Executive Chef 3★)', dept: 'Oshxona & Restoran', shift: 'Moslashuvchan', status: 'Navbatchilikda', rating: '5.0 ★', phone: '+998 90 222 33 44' },
  { id: 'emp-3', name: 'Alisher Rustamov', role: 'Katta VIP Haydovchi (Rolls Fleet)', dept: 'VIP Haydovchilar', shift: '24/7 Navbatchilik', status: 'Navbatchilikda', rating: '4.9 ★', phone: '+998 90 333 44 55' },
  { id: 'emp-4', name: 'Madina Umarova', role: 'Gouvernante Generale (Head Housekeeping)', dept: 'Xona Xizmati & Tozalik', shift: 'Kunduzgi (08:00 - 18:00)', status: 'Navbatchilikda', rating: '4.9 ★', phone: '+998 90 444 55 66' },
  { id: 'emp-5', name: 'Sardor Maxmudov', role: 'Xavfsizlik Boshlig\'i & Protokol', dept: 'Xavfsizlik & Muhandislik', shift: 'Tungi (18:00 - 08:00)', status: 'Navbatchilikda', rating: '5.0 ★', phone: '+998 90 555 66 77' },
  { id: 'emp-6', name: 'Yelena Smirnova', role: 'Bosh Spa Terapevt & Balneolog', dept: 'Spa & Salomatlik', shift: 'Kunduzgi (08:00 - 18:00)', status: 'Dam olishda', rating: '4.8 ★', phone: '+998 90 666 77 88' }
];

export default function App() {
  const [currency, setCurrency] = useState<'USD' | 'UZS' | 'EUR'>('USD');
  const [lang, setLang] = useState<'uz' | 'en' | 'ru'>('uz');
  
  // Data States
  const [rooms] = useState<Room[]>(INITIAL_ROOMS);
  const [fleet] = useState<FleetItem[]>(INITIAL_FLEET);
  const [menu] = useState<MenuItem[]>(INITIAL_MENU);
  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('rgp_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rgp_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Activity Feed
  const [activityFeed, setActivityFeed] = useState<string[]>([
    'Royal Penthouse Suite uchun yangi VIP rezervatsiya tasdiqlandi',
    'Rolls-Royce Phantom aeroport VIP terminaliga jo\'natildi',
    'Oshxonadan Mishelin Wagyu taomiga buyurtma berildi (Suite 504)'
  ]);

  // Filters & Search
  const [roomFilter, setRoomFilter] = useState<string>('all');
  const [menuFilter, setMenuFilter] = useState<string>('all');
  const [staffDeptFilter, setStaffDeptFilter] = useState<string>('all');
  const [staffSearch, setStaffSearch] = useState<string>('');

  // Modals
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [voucherData, setVoucherData] = useState<any>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [addStaffModalOpen, setAddStaffModalOpen] = useState(false);

  // Booking Form State
  const [checkIn, setCheckIn] = useState<string>('2026-08-25');
  const [checkOut, setCheckOut] = useState<string>('2026-08-28');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('2');
  const [extraTransfer, setExtraTransfer] = useState(false);
  const [extraChampagne, setExtraChampagne] = useState(false);
  const [extraSpa, setExtraSpa] = useState(false);
  const [extraButler, setExtraButler] = useState(false);

  // Chauffeur Form State
  const [chauffeurCar, setChauffeurCar] = useState<string>('mercedes_maybach');
  const [chauffeurServiceType, setChauffeurServiceType] = useState<string>('airport_vip');
  const [chauffeurPickup, setChauffeurPickup] = useState<string>('Royal Grand Palace Asosiy Kirish');
  const [chauffeurContact, setChauffeurContact] = useState<string>('');

  // Table Reservation State
  const [tableName, setTableName] = useState<string>('');
  const [tableZone, setTableZone] = useState<string>('terrace');

  // Add Staff State
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('');
  const [newStaffDept, setNewStaffDept] = useState('Qabulxona & Konsyerj');
  const [newStaffShift, setNewStaffShift] = useState('Kunduzgi (08:00 - 18:00)');
  const [newStaffPhone, setNewStaffPhone] = useState('');

  // Room delivery
  const [roomNumber, setRoomNumber] = useState('');

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('rgp_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('rgp_cart', JSON.stringify(cart));
  }, [cart]);

  // Currency Converter Formatter
  const formatMoney = (amountUSD: number) => {
    if (currency === 'UZS') return Math.round(amountUSD * 12850).toLocaleString('uz-UZ') + " so'm";
    if (currency === 'EUR') return '€' + Math.round(amountUSD * 0.92).toLocaleString('de-DE');
    return '$' + amountUSD.toLocaleString('en-US');
  };

  const addFeed = (msg: string) => {
    setActivityFeed(prev => [msg, ...prev.slice(0, 5)]);
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

  // Handlers
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

    setVoucherData(voucher);
    setBookingModalOpen(false);
    setVoucherModalOpen(true);
    addFeed(`Yangi xona band qilindi: ${guestName} — ${selectedRoom.title} (${voucher.totalPrice})`);
    notifications.show({
      title: 'Bron Tasdiqlandi!',
      message: `Hurmatli ${guestName}, sizning vaucheringiz tayyorlandi.`,
      color: 'teal'
    });
  };

  const handleChauffeurSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notifications.show({
      title: 'VIP Haydovchi Buyurtma Qilindi',
      message: `Xizmat muvaffaqiyatli band qilindi. Haydovchi belgilangan vaqtda yetib boradi.`,
      color: 'gold'
    });
    addFeed(`VIP Transfer chaqiruvi: ${chauffeurContact} (${chauffeurPickup})`);
    setChauffeurContact('');
  };

  const handleCheckoutCart = () => {
    if (cart.length === 0) return;
    if (!roomNumber.trim()) {
      notifications.show({
        title: 'Xona raqami kerak',
        message: 'Iltimos, yetkazish uchun xona raqamini kiriting',
        color: 'red'
      });
      return;
    }

    notifications.show({
      title: 'Oshxona Buyurtmasi Qabul Qilindi',
      message: `Taomlar 20-30 daqiqada ${roomNumber} ga yetkaziladi!`,
      color: 'teal'
    });
    addFeed(`Xonaga taom buyurtmasi: ${roomNumber} (${formatMoney(cartTotalUSD)})`);
    setCart([]);
    setCartDrawerOpen(false);
    setRoomNumber('');
  };

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notifications.show({
      title: 'Restoranda Stol Band Qilindi',
      message: `Hurmatli ${tableName}, stolingiz muvaffaqiyatli band qilindi.`,
      color: 'teal'
    });
    addFeed(`Restoran stoli band qilindi: ${tableName} (${tableZone})`);
    setTableModalOpen(false);
    setTableName('');
  };

  const handleAddStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: StaffMember = {
      id: 'emp-' + Date.now(),
      name: newStaffName,
      role: newStaffRole,
      dept: newStaffDept,
      shift: newStaffShift,
      status: 'Navbatchilikda',
      rating: '5.0 ★',
      phone: newStaffPhone
    };
    setStaff(prev => [newMember, ...prev]);
    notifications.show({
      title: 'Yangi xodim qo\'shildi',
      message: `${newStaffName} xodimlar ro'yxatiga muvaffaqiyatli qo'shildi`,
      color: 'gold'
    });
    addFeed(`Yangi xodim qo'shildi: ${newStaffName} (${newStaffDept})`);
    setAddStaffModalOpen(false);
    setNewStaffName('');
    setNewStaffRole('');
    setNewStaffPhone('');
  };

  const toggleStaffStatus = (id: string) => {
    setStaff(prev =>
      prev.map(s => {
        if (s.id === id) {
          const nextStatus = s.status === 'Navbatchilikda' ? 'Dam olishda' : (s.status === 'Dam olishda' ? 'Tanaffusda' : 'Navbatchilikda');
          addFeed(`Xodim holati: ${s.name} (${nextStatus})`);
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
    notifications.show({
      title: 'O\'chirildi',
      message: 'Xodim tizimdan o\'chirildi',
      color: 'red'
    });
  };

  // Filtered lists
  const filteredRooms = roomFilter === 'all' ? rooms : rooms.filter(r => r.category === roomFilter);
  const filteredMenu = menuFilter === 'all' ? menu : menu.filter(m => m.category === menuFilter);
  const filteredStaff = staff.filter(s => {
    const matchDept = staffDeptFilter === 'all' || s.dept === staffDeptFilter;
    const matchSearch = s.name.toLowerCase().includes(staffSearch.toLowerCase()) || s.role.toLowerCase().includes(staffSearch.toLowerCase());
    return matchDept && matchSearch;
  });

  const totalStaffCount = 136 + staff.length;
  const onDutyCount = 82 + staff.filter(s => s.status === 'Navbatchilikda').length;

  return (
    <Box style={{ position: 'relative', overflowX: 'hidden', background: '#080c14', color: '#f8fafc' }}>
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />
      <div className="ambient-glow glow-3" />

      {/* HEADER & NAVBAR */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(8, 12, 20, 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '0.9rem 2rem'
      }}>
        <Container size="xl" px={0}>
          <Group justify="space-between">
            <Group gap="sm" style={{ cursor: 'pointer' }}>
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
                <Text style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, letterSpacing: 2, fontSize: '1.2rem', lineHeight: 1.1 }}>
                  ROYAL GRAND
                </Text>
                <Text size="xs" c="gold" fw={700} style={{ letterSpacing: 2 }}>
                  PALACE & RESORT ★★★★★
                </Text>
              </Stack>
            </Group>

            <Group gap="lg" visibleFrom="md">
              <Button variant="subtle" c="gray.3" component="a" href="#rooms" leftSection={<IconBed size={16} />}>Xonalar</Button>
              <Button variant="subtle" c="gray.3" component="a" href="#chauffeur" leftSection={<IconCar size={16} />}>VIP Haydovchi</Button>
              <Button variant="subtle" c="gray.3" component="a" href="#restaurant" leftSection={<IconToolsKitchen2 size={16} />}>Gurme Oshxona</Button>
              <Button variant="subtle" c="gray.3" component="a" href="#staff" leftSection={<IconUsers size={16} />}>Xodimlar Nazorati</Button>
            </Group>

            <Group gap="sm">
              {/* Language Menu */}
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

              {/* Currency Menu */}
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

              {/* Cart Button */}
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

              <Button
                className="btn-gold"
                leftSection={<IconSparkles size={16} />}
                onClick={() => {
                  setSelectedRoom(rooms[2]);
                  setBookingModalOpen(true);
                }}
              >
                Joy Band Qilish
              </Button>
            </Group>
          </Group>
        </Container>
      </header>

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
            Royal Grand Palace — har bir lahzasi mo'jiza, beqiyos qulaylik, shaxsiy Rolls-Royce haydovchi xizmati va Mishelin darajasidagi gurme oshxona bilan unutilmas tajriba taqdim etadi.
          </Text>

          <Group justify="center" gap="md" mb="xl">
            <Button size="lg" className="btn-gold" component="a" href="#rooms" leftSection={<IconBed size={20} />}>
              Xonalarni Ko'rish
            </Button>
            <Button size="lg" className="btn-outline-gold" component="a" href="#chauffeur" leftSection={<IconCar size={20} />}>
              VIP Haydovchi Chaqirish
            </Button>
            <Button size="lg" variant="default" component="a" href="#staff" leftSection={<IconUsers size={20} />}>
              Xodimlar Paneli
            </Button>
          </Group>

          {/* Quick Search Widget */}
          <Paper className="hero-search-box">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} spacing="md">
              <TextInput
                label="Kelish Sanasi"
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                leftSection={<IconCalendar size={16} />}
              />
              <TextInput
                label="Ketish Sanasi"
                type="date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                leftSection={<IconCalendar size={16} />}
              />
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
                data={[
                  { value: '1', label: '1 Mehmon' },
                  { value: '2', label: '2 Mehmon' },
                  { value: '4', label: '4+ Mehmon' }
                ]}
              />
              <Button
                className="btn-gold"
                style={{ height: 'auto', alignSelf: 'flex-end', padding: '0.85rem' }}
                leftSection={<IconSearch size={18} />}
                onClick={() => {
                  const el = document.getElementById('rooms');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Joy Tekshirish
              </Button>
            </SimpleGrid>
          </Paper>

          {/* Quick Metrics */}
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
            <Card className="luxury-card" p="md">
              <Group gap="md">
                <Box style={{ color: '#d4af37' }}><IconBed size={32} /></Box>
                <Stack gap={0} align="flex-start">
                  <Text fw={800} size="xl" style={{ fontFamily: 'Cinzel, serif' }}>98</Text>
                  <Text size="xs" c="dimmed">VIP Xona & Villalar</Text>
                </Stack>
              </Group>
            </Card>
            <Card className="luxury-card" p="md">
              <Group gap="md">
                <Box style={{ color: '#d4af37' }}><IconUsers size={32} /></Box>
                <Stack gap={0} align="flex-start">
                  <Text fw={800} size="xl" style={{ fontFamily: 'Cinzel, serif' }}>{totalStaffCount}</Text>
                  <Text size="xs" c="dimmed">Faol Ishchilar Soni</Text>
                </Stack>
              </Group>
            </Card>
            <Card className="luxury-card" p="md">
              <Group gap="md">
                <Box style={{ color: '#d4af37' }}><IconCarSuv size={32} /></Box>
                <Stack gap={0} align="flex-start">
                  <Text fw={800} size="xl" style={{ fontFamily: 'Cinzel, serif' }}>18</Text>
                  <Text size="xs" c="dimmed">Rolls & Maybach Avtoparki</Text>
                </Stack>
              </Group>
            </Card>
            <Card className="luxury-card" p="md">
              <Group gap="md">
                <Box style={{ color: '#d4af37' }}><IconToolsKitchen2 size={32} /></Box>
                <Stack gap={0} align="flex-start">
                  <Text fw={800} size="xl" style={{ fontFamily: 'Cinzel, serif' }}>3</Text>
                  <Text size="xs" c="dimmed">Mishelin Restoranlari</Text>
                </Stack>
              </Group>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>

      {/* SECTION 1: ROOMS & SUITES */}
      <Box className="section-container" id="rooms">
        <Container size="xl">
          <Stack align="center" ta="center" mb="xl">
            <span className="section-tag">HASHAMAT VA QULAYLIK</span>
            <h2 className="section-title">Qirollik Xonalari va Shaxsiy Villalar</h2>
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
                <Card.Section style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                  <Image src={room.image} alt={room.title} height={260} style={{ transition: 'transform 0.5s ease' }} />
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

      {/* SECTION 2: VIP CHAUFFEUR & FLEET */}
      <Box className="section-container" id="chauffeur" style={{ background: 'rgba(15, 22, 38, 0.4)' }}>
        <Container size="xl">
          <Stack mb="xl">
            <span className="section-tag">PREMIUM TRANSFER</span>
            <h2 className="section-title">VIP Haydovchi va Hashamatli Avtopark</h2>
            <Text className="section-desc">
              Aeroportdan kutib olish, maxsus xizmat safari yoki shahar bo'ylab shaxsiy Rolls-Royce, Mercedes-Maybach va Bentley bilan qirollarga xos transfer.
            </Text>
          </Stack>

          <Grid>
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {fleet.map(car => (
                  <Card key={car.id} className="luxury-card" padding="md">
                    <Card.Section style={{ position: 'relative', height: 170 }}>
                      <Image src={car.image} height={170} alt={car.name} />
                      <Badge style={{ position: 'absolute', top: 10, right: 10 }} color="gold" variant="filled">
                        {formatMoney(car.priceUSD)} / kun
                      </Badge>
                    </Card.Section>
                    <Stack gap="xs" mt="sm">
                      <Title order={4} size="h5">{car.name}</Title>
                      <Group gap="sm" c="dimmed">
                        <Text size="xs">{car.seats}</Text>
                        <Text size="xs">• {car.speed}</Text>
                      </Group>
                      <Button
                        size="xs"
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
                  <Box style={{
                    width: 48,
                    height: 48,
                    background: 'var(--gold-gradient)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0b0f19'
                  }}>
                    <IconCar size={26} />
                  </Box>
                  <Stack gap={0}>
                    <Title order={3} size="h4">VIP Haydovchi Buyurtma Qilish</Title>
                    <Text size="xs" c="dimmed">24/7 tayyor litsenziyali haydovchilar</Text>
                  </Stack>
                </Group>

                <form onSubmit={handleChauffeurSubmit}>
                  <Stack gap="md">
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

                    <TextInput
                      label="Olish Manzili"
                      value={chauffeurPickup}
                      onChange={e => setChauffeurPickup(e.target.value)}
                      placeholder="Aeroport VIP terminali yoki Mehmonxona kirishi"
                      required
                    />

                    <TextInput
                      label="Aloqa Telefoni & Mehmon Ismi"
                      value={chauffeurContact}
                      onChange={e => setChauffeurContact(e.target.value)}
                      placeholder="+998 90 123 45 67 (Alisher Qodirov)"
                      required
                    />

                    <Group justify="space-between" p="sm" style={{ background: 'rgba(8,12,20,0.8)', borderRadius: 8 }}>
                      <Text size="sm" c="dimmed">Taxminiy Narx:</Text>
                      <Text fw={800} c="gold" size="lg" style={{ fontFamily: 'Cinzel, serif' }}>
                        {formatMoney(320)}
                      </Text>
                    </Group>

                    <Button type="submit" fullWidth className="btn-gold" size="md">
                      VIP Haydovchini Tasdiqlash
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* SECTION 3: FINE DINING & RESTAURANT */}
      <Box className="section-container" id="restaurant">
        <Container size="xl">
          <Stack align="center" ta="center" mb="xl">
            <span className="section-tag">GURME OSHXONA & RESTORAN</span>
            <h2 className="section-title">Mishelin Yulduzli Taomlar va Xona Xizmati</h2>
            <Text className="section-desc">
              Dunyoning eng mashhur bosh oshpazlaridan noyob taomlar, 24 soatlik xonaga yetkazish xizmati va restoranda elita stollarni band qilish imkoniyati.
            </Text>

            <Group justify="space-between" w="100%" p="md" style={{ background: 'rgba(18,27,46,0.6)', borderRadius: 14 }}>
              <Group gap="xl">
                <Text size="sm"><IconClock size={16} /> Yetkazish: 20-30 daqiqa</Text>
                <Text size="sm"><IconStar size={16} /> 3 Mishelin Yulduzli Oshpazlar</Text>
                <Text size="sm"><IconSparkles size={16} /> 24/7 Xonaga Xizmat</Text>
              </Group>
              <Button variant="outline" color="gold" onClick={() => setTableModalOpen(true)}>
                Restoranda Stol Band Qilish
              </Button>
            </Group>

            <Tabs value={menuFilter} onChange={v => setMenuFilter(v || 'all')} mt="md">
              <Tabs.List>
                <Tabs.Tab value="all">Barcha Menyu</Tabs.Tab>
                <Tabs.Tab value="mains">Asosiy Taomlar & Steyk</Tabs.Tab>
                <Tabs.Tab value="seafood">Dengiz Mahsulotlari & Ikra</Tabs.Tab>
                <Tabs.Tab value="breakfast">Qirollik Nonushtasi</Tabs.Tab>
                <Tabs.Tab value="desserts">24K Shirinliklar</Tabs.Tab>
                <Tabs.Tab value="drinks">Vintage Shampanlar</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {filteredMenu.map(dish => (
              <Card key={dish.id} className="luxury-card" padding="md">
                <Card.Section style={{ position: 'relative', height: 200 }}>
                  <Image src={dish.image} height={200} alt={dish.title} />
                  <Badge style={{ position: 'absolute', top: 12, left: 12 }} color="gold" variant="filled">
                    {dish.badge}
                  </Badge>
                </Card.Section>
                <Stack mt="sm" gap="xs">
                  <Group justify="space-between">
                    <Title order={4} size="h5">{dish.title}</Title>
                    <Text fw={800} c="gold" size="lg" style={{ fontFamily: 'Cinzel, serif' }}>
                      {formatMoney(dish.priceUSD)}
                    </Text>
                  </Group>
                  <Text size="xs" c="dimmed" lineClamp={2}>{dish.desc}</Text>
                  <Group justify="space-between" mt="sm">
                    <Text size="xs" c="dimmed"><IconClock size={14} /> {dish.prepTime}</Text>
                    <Button size="xs" className="btn-gold" onClick={() => addToCart(dish)}>
                      Savatga Qo'shish
                    </Button>
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* SECTION 4: HOTEL SERVICES */}
      <Box className="section-container" style={{ background: 'rgba(15, 22, 38, 0.5)' }}>
        <Container size="xl">
          <Stack align="center" ta="center" mb="xl">
            <span className="section-tag">EKSKLYUZIV XIZMATLAR</span>
            <h2 className="section-title">Qirollarga Xos Mehmonxona Xizmatlari</h2>
            <Text className="section-desc">Sizning rohatlanishingiz va har qanday talabingiz uchun 24 soatlik xizmatlar majmuasi.</Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            <Card className="luxury-card" p="xl">
              <Box mb="md" c="gold"><IconSparkles size={36} /></Box>
              <Title order={3} size="h4" mb="xs">Royal Spa & Wellness Oasis</Title>
              <Text size="sm" c="dimmed" mb="md">Himalay tuzli saunalar, oltin niqobli yoshartirish muolajalari va xususiy basseyn.</Text>
              <Badge color="gold" variant="outline">24/7 Ochiq</Badge>
            </Card>
            <Card className="luxury-card" p="xl">
              <Box mb="md" c="gold"><IconHelicopter size={36} /></Box>
              <Title order={3} size="h4" mb="xs">Shaxsiy Helipad Transfer</Title>
              <Text size="sm" c="dimmed" mb="md">Mehmonxona tomidagi vertolyot maydonchasi orqali aeroportdan 7 daqiqada yetib kelish.</Text>
              <Badge color="gold" variant="outline">VIP Xizmat</Badge>
            </Card>
            <Card className="luxury-card" p="xl">
              <Box mb="md" c="gold"><IconSailboat size={36} /></Box>
              <Title order={3} size="h4" mb="xs">Royal Yacht Charter</Title>
              <Text size="sm" c="dimmed" mb="md">Shaxsiy super-yaxtada quyosh botishini tomosha qilish va dengiz sayohati.</Text>
              <Badge color="gold" variant="outline">Eksklyuziv</Badge>
            </Card>
            <Card className="luxury-card" p="xl">
              <Box mb="md" c="gold"><IconShieldCheck size={36} /></Box>
              <Title order={3} size="h4" mb="xs">24/7 Shaxsiy Butler & Konsyerj</Title>
              <Text size="sm" c="dimmed" mb="md">Har bir lyuks xona uchun tayinlangan shaxsiy yordamchi va individual protokol xizmati.</Text>
              <Badge color="gold" variant="outline">Individual</Badge>
            </Card>
            <Card className="luxury-card" p="xl">
              <Box mb="md" c="gold"><IconBuildingSkyscraper size={36} /></Box>
              <Title order={3} size="h4" mb="xs">Grand Ballroom & Banket</Title>
              <Text size="sm" c="dimmed" mb="md">500 kishilik qirollik to'y zali va xalqaro biznes sammitlar uchun zallar.</Text>
              <Badge color="gold" variant="outline">Bron Qilish</Badge>
            </Card>
            <Card className="luxury-card" p="xl">
              <Box mb="md" c="gold"><IconCrown size={36} /></Box>
              <Title order={3} size="h4" mb="xs">Shaxsiy Sommelier & Degustatsiya</Title>
              <Text size="sm" c="dimmed" mb="md">Fransiya va Italiyaning eng sara kolleksiyali sharoblari va eksklyuziv degustatsiya.</Text>
              <Badge color="gold" variant="outline">Mishelin Ta'mi</Badge>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>

      {/* SECTION 5: STAFF & OPERATIONS DASHBOARD */}
      <Box className="section-container" id="staff">
        <Container size="xl">
          <Paper className="luxury-card" p="xl" style={{ border: '1px solid rgba(212, 175, 55, 0.5)' }}>
            <Group justify="space-between" mb="xl" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.5rem' }}>
              <Stack gap="xs">
                <Badge color="blue" size="lg" leftSection={<IconShieldCheck size={14} />}>
                  MEHMONXONA BOSHQARUV MARKAZI
                </Badge>
                <Title order={2} style={{ fontFamily: 'Cinzel, serif' }}>
                  Ishchilar Soni & Xodimlar Nazorati
                </Title>
                <Text size="sm" c="dimmed">
                  Mehmonxonadagi barcha {totalStaffCount} nafar xodimlar, smenalar, bo'limlar va vazifalar monitoringi.
                </Text>
              </Stack>
              <Group>
                <Button className="btn-gold" leftSection={<IconPlus size={16} />} onClick={() => setAddStaffModalOpen(true)}>
                  Yangi Xodim Qo'shish
                </Button>
                <Button variant="default" leftSection={<IconRefresh size={16} />} onClick={() => notifications.show({ title: 'Yangilandi', message: 'Xodimlar statistikasi jonli sinxronlandi' })}>
                  Sinxronlash
                </Button>
              </Group>
            </Group>

            {/* KPI Cards */}
            <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md" mb="xl">
              <Card p="md" style={{ background: 'rgba(8,12,20,0.7)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12 }}>
                <Text size="xs" c="dimmed">Jami Ishchilar Soni</Text>
                <Title order={2} c="gold" style={{ fontFamily: 'Cinzel, serif' }}>{totalStaffCount}</Title>
                <Text size="xs" c="teal">+4 yangi bu oy</Text>
              </Card>
              <Card p="md" style={{ background: 'rgba(8,12,20,0.7)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12 }}>
                <Text size="xs" c="dimmed">Hozir Navbatchilikda</Text>
                <Title order={2} c="teal" style={{ fontFamily: 'Cinzel, serif' }}>{onDutyCount}</Title>
                <Text size="xs" c="dimmed">Kunduzgi & tungi smena</Text>
              </Card>
              <Card p="md" style={{ background: 'rgba(8,12,20,0.7)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 12 }}>
                <Text size="xs" c="dimmed">Faol Xizmat So'rovlari</Text>
                <Title order={2} c="blue" style={{ fontFamily: 'Cinzel, serif' }}>28</Title>
                <Text size="xs" c="dimmed">O'rtacha: 8 daqiqa</Text>
              </Card>
              <Card p="md" style={{ background: 'rgba(8,12,20,0.7)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 12 }}>
                <Text size="xs" c="dimmed">Xonalar Bandligi</Text>
                <Title order={2} c="grape" style={{ fontFamily: 'Cinzel, serif' }}>84%</Title>
                <Text size="xs" c="dimmed">82 / 98 Xona band</Text>
              </Card>
            </SimpleGrid>

            {/* Department Split & Table */}
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card p="md" style={{ background: 'rgba(8,12,20,0.7)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Title order={4} size="h5" mb="md" c="gold">Bo'limlar Bo'yicha Xodimlar</Title>
                  <Stack gap="sm">
                    <Group justify="space-between" p="xs" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <Text size="sm">Qabulxona & Konsyerj</Text>
                      <Badge color="gold">18 xodim</Badge>
                    </Group>
                    <Group justify="space-between" p="xs" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <Text size="sm">Oshxona & Restoran</Text>
                      <Badge color="gold">36 xodim</Badge>
                    </Group>
                    <Group justify="space-between" p="xs" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <Text size="sm">Xona Xizmati & Tozalik</Text>
                      <Badge color="gold">42 xodim</Badge>
                    </Group>
                    <Group justify="space-between" p="xs" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <Text size="sm">VIP Haydovchilar</Text>
                      <Badge color="gold">16 xodim</Badge>
                    </Group>
                    <Group justify="space-between" p="xs" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <Text size="sm">Xavfsizlik & Muhandislik</Text>
                      <Badge color="gold">14 xodim</Badge>
                    </Group>
                    <Group justify="space-between" p="xs" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <Text size="sm">Spa & Salomatlik</Text>
                      <Badge color="gold">16 xodim</Badge>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 8 }}>
                <Group mb="md" justify="space-between">
                  <TextInput
                    placeholder="Xodim ismi yoki lavozimi..."
                    value={staffSearch}
                    onChange={e => setStaffSearch(e.target.value)}
                    leftSection={<IconSearch size={16} />}
                    style={{ flexGrow: 1 }}
                  />
                  <Select
                    value={staffDeptFilter}
                    onChange={v => setStaffDeptFilter(v || 'all')}
                    data={[
                      { value: 'all', label: 'Barcha Bo\'limlar' },
                      { value: 'Qabulxona & Konsyerj', label: 'Qabulxona & Konsyerj' },
                      { value: 'Oshxona & Restoran', label: 'Oshxona & Restoran' },
                      { value: 'Xona Xizmati & Tozalik', label: 'Xona Xizmati & Tozalik' },
                      { value: 'VIP Haydovchilar', label: 'VIP Haydovchilar' },
                      { value: 'Xavfsizlik & Muhandislik', label: 'Xavfsizlik & Muhandislik' },
                      { value: 'Spa & Salomatlik', label: 'Spa & Salomatlik' }
                    ]}
                  />
                </Group>

                <Table highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Xodim</Table.Th>
                      <Table.Th>Bo'lim & Lavozim</Table.Th>
                      <Table.Th>Smena</Table.Th>
                      <Table.Th>Holati</Table.Th>
                      <Table.Th>Amallar</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filteredStaff.map(emp => (
                      <Table.Tr key={emp.id}>
                        <Table.Td>
                          <Group gap="xs">
                            <Box style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: 'var(--gold-gradient)',
                              color: '#0b0f19',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800
                            }}>
                              {emp.name.charAt(0)}
                            </Box>
                            <Stack gap={0}>
                              <Text size="sm" fw={600}>{emp.name}</Text>
                              <Text size="xs" c="dimmed">{emp.phone}</Text>
                            </Stack>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs" fw={700}>{emp.dept}</Text>
                          <Text size="xs" c="dimmed">{emp.role}</Text>
                        </Table.Td>
                        <Table.Td><Text size="xs">{emp.shift}</Text></Table.Td>
                        <Table.Td>
                          <Badge
                            color={emp.status === 'Navbatchilikda' ? 'teal' : (emp.status === 'Dam olishda' ? 'gray' : 'yellow')}
                            variant="light"
                          >
                            {emp.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <Tooltip label="Holatni o'zgartirish">
                              <ActionIcon variant="subtle" color="gold" onClick={() => toggleStaffStatus(emp.id)}>
                                <IconRefresh size={16} />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="O'chirish">
                              <ActionIcon variant="subtle" color="red" onClick={() => deleteStaff(emp.id)}>
                                <IconTrash size={16} />
                              </ActionIcon>
                            </Tooltip>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Grid.Col>
            </Grid>

            {/* Live Activity Stream */}
            <Box mt="xl" p="md" style={{ background: 'rgba(8,12,20,0.8)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
              <Group gap="xs" mb="sm">
                <div className="pulse-indicator" />
                <Text size="sm" fw={700} c="gold">Jonli Mehmonxona Xizmatlari Jurnali (Live Activity Feed)</Text>
              </Group>
              <Stack gap="xs">
                {activityFeed.map((msg, idx) => (
                  <Group key={idx} justify="space-between" p="xs" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 6 }}>
                    <Text size="xs"><IconCheck size={14} color="#10b981" /> {msg}</Text>
                    <Text size="xs" c="dimmed">Jonli</Text>
                  </Group>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* FOOTER */}
      <footer style={{ background: '#05080f', borderTop: '1px solid rgba(212, 175, 55, 0.3)', padding: '5rem 2rem 2rem' }}>
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl" mb="xl">
            <Stack gap="sm">
              <Group gap="xs">
                <Box style={{ width: 36, height: 36, background: 'var(--gold-gradient)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                  <IconCrown size={20} />
                </Box>
                <Title order={4} style={{ fontFamily: 'Cinzel, serif' }}>ROYAL GRAND PALACE</Title>
              </Group>
              <Text size="xs" c="dimmed">
                Dunyo darajasidagi 5-yulduzli hashamat, beqiyos mehmondo'stlik, shaxsiy haydovchilik va yuqori darajadagi gurme oshxona xizmati.
              </Text>
            </Stack>

            <Stack gap="xs">
              <Text fw={700} c="gold">Tezkor Havolalar</Text>
              <Text size="xs" c="dimmed" component="a" href="#rooms">Xonalar & Villalar</Text>
              <Text size="xs" c="dimmed" component="a" href="#chauffeur">VIP Haydovchi</Text>
              <Text size="xs" c="dimmed" component="a" href="#restaurant">Gurme Restoran</Text>
              <Text size="xs" c="dimmed" component="a" href="#staff">Xodimlar Paneli</Text>
            </Stack>

            <Stack gap="xs">
              <Text fw={700} c="gold">VIP Xizmatlar</Text>
              <Text size="xs" c="dimmed">Rolls-Royce Aeroport Transferi</Text>
              <Text size="xs" c="dimmed">Xonaga 24/7 Taom Yetkazish</Text>
              <Text size="xs" c="dimmed">Royal Spa & Wellness</Text>
              <Text size="xs" c="dimmed">Shaxsiy Yaxta Sayohati</Text>
            </Stack>

            <Stack gap="xs">
              <Text fw={700} c="gold">Aloqa</Text>
              <Text size="xs" c="dimmed">Grand Palace Boulevard 101, Luxury Coast</Text>
              <Text size="xs" c="dimmed">+998 71 200 77 77 / +998 90 999 00 00</Text>
              <Text size="xs" c="dimmed">vip-booking@royalgrandpalace.com</Text>
            </Stack>
          </SimpleGrid>

          <Divider my="lg" color="rgba(255,255,255,0.06)" />
          <Group justify="space-between">
            <Text size="xs" c="dimmed">© 2026 ROYAL GRAND PALACE & RESORT. Barcha huquqlar himoyalangan.</Text>
            <Text size="xs" c="gold">Muallif: Gulomuvich Hotel Pro</Text>
          </Group>
        </Container>
      </footer>

      {/* ==================== MODALS ==================== */}

      {/* 1. Room Booking Modal */}
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

              <TextInput
                label="Passport bo'yicha To'liq Ism"
                placeholder="Alisher Qodirov"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                required
              />

              <SimpleGrid cols={2}>
                <TextInput
                  label="Telefon Raqam"
                  placeholder="+998 90 123 45 67"
                  value={guestPhone}
                  onChange={e => setGuestPhone(e.target.value)}
                  required
                />
                <Select
                  label="Mehmonlar Soni"
                  value={guestCount}
                  onChange={v => setGuestCount(v || '2')}
                  data={[{ value: '1', label: '1 Kishi' }, { value: '2', label: '2 Kishi' }, { value: '4', label: '4+ Kishi' }]}
                />
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
                <Title order={2} c="gold" style={{ fontFamily: 'Cinzel, serif' }}>
                  {formatMoney(calculateBookingTotal())}
                </Title>
              </Group>

              <Button type="submit" fullWidth className="btn-gold" size="lg">
                Band Qilishni Tasdiqlash & Vaucher Olish
              </Button>
            </Stack>
          </form>
        )}
      </Modal>

      {/* 2. Voucher Modal */}
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

      {/* 3. Restaurant Cart Drawer */}
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
            <TextInput
              label="Yetkazish Xonasi / Manzili"
              placeholder="Masalan: Presidential Suite 702 yoki Villa 3"
              value={roomNumber}
              onChange={e => setRoomNumber(e.target.value)}
              required
            />
            <Group justify="space-between">
              <Text fw={700}>Jami:</Text>
              <Title order={3} c="gold" style={{ fontFamily: 'Cinzel, serif' }}>
                {formatMoney(cartTotalUSD)}
              </Title>
            </Group>
            <Button fullWidth className="btn-gold" size="md" onClick={handleCheckoutCart}>
              Xonaga Buyurtma Berish
            </Button>
          </Stack>
        </Stack>
      </Drawer>

      {/* 4. Table Reservation Modal */}
      <Modal
        opened={tableModalOpen}
        onClose={() => setTableModalOpen(false)}
        title={<Title order={3} size="h4" c="gold">Restoranda Stol Band Qilish</Title>}
        centered
        styles={{ content: { background: '#0f1626' } }}
      >
        <form onSubmit={handleTableSubmit}>
          <Stack gap="md">
            <TextInput label="Ism va Familiya" value={tableName} onChange={e => setTableName(e.target.value)} placeholder="Alisher Qodirov" required />
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
            <Button type="submit" fullWidth className="btn-gold">Stolni Tasdiqlash</Button>
          </Stack>
        </form>
      </Modal>

      {/* 5. Add Staff Modal */}
      <Modal
        opened={addStaffModalOpen}
        onClose={() => setAddStaffModalOpen(false)}
        title={<Title order={3} size="h4" c="gold">Yangi Xodim Ro'yxatga Olish</Title>}
        centered
        styles={{ content: { background: '#0f1626' } }}
      >
        <form onSubmit={handleAddStaffSubmit}>
          <Stack gap="md">
            <TextInput label="Xodim Ismi va Familiyasi" value={newStaffName} onChange={e => setNewStaffName(e.target.value)} placeholder="Sardor Toirov" required />
            <TextInput label="Lavozimi" value={newStaffRole} onChange={e => setNewStaffRole(e.target.value)} placeholder="Bosh Konsyerj" required />
            <Select
              label="Bo'lim"
              value={newStaffDept}
              onChange={v => setNewStaffDept(v || 'Qabulxona & Konsyerj')}
              data={[
                { value: 'Qabulxona & Konsyerj', label: 'Qabulxona & Konsyerj' },
                { value: 'Oshxona & Restoran', label: 'Oshxona & Restoran' },
                { value: 'Xona Xizmati & Tozalik', label: 'Xona Xizmati & Tozalik' },
                { value: 'VIP Haydovchilar', label: 'VIP Haydovchilar' },
                { value: 'Xavfsizlik & Muhandislik', label: 'Xavfsizlik & Muhandislik' },
                { value: 'Spa & Salomatlik', label: 'Spa & Salomatlik' }
              ]}
            />
            <Select
              label="Smena"
              value={newStaffShift}
              onChange={v => setNewStaffShift(v || 'Kunduzgi (08:00 - 18:00)')}
              data={[
                { value: 'Kunduzgi (08:00 - 18:00)', label: 'Kunduzgi (08:00 - 18:00)' },
                { value: 'Tungi (18:00 - 08:00)', label: 'Tungi (18:00 - 08:00)' },
                { value: '24/7 Navbatchilik', label: '24/7 Navbatchilik' }
              ]}
            />
            <TextInput label="Telefon Raqam" value={newStaffPhone} onChange={e => setNewStaffPhone(e.target.value)} placeholder="+998 90 555 12 34" required />
            <Button type="submit" fullWidth className="btn-gold">Xodimlarga Qo'shish</Button>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
