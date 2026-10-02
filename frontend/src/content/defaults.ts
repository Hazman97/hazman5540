// Default portfolio content. Used as the fallback when the CMS has no value yet,
// and as the starting point the owner edits in Studio.

export interface Profile {
  name: string;
  roleBadge: string;
  headline: string;
  subline: string;
  aboutIntro: string;
  aboutBody: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  github: string;
  linkedin: string;
}

export interface ExperienceBullet {
  title: string;
  text: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: ExperienceBullet[];
}

export interface ChatbotConfig {
  enabled: boolean;
  welcome: string;
  // Owner-only fields (stripped from the public /api/content response)
  persona?: string;
  knowledge?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  url: string;
  image: string;
  galleryImages?: string[];
  tag: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  tierLabel: string;
  tech: string[];
  status?: string;
  architectureFlow?: string[];
  highlights?: string[];
}

export const defaultProfile: Profile = {
  name: 'Hazman Adanan',
  roleBadge: 'Full-Stack & IoT Systems Engineer @ Mindnrobotics',
  headline: 'I build the web platforms that control real hardware.',
  subline: 'Computer Science degree (UMT) plus an Electrical & Electronics diploma. I work across Vue / Node.js dashboards, ESP32 firmware and the field networks that connect them.',
  aboutIntro: "Software & IoT engineer with a Computer Science B.Sc. (UMT, Dean's List) and an Electrical & Electronics Engineering Diploma (PIS).",
  aboutBody: 'I build full-stack systems that talk to physical hardware: sensors, GPS trackers, robots and the networks between them.',
  email: 'hazman5001@gmail.com',
  // Left empty by default so the phone number is only published when the owner chooses to
  phone: '',
  location: 'Shah Alam, MY',
  resumeUrl: "/Hazman's-resume-july-2026.pdf",
  github: 'https://github.com/hazman97',
  linkedin: 'https://www.linkedin.com/in/hazman-adanan',
};

export const defaultExperience: ExperienceItem[] = [
  {
    role: 'Software Engineer',
    company: 'Mindnrobotics (K-Youth Programme → Software Engineer)',
    period: 'May 2025 - Present',
    location: 'Shah Alam, MY',
    bullets: [
      { title: 'Built a full-stack shooting range control system', text: ': the web control platform plus ESP32 / Node.js target controllers communicating in real time over WebSockets.' },
      { title: 'Built the teleoperation web system for ROS 2 UGVs', text: ', working with a robotics teammate who handled the ROS 2 stack. Operators get live position and control from the browser.' },
      { title: 'Built a Node.js TCP server for Teltonika FMC920 GPS trackers', text: ' that parses device telemetry into PostgreSQL for the MindGPS fleet tracker.' },
      { title: 'Extended field network coverage', text: ' using MP2P links, Rajant mesh nodes and Starlink.' },
    ],
  },
  {
    role: 'Programmer (Prev. IT Security Intern)',
    company: 'PKT Logistics Group Sdn Bhd',
    period: 'Aug 2023 - Mar 2024',
    bullets: [
      { title: 'Primary front-end developer for internal systems', text: ': built the security portal and e-claim platform with Vue.js and Tailwind CSS.' },
      { title: 'Built front-end modules for the warehouse management system (WMS)', text: ' together with an external vendor.' },
      { title: 'Started as IT Security Intern', text: ', managing CCTV and access control systems before moving into development.' },
    ],
  },
];

export const defaultChatbot: ChatbotConfig = {
  enabled: true,
  welcome: "Hi! Ask me anything about Hazman's work, projects or experience.",
  persona: 'Friendly, concise and honest. Answer in the language the visitor uses (English or Malay).',
  knowledge: '',
};

