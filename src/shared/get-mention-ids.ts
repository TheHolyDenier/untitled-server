import { JSDOM } from 'jsdom';

export function extractIds(htmlString: string) {
  const dom = new JSDOM(htmlString);
  const mentions = dom.window.document.querySelectorAll(
    '[data-type="mention"]',
  );

  const ids: string[] = [];
  for (const mention of mentions) {
    const id = mention.getAttribute('data-id');
    if (id && !ids.includes(id)) ids.push(id);
  }

  return ids;
}
