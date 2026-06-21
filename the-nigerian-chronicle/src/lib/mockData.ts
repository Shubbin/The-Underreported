import { Author, Article, Category, NigerianState } from "../data/types";

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

const ALL_CATEGORIES: Category[] = [
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

const ALL_STATES: NigerianState[] = [
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

const TITLE_TEMPLATES: Record<Category, string[]> = {
  politics: [
    "Inside the {state} primaries: how the {party} settled its 2027 ticket",
    "{state} lawmakers move to amend local government autonomy bill",
    "Defections reshape {state} House of Assembly ahead of by-election",
    "Voter register clean-up leaves thousands in {state} uncertain",
    "{state} governor signs revised electoral conduct order into law",
    "Opposition coalition in {state} announces unified candidate framework",
  ],
  investigations: [
    "Abandoned: the N{n}bn school projects that never reached {state} children",
    "Tracing the missing fertiliser meant for {state} smallholders",
    "Inside the procurement trail behind {state}'s collapsed flyover",
    "How a {state} agency awarded contracts to companies that did not exist",
    "Documents reveal duplicate payments at the {state} ministry of works",
    "The hospital that wasn't built: {n} years of records from {state}",
  ],
  "human-rights": [
    "Allegations of FGM persist in {state} community despite state ban",
    "Detained without trial: stories from {state} correctional centres",
    "Security force raid leaves {state} village without shelter or recourse",
    "Widows in rural {state} say customary practices still strip them of land",
    "Mob violence in {state} highlights gaps in policing reform",
    "Journalists in {state} report rising harassment over local reporting",
  ],
  communities: [
    "A {state} community has waited {n} years for a borehole. It is still waiting.",
    "How residents of {state}'s riverine settlements rebuild after every flood",
    "The market women keeping a {state} town's economy together",
    "Land grabs and silent displacement on the outskirts of {state}",
    "Inside the {state} cooperative quietly funding small farms",
    "Why a {state} community is rejecting the new federal road alignment",
  ],
  education: [
    "Out-of-school children in {state}: what the new survey actually shows",
    "Teachers in {state} go {n} months without salaries, again",
    "Public schools in {state} reopen with crumbling roofs and no chairs",
    "Why a {state} university shut its gates for the third time this year",
    "The free meal programme in {state} feeds fewer pupils than reported",
    "Inside {state}'s push to digitise basic education records",
  ],
  health: [
    "Primary health centres in {state} run on donations and goodwill",
    "Maternal deaths in {state}: what one rural ward reveals",
    "{state} reports rise in measles cases as vaccine stockouts persist",
    "The drug shops filling in for absent doctors in {state}",
    "Mental health care in {state}: one psychiatrist for every {n} residents",
    "How a cholera outbreak spread through {state}'s flood-hit settlements",
  ],
  governance: [
    "{state} budget implementation falls short for the {n}th consecutive quarter",
    "Local government chairs in {state} sworn in amid funding standoff",
    "Audit report flags unretired {state} ministry imprest going back {n} years",
    "Civil servants in {state} protest delayed minimum wage adjustment",
    "{state} House passes transparency bill on contract disclosures",
    "Inside the slow rollout of the {state} citizens' service charter",
  ],
  opinion: [
    "Nigeria's quiet collapse of local journalism is a governance problem",
    "Why {state}'s next budget cycle must be different",
    "The case for treating subnational data as a public good",
    "What accountability really means at the ward level",
    "Reporting from underrepresented states is not optional",
    "Public trust will not return without sustained disclosure",
  ],
  "fact-check": [
    "Did the {state} government really build {n} new schools this year?",
    "No, that viral video does not show a {state} election rally",
    "Checking the claim: {state} reduced maternal mortality by {n}% in one year",
    "Misleading: posts about {state}'s new minimum wage policy",
    "Mostly false: a viral claim about {state}'s health insurance enrollment",
    "What the data says about crime statistics released by {state}",
  ],
};

const PARTIES = ["APC", "PDP", "LP", "NNPP", "APGA", "SDP"];

const PARAGRAPHS = [
  "Reporting for this story drew on more than three months of document review, interviews with serving and former public officials, and field visits to affected communities.",
  "Public records obtained by our newsroom show a pattern that residents and civil society groups have raised publicly for years, without a substantive response from the relevant agencies.",
  "Officials named in this report were contacted by phone, email, and in person. Where responses were received, they are included verbatim. Where they were not, we note the outreach.",
  "The findings raise familiar questions about how public funds are tracked at the subnational level, and what recourse citizens have when projects financed in their name fail to materialise.",
  "Local residents interviewed for this story asked that their full names be withheld, citing reprisals against community members who have spoken to reporters in the past.",
  "A community health worker, who has worked in the area for over a decade, said the situation had worsened over the past two years despite repeated promises during campaign visits.",
  "Independent verification of the budget lines cited in this report is available through the open contracting portal maintained by the relevant state government.",
  "Our newsroom will continue to follow this story. Readers with documents, photographs or first-hand accounts are invited to write to the editorial desk through the secure tip line.",
  "The federal ministry referred questions to the state office, which in turn referred us back to the federal agency. Neither responded substantively before publication.",
  "Civil society organisations active in the affected local government area have called for an independent audit, citing what they describe as a long-running pattern of unfulfilled commitments.",
];

const QUOTES = [
  "We have written letters. We have sent delegations. The only thing we have not received is a response.",
  "When the project was commissioned, the politicians came with cameras. When it failed, no one came back.",
  "The records are public. The question is whether anyone in authority is reading them.",
  "I have lived in this community my whole life. The promises change. The roads do not.",
  "If a journalist had not asked, we would still be told that everything is fine.",
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[''"".,:;!?()]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20230114);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const pickN = <T>(arr: T[], n: number): T[] => {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0]);
  }
  return out;
};

