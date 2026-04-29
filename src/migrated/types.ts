export type BlogContentItem =
  | string
  | {
      type: "paragraph" | "subheader" | "heading";
      level?: 1 | 2 | 3 | 4 | 5 | 6;
      text: string;
    };

export interface BlogFields {
  thumbnailUrl: string;
  title: string;
  desc: string;
  date: string;
  slug: string;
  content: BlogContentItem[];
  nextSlug?: string;
}

export interface BlogEntry {
  sys: {
    id: string;
  };
  fields: BlogFields;
}
