import LanguageTags from 'language-tags'; // https://www.npmjs.com/package/language-tags
import '../src/flatMap.polyfill';
import config from './config';

export default function findHtmlTag(entry) {
  const searches = [
    entry.language,
    ...(entry.altNames || []),
  ];
  let tag;
  const subtags = searches.flatMap(search =>
    LanguageTags.search(search)
      .filter(s => s.type() == 'language')
  );
  if (subtags.length) {
    for (let subtag of subtags) {
      // E.g. make "Modern Greek (1453-)" into "Modern Greek"
      const nameFromDescription = (desc) => desc.split('(')[0].trim();

      if (subtag.descriptions().some(
        d => searches.some(s => s == nameFromDescription(d)))
      ) {
        tag = subtag.data.subtag;
        break;
      }
    }
    if (!tag) {
      const subtag = subtags[0];
      tag = subtag.data.subtag;
      const matchedNames = subtag.descriptions();

      if (config.DEBUG) {
        console.warn(
          `Exported language '${entry.language}' with \`htmlTag\`: '${tag}'.\n`
          + `Is that correct? If so, consider adding ${matchedNames.map(n => `'${n}'`).join(', ')} to \`altNames\`.\n`
          + `If this is incorrect, manually set \`htmlTag\` (can be empty).\n`
        );
      }
    }
  }
  // console.log(entry.language);
  // console.log(tag);
  return tag;
}