function makeBody(title: string, state?: string): string[] {
  const intro = `${title}. The story that follows draws on field reporting in ${state ?? "Nigeria"}, supported by public records and interviews with people directly affected.`;
  const paras = pickN(PARAGRAPHS, 6);
  return [
    intro,
    paras[0],
    "## What the records show",
    paras[1],
    paras[2],
    `> ${pick(QUOTES)}`,
    "## On the ground",
    paras[3],
    paras[4],
    "## Official response",
    paras[5],
    "## What happens next",
    "This report will be updated as additional information becomes available. Corrections, if any, will be appended to the foot of the story and flagged in our weekly newsletter.",
  ];
}

function fillTitle(tpl: string, state: string): string {
  return tpl
    .replace("{state}", state)
    .replace("{party}", pick(PARTIES))
    .replace(/\{n\}/g, String(1 + Math.floor(rand() * 18)));
}

function generateArticles(): Article[] {
  const out: Article[] = [];
  const start = new Date("2023-01-12T09:00:00Z").getTime();
  const end = new Date("2026-06-15T09:00:00Z").getTime();
  const COUNT = 220;
  const slugSeen = new Set<string>();

  for (let i = 0; i < COUNT; i++) {
    const category = pick(ALL_CATEGORIES);
    const state =
      category === "opinion" ? (rand() < 0.4 ? pick(ALL_STATES) : undefined) : pick(ALL_STATES);
    const tpl = pick(TITLE_TEMPLATES[category]);
    const title = fillTitle(tpl, state ?? pick(ALL_STATES));
    let slug = slugify(title).slice(0, 80);
    if (slugSeen.has(slug)) slug = `${slug}-${i}`;
    slugSeen.add(slug);

    const ts = start + rand() * (end - start);
    const date = new Date(ts);
    const author = pick(AUTHORS);
    const readingMinutes = 4 + Math.floor(rand() * 9);
    const body = makeBody(title, state);

    out.push({
      slug,
      title,
      subtitle: PARAGRAPHS[Math.floor(rand() * PARAGRAPHS.length)].slice(0, 180),
      category,
      state,
      authorSlug: author.slug,
      publishedAt: date.toISOString(),
      updatedAt: rand() < 0.25 ? new Date(ts + 86400000 * (1 + rand() * 6)).toISOString() : undefined,
      readingMinutes,
      excerpt: PARAGRAPHS[Math.floor(rand() * PARAGRAPHS.length)].slice(0, 200),
      body,
      tags: pickN(
        [
          "accountability",
          "budget",
          "procurement",
          "elections",
          "rural",
          "field-report",
          "documents",
          "policy",
          "reform",
          "primary-health",
          "schools",
          "land",
          "security",
          "transparency",
          "audit",
        ],
        3 + Math.floor(rand() * 3),
      ),
      factChecked: category === "fact-check" ? true : rand() < 0.18,
      isInvestigation: category === "investigations" || rand() < 0.08,
      sources:
        rand() < 0.5
          ? [
              { label: "State budget implementation report" },
              { label: "Open Contracting Portal" },
              { label: "Interviews with affected residents" },
            ]
          : undefined,
    });
  }
  return out.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export const ARTICLES = generateArticles();
