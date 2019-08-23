import rawData from './languageData.js';
import sanitizeEntry from './sanitizeEntry';

export default class Languages {
	get() {
		return rawData.map(
			entry => sanitizeEntry(entry)
		);
	}
}