export const defaultProjects: ProjectItem[] = [
  // --- TIER 1: Enterprise & Hardware Systems ---
  {
    title: 'Shooting Range Control Platform',
    tier: 'tier1',
    tierLabel: 'Tier 1 Industrial IoT',
    url: 'https://mindnrobotics.com/',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop'
    ],
    status: 'Mindnrobotics',
    tag: 'Target Controls',
    description: 'Range control platform for target management & counter controls. Features low-latency WebSockets communication between Vue 3 frontend and custom ESP32 C++ target controllers.',
    tech: ['ESP32 C++', 'Target Controls', 'WebSockets', 'Rajant Mesh', 'Vue 3'],
    architectureFlow: ['Piezo Sensors', 'ESP32 C++ MCU', 'WebSockets', 'Rajant Mesh / Starlink', 'Node.js Engine', 'Target Control UI'],
    highlights: [
      'Comprehensive target management & counter controls platform for live range operations.',
      'Real-time hit detection streamed from the targets to the control screen over WebSockets.',
      'Custom C++ interrupt firmware running on ESP32 target microcontrollers.'
    ]
  },
  {
    title: 'MindGPS Telemetry Tracker',
    tier: 'tier1',
    tierLabel: 'Tier 1 Fleet Telemetry',
    url: 'https://gps.mindnrobotics.com/',
    image: '/img/mindgps_tracker.png',
    galleryImages: [
      '/img/mindgps_tracker.png',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop'
    ],
    status: 'Mindnrobotics',
    tag: 'Fleet Telemetry',
    description: 'Real-time fleet tracking platform with Teltonika FMC920 hardware integration. Custom Node.js TCP socket ingestion backend streaming telemetry into PostgreSQL.',
    tech: ['Teltonika FMC920', 'Node.js TCP', 'PostgreSQL', 'Leaflet GIS', 'Real-Time Tracking'],
    architectureFlow: ['Teltonika FMC920', 'TCP Raw Socket', 'Node.js Byte Parser', 'PostgreSQL Spatial', 'Leaflet GIS Frontend'],
    highlights: [
      'Seamless integration with Teltonika FMC920 hardware via custom binary packet parser.',
      'Node.js TCP server that ingests device telemetry into PostgreSQL.',
      'Live GIS map tracking interface built with Leaflet.'
    ]
  },
  {
    title: 'CanopyNet Plantation Mesh Network',
    tier: 'tier1',
    tierLabel: 'Tier 1 Mobile Robotics',
    url: 'https://canopynet.mindnrobotics.com/',
    image: '/img/canopynet_dashboard.png',
    galleryImages: [
      '/img/canopynet_dashboard.png',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
    ],
    status: 'Mindnrobotics',
    tag: 'Plantation Mesh',
    description: 'Teleoperation web system and fleet dashboard for plantation UGVs, built with a robotics teammate who handled the ROS 2 stack. Leaflet map tracking and live telemetry over field mesh networks.',
    tech: ['Vue 3', 'Plantation Mesh', 'Leaflet GIS', 'ROS 2 Bridge', 'WebSockets'],
    architectureFlow: ['UGV Hardware Sensors', 'ROS 2 Engine', 'Rajant Mesh Node', 'WebSocket Bridge', 'Vue 3 Fleet Dashboard'],
    highlights: [
      'Built the browser-based teleoperation system; a teammate built the ROS 2 side on the robots.',
      'Real-time UGV path tracking and tree canopy coverage spatial mapping.',
      'Low-latency status telemetry monitoring battery, GPS fix, and motor health over Rajant Mesh.'
    ]
  },
  {
    title: 'PKT Security Portal & E-Claim Platform',
    tier: 'tier1',
    tierLabel: 'Tier 1 Enterprise Portal',
    url: 'https://hazman.dev/eclaim',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop',
    status: 'PKT Logistics',
    tag: 'Enterprise App',
    description: 'Led front-end development for PKT Logistics internal portals, security management, CCTV access controls, e-claim system & WMS integration.',
    tech: ['Vue.js', 'Tailwind CSS', 'WMS API', 'CCTV Access', 'REST API'],
    architectureFlow: ['CCTV Access / WMS API', 'Express Backend', 'PostgreSQL', 'Vue.js + Tailwind Enterprise Portal'],
    highlights: [
      'Internal portals used by PKT staff and logistics vendors.',
      'Automated employee expense claim workflows with audit trails and PDF export.',
      'Integrated live CCTV access control monitoring feeds for warehouse security.'
    ]
  },

  // --- TIER 2: Full-Stack Web Applications ---
  {
    title: 'Interactive Org Chart Builder',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'https://hazman.dev/org-demo',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    status: 'Live Tool',
    tag: 'Web App',
    description: 'Interactive organization chart builder supporting drag-and-drop hierarchy management, custom role assignments, and instant sharing.',
    tech: ['Vue 3', 'TypeScript', 'D3 Org Chart', 'Cloudflare D1', 'Tailwind'],
  },
  {
    title: 'MediSaaS Clinic System',
    tier: 'tier2',
    tierLabel: 'Tier 2 SaaS App',
    url: 'https://demo-clinic-management-system.vercel.app/',
    image: '/img/medisaas_clinic.png',
    status: 'SaaS',
    tag: 'Medical SaaS',
    description: 'Comprehensive clinic management system with appointment scheduling, patient registry, doctor console, pharmacy integration, and queue display.',
    tech: ['Vue.js', 'Tailwind', 'Vercel', 'REST API'],
  },
  {
    title: 'Tasmik Progress Management System',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'http://[2001:f40:935:99c:6806:fc47:e2f3:97e7]:5175',
    image: '/img/tasmik_system.png',
    status: 'Live System',
    tag: 'School System',
    description: 'Comprehensive system for schools to manage student records, tasmik progress, attendance, and role-based permissions.',
    tech: ['Vue.js', 'Tailwind', 'Supabase', 'TypeScript'],
  },
  {
    title: 'Restaurant POS System',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'https://demo-restaurant-ordering-system.vercel.app/',
    image: '/img/restaurant_pos.png',
    status: 'AI Studio',
    tag: 'POS System',
    description: 'Modern Point of Sale system for restaurants, featuring order management, menu customization, and sales tracking.',
    tech: ['Vue.js', 'Tailwind', 'Firebase Firestore'],
  },
  {
    title: 'SmashPoint Badminton Booking',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'https://smashpoint.vercel.app/',
    image: '/img/smashpoint_booking.png',
    status: 'AI Studio',
    tag: 'Booking App',
    description: 'Modern badminton court booking system with real-time court availability, slot management, and seamless reservations.',
    tech: ['React', 'Tailwind', 'Firebase'],
  },
  {
    title: 'QR Memories',
    tier: 'tier2',
    tierLabel: 'Tier 2 Web App',
    url: 'https://qrmemories.pages.dev/login',
    image: '/img/qr_memories.png',
    status: 'Live',
    tag: 'Web App',
    description: 'Digital memory lane using QR codes to store and view photo collections. Share and scan to relive moments instantly.',
    tech: ['Vue.js', 'Cloudflare Pages', 'Tailwind'],
  },

  // --- TIER 3: Tools & Micro-Apps ---
  {
    title: 'EZQRCode Manager',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://ezqrcode.pages.dev/',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
    status: 'Live',
    tag: 'Web App',
    description: 'Dynamic QR Code Management system allowing users to create, track, and manage customizable QR codes seamlessly.',
    tech: ['Vue.js', 'Vite', 'Tailwind'],
  },
  {
    title: 'EZresit Receipt Manager',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://ezresit.pages.dev/',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop',
    status: 'SaaS',
    tag: 'SaaS',
    description: 'Minimalist, ultra-fast receipt management system exclusively for small businesses. 100% serverless and zero maintenance.',
    tech: ['Nuxt', 'Vue', 'Cloudflare Pages'],
  },
  {
    title: 'Confession Bot',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://confess-bot.pages.dev/',
    image: '/img/confession_bot.png',
    status: 'Live',
    tag: 'Discord Bot',
    description: 'An anonymous confession bot for Discord servers. Allows users to submit confessions anonymously to specified channels.',
    tech: ['Node.js', 'Discord.js', 'JavaScript'],
  },
  {
    title: 'TravThru Premium Chauffeur',
    tier: 'tier3',
    tierLabel: 'Tier 3 Client Web',
    url: 'https://www.travthru.com/',
    image: '/img/travthru.png',
    status: 'Client Site',
    tag: 'Client Website',
    description: 'Premium 24/7 airport transfer & chauffeur service in KL. Corporate and private booking for luxury MPVs.',
    tech: ['Web Dev', 'SEO', 'Responsive'],
  },
  {
    title: 'Birthday Wish Creator',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://hazman.dev/birthday/create',
    image: '/img/birthday_wish.png',
    status: 'Live Tool',
    tag: 'Web App',
    description: 'Multi-user birthday page system with customizable templates, YouTube music integration, and wish submission forms.',
    tech: ['Vue.js', 'Supabase', 'Tailwind'],
  },
  {
    title: 'Global Photo Collection',
    tier: 'tier3',
    tierLabel: 'Tier 3 Media App',
    url: 'https://hazman.dev/photocollection',
    image: '/img/photo_collection.png',
    status: 'Live Showcase',
    tag: 'Media Showcase',
    description: 'Curated photo collection showcasing travel photography categorized by countries & landmarks.',
    tech: ['Vue.js', 'Cloudflare R2', 'Tailwind'],
  },
  {
    title: 'WiFi QR Code Generator',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://hazman.dev/wifi-qr',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    status: 'Live Tool',
    tag: 'Utility',
    description: 'Instant printable QR code generator for guest Wi-Fi access without typing passwords.',
    tech: ['Vue 3', 'QRCode Canvas', 'Tailwind'],
  },
  {
    title: 'Social Copywriting Generator',
    tier: 'tier3',
    tierLabel: 'Tier 3 Utility',
    url: 'https://hazman.dev/caption',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    status: 'Live Tool',
    tag: 'Copy Tool',
    description: 'Interactive caption generator assistant for social media posts, structuring tags and promotional copy.',
    tech: ['Vue 3', 'Composition API', 'Tailwind'],
  },
];
