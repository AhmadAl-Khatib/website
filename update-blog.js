const fs = require("fs");
const fetch = require("node-fetch");

const BLOG_FEED = "https://blog.ahmad-khatib.com/feeds/posts/default?alt=json";

// Extract first image from post content HTML
function extractFirstImage(html) {
  const match = html.match(/<img[^>]+src="([^">]+)"/i);
  return match ? match[1] : null; // No fallback
}

// Format post date
function extractDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" }); // e.g., July
  const year = date.getFullYear();
  return { day, month, year };
}

// Main async function
(async () => {
  try {
    const res = await fetch(BLOG_FEED);
    const data = await res.json();

    const entry = data.feed.entry[0];
    const title = entry.title.$t;
    const content = entry.content.$t;
    const image = extractFirstImage(content);

    if (!image) {
      console.error("❌ No image found in the latest post.");
      process.exit(1);
    }

    const plainText = content.replace(/<[^>]*>/g, '').trim();
    const intro = plainText.substring(0, 440); // ~4 lines of readable content
    const remainder = plainText.length > 440 ? plainText.substring(440).trim() : '';

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
    <p style="direction: rtl !important; text-align: justify !important; padding: 0 10px;">
      ${intro}
    </p>
    ${remainder ? `
    <details style="direction: rtl; text-align: justify; padding: 0 10px; margin-top: 10px;">
      <summary style="cursor: pointer; font-weight: bold;">تابع قراءة المقال...</summary>
      <p>${remainder}</p>
    </details>` : ''}
  </div>
</div>
<!-- Dynamic BLOG-POST-END -->
`.trim();

    const filePath = "index.html";
    let html = fs.readFileSync(filePath, "utf8");

    html = html.replace(
      /<!-- Dynamic BLOG-POST-START -->([\s\S]*?)<!-- Dynamic BLOG-POST-END -->/,
      `<!-- Dynamic BLOG-POST-START -->\n${newSection}\n<!-- Dynamic BLOG-POST-END -->`
    );

    fs.writeFileSync(filePath, html);
    console.log("✅ Blog section updated with the latest post.");
  } catch (err) {
    console.error("❌ Error updating blog section:", err.message);
    process.exit(1);
  }
})();
