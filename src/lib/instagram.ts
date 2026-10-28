// Feed d'Instagram via Behold (JSON). Lògica independent del framework:
// es pot reutilitzar tal qual en un component de React o a Next.js.
// Docs del format: https://behold.so/docs/json-feeds

export interface BeholdSize { mediaUrl: string; width: number; height: number }
export interface BeholdPost {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl?: string;
  thumbnailUrl?: string;
  sizes?: Partial<Record<"small" | "medium" | "large" | "full", BeholdSize>>;
  caption?: string;
  prunedCaption?: string;
  altText?: string;
}

export interface FeedPost {
  href: string;
  img: string;
  alt: string;
  type: BeholdPost["mediaType"];
}

function imageOf(p: BeholdPost): string {
  const s = p.sizes ?? {};
  return s.medium?.mediaUrl ?? s.small?.mediaUrl ?? p.thumbnailUrl ?? (p.mediaType !== "VIDEO" ? p.mediaUrl ?? "" : "");
}

/** Descarrega el feed i retorna com a màxim `max` posts ja preparats per pintar. */
export async function fetchFeed(url: string, max: number, fallbackAlt: string): Promise<FeedPost[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Behold ${res.status}`);
  const data = await res.json();
  const posts: BeholdPost[] = Array.isArray(data) ? data : data.posts ?? [];
  return posts
    .slice(0, max)
    .map((p) => {
      const desc = (p.altText || p.prunedCaption || p.caption || "").trim();
      return { href: p.permalink, img: imageOf(p), alt: desc ? desc.slice(0, 140) : fallbackAlt, type: p.mediaType };
    })
    .filter((p) => p.href && p.img);
}
