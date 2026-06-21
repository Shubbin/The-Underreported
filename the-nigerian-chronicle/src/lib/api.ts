import { ARTICLES, AUTHORS } from "./mockData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const USE_MOCK_API = true; // Set to false to connect to the real backend server

// Simulated network latency helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function handleMockRequest<T>(path: string, options?: RequestInit): Promise<T> {
  await delay(100); // Simulate network latency

  const urlObj = new URL(path, "http://localhost");
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;

  // 1. Newsletter subscription POST
  if (pathname === "/api/newsletter" && options?.method === "POST") {
    const body = options.body ? JSON.parse(options.body as string) : {};
    const email = body.email;
    if (!email || !email.includes("@")) {
      throw new Error("Invalid email address");
    }
    return {
      success: true,
      message: "Subscription successful",
      email
    } as unknown as T;
  }

  // 2. Contact submissions POST
  if (pathname === "/api/contact" && options?.method === "POST") {
    const body = options.body ? JSON.parse(options.body as string) : {};
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      throw new Error("All fields are required");
    }
    if (!email.includes("@")) {
      throw new Error("Invalid email address");
    }
    return {
      success: true,
      message: "Message received successfully",
      data: { name, email, subject }
    } as unknown as T;
  }

  // 3. Authors List GET
  if (pathname === "/api/authors") {
    return AUTHORS as unknown as T;
  }

  // 4. Author Detail GET
  if (pathname.startsWith("/api/authors/")) {
    const slug = pathname.substring("/api/authors/".length);
    const author = AUTHORS.find(a => a.slug === slug);
    if (!author) {
      throw new Error("Author not found");
    }
    const articles = ARTICLES.filter(art => art.authorSlug === slug);
    return {
      author,
      articles
    } as unknown as T;
  }

  // 5. Article Detail GET
  if (pathname.startsWith("/api/articles/")) {
    const slug = pathname.substring("/api/articles/".length);
    const article = ARTICLES.find(a => a.slug === slug);
    if (!article) {
      throw new Error("Article not found");
    }
    const author = AUTHORS.find(a => a.slug === article.authorSlug);
    
    // Get related articles (same category or state, excluding current article)
    const related = ARTICLES.filter(art => 
      art.slug !== article.slug && 
      (art.category === article.category || art.state === article.state)
    ).slice(0, 3);

    // Get adjacent articles (prev/next based on publishedAt)
    const currentIndex = ARTICLES.findIndex(art => art.slug === article.slug);
    const prev = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
    const next = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

    return {
      article,
      author,
      related,
      adjacent: {
        prev,
        next
      }
    } as unknown as T;
  }

  // 6. Articles List GET
  if (pathname === "/api/articles") {
    const category = searchParams.get("category");
    const state = searchParams.get("state");
    const authorSlug = searchParams.get("authorSlug");
    const tag = searchParams.get("tag");
    const q = searchParams.get("q");
    const limit = searchParams.get("limit");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let results = [...ARTICLES];

    if (category) {
      results = results.filter(art => art.category === category);
    }
    if (state) {
      const stateLower = state.toLowerCase();
      results = results.filter(art => art.state?.toLowerCase() === stateLower);
    }
    if (authorSlug) {
      results = results.filter(art => art.authorSlug === authorSlug);
    }
    if (tag) {
      results = results.filter(art => art.tags.includes(tag));
    }
    if (from) {
      const fromDate = new Date(from);
      results = results.filter(art => new Date(art.publishedAt) >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      toDate.setDate(toDate.getDate() + 1); // include the "to" day fully
      results = results.filter(art => new Date(art.publishedAt) <= toDate);
    }
    if (q) {
      const queryLower = q.trim().toLowerCase();
      results = results.filter(art =>
        art.title.toLowerCase().includes(queryLower) ||
        art.excerpt.toLowerCase().includes(queryLower) ||
        art.tags.some(t => t.toLowerCase().includes(queryLower)) ||
        (art.state && art.state.toLowerCase().includes(queryLower))
      );
    }
    if (limit) {
      const lim = parseInt(limit, 10);
      if (!isNaN(lim) && lim > 0) {
        results = results.slice(0, lim);
      }
    }
    return results as unknown as T;
  }

  throw new Error(`Mock endpoint not implemented for ${path}`);
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  if (USE_MOCK_API) {
    return handleMockRequest<T>(path, options);
  }

  const url = `${API_URL}${path}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API fetch failed: ${response.statusText}`);
  }
  return response.json();
}

