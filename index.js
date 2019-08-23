import rawLanguages from './src/Languages.js';
import sanitizeEntry from './src/sanitizeEntry';

export default class Languages {
	get() {
		return rawLanguages.map(
			entry => sanitizeEntry(entry)
		);
	}
}