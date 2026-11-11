import {
  Building2,
  Car,
  Cctv,
  ConciergeBell,
  Flame,
  HardHat,
  House,
  ShoppingBag,
  Ticket,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  headline: string;
  intro: string;
  includes: string[];
  idealFor: string[];
  icon: LucideIcon;
  image: string;
  imageAlt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "construction-security",
    title: "Construction Site Security",
    short: "Keep tools, materials and equipment where you left them, from groundbreaking to handover.",
    headline: "Your site, secured after the crews go home.",
    intro:
      "Construction sites are some of the most targeted properties in the GTA. Copper, tools, fuel and heavy equipment sit behind temporary fencing overnight. Our guards secure the perimeter after hours, control who comes on site during the day, and document every shift so your superintendent knows exactly what happened while they were away.",
    includes: [
      "Overnight, weekend and holiday guard coverage",
      "Gate control and sign-in for trades, deliveries and visitors",
      "Regular perimeter patrols with logged checkpoints",
      "Deterrence of equipment, material and fuel theft",
      "Checks on hoarding, fencing and site lighting",
      "Daily activity and incident reports sent to your site team",
      "Fire watch during hot work or when systems are impaired",
    ],
    idealFor: [
      "High-rise and mid-rise developments",
      "Residential subdivisions",
      "Infrastructure and road works",
      "Renovation and demolition projects",
      "Laydown yards and equipment storage",
    ],
    icon: HardHat,
    image: "/images/construction-security.svg",
    imageAlt: "Security guard with a flashlight patrolling a construction site at night",
  },
  {
    slug: "residential-security",
    title: "Residential Security",
    short: "Guards and patrols for condominiums, rental buildings and residential communities.",
    headline: "Residents who feel safe coming home.",
    intro:
      "Residents want to feel safe coming home, and property managers want fewer incidents waiting for them in the morning. We provide uniformed guards and scheduled patrols for condos, rental buildings, townhouse complexes and gated communities. Our guards work to your building's rules and report to your management team.",
    includes: [
      "On-site guards for lobbies, garages and amenity spaces",
      "Scheduled patrols of parking garages, stairwells and common areas",
      "Enforcement of building rules, parking and amenity bookings",
      "Response to noise complaints, trespassers and disturbances",
      "Visitor and contractor management",
      "Detailed shift logs and incident reports for property managers",
    ],
    idealFor: [
      "Condominium corporations",
      "Rental apartment buildings",
      "Townhouse and gated communities",
      "Student residences",
      "Property management companies",
    ],
    icon: House,
    image: "/images/residential-security.svg",
    imageAlt: "Security guard patrolling outside a condo tower and townhouses at night",
  },
  {
    slug: "concierge-security",
    title: "Concierge Security",
    short: "Front-desk officers who welcome residents and visitors while keeping the building secure.",
    headline: "The first face people see, trained for security.",
    intro:
      "A concierge is the first person residents and guests meet. Our concierge security officers combine customer service with security training. They greet visitors, manage deliveries and access, and stay alert to anything out of place, so your lobby is both welcoming and controlled.",
    includes: [
      "Front desk coverage from business hours to 24/7",
      "Visitor sign-in and access control",
      "Package receiving, logging and resident notification",
      "Key, fob and amenity booking management",
      "CCTV monitoring from the desk",
      "Elevator bookings for move-ins and contractors",
      "First response to alarms, floods and medical calls",
    ],
    idealFor: [
      "Luxury and mid-rise condominiums",
      "Office buildings",
      "Mixed-use developments",
      "Hotels and serviced residences",
    ],
    icon: ConciergeBell,
    image: "/images/concierge-security.svg",
    imageAlt: "Concierge security officer at the front desk of a condo lobby",
  },
  {
    slug: "commercial-security",
    title: "Commercial Security",
    short: "Uniformed guards for offices, plazas, warehouses and industrial sites.",
    headline: "A team that knows your people and your property.",
    intro:
      "Every business has different risks: after-hours break-ins at a plaza, tailgating into an office, or cargo theft from a warehouse yard. We assess your site, recommend the right mix of guards and patrols, and assign a consistent team that learns your people, your procedures and your property.",
    includes: [
      "Uniformed guards for lobbies, reception and loading docks",
      "Access control, badge checks and visitor management",
      "Opening and closing procedures",
      "Interior and exterior patrols",
      "Shipping and receiving oversight",
      "Alarm response and keyholding",
      "Incident reporting and regular reviews with your team",
    ],
    idealFor: [
      "Corporate offices",
      "Retail plazas and shopping centres",
      "Warehouses and distribution centres",
      "Manufacturing and industrial facilities",
      "Car dealerships",
    ],
    icon: Building2,
    image: "/images/commercial-security.svg",
    imageAlt: "Security guard on patrol in a downtown office plaza at night",
  },
  {
    slug: "mobile-patrol",
    title: "Mobile Patrol & Alarm Response",
    short: "Marked patrol vehicles that check your property on a schedule and respond to alarms.",
    headline: "A visible presence without a full-time post.",
    intro:
      "Not every property needs a guard on site all night. Our mobile patrol officers visit at varied times, check doors, gates and lighting, and respond when your alarm goes off, so your staff don't have to drive in at 3 a.m. It's a visible deterrent at a fraction of the cost of a dedicated guard.",
    includes: [
      "Randomized patrol visits, day or night",
      "Lock-up and unlock services",
      "Exterior and interior property checks",
      "Alarm response and keyholding",
      "Checkpoint scans logged at every visit",
      "Photo reports after each patrol",
    ],
    idealFor: [
      "Plazas and small businesses",
      "Vacant buildings and properties for sale",
      "Construction sites between phases",
      "Industrial parks",
      "Residential communities",
    ],
    icon: Car,
    image: "/images/mobile-patrol.svg",
    imageAlt: "Marked mobile patrol vehicle driving through the city at night",
  },
  {
    slug: "event-security",
    title: "Event Security",
    short: "Crowd management, access control and trained staff for events of every size.",
    headline: "Events that run smoothly from doors to load-out.",
    intro:
      "From a corporate gala to a festival with thousands of guests, events go better when security is planned in advance. We work with organizers and venues on staffing, entry points and emergency procedures, then provide the team to run it on the day.",
    includes: [
      "Security planning with organizers and venues",
      "Ticket and wristband checks at entry points",
      "Bag checks and screening",
      "Crowd management and barricade control",
      "Backstage, VIP and restricted area access",
      "Coordination with police, paramedics and venue staff",
      "Overnight protection of equipment and staging",
    ],
    idealFor: [
      "Concerts and festivals",
      "Corporate events and galas",
      "Weddings and private functions",
      "Sporting events",
      "Film and TV productions",
    ],
    icon: Ticket,
    image: "/images/event-security.svg",
    imageAlt: "Event security team standing in front of a concert stage",
  },
  {
    slug: "fire-watch",
    title: "Fire Watch",
    short: "Trained guards when alarms or sprinklers are out of service, or hot work is under way.",
    headline: "Coverage while your fire systems are down.",
    intro:
      "When a fire alarm or sprinkler system is out of service, the fire department or your insurer will often require a fire watch until it's restored. Fire watch is also common during hot work like welding and cutting. Our fire watch guards patrol on a set schedule, log every round, and know how to raise the alarm and help people out if something goes wrong.",
    includes: [
      "Coverage on short notice when systems go down",
      "Scheduled patrols of every floor and area",
      "Timestamped logs of each round for fire officials and insurers",
      "Monitoring during and after hot work",
      "Checks on exits, extinguishers and fire doors",
      "Raising the alarm and assisting with evacuation",
    ],
    idealFor: [
      "Buildings with impaired alarm or sprinkler systems",
      "Construction and renovation sites",
      "Hot work and welding operations",
      "Warehouses and industrial facilities",
      "Events in temporary structures",
    ],
    icon: Flame,
    image: "/images/fire-watch.svg",
    imageAlt: "Fire watch guard patrolling a building corridor",
  },
  {
    slug: "loss-prevention",
    title: "Retail Loss Prevention",
    short: "Uniformed and plainclothes officers who reduce shoplifting and internal theft.",
    headline: "Less shrink, safer stores.",
    intro:
      "Retail theft hurts margins and puts staff in difficult situations. Our loss prevention officers work as a visible deterrent at the door or blend in on the floor. They are trained to handle incidents safely and within the law, and to document them properly for police and insurers.",
    includes: [
      "Uniformed guards at entrances and high-risk areas",
      "Plainclothes loss prevention officers",
      "Safe, lawful incident handling",
      "CCTV monitoring and EAS alarm response",
      "Evidence and incident reports for police and insurers",
      "Store opening, closing and cash escorts",
      "Theft trend reviews with store management",
    ],
    idealFor: [
      "Grocery and pharmacy",
      "Big-box and department stores",
      "Liquor and cannabis retail",
      "Electronics and luxury retail",
      "Shopping centres",
    ],
    icon: ShoppingBag,
    image: "/images/loss-prevention.svg",
    imageAlt: "Loss prevention officer at the entrance of a retail store",
  },
  {
    slug: "remote-monitoring",
    title: "Remote Video Monitoring",
    short: "Live operators watch your cameras and act the moment something looks wrong.",
    headline: "Cameras that do more than record.",
    intro:
      "Cameras record what happened. Live monitoring helps stop it from happening. Our operators watch your cameras during the hours you choose, use talk-down speakers to warn trespassers, and dispatch a patrol or call police when needed.",
    includes: [
      "Live monitoring of your existing cameras",
      "Audio talk-down to warn trespassers",
      "Mobile patrol dispatch and police calls",
      "Camera health checks",
      "Event clips and incident reports",
      "Pairing with on-site guards or mobile patrol",
    ],
    idealFor: [
      "Construction sites",
      "Car lots and equipment yards",
      "Warehouses",
      "Remote or vacant properties",
      "Retail after hours",
    ],
    icon: Cctv,
    image: "/images/remote-monitoring.svg",
    imageAlt: "Operator watching live camera feeds in a monitoring centre",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
