export default function() {
  // If not in browser (and possibly in Node.js), colorize console output.
  if (typeof window === 'undefined') {
    var colors = require('colors');
    this.error = (msg) => console.log(msg.red);
    this.warn = (msg) =>  { if (this.DEBUG) console.log(msg.yellow) };
    this.info = (msg) => {  if (this.DEBUG) console.log(msg.blue) };

    this.LOG = [];
    this.log = (code, data) => {
      this.LOG.push({ code, data });
    }

    const printLog = (code, msg) => {
      const languages = this.LOG.filter(m => m.code === code).map(m => m.data);
      const len = languages.length;
      console.log(`${msg} ${len} language${len > 1 ? 's' : ''}: `.blue + `${ languages.map(l => l.language).join(', ') }`);
    }

    this.getLog = () => {
      printLog('no-html-tag', 'No HTML tag for', l => l.language);
      printLog('no-ot-tag', 'No OpenType tag for',  l => l.language + ' (' + l.htmlTag + ')');
      console.log();
      this.LOG = [];
    }
  }
  else {
    const prefix = "[language-data] ";
    this.delayedWarnings = [];
    this.error = (msg) => { if (this.DEBUG) console.error(prefix + msg); }
    this.warn = (msg) => { if (this.DEBUG) console.warn(prefix + msg); }
    this.info = (msg) => { if (this.DEBUG) console.info(prefix + msg); }
  }
}