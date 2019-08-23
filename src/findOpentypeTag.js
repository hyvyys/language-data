import { ietfToOpenType } from 'lang-ietf-opentype'; //https://www.npmjs.com/package/lang-ietf-opentype

export default function findOpentypeTag(entry) {
  const htmlTag = entry.htmlTag || findHtmlTag(entry);
  if (!htmlTag) {
    console.warn(`No HTML tag for language ${entry.language}. Cannot look up OpenType tag.`)
    return;
  }
  let tag = ietfToOpenType(htmlTag);
  return tag;
}