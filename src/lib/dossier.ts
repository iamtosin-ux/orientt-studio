// Trip dossier data model.
//
// A Dossier is a curated set of journeys for a traveller (or party):
//
//   Dossier → Trip[] → Destination[] → Hotel[]  (curated options)
//
// For each destination the concierge curates a short list of hotels and the
// traveller picks ONE to book. So the atomic decision is a single hotel choice
// per destination. Two booking flows fall out of this:
//
//   1. Book one destination  — pick a hotel, reserve just that stay.
//   2. Book the whole experience — choose one hotel for every destination
//      across every trip, then reserve them all in one pass.
//
// Nights (and dates) belong to the destination — they're fixed for the stay.
// pricePerNight belongs to the hotel, so a hotel's cost = nights × rate.

export type Hotel = {
  id: string;
  name: string;
  roomType: string;
  pricePerNight: number;
  rating: number; // out of 5
  blurb: string; // one-line positioning
  why: string; // concierge note — why it's on the list
  highlights: string[];
  /** Palette for the generated cover art when no photo is supplied. */
  palette: { from: string; via: string; to: string; glow: string };
  image?: string;
};

export type Destination = {
  id: string;
  name: string; // "Fiji"
  area: string; // "Mamanuca & Yasawa Islands"
  checkIn: string; // ISO
  checkOut: string; // ISO
  nights: number;
  note: string; // scene-setter
  hotels: Hotel[]; // curated options — choose one
};

export type Trip = {
  id: string;
  name: string; // "The Honeymoon"
  tagline: string;
  dateRange: string; // "November 2024"
  destinations: Destination[];
};

export type Dossier = {
  slug: string;
  title: string;
  travellers: string[];
  curator: string;
  intro: string;
  currency: string;
  trips: Trip[];
};

