export default function() {
  // If not in browser (and possibly in Node.js), colorize console output.
  if (typeof window === 'undefined') {
    var colors = require('colors');
    this.warn = (msg) => console.log(msg.yellow);
    this.error = (msg) => console.log(msg.red);
  }
  else {
    const prefix = "[language-data] ";
    this.warn = (msg) => console.warn(prefix + msg);
    this.error = (msg) => console.error(prefix + msg);
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
