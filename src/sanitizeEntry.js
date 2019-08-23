import entryFormat from './entryFormat.js';
import config from './config.js';

// Calculates and adds missing fields 
export default function sanitizeEntry(entry) {
	for (let key in entryFormat) {
		let field = entryFormat[key];
		if (typeof entry[key] === 'undefined'
			&& typeof field.default !== 'undefined') {
			// console.log(entry.language, key, entry[key])
			if (typeof field.default === "function") {
				const value = field.default(entry);
				if (typeof value !== 'undefined')
					entry[key] = value;
				else if (field.required) {
					console.error(entry.language, key, 'is', entry[key])
				}
			}
		  else
				entry[key] = field.default;
			// console.log('-> ' + entry[key])
		}
		if (field.required && typeof entry[key] === 'undefined') {
			if (config.DEBUG) {
				console.error(`\`${key}\` is undefined for language '${entry.language}'.\n`);
			}
		}
	}
	return entry;
}