export const DOSSIER: Dossier = {
  slug: "arnelle-tim",
  title: "Arnelle & Tim",
  travellers: ["Arnelle Ansong", "Tim Chang"],
  curator: "Anecdote",
  currency: "USD",
  intro:
    "Two journeys, held and ready. For each destination we've shortlisted a few places we'd happily send you to — choose the one that feels right. Book a single stay, or make every choice and reserve the whole experience at once.",
  trips: [
    {
      id: "honeymoon",
      name: "The Honeymoon",
      tagline: "Ocean, then autumn",
      dateRange: "November 2024",
      destinations: [
        {
          id: "fiji",
          name: "Fiji",
          area: "Mamanuca & Yasawa Islands",
          checkIn: "2024-11-05",
          checkOut: "2024-11-12",
          nights: 7,
          note: "Barefoot luxury on the reef — open water, long lunches, nothing on the calendar.",
          hotels: [
            {
              id: "six-senses-fiji",
              name: "Six Senses Fiji",
              roomType: "Beachfront Pool Villa",
              pricePerNight: 1850,
              rating: 4.9,
              blurb: "Solar-run villas a swim from the house reef.",
              why: "The gentlest landing — sustainable, reef-fringed, and a five-minute swim from the coral you'll snorkel every morning.",
              highlights: ["Private plunge pool", "House-reef snorkelling", "Solar-powered"],
              palette: { from: "#0e6b7a", via: "#18a6a0", to: "#7fd6c0", glow: "#7ff0d6" },
            },
            {
              id: "likuliku-lagoon",
              name: "Likuliku Lagoon",
              roomType: "Overwater Bure",
              pricePerNight: 1400,
              rating: 4.8,
              blurb: "The only overwater bures in Fiji.",
              why: "Suspended over the lagoon — glass floor panels, a ladder straight into the water, adults-only quiet.",
              highlights: ["Overwater bure", "Adults only", "All-inclusive dining"],
              palette: { from: "#0a4f8a", via: "#1f86c8", to: "#8fd0f2", glow: "#5cc6ff" },
            },
            {
              id: "como-laucala",
              name: "COMO Laucala Island",
              roomType: "Plantation Villa",
              pricePerNight: 2400,
              rating: 5.0,
              blurb: "A private island of 25 villas.",
              why: "For total seclusion — your own stretch of a private island, horses, a golf course, and a farm that feeds the kitchen.",
              highlights: ["Private island", "Personal villa staff", "Farm-to-table"],
              palette: { from: "#0f7a5e", via: "#25b083", to: "#9fe0c2", glow: "#7ff0c0" },
            },
          ],
        },
        {
          id: "kyoto",
          name: "Kyoto",
          area: "Japan",
          checkIn: "2024-11-13",
          checkOut: "2024-11-19",
          nights: 6,
          note: "Momiji at its peak — temple gardens turning crimson, kaiseki dinners, quiet mornings.",
          hotels: [
            {
              id: "ritz-kyoto",
              name: "The Ritz-Carlton, Kyoto",
              roomType: "Kamogawa River Deluxe",
              pricePerNight: 1100,
              rating: 4.9,
              blurb: "Riverside rooms under the eastern hills.",
              why: "A central base for temple runs — walk the Kamogawa at dawn, Higashiyama's maples a short ride away.",
              highlights: ["River views", "Mizuki kaiseki", "Central"],
              palette: { from: "#7a1524", via: "#c23a2b", to: "#e8863a", glow: "#ff9d4d" },
            },
            {
              id: "hoshinoya-kyoto",
              name: "Hoshinoya Kyoto",
              roomType: "Riverside Ryokan Suite",
              pricePerNight: 1300,
              rating: 4.9,
              blurb: "A ryokan reached only by boat.",
              why: "A private boat up the Oi River to a hidden ryokan in the Arashiyama maples. Tea, incense, the garden.",
              highlights: ["Boat arrival", "Arashiyama garden", "Kaiseki"],
              palette: { from: "#6a2233", via: "#a83a48", to: "#d99a5b", glow: "#f0b36b" },
            },
            {
              id: "aman-kyoto",
              name: "Aman Kyoto",
              roomType: "Onsen Pavilion",
              pricePerNight: 1700,
              rating: 5.0,
              blurb: "A forest sanctuary below Mount Hidari Daimonji.",
              why: "Stone gardens and moss in a secret forest north of the city, with a private onsen fed by mountain spring water.",
              highlights: ["Private onsen", "Secret forest", "Stone gardens"],
              palette: { from: "#3f5a2f", via: "#6a8a3e", to: "#c7a24a", glow: "#e0c76a" },
            },
          ],
        },
      ],
    },
    {
      id: "anniversary",
      name: "One Year On",
      tagline: "The Amalfi Coast",
      dateRange: "September 2025",
      destinations: [
        {
          id: "positano",
          name: "Positano",
          area: "Amalfi Coast, Italy",
          checkIn: "2025-09-06",
          checkOut: "2025-09-10",
          nights: 4,
          note: "Vertical village of pastel houses, lemon groves, and long lunches above the sea.",
          hotels: [
            {
              id: "le-sirenuse",
              name: "Le Sirenuse",
              roomType: "Sea View Room",
              pricePerNight: 1500,
              rating: 4.9,
              blurb: "The address on the Positano waterfront.",
              why: "A former summer home turned icon — red façade, Champagne bar, the view every photograph of Positano is trying to be.",
              highlights: ["Sea-view terrace", "Champagne bar", "Michelin dining"],
              palette: { from: "#1f6fae", via: "#3ba0d6", to: "#f0c24a", glow: "#ffd76a" },
            },
            {
              id: "il-san-pietro",
              name: "Il San Pietro di Positano",
              roomType: "Terrace Suite",
              pricePerNight: 1900,
              rating: 5.0,
              blurb: "Carved into the cliff, a lift down to the sea.",
              why: "Cascading terraces of bougainvillea with a private beach club at the bottom of the rock — quieter than town, and unforgettable.",
              highlights: ["Private beach club", "Cliffside terraces", "Sea lift"],
              palette: { from: "#175f7a", via: "#2f97a8", to: "#e86a86", glow: "#ff97ac" },
            },
          ],
        },
        {
          id: "capri",
          name: "Capri",
          area: "Bay of Naples, Italy",
          checkIn: "2025-09-10",
          checkOut: "2025-09-13",
          nights: 3,
          note: "Faraglioni rocks, the Blue Grotto, and evenings in the Piazzetta.",
          hotels: [
            {
              id: "punta-tragara",
              name: "Hotel Punta Tragara",
              roomType: "Faraglioni Sea View",
              pricePerNight: 1200,
              rating: 4.8,
              blurb: "A Le Corbusier villa facing the Faraglioni.",
              why: "The best view on the island — two pools cut into the terrace and the famous rocks close enough to touch.",
              highlights: ["Faraglioni view", "Two heated pools", "Le Corbusier design"],
              palette: { from: "#1466a8", via: "#39a0d0", to: "#e88f4a", glow: "#ffb066" },
            },
            {
              id: "capri-palace",
              name: "Capri Palace, Anacapri",
              roomType: "Superior Room",
              pricePerNight: 1000,
              rating: 4.7,
              blurb: "An art-filled retreat above the crowds.",
              why: "Up in quiet Anacapri — a private pools-and-suites wing, a Michelin restaurant, and a boat to its own beach club.",
              highlights: ["Rooftop pools", "Michelin dining", "Beach club shuttle"],
              palette: { from: "#2a6f9e", via: "#4aa6c4", to: "#d98ab0", glow: "#f2a6c8" },
            },
          ],
        },
      ],
    },
  ],
};

// ── Derived helpers ────────────────────────────────────────────────────────

export const ALL_DESTINATIONS: Destination[] = DOSSIER.trips.flatMap(
  (t) => t.destinations,
);

/** A traveller's choices: destinationId → chosen hotelId. */
export type Selection = Record<string, string | undefined>;

export function hotelTotal(hotel: Hotel, destination: Destination): number {
  return hotel.pricePerNight * destination.nights;
}

export function findHotel(destination: Destination, hotelId?: string): Hotel | undefined {
  return destination.hotels.find((h) => h.id === hotelId);
}

/** Sum of chosen hotels across a set of destinations. */
export function selectionTotal(
  selection: Selection,
  destinations: Destination[],
): number {
  return destinations.reduce((sum, d) => {
    const hotel = findHotel(d, selection[d.id]);
    return sum + (hotel ? hotelTotal(hotel, d) : 0);
  }, 0);
}

export function countChosen(selection: Selection, destinations: Destination[]): number {
  return destinations.filter((d) => selection[d.id]).length;
}

const _fmt: Record<string, Intl.NumberFormat> = {};
export function money(amount: number, currency = "USD"): string {
  const f =
    _fmt[currency] ??
    (_fmt[currency] = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }));
  return f.format(amount);
}

/** "Nov 5" style label. */
export function shortDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
