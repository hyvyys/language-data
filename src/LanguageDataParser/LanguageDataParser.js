import getRawData from '../languageData.js';
import sanitizeEntry from './sanitizeEntry';
import configureDebug from './configureDebug';

export class LanguageDataParser {
	constructor({ debug = false } = {}) {
		/* bind methods */
		this.sanitizeEntry = sanitizeEntry.bind(this);
		this.configureDebug = configureDebug.bind(this);

		this.configureDebug();
		this.DEBUG = debug;
	}
	getData() {
		const rawData = getRawData();
		const data = rawData.map(
			entry => this.sanitizeEntry(entry)
		);
		return data;
	}
}