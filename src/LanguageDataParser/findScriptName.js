import ISO15924 from 'iso-15924';

export default function findScriptName(entry) {
  let script = ISO15924.find(s => s.code == entry.script);
  return script && script.name || entry.script;
}