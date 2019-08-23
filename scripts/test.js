/* Tests */

/* simple import */
import LanguageData from '../';
// console.log(LanguageData.slice(16,20));

/* import with debug */
import { LanguageDataParser } from '../';
const parser = new LanguageDataParser();
parser.DEBUG = true;
const data = parser.getData();
// console.log(data.slice(16,20));


/* Utils */
import LanguageTags from 'language-tags';
import { ietfToOpenType } from 'lang-ietf-opentype';

function lookupTags(languageName) {
  const tags = LanguageTags.search(languageName);
  for (let tag of tags) {
    console.log(tag.data.record)
  }
}

function lookupOpentypeTag(htmlTag) {
  let tag = ietfToOpenType('el');
  console.log('Greek OTtag: ' + tag);
}

// lookupTags('Koyra Chiini');
// lookupOpentypeTag('el');
