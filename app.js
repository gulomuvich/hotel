/* ==========================================================================
   ROYAL GRAND PALACE & RESORT — JAVASCRIPT APPLICATION ENGINE
   ========================================================================== */

// --- Initial Datasets ---
const INITIAL_ROOMS = [
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

const INITIAL_FLEET = [
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

const INITIAL_MENU = [
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
    category: 'breakfast',
    title: 'Royal Parisian Croissant & Berries',
    desc: 'Qo\'lda tayyorlangan sariyog\'li kruassan, oltin sepilgan organik o\'rmon mevalari.',
    priceUSD: 35,
    prepTime: '15 daqiqa',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    badge: 'Klassika'
  },
  {
    id: 'dish-6',
    category: 'desserts',
    title: '24K Gold Royal Chocolate Sphere',
    desc: 'Valrhona qora shokoladli shar, ichida vanil moussi va ustidan issiq karamel quyiladi.',
    priceUSD: 55,
    prepTime: '15 daqiqa',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    badge: '24K Oltin'
  },
  {
    id: 'dish-7',
    category: 'desserts',
    title: 'Tahitian Vanilla Mille-Feuille',
    desc: 'Karamellangan mayin qatlamlar va Taiti vanili kremi, malina jelesi bilan.',
    priceUSD: 40,
    prepTime: '15 daqiqa',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    badge: 'Gurme Desert'
  },
  {
    id: 'dish-8',
    category: 'drinks',
    title: 'Dom Pérignon Vintage Champagne (Bottle)',
    desc: 'Fransiyaning afsonaviy shampani, sovitilgan muzli qadahlarda taqdim etiladi.',
    priceUSD: 420,
    prepTime: '5 daqiqa',
    image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=600&q=80',
    badge: 'Vintage 2013'
  },
  {
    id: 'dish-9',
    category: 'drinks',
    title: 'Palace Royal Saffron Cocktail',
    desc: 'Za\'faron damlamasi, oltin zarralari va premium botanik jin asosidagi eksklyuziv kokteyl.',
    priceUSD: 32,
    prepTime: '10 daqiqa',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    badge: 'Signature'
  }
];

const INITIAL_STAFF = [
  { id: 'emp-1', name: 'Jasur Karimov', role: 'Bosh Konsyerj & VIP Protokol', dept: 'Qabulxona & Konsyerj', shift: 'Kunduzgi (08:00 - 18:00)', status: 'Navbatchilikda', rating: '5.0 ★', phone: '+998 90 111 22 33' },
  { id: 'emp-2', name: 'Alain Ducasse', role: 'Bosh Oshpaz (Executive Chef 3★)', dept: 'Oshxona & Restoran', shift: 'Moslashuvchan', status: 'Navbatchilikda', rating: '5.0 ★', phone: '+998 90 222 33 44' },
  { id: 'emp-3', name: 'Alisher Rustamov', role: 'Katta VIP Haydovchi (Rolls Fleet)', dept: 'VIP Haydovchilar', shift: '24/7 Navbatchilik', status: 'Navbatchilikda', rating: '4.9 ★', phone: '+998 90 333 44 55' },
  { id: 'emp-4', name: 'Madina Umarova', role: 'Gouvernante Generale (Head Housekeeping)', dept: 'Xona Xizmati & Tozalik', shift: 'Kunduzgi (08:00 - 18:00)', status: 'Navbatchilikda', rating: '4.9 ★', phone: '+998 90 444 55 66' },
  { id: 'emp-5', name: 'Sardor Maxmudov', role: 'Xavfsizlik Boshlig\'i & Protokol', dept: 'Xavfsizlik & Muhandislik', shift: 'Tungi (18:00 - 08:00)', status: 'Navbatchilikda', rating: '5.0 ★', phone: '+998 90 555 66 77' },
  { id: 'emp-6', name: 'Yelena Smirnova', role: 'Bosh Spa Terapevt & Balneolog', dept: 'Spa & Salomatlik', shift: 'Kunduzgi (08:00 - 18:00)', status: 'Dam olishda', rating: '4.8 ★', phone: '+998 90 666 77 88' },
  { id: 'emp-7', name: 'Bobur Mirzaev', role: 'Katta Sommelier (Wine Master)', dept: 'Oshxona & Restoran', shift: 'Tungi (18:00 - 08:00)', status: 'Navbatchilikda', rating: '4.9 ★', phone: '+998 90 777 88 99' },
  { id: 'emp-8', name: 'Shahnoza Karimova', role: 'VIP Butler (Presidential Suites)', dept: 'Qabulxona & Konsyerj', shift: '24/7 Navbatchilik', status: 'Navbatchilikda', rating: '5.0 ★', phone: '+998 90 888 99 00' },
  { id: 'emp-9', name: 'Temur Xoliqov', role: 'VIP Maybach Haydovchisi', dept: 'VIP Haydovchilar', shift: 'Kunduzgi (08:00 - 18:00)', status: 'Tanaffusda', rating: '4.8 ★', phone: '+998 90 999 11 22' },
  { id: 'emp-10', name: 'Oksana Petrova', role: 'Konditer Shefi (Pastry Chef)', dept: 'Oshxona & Restoran', shift: 'Kunduzgi (08:00 - 18:00)', status: 'Navbatchilikda', rating: '5.0 ★', phone: '+998 90 123 99 88' }
];

const DEPARTMENT_SUMMARY = [
  { dept: 'Qabulxona & Konsyerj', total: 18, onDuty: 12 },
  { dept: 'Oshxona & Restoran', total: 36, onDuty: 22 },
  { dept: 'Xona Xizmati & Tozalik', total: 42, onDuty: 26 },
  { dept: 'VIP Haydovchilar', total: 16, onDuty: 10 },
  { dept: 'Xavfsizlik & Muhandislik', total: 14, onDuty: 8 },
  { dept: 'Spa & Salomatlik', total: 16, onDuty: 8 }
];

// Multi-language strings
const TRANSLATIONS = {
  uz: {
    nav_home: 'Bosh Sahifa',
    nav_rooms: 'Xonalar & Villalar',
    nav_chauffeur: 'VIP Haydovchi',
    nav_restaurant: 'Gurme Oshxona',
    nav_services: 'Xizmatlar',
    nav_staff: 'Xodimlar Nazorati',
    btn_book_now: 'Joy Band Qilish',
    hero_badge: '5-Yulduzli Qirollik Hashamati',
    hero_title: 'ORZUYINGIZDAGI <span class="gold-gradient-text">ENG HASHAMATLI</span> MEHMONXONA',
    hero_subtitle: 'Royal Grand Palace — har bir lahzasi mo\'jiza, beqiyos qulaylik, shaxsiy Rolls-Royce haydovchi xizmati va Mishelin darajasidagi gurme oshxona bilan unutilmas tajriba taqdim etadi.',
    hero_btn_explore: 'Xonalarni Ko\'rish',
    hero_btn_transfer: 'VIP Transfer Buyurtma Qilish',
    hero_btn_staff: 'Xodimlar Nazorati',
    label_checkin: 'Kelish Sanasi',
    label_checkout: 'Ketish Sanasi',
    label_room_type: 'Xona Toifasi',
    label_guests: 'Mehmonlar',
    btn_check_availability: 'Joy Band Qilish',
    stat_rooms: 'VIP Xona & Villalar',
    stat_staff: 'Faol Ishchilar Soni',
    stat_fleet: 'VIP Rolls & Maybach Park',
    stat_restaurants: 'Mishelin Restoranlari',
    tag_rooms: 'HASHAMAT VA QULAYLIK',
    title_rooms: 'Qirollik Xonalari va Shaxsiy Villalar',
    desc_rooms: 'Har bir xona shaxsiy did, zamonaviy Smart-Home tizimi, to\'liq panelli dengiz manzarasi va 24/7 shaxsiy Butler xizmati bilan jihozlangan.',
    filter_all: 'Barchasi',
    filter_deluxe: 'Deluxe Suites',
    filter_presidential: 'Presidential Suites',
    filter_royal: 'Royal Penthouse',
    filter_villa: 'Private Villas',
    tag_chauffeur: 'PREMIUM TRANSFER',
    title_chauffeur: 'VIP Haydovchi va Hashamatli Avtopark',
    desc_chauffeur: 'Aeroportdan kutib olish, maxsus xizmat safari yoki shahar bo\'ylab shaxsiy Rolls-Royce, Mercedes-Maybach va Bentley bilan qirollarga xos transfer.',
    tag_dining: 'GURME OSHXONA & RESTORAN',
    title_dining: 'Mishelin Yulduzli Taomlar va Xona Xizmati',
    desc_dining: 'Dunyoning eng mashhur bosh oshpazlaridan noyob taomlar, 24 soatlik xonaga yetkazish xizmati va restoranda elita stollarni band qilish imkoniyati.',
    tag_services: 'EKSKLYUZIV XIZMATLAR',
    title_services: 'Qirollarga Xos Mehmonxona Xizmatlari',
    badge_management: 'MEHMONXONA BOSHQARUV MARKAZI',
    title_staff_mgmt: 'Ishchilar Soni & Xodimlar Nazorati',
    desc_staff_mgmt: 'Mehmonxonadagi barcha 140+ nafar xodimlar, smenalar, bo\'limlar, vazifalar va mehmonlar xizmatining jonli monitoring tizimi.',
    btn_add_employee: 'Yangi Xodim Qo\'shish',
    btn_sync_data: 'Ma\'lumotlarni Yangilash',
    kpi_total_staff: 'Jami Ishchilar Soni',
    kpi_on_duty: 'Hozir Navbatchilikda',
    kpi_active_requests: 'Faol Xizmat So\'rovlari',
    kpi_occupancy: 'Xonalar Bandligi'
  },
  en: {
    nav_home: 'Home',
    nav_rooms: 'Suites & Villas',
    nav_chauffeur: 'VIP Chauffeur',
    nav_restaurant: 'Gourmet Dining',
    nav_services: 'Services',
    nav_staff: 'Staff Operations',
    btn_book_now: 'Book a Suite',
    hero_badge: '5-Star Royal Ultra Luxury',
    hero_title: 'EXPERIENCE THE <span class="gold-gradient-text">PINNACLE OF</span> LUXURY',
    hero_subtitle: 'Royal Grand Palace — an oasis of timeless elegance, bespoke Rolls-Royce chauffeur transfer, and Michelin-starred fine dining.',
    hero_btn_explore: 'Explore Suites',
    hero_btn_transfer: 'Book Chauffeur',
    hero_btn_staff: 'Staff Dashboard',
    label_checkin: 'Check-in Date',
    label_checkout: 'Check-out Date',
    label_room_type: 'Room Category',
    label_guests: 'Guests',
    btn_check_availability: 'Check & Book',
    stat_rooms: 'VIP Suites & Villas',
    stat_staff: 'Total Staff on Duty',
    stat_fleet: 'Rolls & Maybach Fleet',
    stat_restaurants: 'Michelin Restaurants',
    tag_rooms: 'LUXURY & COMFORT',
    title_rooms: 'Royal Suites & Private Villas',
    desc_rooms: 'Every suite is appointed with exquisite materials, state-of-the-art smart controls, panoramic ocean views, and 24/7 dedicated butler service.',
    filter_all: 'All Suites',
    filter_deluxe: 'Deluxe Suites',
    filter_presidential: 'Presidential Suites',
    filter_royal: 'Royal Penthouse',
    filter_villa: 'Private Villas',
    tag_chauffeur: 'PREMIUM TRANSFER',
    title_chauffeur: 'VIP Chauffeur & Luxury Fleet',
    desc_chauffeur: 'Airport meet & greet, bespoke city tours, and point-to-point transfers in our fleet of Rolls-Royce, Mercedes-Maybach, and Bentley.',
    tag_dining: 'GOURMET KITCHEN & DINING',
    title_dining: 'Michelin-Starred Dining & Room Service',
    desc_dining: 'Culinary masterpieces by world-renowned chefs, round-the-clock private dining in your suite, and exclusive table reservations.',
    tag_services: 'EXCLUSIVE AMENITIES',
    title_services: 'Royalty-Grade Hotel Services',
    badge_management: 'HOTEL OPERATIONS CENTER',
    title_staff_mgmt: 'Workforce & Staff Management',
    desc_staff_mgmt: 'Real-time monitoring of 140+ active hotel professionals, department rosters, shifts, and guest service requests.',
    btn_add_employee: 'Add Staff Member',
    btn_sync_data: 'Sync Dashboard',
    kpi_total_staff: 'Total Employees',
    kpi_on_duty: 'Active on Duty',
    kpi_active_requests: 'Active Requests',
    kpi_occupancy: 'Room Occupancy'
  },
  ru: {
    nav_home: 'Главная',
    nav_rooms: 'Номера и Виллы',
    nav_chauffeur: 'VIP Трансфер',
    nav_restaurant: 'Гурме Ресторан',
    nav_services: 'Услуги',
    nav_staff: 'Штат и Персонал',
    btn_book_now: 'Забронировать',
    hero_badge: '5-Звездочная Королевская Роскошь',
    hero_title: 'ВАШ САМЫЙ <span class="gold-gradient-text">РОСКОШНЫЙ</span> ОТДЫХ',
    hero_subtitle: 'Royal Grand Palace — непревзойденное гостеприимство, личные трансферы на Rolls-Royce и мишленовская кухня высочайшего уровня.',
    hero_btn_explore: 'Смотреть Номера',
    hero_btn_transfer: 'Заказать Трансфер',
    hero_btn_staff: 'Панель Персонала',
    label_checkin: 'Дата Заезда',
    label_checkout: 'Дата Выезда',
    label_room_type: 'Тип Номера',
    label_guests: 'Гости',
    btn_check_availability: 'Забронировать',
    stat_rooms: 'VIP Номера и Виллы',
    stat_staff: 'Персонал Отеля',
    stat_fleet: 'Парк Rolls & Maybach',
    stat_restaurants: 'Мишлен Рестораны',
    tag_rooms: 'РОСКОШЬ И КОМФОРТ',
    title_rooms: 'Королевские Люксы и Виллы',
    desc_rooms: 'Каждый номер оснащен системой Smart Home, панорамным видом на море и круглосуточным сервисом личного батлера.',
    filter_all: 'Все Номера',
    filter_deluxe: 'Deluxe Люксы',
    filter_presidential: 'Presidential Люксы',
    filter_royal: 'Royal Пентхаусы',
    filter_villa: 'Частные Виллы',
    tag_chauffeur: 'ПРЕМИУМ ТРАНСФЕР',
    title_chauffeur: 'VIP Водитель и Роскошный Автопарк',
    desc_chauffeur: 'Встреча в VIP-зале аэропорта, деловые поездки и трансфер на Rolls-Royce, Mercedes-Maybach и Bentley.',
    tag_dining: 'ГУРМЕ КУХНЯ И РЕСТОРАН',
    title_dining: 'Мишленовская Кухня и Обслуживание Номеров',
    desc_dining: 'Кулинарные шедевры от ведущих шеф-поваров, доставка в номер 24/7 и бронирование столиков.',
    tag_services: 'ЭКСКЛЮЗИВНЫЕ УСЛУГИ',
    title_services: 'Услуги Королевского Уровня',
    badge_management: 'ЦЕНТР УПРАВЛЕНИЯ ОТЕЛЕМ',
    title_staff_mgmt: 'Штат Персонала и Контроль',
    desc_staff_mgmt: 'Мониторинг в реальном времени 140+ специалистов отеля, смен, отделов и сервисных заявок гостей.',
    btn_add_employee: 'Добавить Сотрудника',
    btn_sync_data: 'Обновить Данные',
    kpi_total_staff: 'Всего Сотрудников',
    kpi_on_duty: 'Сейчас на Смене',
    kpi_active_requests: 'Активные Заявки',
    kpi_occupancy: 'Занятость Номеров'
  }
};

// --- Application State ---
const State = {
  currentLang: 'uz',
  currentCurrency: 'USD',
  rates: { USD: 1, UZS: 12850, EUR: 0.92 },
  rooms: [...INITIAL_ROOMS],
  fleet: [...INITIAL_FLEET],
  menu: [...INITIAL_MENU],
  staff: JSON.parse(localStorage.getItem('rgp_staff')) || [...INITIAL_STAFF],
  cart: JSON.parse(localStorage.getItem('rgp_cart')) || [],
  selectedRoom: null,
  activeBookings: JSON.parse(localStorage.getItem('rgp_bookings')) || []
};

// Sound synthesizer using Web Audio API for luxury chime sound
function playLuxuryChime(type = 'success') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // Silent fail if audio is blocked
  }
}

