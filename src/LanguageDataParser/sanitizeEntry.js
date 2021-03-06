import entryFormat from './entryFormat';

// Calculates and adds missing fields 
export default function sanitizeEntry(entry) {
	const originalEntry = JSON.parse(JSON.stringify(entry));

	for (let key in entryFormat) {
		let field = entryFormat[key];
		if (field.sanitize) {
			entry[key] = field.sanitize.call(this, entry, originalEntry);
		}
		if (typeof entry[key] === 'undefined'
			&& typeof field.default !== 'undefined') {
			// console.log(entry.language, key, entry[key])
			if (typeof field.default === "function") {
				const value = field.default.call(this, entry, originalEntry);
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