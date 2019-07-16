import Languages from './Languages';

function maybeGet(obj, key) {
	return obj[key] ? [obj[key]] : []
}

export function sanitizeLanguageEntries(lang) {
	return ({
		...lang,
		script: lang.script || 'Latin',
		pangrams: (lang.pangrams || [])
			.concat(maybeGet(lang, 'pangram')),
		letterings: (lang.letterings || [])
			.concat(maybeGet(lang, 'lettering')),
		paragraphs: (lang.paragraphs || [])
			.concat(maybeGet(lang, 'paragraph')),
		sentences: (lang.sentences || [])
			.concat(maybeGet(lang, 'sentence')),
		alphabet: maybeGet(lang, 'alphabet'),
		specialCharacters: lang.specialCharacters ? [lang.specialCharacters] :
			lang.script == 'Latin' && lang.alphabet ? [lang.alphabet.replace(/(^| )[A-Za-z]+(?= |$)/g, '')] : [],
	});
}

export default Languages.map(lang => sanitizeLanguageEntries(lang));