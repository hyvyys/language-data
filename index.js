import { LanguageDataParser } from './src';
export { LanguageDataParser };

const parser = new LanguageDataParser();
const data = parser.getData();
export default data;