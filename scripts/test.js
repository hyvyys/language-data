import LanguageData from '../src/index.js';
import LanguageTags from 'language-tags';
import { ietfToOpenType } from 'lang-ietf-opentype';

import config from '../src/config';
config.DEBUG = true;


/* Tests */
const data = (new LanguageData()).get();

// console.log(data.slice(16,20));
// lookupTags('Greek');
// lookupOpentypeTag('el');


/* Utils */

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