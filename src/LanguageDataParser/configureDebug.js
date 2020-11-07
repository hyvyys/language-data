export default function() {
  // If not in browser (and possibly in Node.js), colorize console output.
  if (typeof window === 'undefined') {
    var colors = require('colors');
    this.error = (msg) => console.log(msg.red);
    this.warn = (msg) =>  { if (this.DEBUG) console.log(msg.yellow) };
    this.info = (msg) => {  if (this.DEBUG) console.log(msg.white.bgBlue) };
  }
  else {
    const prefix = "[language-data] ";
    this.delayedWarnings = [];
    this.error = (msg) => { if (this.DEBUG) console.error(prefix + msg); }
    this.warn = (msg) => { if (this.DEBUG) console.warn(prefix + msg); }
    this.info = (msg) => { if (this.DEBUG) console.info(prefix + msg); }
  }
}

// export default {
//   get DEBUG() {
//     return (global || window).HYVYYS_LANGUAGE_DATA_DEBUG;
//   },
//   set DEBUG(value) {
//     (global || window).HYVYYS_LANGUAGE_DATA_DEBUG = value;
//   }
// }
