// If not in browser (and possibly in Node.js), colorize console output.
if (typeof window === 'undefined') {
  var colors = require('colors');
  console.warn = (msg) => console.log(msg.yellow);
  console.error = (msg) => console.log(msg.red);
}
else {
  const prefix = "[language-data] ";
  const warn = console.warn;
  const error = console.error;
  console.warn = (msg) => warn(prefix + msg);
  console.error = (msg) => error(prefix + msg);
}

export default {
  get DEBUG() {
    return (global || window).HYVYYS_LANGUAGE_DATA_DEBUG;
  },
  set DEBUG(value) {
    return (global || window).HYVYYS_LANGUAGE_DATA_DEBUG = value;
  }
}