import type { BlogEntry } from "../types";
import campaignsData from "./campaigns_full.json";

interface CampaignEmail {
  subject?: string;
  content?: string;
}

interface CampaignItem {
  id: string;
  created_at?: string;
  emails?: CampaignEmail[];
}

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function normalizeForComparison(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isRepeatedTitleBlock(text: string, title: string): boolean {
  const normalizedText = normalizeForComparison(text);
  const normalizedTitle = normalizeForComparison(title);

  if (!normalizedText || !normalizedTitle) {
    return false;
  }

  return (
    normalizedText === normalizedTitle ||
    normalizedText === `${normalizedTitle} ${normalizedTitle}`
  );
}

function shouldSkipContentBlock(text: string, title: string): boolean {
  const normalizedText = normalizeWhitespace(text).toLowerCase();

  if (!normalizedText) {
    return true;
  }

  if (
    normalizedText.includes("unsubscribe") ||
    normalizedText.includes("view in browser") ||
    normalizedText.includes("you received this email") ||
    normalizedText.includes("why did i get this")
  ) {
    return true;
  }

  return isRepeatedTitleBlock(normalizedText, title);
}

function isIgnoredTag(tagName: string): boolean {
  return ["script", "style", "noscript", "head", "meta", "title"].includes(
    tagName,
  );
}

function nodeToText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? "";
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return "";
  }

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  if (isIgnoredTag(tagName)) {
    return "";
  }

  if (tagName === "br") {
    return " ";
  }

  if (tagName === "img") {
    return element.getAttribute("alt") ?? "";
  }

  if (tagName === "a") {
    const href = element.getAttribute("href")?.trim() ?? "";
    const label = normalizeWhitespace(
      Array.from(element.childNodes)
        .map((child) => nodeToText(child))
        .join(""),
    );

    if (!href) {
      return label;
    }

    if (!label || label === href) {
      return href;
    }

    return `[${label}](${href})`;
  }

  return Array.from(element.childNodes)
    .map((child) => nodeToText(child))
    .join("");
}

function collectContentItems(root: ParentNode, title: string): Array<{
  type: "paragraph" | "subheader" | "heading";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}> {
  const items: Array<{
    type: "paragraph" | "subheader" | "heading";
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
  }> = [];

  const visit = (node: Node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const element = node as Element;
    const tagName = element.tagName.toLowerCase();

    if (isIgnoredTag(tagName)) {
      return;
    }

    if (/^h[1-6]$/.test(tagName)) {
      const text = normalizeWhitespace(nodeToText(element));
      if (text && !shouldSkipContentBlock(text, title)) {
        items.push({
          type: "heading",
          level: Number(tagName[1]) as 1 | 2 | 3 | 4 | 5 | 6,
          text,
        });
      }
      return;
    }

    if (tagName === "p" || tagName === "li" || tagName === "blockquote") {
      const text = normalizeWhitespace(nodeToText(element));
      if (text && !shouldSkipContentBlock(text, title)) {
        items.push({
          type: "paragraph",
          text: tagName === "li" ? `- ${text}` : text,
        });
      }
      return;
    }

    Array.from(element.children).forEach(visit);
  };

  Array.from(root.children).forEach(visit);

  const seenBlocks = new Set<string>();

  return items.filter((item) => {
    const normalizedText = normalizeForComparison(item.text);

    if (!normalizedText || seenBlocks.has(normalizedText)) {
      return false;
    }

    seenBlocks.add(normalizedText);
    return true;
  });
}

function extractPlainTextFromItems(
  items: Array<{ text: string; type: string }>,
): string {
  const text = items.map((item) => item.text).find(Boolean) ?? "";
  return text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatCampaignDate(createdAt?: string): string {
  if (!createdAt) {
    return "Unknown date";
  }

  const [datePart] = createdAt.split(" ");
  const [yearRaw, monthRaw, dayRaw] = datePart.split("-");
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);

  if (!year || !month || !day) {
    return createdAt;
  }

  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function createImageMapping(): Record<string, string> {
  return {
    "clinical-trial-opportunity": "/img/blog/clinical-trial-opportunity-img.jpg",
    "how-your-thyroid-may-be-changing-your-brain": "/img/blog/thyroid-changing-brain-img.png",
    "strength-training": "/img/blog/strenght-training-img.jpg", // Note: keeping the original filename typo
    "strength-training-on-your-thyroid": "/img/blog/strenght-training-img.jpg",
  };
}

function extractImageUrl(content: string, slug: string): string {
  const imageMapping = createImageMapping();
  
  // Try to match against known local images
  for (const [key, path] of Object.entries(imageMapping)) {
    if (slug.includes(key)) {
      return path;
    }
  }
  
  // Fall back to extracting from HTML
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? "/img/blog/blog-1-cover.jpg";
}

function cleanDescriptionStart(text: string): string {
  return text.replace(/^96[\s:|.-]*/u, "").trim();
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sentenceFromDescription(text: string, title: string): string {
  let cleaned = cleanDescriptionStart(text);
  const normalizedTitle = title.trim();

  if (normalizedTitle) {
    const titlePattern = new RegExp(
      `^(?:${escapeRegExp(normalizedTitle)})[\\s:|.-]*`,
      "iu",
    );
    cleaned = cleaned.replace(titlePattern, "").trim();
  }

  cleaned = cleaned.replace(/^view in browser[\s:|.-]*/iu, "").trim();

  const sentenceMatch = cleaned.match(/[^.!?]+[.!?]/);
  const sentence = sentenceMatch?.[0]?.trim() ?? cleaned.trim();

  if (!sentence) {
    return "No summary available.";
  }

  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

const campaigns = campaignsData as CampaignItem[];
const seenSubjects = new Set<string>();
const uniqueCampaigns = campaigns.filter((campaign) => {
  const normalizedSubject =
    campaign.emails?.[0]?.subject?.trim().toLowerCase() ?? "";

  if (seenSubjects.has(normalizedSubject)) {
    return false;
  }

  seenSubjects.add(normalizedSubject);
  return true;
});

const usedSlugs = new Set<string>();

const blogs: BlogEntry[] = uniqueCampaigns.map((campaign, index) => {
  const email = campaign.emails?.[0];
  const title = email?.subject?.trim() || `Campaign ${index + 1}`;
  const htmlContent = email?.content || "";
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlContent, "text/html");
  const contentItems = collectContentItems(document.body, title);
  const summarySource = extractPlainTextFromItems(contentItems);
  const desc = sentenceFromDescription(summarySource, title);

  if (contentItems.length === 0) {
    contentItems.push({ type: "paragraph", text: "No content available." });
  }

  const baseSlug = toSlug(title) || `campaign-${index + 1}`;
  let slug = baseSlug;
  let suffix = 2;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  usedSlugs.add(slug);

  return {
    sys: { id: String(index + 1) },
    fields: {
      title,
      desc,
      date: formatCampaignDate(campaign.created_at),
      slug,
      thumbnailUrl: extractImageUrl(htmlContent, slug),
      content: contentItems,
    },
  };
});

blogs.forEach((blog, index) => {
  const nextBlog = blogs[index + 1];
  if (nextBlog) {
    blog.fields.nextSlug = nextBlog.fields.slug;
  }
});

export async function fetchBlogs(): Promise<BlogEntry[]> {
  return blogs;
}

export async function fetchBlogBySlug(slug: string): Promise<BlogEntry | null> {
  const blog = blogs.find((entry) => entry.fields.slug === slug);
  return blog ?? null;
}
