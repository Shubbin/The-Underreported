import type { Author } from "./types";

export const AUTHORS: Author[] = [
  {
    slug: "adaeze-okonkwo",
    name: "Adaeze Okonkwo",
    role: "Senior Investigative Reporter",
    bio: "Adaeze has covered governance and public accountability across South-West Nigeria for over a decade, focusing on procurement fraud and abandoned public projects.",
    initials: "AO",
    beats: ["investigations", "governance", "politics"],
  },
  {
    slug: "ibrahim-musa",
    name: "Ibrahim Musa",
    role: "Politics Correspondent",
    bio: "Ibrahim reports on elections, party politics and legislative oversight from Abuja, with field reporting across the Middle Belt.",
    initials: "IM",
    beats: ["politics", "governance"],
  },
  {
    slug: "tolu-adebayo",
    name: "Tolu Adebayo",
    role: "Health Editor",
    bio: "Tolu writes on primary health care, maternal mortality and the Nigerian pharmaceutical supply chain.",
    initials: "TA",
    beats: ["health", "communities"],
  },
  {
    slug: "ngozi-eze",
    name: "Ngozi Eze",
    role: "Human Rights Reporter",
    bio: "Ngozi documents abuses by security agencies, gender-based violence and the rights of displaced persons.",
    initials: "NE",
    beats: ["human-rights", "communities"],
  },
  {
    slug: "yusuf-bello",
    name: "Yusuf Bello",
    role: "Education Reporter",
    bio: "Yusuf covers basic education, out-of-school children and tertiary funding across northern and central Nigeria.",
    initials: "YB",
    beats: ["education", "governance"],
  },
  {
    slug: "funmi-ojo",
    name: "Funmi Ojo",
    role: "Communities Editor",
    bio: "Funmi reports from underrepresented communities, with a focus on land disputes, traditional institutions and rural infrastructure.",
    initials: "FO",
    beats: ["communities", "human-rights"],
  },
  {
    slug: "samuel-ekene",
    name: "Samuel Ekene",
    role: "Fact-Check Editor",
    bio: "Samuel leads the platform's verification desk, scrutinising political claims, viral content and government statistics.",
    initials: "SE",
    beats: ["fact-check", "politics"],
  },
  {
    slug: "halima-suleiman",
    name: "Halima Suleiman",
    role: "Opinion Editor",
    bio: "Halima commissions and edits commentary on Nigerian public life, with a background in constitutional law.",
    initials: "HS",
    beats: ["opinion", "governance"],
  },
];

export const authorBySlug = (slug: string) =>
  AUTHORS.find((a) => a.slug === slug) ?? AUTHORS[0];
