const fs = require("fs");
const fetch = require("node-fetch");

const BLOG_FEED = "https://blog.ahmad-khatib.com/feeds/posts/default?alt=json";

(async () => {
  try {
    const res = await fetch(BLOG_FEED);
    const data = await res.json();

    const entry = data.feed.entry[0];
    const title = entry.title.$t;
    const url = entry.link.find(l => l.rel === "alternate").href;
    const content = entry.content.$t;

    const snippet = content.replace(/<[^>]*>/g, '').trim().substring(0, 180) + '...';

    const newSection = `
<div id="latest-blog-post" style="margin-bottom: 30px;">
  <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; direction: rtl; text-align: justify;">
    <h3 style="margin-top: 0; color: #007BFF;">
      <a href="${url}" target="_blank" style="text-decoration: none; color: #007BFF;">
        ${title}
      </a>
    </h3>
    <p style="margin-bottom: 10px;">${snippet}</p>
    <a href="${url}" target="_blank" style="text-decoration: underline; color: #007BFF;">اقرأ المقال كاملًا →</a>
  </div>
</div>`.trim();

    const filePath = "index.html";
    let html = fs.readFileSync(filePath, "utf8");

    html = html.replace(
      /<!-- BLOG-POST-START -->([\s\S]*?)<!-- BLOG-POST-END -->/,
      `<!-- BLOG-POST-START -->\n${newSection}\n<!-- BLOG-POST-END -->`
    );

    fs.writeFileSync(filePath, html);
    console.log("✅ Latest blog post injected.");
  } catch (err) {
    console.error("❌ Error updating blog section:", err);
    process.exit(1);
  }
})();
