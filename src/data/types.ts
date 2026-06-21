export type Category =
  | "politics"
  | "investigations"
  | "human-rights"
  | "communities"
  | "education"
  | "health"
  | "governance"
  | "opinion"
  | "fact-check";

export type NigerianState =
  | "Ogun"
  | "Oyo"
  | "Osun"
  | "Ekiti"
  | "Lagos"
  | "Ondo"
  | "Kwara"
  | "Niger"
  | "Benue"
  | "Taraba";

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  beats: Category[];
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  state?: NigerianState;
  authorSlug: string;
  publishedAt: string; // ISO
  updatedAt?: string;
  readingMinutes: number;
  excerpt: string;
  body: string[]; // paragraphs / blocks (md-like, see renderer)
  tags: string[];
  factChecked?: boolean;
  isInvestigation?: boolean;
  sources?: { label: string; url?: string }[];
}

export const CATEGORY_LABEL: Record<Category, string> = {
  politics: "Politics",
  investigations: "Investigations",
  "human-rights": "Human Rights",
  communities: "Communities",
  education: "Education",
  health: "Health",
  governance: "Governance",
  opinion: "Opinion",
  "fact-check": "Fact Check",
};

export const ALL_CATEGORIES: Category[] = [
  "politics",
  "investigations",
  "human-rights",
  "communities",
  "education",
  "health",
  "governance",
  "opinion",
  "fact-check",
];

export const ALL_STATES: NigerianState[] = [
  "Ogun",
  "Oyo",
  "Osun",
  "Ekiti",
  "Lagos",
  "Ondo",
  "Kwara",
  "Niger",
  "Benue",
  "Taraba",
];
