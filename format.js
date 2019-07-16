const entryFormat = {
  language: 'Polish',
  script: '', // 'Latin' | 'Cyrillic' | 'Greek' | 'Armenian' | 'Georgian' | ... empty is construed to be 'Latin'
  region: 'European', // 'European' | 'Asian' | 'African' | 'Austronesian' | ...
  speakers: 38 * MILLION, // rough number of native speakers
  alphabet: 'A a Ą ą B b C c Ć ć D d E e Ę ę F f G g H h I i J j K k L l Ł ł M m N n Ń ń O o Ó ó P p R r S s Ś ś T t U u W w Y y Z z Ź ź Ż ż', // TODO: determine if letters used in foreign phrases should be included: Q V X etc.
  specialCharacters: 'Ą ą Ć ć Ę ę Ł ł Ń ń Ó ó Ś ś Ź ź Ż ż', // alphabet minus A-Z a-z (for Latin), Russian alphabet (for Cyrillic); TODO: determine rules for other scripts
  pangrams: [ '', '', '' ],
  pangram: 'Zażółć gęślą jaźń.', // added to pangrams array in the sanitizeLanguageEntries function; preferably contains all characters of the language, both accented and unaccented
  paragraphs: [ '', '', '' ],
  paragraph: 'Rzekły mi cioty z unijnej wspólnoty, że... ładne słowa to: korelacja, cumulus, pilśniowy, Yokohama, Alabama, hamulec, pilates... kanalia, obibok, azaliż, bzik, ple-ple, pif-paf... ping-pong, ping-win.', // added to paragraphs array in the sanitizeLanguageEntries function
  letterings: [ '', '', '' ],
  lettering: 'Aerofłot Bóbr Część Ćmić Dyndasz Ernest Farfocel Gringo Hochsztapler Irbis Jajko Krokus Lalka Łękotka Mąkami Nanizać Obrok Ósemka Poprzestań Quiz Rzeżączka Schniesz Świąt Tarty Uzurpator Victoria Warszawa Xero Yeti Złorzeczyć Źrebak Żółtko', // added to letterings array in the sanitizeLanguageEntries function; consists of capitalized words, each containing uppercase and lowercase form of the same letter; preferably both accented and unaccented letters are listed
  gotchas: [ { title: '', test: '' }, { title: '', test: '' } ], // list of special cases that need to be investigated before deciding that a language is supported by the font; this may include spacing/kerning cases, localization (locl) features, ligatures, contextual alternates
  todo: 'todo', // denotes that entry contains unfinished/temporary work, in properties starting with '_'
}