import { ietfToOpenType } from 'lang-ietf-opentype'; //https://www.npmjs.com/package/lang-ietf-opentype

export default function findOpentypeTag(entry) {
  const htmlTag = entry.htmlTag;
  if (!htmlTag) {
    // this.warn(`No HTML tag for language ${entry.language}. Cannot look up OpenType tag.`)
    this.log('no-html-tag', { language: entry.language });
    return;
  }
  let tag = ietfToOpenType(htmlTag);
  if (!tag) {
    // this.warn(`No OpenType tag for language ${entry.language}, HTML tag ${htmlTag}.`)
    this.log('no-ot-tag', { language: entry.language, htmlTag });
    return;
  }
  return tag;
}