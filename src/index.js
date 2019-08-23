import rawData from './languageData.js';
import sanitizeEntry from './sanitizeEntry';

export default class LanguageData {
	get() {
		return rawData.map(
			entry => sanitizeEntry(entry)
		);
	}
}