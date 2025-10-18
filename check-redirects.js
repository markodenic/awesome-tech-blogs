import fs from "fs";
import { URL } from "url";

// Load JSON safely (no import needed)
const blogs = JSON.parse(fs.readFileSync("./data.json", "utf8"));

// Configuration
const CONCURRENCY = 10;
const TIMEOUT_MS = 5000;

// Helper: timeout wrapper
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
                                setTimeout(() => reject(new Error("Timeout exceeded")), ms)
  );
  return Promise.race([promise, timeout]);
}

// Check single blog
async function checkRedirect(blog) {
  const { name, url } = blog;

  try {
    const response = await withTimeout(fetch(url, { redirect: "follow" }), TIMEOUT_MS);
    const finalUrl = response.url;

    const originalHost = new URL(url).hostname.replace(/^www\./, "");
    const finalHost = new URL(finalUrl).hostname.replace(/^www\./, "");

    if (originalHost !== finalHost) {
      return { name, url, finalUrl, status: response.status, redirected: true };
    }
  } catch (err) {
    return { name, url, error: err.message };
  }

  return null;
}

// Run concurrent checks
async function runConcurrent() {
  const results = [];
  const queue = [...blogs];

  async function worker() {
    while (queue.length > 0) {
      const blog = queue.pop();
      const result = await checkRedirect(blog);
      if (result) results.push(result);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, worker);
  await Promise.all(workers);
  return results;
}

// Main
async function main() {
  console.log(`Checking ${blogs.length} blogs...\n`);
  const results = await runConcurrent();

  if (results.length === 0) {
    console.log("✅ No redirects detected.");
  } else {
    console.log("⚠️ Redirected or failed URLs:");
    console.table(results);
    fs.writeFileSync("redirects.json", JSON.stringify(results, null, 2));
    console.log("\nSaved report to redirects.json");
  }
}

main();