// Format Currency
function formatMoney(amountUSD) {
  const rate = State.rates[State.currentCurrency];
  const converted = amountUSD * rate;
  
  if (State.currentCurrency === 'USD') {
    return '$' + converted.toLocaleString('en-US');
  } else if (State.currentCurrency === 'EUR') {
    return '€' + Math.round(converted).toLocaleString('de-DE');
  } else if (State.currentCurrency === 'UZS') {
    return Math.round(converted).toLocaleString('uz-UZ') + " so'm";
  }
  return '$' + amountUSD;
}

// Show Toast Message
function showToast(message, type = 'success') {
  playLuxuryChime(type);
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'fa-circle-check text-green' : (type === 'warning' ? 'fa-triangle-exclamation' : 'fa-bell text-blue');
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Add Entry to Live Activity Feed
function addActivityEntry(text) {
  const feed = document.getElementById('activityFeedList');
  if (!feed) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
  const item = document.createElement('div');
  item.className = 'activity-item';
  item.innerHTML = `<span><i class="fa-solid fa-bell text-gold"></i> ${text}</span> <span class="activity-time">${timeStr}</span>`;
  
  feed.prepend(item);
  if (feed.children.length > 6) {
    feed.lastElementChild.remove();
  }
}

// --- DOM Rendering Functions ---

// 1. Render Rooms
function renderRooms(filter = 'all') {
  const container = document.getElementById('roomsGridContainer');
  if (!container) return;
  
  const filtered = filter === 'all' ? State.rooms : State.rooms.filter(r => r.category === filter);
  
  container.innerHTML = filtered.map(room => `
    <div class="room-card" data-category="${room.category}">
      <div class="room-img-box">
        <img src="${room.image}" alt="${room.title}" loading="lazy">
        <span class="room-badge">${room.badge}</span>
        <div class="room-price-tag">
          <span class="amount">${formatMoney(room.priceUSD)}</span>
          <span class="period">/ kecha</span>
        </div>
      </div>
      <div class="room-content">
        <h3 class="room-title">${room.title}</h3>
        <p class="room-desc">${room.desc}</p>
        <div class="room-specs">
          <div class="spec-item"><i class="fa-solid fa-vector-square"></i> ${room.sqm} m²</div>
          <div class="spec-item"><i class="fa-solid fa-user-group"></i> ${room.guests}</div>
          <div class="spec-item"><i class="fa-solid fa-bed"></i> ${room.bed}</div>
        </div>
        <div class="room-amenities-pills">
          ${room.amenities.map(a => `<span class="amenity-pill"><i class="fa-solid fa-check text-gold"></i> ${a}</span>`).join('')}
        </div>
        <div class="room-footer">
          <button class="btn btn-gold btn-block" onclick="openRoomBookingModal('${room.id}')">
            <i class="fa-solid fa-calendar-check"></i> Band Qilish
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// 2. Render Fleet
function renderFleet() {
  const container = document.getElementById('fleetGridContainer');
  if (!container) return;
  
  container.innerHTML = State.fleet.map(car => `
    <div class="fleet-card">
      <div class="fleet-img-box">
        <img src="${car.image}" alt="${car.name}" loading="lazy">
        <span class="fleet-rate-badge">${formatMoney(car.priceUSD)} / kun</span>
      </div>
      <div class="fleet-info">
        <h4 class="fleet-name">${car.name}</h4>
        <div class="fleet-specs">
          <span><i class="fa-solid fa-users"></i> ${car.seats}</span>
          <span><i class="fa-solid fa-gauge-high"></i> ${car.speed}</span>
        </div>
        <button class="btn btn-outline-gold btn-block" onclick="selectCarForChauffeur('${car.id}')">
          <i class="fa-solid fa-key"></i> Tanlash
        </button>
      </div>
    </div>
  `).join('');
}

// 3. Render Gourmet Menu
function renderMenu(filter = 'all') {
  const container = document.getElementById('menuGridContainer');
  if (!container) return;
  
  const filtered = filter === 'all' ? State.menu : State.menu.filter(m => m.category === filter);
  
  container.innerHTML = filtered.map(dish => `
    <div class="menu-card" data-category="${dish.category}">
      <div class="dish-img-box">
        <img src="${dish.image}" alt="${dish.title}" loading="lazy">
        <span class="dish-badge">${dish.badge}</span>
      </div>
      <div class="dish-content">
        <div class="dish-header">
          <h4 class="dish-title">${dish.title}</h4>
          <span class="dish-price">${formatMoney(dish.priceUSD)}</span>
        </div>
        <p class="dish-desc">${dish.desc}</p>
        <div class="dish-footer">
          <span class="prep-time"><i class="fa-solid fa-stopwatch"></i> ${dish.prepTime}</span>
          <button class="btn btn-gold btn-sm" onclick="addToCart('${dish.id}')">
            <i class="fa-solid fa-cart-plus"></i> Savatga
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// 4. Render Staff Table & Department Counts
function renderStaff(deptFilter = 'all', searchQuery = '') {
  const tbody = document.getElementById('staffTableBody');
  const deptList = document.getElementById('deptListContainer');
  if (!tbody) return;
  
  let filtered = State.staff;
  
  if (deptFilter !== 'all') {
    filtered = filtered.filter(s => s.dept === deptFilter);
  }
  
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(s => s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.dept.toLowerCase().includes(q));
  }
  
  tbody.innerHTML = filtered.map(emp => {
    let statusClass = 'on-duty';
    if (emp.status === 'Dam olishda') statusClass = 'off-duty';
    if (emp.status === 'Tanaffusda') statusClass = 'on-break';
    
    return `
      <tr>
        <td>
          <div class="employee-cell">
            <div class="emp-avatar">${emp.name.charAt(0)}</div>
            <div>
              <div class="emp-name">${emp.name}</div>
              <div class="emp-phone">${emp.phone}</div>
            </div>
          </div>
        </td>
        <td>
          <strong>${emp.dept}</strong>
          <div style="font-size:0.75rem; color:var(--text-muted);">${emp.role}</div>
        </td>
        <td>${emp.shift}</td>
        <td><span class="status-badge ${statusClass}">${emp.status}</span></td>
        <td style="color:var(--gold-light); font-weight:700;">${emp.rating}</td>
        <td>
          <div class="table-actions">
            <button class="btn-table-action" title="Holatni almashtirish" onclick="toggleStaffDuty('${emp.id}')">
              <i class="fa-solid fa-arrows-rotate"></i>
            </button>
            <button class="btn-table-action delete" title="O'chirish" onclick="deleteStaffMember('${emp.id}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
  
  // Calculate Totals
  const totalCount = 132 + State.staff.length;
  const onDutyCount = 80 + State.staff.filter(s => s.status === 'Navbatchilikda').length;
  
  document.getElementById('kpiTotalStaff').textContent = totalCount;
  document.getElementById('kpiOnDutyStaff').textContent = onDutyCount;
  document.getElementById('statsStaffCount').textContent = totalCount;
  
  // Render Department List Summary
  if (deptList) {
    deptList.innerHTML = DEPARTMENT_SUMMARY.map(d => `
      <div class="dept-item">
        <span><i class="fa-solid fa-circle-notch text-gold"></i> ${d.dept}</span>
        <span class="dept-count-badge">${d.total} xodim</span>
      </div>
    `).join('');
  }
}

// 5. Render Cart Drawer
function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const badge = document.getElementById('cartCountBadge');
  const totalDisplay = document.getElementById('cartTotalDisplay');
  if (!container) return;
  
  const totalItems = State.cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
  
  if (State.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-msg">
        <i class="fa-solid fa-utensils"></i>
        <p>Savatchangiz bo'sh. Mazali gurme taomlarni tanlang!</p>
      </div>
    `;
    totalDisplay.textContent = formatMoney(0);
    return;
  }
  
  let totalPrice = 0;
  container.innerHTML = State.cart.map(item => {
    const itemTotal = item.dish.priceUSD * item.quantity;
    totalPrice += itemTotal;
    
    return `
      <div class="cart-item">
        <img src="${item.dish.image}" alt="${item.dish.title}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.dish.title}</div>
          <div class="cart-item-price">${formatMoney(item.dish.priceUSD)}</div>
        </div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="updateCartQuantity('${item.dish.id}', -1)">-</button>
          <span class="qty-number">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity('${item.dish.id}', 1)">+</button>
        </div>
      </div>
    `;
  }).join('');
  
  totalDisplay.textContent = formatMoney(totalPrice);
}

// --- Cart Actions ---
window.addToCart = function(dishId) {
  const dish = State.menu.find(d => d.id === dishId);
  if (!dish) return;
  
  const existing = State.cart.find(item => item.dish.id === dishId);
  if (existing) {
    existing.quantity += 1;
  } else {
    State.cart.push({ dish, quantity: 1 });
  }
  
  localStorage.setItem('rgp_cart', JSON.stringify(State.cart));
  renderCart();
  showToast(`"${dish.title}" savatga qo'shildi!`, 'success');
  
  // Open cart automatically
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('cartDrawerOverlay').classList.add('active');
};

window.updateCartQuantity = function(dishId, delta) {
  const index = State.cart.findIndex(item => item.dish.id === dishId);
  if (index === -1) return;
  
  State.cart[index].quantity += delta;
  if (State.cart[index].quantity <= 0) {
    State.cart.splice(index, 1);
  }
  
  localStorage.setItem('rgp_cart', JSON.stringify(State.cart));
  renderCart();
};

// --- Staff Management Actions ---
window.toggleStaffDuty = function(empId) {
  const emp = State.staff.find(s => s.id === empId);
  if (!emp) return;
  
  if (emp.status === 'Navbatchilikda') {
    emp.status = 'Dam olishda';
  } else if (emp.status === 'Dam olishda') {
    emp.status = 'Tanaffusda';
  } else {
    emp.status = 'Navbatchilikda';
  }
  
  localStorage.setItem('rgp_staff', JSON.stringify(State.staff));
  renderStaff();
  showToast(`${emp.name} holati: "${emp.status}" ga o'zgartirildi`, 'info');
  addActivityEntry(`Xodim holati yangilandi: ${emp.name} (${emp.status})`);
};

window.deleteStaffMember = function(empId) {
  const emp = State.staff.find(s => s.id === empId);
  if (!emp) return;
  
  if (confirm(`${emp.name}ni ro'yxatdan o'chirishni tasdiqlaysizmi?`)) {
    State.staff = State.staff.filter(s => s.id !== empId);
    localStorage.setItem('rgp_staff', JSON.stringify(State.staff));
    renderStaff();
    showToast(`${emp.name} tizimdan o'chirildi`, 'warning');
    addActivityEntry(`Xodim tizimdan o'chirildi: ${emp.name}`);
  }
};

// --- Modal & Booking Logic ---
window.openRoomBookingModal = function(roomId) {
  const room = State.rooms.find(r => r.id === roomId);
  if (!room) return;
  
  State.selectedRoom = room;
  document.getElementById('modalSelectedRoomId').value = room.id;
  document.getElementById('modalRoomTitle').textContent = `${room.title} Band Qilish`;
  
  // Set preview box
  document.getElementById('modalRoomPreviewBox').innerHTML = `
    <img src="${room.image}" alt="${room.title}">
    <div class="modal-room-preview-info">
      <h4>${room.title}</h4>
      <p><i class="fa-solid fa-gem text-gold"></i> ${room.badge} • ${room.sqm} m² • ${room.guests}</p>
      <div style="color:var(--gold-light); font-weight:700; font-size:1.1rem; margin-top:0.2rem;">${formatMoney(room.priceUSD)} / kecha</div>
    </div>
  `;
  
  // Set dates default (today & tomorrow)
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 2);
  
  document.getElementById('modalCheckIn').value = today.toISOString().split('T')[0];
  document.getElementById('modalCheckOut').value = tomorrow.toISOString().split('T')[0];
  
  calculateModalTotal();
  document.getElementById('roomBookingModal').classList.add('active');
};

function calculateModalTotal() {
  if (!State.selectedRoom) return;
  
  const checkIn = new Date(document.getElementById('modalCheckIn').value);
  const checkOut = new Date(document.getElementById('modalCheckOut').value);
  
  let nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  if (isNaN(nights) || nights < 1) nights = 1;
  
  document.getElementById('modalNightsCount').textContent = `${nights} kecha`;
  
  const basePrice = State.selectedRoom.priceUSD * nights;
  document.getElementById('modalBaseRoomPrice').textContent = formatMoney(basePrice);
  
  let extrasTotal = 0;
  if (document.getElementById('extraTransfer').checked) extrasTotal += 150;
  if (document.getElementById('extraChampagne').checked) extrasTotal += 95;
  if (document.getElementById('extraSpa').checked) extrasTotal += 120;
  if (document.getElementById('extraButler').checked) extrasTotal += 80;
  
  document.getElementById('modalExtrasPrice').textContent = formatMoney(extrasTotal);
  document.getElementById('modalTotalCalculatedPrice').textContent = formatMoney(basePrice + extrasTotal);
}

window.selectCarForChauffeur = function(carId) {
  const select = document.getElementById('chauffeurCarSelect');
  if (select) {
    select.value = carId;
    select.scrollIntoView({ behavior: 'smooth', block: 'center' });
    updateChauffeurPrice();
  }
};

function updateChauffeurPrice() {
  const select = document.getElementById('chauffeurCarSelect');
  const serviceType = document.getElementById('chauffeurServiceType');
  if (!select) return;
  
  const option = select.options[select.selectedIndex];
  let basePrice = parseInt(option.getAttribute('data-price') || '320');
  
  if (serviceType && serviceType.value === 'hourly_city') basePrice = Math.round(basePrice * 0.6);
  if (serviceType && serviceType.value === 'full_day') basePrice = Math.round(basePrice * 1.5);
  if (serviceType && serviceType.value === 'intercity') basePrice = Math.round(basePrice * 2.0);
  
  document.getElementById('chauffeurPriceDisplay').textContent = formatMoney(basePrice);
}

// Show Voucher Modal
function showVoucher(bookingData) {
  const voucherBox = document.getElementById('voucherDetailsBox');
  const code = 'GP-' + Math.floor(10000 + Math.random() * 90000);
  document.getElementById('voucherCodeDisplay').textContent = code;
  
  voucherBox.innerHTML = `
    <div class="voucher-row">
      <span>Mehmon Ismi:</span>
      <strong>${bookingData.guestName}</strong>
    </div>
    <div class="voucher-row">
      <span>Tanlangan Xona:</span>
      <strong>${bookingData.roomTitle}</strong>
    </div>
    <div class="voucher-row">
      <span>Kelish Sanasi:</span>
      <strong>${bookingData.checkIn}</strong>
    </div>
    <div class="voucher-row">
      <span>Ketish Sanasi:</span>
      <strong>${bookingData.checkOut} (${bookingData.nights} kecha)</strong>
    </div>
    <div class="voucher-row">
      <span>Mehmonlar Soni:</span>
      <strong>${bookingData.guests}</strong>
    </div>
    <div class="voucher-row">
      <span>Jami To'langan Summa:</span>
      <strong style="color:var(--gold-light); font-size:1.1rem;">${bookingData.totalPrice}</strong>
    </div>
  `;
  
  document.getElementById('voucherModal').classList.add('active');
}

// --- Initialize Event Listeners & Core Logic ---
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Renders
  renderRooms();
  renderFleet();
  renderMenu();
  renderStaff();
  renderCart();
  
  // Set default dates on quick search
  const today = new Date().toISOString().split('T')[0];
  const nextDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
  if (document.getElementById('heroCheckIn')) document.getElementById('heroCheckIn').value = today;
  if (document.getElementById('heroCheckOut')) document.getElementById('heroCheckOut').value = nextDate;
  if (document.getElementById('chauffeurDateTime')) {
    document.getElementById('chauffeurDateTime').value = new Date(Date.now() + 3600000 * 2).toISOString().slice(0, 16);
  }

  // 2. Sticky Header Scroll Effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // 4. Dropdowns (Language & Currency)
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  const currBtn = document.getElementById('currBtn');
  const currMenu = document.getElementById('currMenu');

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('show');
    currMenu.classList.remove('show');
  });

  currBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currMenu.classList.toggle('show');
    langMenu.classList.remove('show');
  });

  document.addEventListener('click', () => {
    langMenu.classList.remove('show');
    currMenu.classList.remove('show');
  });

  // Language Change
  document.querySelectorAll('#langMenu .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const lang = item.getAttribute('data-lang');
      State.currentLang = lang;
      document.getElementById('currentLangLabel').textContent = lang.toUpperCase();
      document.querySelectorAll('#langMenu .dropdown-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      // Update UI Translations
      applyLanguage(lang);
      showToast(`Til o'zgartirildi: ${lang.toUpperCase()}`, 'info');
    });
  });

  // Currency Change
  document.querySelectorAll('#currMenu .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const curr = item.getAttribute('data-curr');
      State.currentCurrency = curr;
      document.getElementById('currentCurrLabel').textContent = curr === 'USD' ? '$ USD' : (curr === 'EUR' ? '€ EUR' : 'UZS so\'m');
      document.querySelectorAll('#currMenu .dropdown-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      // Re-render price-dependent components
      renderRooms();
      renderFleet();
      renderMenu();
      renderCart();
      updateChauffeurPrice();
      showToast(`Valyuta: ${curr} ga o'zgartirildi`, 'info');
    });
  });

  // 5. Room Filter Tabs
  document.querySelectorAll('#roomFilterTabs .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#roomFilterTabs .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRooms(btn.getAttribute('data-filter'));
    });
  });

  // 6. Menu Filter Tabs
  document.querySelectorAll('#menuFilterTabs .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#menuFilterTabs .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.getAttribute('data-menu'));
    });
  });

  // 7. Hero Search Form
  document.getElementById('heroBookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('heroRoomType').value;
    const roomsSection = document.getElementById('rooms');
    roomsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Auto click matching tab
    const targetTab = document.querySelector(`#roomFilterTabs .filter-btn[data-filter="${type}"]`) || document.querySelector(`#roomFilterTabs .filter-btn[data-filter="all"]`);
    if (targetTab) targetTab.click();
    showToast('Xonalar tekshirildi! O\'zingizga mos lyuksni tanlang.', 'success');
  });

  // 8. Chauffeur Booking Form
  document.getElementById('chauffeurCarSelect').addEventListener('change', updateChauffeurPrice);
  document.getElementById('chauffeurServiceType').addEventListener('change', updateChauffeurPrice);

  document.getElementById('chauffeurBookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const carName = document.getElementById('chauffeurCarSelect').options[document.getElementById('chauffeurCarSelect').selectedIndex].text;
    const contact = document.getElementById('chauffeurContact').value;
    const pickup = document.getElementById('chauffeurPickup').value;
    const time = document.getElementById('chauffeurDateTime').value;
    
    showToast(`VIP Transfer muvaffaqiyatli band qilindi! ${carName} belgilangan vaqtda yetib keladi.`, 'success');
    addActivityEntry(`Yangi VIP Chauffeur buyurtmasi: ${contact} — ${carName} (${pickup})`);
    document.getElementById('chauffeurContact').value = '';
  });

  // 9. Room Booking Form & Calculations
  document.getElementById('modalCheckIn').addEventListener('change', calculateModalTotal);
  document.getElementById('modalCheckOut').addEventListener('change', calculateModalTotal);
  document.querySelectorAll('.extra-checkbox input').forEach(box => {
    box.addEventListener('change', calculateModalTotal);
  });

  document.getElementById('roomReservationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const guestName = document.getElementById('modalGuestName').value;
    const checkIn = document.getElementById('modalCheckIn').value;
    const checkOut = document.getElementById('modalCheckOut').value;
    const guests = document.getElementById('modalGuestCount').value;
    const totalPrice = document.getElementById('modalTotalCalculatedPrice').textContent;
    const nights = document.getElementById('modalNightsCount').textContent;
    
    const bookingData = {
      guestName,
      roomTitle: State.selectedRoom.title,
      checkIn,
      checkOut,
      guests,
      nights,
      totalPrice,
      date: new Date().toISOString()
    };
    
    State.activeBookings.push(bookingData);
    localStorage.setItem('rgp_bookings', JSON.stringify(State.activeBookings));
    
    // Close booking modal and show official voucher
    document.getElementById('roomBookingModal').classList.remove('active');
    showVoucher(bookingData);
    addActivityEntry(`Yangi xona band qilindi: ${guestName} — ${State.selectedRoom.title} (${totalPrice})`);
    showToast(`Tabriklaymiz, ${guestName}! Broningiz tasdiqlandi.`, 'success');
  });

  // 10. Cart Drawer Open & Close
  document.getElementById('cartToggleBtn').addEventListener('click', () => {
    document.getElementById('cartDrawer').classList.add('active');
    document.getElementById('cartDrawerOverlay').classList.add('active');
  });
  document.getElementById('closeCartBtn').addEventListener('click', () => {
    document.getElementById('cartDrawer').classList.remove('active');
    document.getElementById('cartDrawerOverlay').classList.remove('active');
  });
  document.getElementById('cartDrawerOverlay').addEventListener('click', () => {
    document.getElementById('cartDrawer').classList.remove('active');
    document.getElementById('cartDrawerOverlay').classList.remove('active');
  });

  // Checkout Cart
  document.getElementById('checkoutCartBtn').addEventListener('click', () => {
    if (State.cart.length === 0) {
      showToast('Savatchangiz bo\'sh!', 'warning');
      return;
    }
    const roomNumber = document.getElementById('cartRoomNumber').value;
    if (!roomNumber.trim()) {
      showToast('Iltimos, xona raqamini kiriting!', 'warning');
      document.getElementById('cartRoomNumber').focus();
      return;
    }
    
    showToast(`Buyurtma qabul qilindi! Taomlar 20-30 daqiqada ${roomNumber} ga yetkaziladi.`, 'success');
    addActivityEntry(`Oshxona buyurtmasi: ${roomNumber} (${document.getElementById('cartTotalDisplay').textContent})`);
    State.cart = [];
    localStorage.removeItem('rgp_cart');
    renderCart();
    document.getElementById('cartDrawer').classList.remove('active');
    document.getElementById('cartDrawerOverlay').classList.remove('active');
  });

  // 11. Table Reservation Modal
  document.getElementById('openTableModalBtn').addEventListener('click', () => {
    document.getElementById('tableModal').classList.add('active');
  });
  document.getElementById('closeTableModalBtn').addEventListener('click', () => {
    document.getElementById('tableModal').classList.remove('active');
  });
  document.getElementById('tableReservationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('tableName').value;
    const zone = document.getElementById('tableZone').options[document.getElementById('tableZone').selectedIndex].text;
    showToast(`Rahmat, ${name}! Mishelin restoranimizda stolingiz (${zone}) band qilindi.`, 'success');
    addActivityEntry(`Restoran stoli band qilindi: ${name} (${zone})`);
    document.getElementById('tableModal').classList.remove('active');
  });

  // 12. Add Staff Modal
  document.getElementById('openAddStaffModalBtn').addEventListener('click', () => {
    document.getElementById('addStaffModal').classList.add('active');
  });
  document.getElementById('closeAddStaffModalBtn').addEventListener('click', () => {
    document.getElementById('addStaffModal').classList.remove('active');
  });
  document.getElementById('addStaffForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('staffNameInput').value;
    const role = document.getElementById('staffRoleInput').value;
    const dept = document.getElementById('staffDeptInput').value;
    const shift = document.getElementById('staffShiftInput').value;
    const status = document.getElementById('staffStatusInput').value;
    const phone = document.getElementById('staffPhoneInput').value;
    
    const newStaff = {
      id: 'emp-' + (Date.now()),
      name,
      role,
      dept,
      shift,
      status,
      rating: '5.0 ★',
      phone
    };
    
    State.staff.unshift(newStaff);
    localStorage.setItem('rgp_staff', JSON.stringify(State.staff));
    renderStaff();
    document.getElementById('addStaffModal').classList.remove('active');
    showToast(`Yangi xodim ${name} tizimga muvaffaqiyatli qo'shildi!`, 'success');
    addActivityEntry(`Yangi xodim qo'shildi: ${name} (${dept} - ${role})`);
    document.getElementById('addStaffForm').reset();
  });

  // Staff Search & Filter
  document.getElementById('staffSearchInput').addEventListener('input', (e) => {
    renderStaff(document.getElementById('staffDeptFilter').value, e.target.value);
  });
  document.getElementById('staffDeptFilter').addEventListener('change', (e) => {
    renderStaff(e.target.value, document.getElementById('staffSearchInput').value);
  });
  document.getElementById('refreshStatsBtn').addEventListener('click', () => {
    renderStaff();
    showToast('Xodimlar va mehmonxona statistikasi jonli yangilandi!', 'success');
  });

  // 13. Close Modals Buttons
  document.getElementById('closeRoomModalBtn').addEventListener('click', () => {
    document.getElementById('roomBookingModal').classList.remove('active');
  });
  document.getElementById('closeVoucherBtn').addEventListener('click', () => {
    document.getElementById('voucherModal').classList.remove('active');
  });
  document.getElementById('doneVoucherBtn').addEventListener('click', () => {
    document.getElementById('voucherModal').classList.remove('active');
  });
  document.getElementById('printVoucherBtn').addEventListener('click', () => {
    window.print();
  });

  // Header quick book CTA
  document.getElementById('headerBookBtn').addEventListener('click', () => {
    document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
  });

  // Populate initial activity entries
  addActivityEntry('Royal Penthouse Suite uchun yangi VIP rezervatsiya tasdiqlandi');
  addActivityEntry('Rolls-Royce Phantom aeroport VIP terminaliga jo\'natildi');
  addActivityEntry('Oshxonadan Mishelin Wagyu taomiga buyurtma berildi (Suite 504)');
});

// Multi-language translation applier
function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.uz;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });
}
