export default function(chars) {
  const abc = [...genCharArray('a', 'z'), ...genCharArray('а','я')].join('');
  const digits = '0-9';
  const punct = ' ,.;:!?"„“”()\\[\\]{}–—-';
  const regex = new RegExp(`^[ ${abc + digits + punct}]*$`, 'i');
  return chars.filter(c => !regex.test(c));
}