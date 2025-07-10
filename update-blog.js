const fs = require("fs");
const fetch = require("node-fetch");

const BLOG_FEED = "https://blog.ahmad-khatib.com/feeds/posts/default?alt=json";

// Extract image from content HTML
function extractFirstImage(html) {
  const match = html.match(/<img[^>]+src="([^">]+)"/i);
  return match ? match[1] : "assets/img/ahmad al khatib blog.webp"; // fallback
}

// Extract day, month, year
function extractDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return { day, month, year };
}

(async () => {
  try {
    const res = await fetch(BLOG_FEED);
    const data = await res.json();
    const entry = data.feed.entry[0];

    const title = entry.title.$t;
    const url = entry.link.find(l => l.rel === "alternate").href;
    const content = entry.content.$t;
    const snippet = content.replace(/<[^>]*>/g, '').trim().substring(0, 220) + '...';
    const image = extractFirstImage(content);
    const { day, month, year } = extractDate(entry.published.$t);

    const newSection = `
<!-- Dynamic BLOG-POST-START -->
<div id="latest-blog-post" class="col-12 wow fadeInUp animated" data-wow-delay=".3s">
  <div class="blog-img">
    <img src="${image}" loading="lazy" alt="${title}" />
  </div>
  <div class="row">
    <div class="date"><p>${day}</p></div>
    <div class="month"><p>${month}</p></div>
    <div class="year"><p>${year}</p></div>
  </div>
  <div class="row">
    <h3>${title}</h3>
    <p style="direction: rtl !important; text-align: justify !important; padding: 0 10px;">${snippet}</p>
    <a href="${url}" target="_blank" style="margin-bottom: 45px;">اقرأ المقال كاملًا</a>
  </div>
</div>
<!-- Dynamic BLOG-POST-END -->
`.trim();

    const filePath = "index.html";
    let html = fs.readFileSync(filePath, "utf8");

    html = html.replace(
      /<!-- BLOG-POST-START -->([\s\S]*?)<!-- BLOG-POST-END -->/,
      `<!-- BLOG-POST-START -->\n${newSection}\n<!-- BLOG-POST-END -->`
    );

    fs.writeFileSync(filePath, html);
    console.log("✅ Blog section updated with latest post.");
  } catch (err) {
    console.error("❌ Error updating blog section:", err);
    process.exit(1);
  }
})();
