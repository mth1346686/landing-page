export interface Program {
  id: string;
  title: string;
  category: string;
  badge: string;
  duration: string;
  intensity: string;
  description: string;
  target: string;
  image: string;
}

export interface Hub {
  id: string;
  name: string;
  area: string;
  hours: string;
  phone: string;
  address: string;
  status: string;
  statusColor: string;
  size: string;
  amenities: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  monthly: number;
  quarterly: number;
  featured: boolean;
  features: string[];
}

export const PROGRAMS: Program[] = [
  {
    "id": "prog-1",
    "title": "IRON HYPERTROPHY PROTOCOL",
    "category": "Hypertrophy",
    "badge": "High Volume",
    "duration": "60-75 Min",
    "intensity": "Max Overload (RPE 9)",
    "description": "High-volume eccentric overloading targeting pure muscle fiber recruitment. Built around heavy multi-joint barbells and custom calibrated isolation cables.",
    "target": "Chest, Delts & Back Thickness",
    "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prog-2",
    "title": "APEX POWERLIFTING SQUAD",
    "category": "Powerlifting",
    "badge": "Sub-Max Strength",
    "duration": "90 Min",
    "intensity": "1-3 Rep Max Effort",
    "description": "Chalk-heavy platform lifting on competition Eleiko benches and calibrated Texas power bars. Structured periodization for Squat, Bench, and Deadlift PRs.",
    "target": "Posterior Chain, Grip & Absolute Force",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prog-3",
    "title": "METABOLIC CONDITIONING RUSH",
    "category": "Conditioning",
    "badge": "Fat Shred",
    "duration": "45 Min",
    "intensity": "Zone 4-5 Anaerobic",
    "description": "Brutal full-body conditioning featuring heavy sled pushes, battle ropes, assault bikes, and kettlebell clean-and-press complexes.",
    "target": "Cardiovascular Stamina & Body Fat Cut",
    "image": "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "prog-4",
    "title": "GLADIATOR COMBAT STRENGTH",
    "category": "Combat Strength",
    "badge": "Striking Power",
    "duration": "60 Min",
    "intensity": "Explosive Torque",
    "description": "Rotational core development, neck bridging, sandbag carries, and explosive hip thrusts engineered for combat sports athletes and heavy hitters.",
    "target": "Rotational Kinetic Chain & Neck Stability",
    "image": "https://images.unsplash.com/photo-1545015477-a190725df01b?auto=format&fit=crop&w=800&q=80"
  }
];

export const HUBS: Hub[] = [
  {
    "id": "hub-newcairo",
    "name": "New Cairo Flagship",
    "area": "5th Settlement \u2022 North 90th St",
    "hours": "24/7 Unrestricted Access",
    "phone": "+20 102 334 9901",
    "address": "North 90th St, Plot 44B, New Cairo",
    "status": "OPEN 24/7",
    "statusColor": "#10B981",
    "size": "2,400 m\u00b2 Triple Level",
    "amenities": [
      "16 Olympic Squat Racks",
      "Recovery Cryo & Finnish Sauna",
      "Shark Fuel Protein Bar",
      "Outdoor Strongman Turf"
    ]
  },
  {
    "id": "hub-maadi",
    "name": "Maadi Iron Bunker",
    "area": "Degla \u2022 Street 218",
    "hours": "24/7 Unrestricted Access",
    "phone": "+20 102 334 9902",
    "address": "Street 218, Degla, Maadi, Cairo",
    "status": "OPEN 24/7",
    "statusColor": "#10B981",
    "size": "1,800 m\u00b2 Industrial Cellar",
    "amenities": [
      "Chalk-Allowed Deadlift Platforms",
      "Infrared Heat Sauna",
      "Private Athlete Lockers",
      "Bouldering & Peg Board Wall"
    ]
  },
  {
    "id": "hub-tanta",
    "name": "Tanta Delta Hub",
    "area": "Al-Geish Street \u2022 Delta Prime",
    "hours": "06:00 AM \u2013 02:00 AM Daily",
    "phone": "+20 102 334 9903",
    "address": "Al-Geish Street, Tower 3, Tanta",
    "status": "OPEN TODAY",
    "statusColor": "#F59E0B",
    "size": "1,500 m\u00b2 Mega Arena",
    "amenities": [
      "Dumbbells up to 75 KG",
      "Powerlifting Competition Monolift",
      "InBody 770 Clinical Analyzer",
      "Physiotherapy Clinic"
    ]
  }
];

export const PRICING: PricingPlan[] = [
  {
    "id": "plan-predator",
    "name": "PREDATOR PASS",
    "badge": "Standard Athlete",
    "monthly": 850,
    "quarterly": 2165,
    "featured": false,
    "features": [
      "Full Open Gym Access (Single Hub)",
      "Olympic Lifting Platforms & Heavy Dumbbells",
      "Locker Rooms & Steam Sauna Access",
      "Shark Gym Mobile Access Key",
      "Free Parking Access"
    ]
  },
  {
    "id": "plan-apex",
    "name": "APEX PRO",
    "badge": "BEST VALUE \u2022 MOST POPULAR",
    "monthly": 1500,
    "quarterly": 3825,
    "featured": true,
    "features": [
      "All 3 Hubs 24/7 Unrestricted Access",
      "Monthly Clinical InBody 770 Body Composition",
      "Unlimited Finnish Sauna & Ice Cryo Plunge",
      "15% Off Shark Protein & Supplement Bar",
      "2 Guest Passes / Month Included",
      "Exclusive Shark Athlete Training Tee"
    ]
  },
  {
    "id": "plan-vip",
    "name": "GREAT WHITE VIP",
    "badge": "Elite Executive",
    "monthly": 2800,
    "quarterly": 7140,
    "featured": false,
    "features": [
      "All-Branch 24/7 VIP Keycard Access",
      "8 Dedicated 1-on-1 Master Trainer Sessions / mo",
      "Personal Reserved Permanent Locker",
      "Custom Macro & Hypertrophy Nutrition Protocol",
      "Daily Complimentary Pre-Workout / Protein Shake",
      "Priority Booking for Recovery Suite"
    ]
  }
];
