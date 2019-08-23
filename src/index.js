import rawLanguages from './Languages.js';
import sanitizeEntry from './sanitizeEntry';

export default class Languages {
	get() {
		return rawLanguages.map(
			entry => sanitizeEntry(entry)
		);
	}
}