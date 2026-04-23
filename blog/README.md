# Blog Content Guide

This project currently stores blog content directly in component arrays.

## Where posts live

1. Main featured cards: `blog/components/MainContent.tsx`
2. Latest list cards: `blog/components/Latest.tsx`

## Add a blog post

1. Open `blog/components/MainContent.tsx`.
2. Find the `cardData` array near the top.
3. Add a new object with:
   - `img`
   - `tag`
   - `title`
   - `description`
   - `authors` (array of `{ name, avatar }`)
4. Save the file.

Optional:

1. Open `blog/components/Latest.tsx`.
2. Add a matching item in the `articleInfo` array so it appears in the Latest section.

## Remove a blog post

1. Open `blog/components/MainContent.tsx` and/or `blog/components/Latest.tsx`.
2. Delete the object for the post from `cardData` and/or `articleInfo`.
3. Save the file.

## Update categories

Categories are currently plain text labels from each post's `tag` field.

1. Change `tag` values in `cardData` and `articleInfo`.
2. If needed, update the visible filter chips in `blog/components/MainContent.tsx`.

## Quick checklist

1. Keep category names consistent (for example: `Research`, `Treatment`, `Nutrition`).
2. Keep image sizes roughly similar for better layout.
3. Run `npm run build` after edits to catch type or syntax issues.
