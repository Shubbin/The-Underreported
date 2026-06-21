import https from "https";
import http from "http";

export function startSelfPing(url) {
  if (!url) {
    console.log("[Self-Ping] No URL provided. Self-ping is disabled.");
    return;
  }

  console.log(`[Self-Ping] Initialized self-ping every 5 minutes for: ${url}`);
  
  setInterval(() => {
    const client = url.startsWith("https") ? https : http;
    client.get(url, (res) => {
      console.log(`[Self-Ping] Ping sent to ${url}. Response status: ${res.statusCode}`);
    }).on("error", (err) => {
      console.error(`[Self-Ping] Error pinging ${url}: ${err.message}`);
    });
  }, 300000); // 5 minutes
}
