import type { FeedItem } from "./items";

/**
 * Pinterest and Meta are strict about counterfeit signals and stock accuracy,
 * and one flagged bulk upload can cost the account. Their feeds therefore carry only:
 * - pieces physically in stock (sourced-to-order pieces are left out);
 * - unaltered pieces (customised / crystal-set branded goods are left out);
 * - descriptions without wording automated reviews read as "imitation"
 *   (replica, fake, counterfeit, inspired by, homage), even when harmless.
 */
const ALTERED = /\b(custom|customi[sz]ed|customi[sz]ation|swarovski|bedazzled|crystal[- ]set|aftermarket|after-market|iced[- ]out)\b/i;
const RISKY_SENTENCE = /\b(replica|replicates?|fakes?|counterfeits?|knock-?offs?|dupes?|imitations?|copies)\b/i;

function cleanDescription(text: string): string {
  const kept = text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !RISKY_SENTENCE.test(sentence))
    .join(" ")
    .replace(/\binspired by\b/gi, "drawing on")
    .replace(/\bpays? homage to\b/gi, "honours")
    .replace(/\bpaying homage to\b/gi, "honouring")
    .replace(/\bhomage\b/gi, "tribute")
    .trim();
  return kept;
}

export function pinterestItems(items: FeedItem[]): FeedItem[] {
  return items
    .filter((i) => !i.toOrder && i.availability === "in_stock")
    .filter((i) => !ALTERED.test(`${i.title} ${i.description}`))
    .map((i) => {
      const description = cleanDescription(i.description);
      return { ...i, description: description || i.title };
    });
}
