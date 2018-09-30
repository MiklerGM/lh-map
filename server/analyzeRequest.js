import { version, langList } from '../data/versions';
import lang from '../data/lang.json';

export const PREVIEW = 'preview';

export function parseBinary(v) {
  switch (v) {
    case false:
      return { // old hash version, now binary masks
        bin2text: m => m,
        text2bin: m => m,
      };
    case 'aa':
    case 'ab':
    case 'ac':
      return {
        // old version before 'ad'
        bin2text: mask => parseInt(mask, 2).toString(36),
        text2bin: text => parseInt(text, 36).toString(2),
      };
    case 'ad':
    default:
      return { // each 5 bits converted into symbol
        bin2text: mask => mask.match(/(\d{1,5})/g)
          .map(m => parseInt(m, 2).toString(32)).join('')
          .replace(/0*$/, ''), // remove trailing zeros
        text2bin: text => text.split('')
          .map((t) => {
            const i = parseInt(t, 32).toString(2);
            // if text > v (z, x, y, w) use zero
            if (i === 'NaN') return '00000';
            const l = 5 - i.split('').length;
            return '0'.repeat(l) + i;
          }).join(''), // join [00000,00000,00000]
      };
  }
}

export function getImgUrl(id) {
  return { png: `${PREVIEW}/${id}.png`, svg: `${PREVIEW}/${id}.svg` };
}

export function parseURL(url) {
  const arr = url.split('');
  const i18n = arr.slice(0, 2).join('');
  return (arr.length === 32)
    ? { // deprecated hash version
      i18n, version: false, text: arr.join('')
    } // two symbols version aa, ab, ac, etc
    : {
      i18n,
      version: arr.slice(2, 4).join(''),
      text: arr.slice(4).join(''),
    };
}

export function getMask(selected, ver) {
  const selectedAsMap = selected
    .reduce((prev, cur) => ({ ...prev, [cur]: true }), {});
  const mask = langList(ver).map(c => (c in selectedAsMap ? 1 : 0));
  const text = parseBinary(ver).bin2text(mask.join(''));
  return text;
}

function getLanguagesAA(text, ver) {
  const mask = parseBinary(ver).text2bin(text).split('').reverse();
  const answer = langList(ver).reverse()
    .reduce((prev, cur, idx) => (
      mask[idx] === '1' ? [...prev, cur] : prev), []);
  return answer;
}

function getLanguagesAD(text, ver) {
  const mask = parseBinary(ver).text2bin(text).split('').map(m => Number(m));
  return (mask.length <= langList(ver).length)
    ? mask.reduce((prev, cur, idx) => (
      cur === 1 ? [...prev, langList(ver)[idx]] : prev), [])
    : [];
}

export function getLanguages(text, ver) {
  switch (ver) {
    case 'aa':
    case 'ab':
    case 'ac': return getLanguagesAA(text, ver);
    case 'ad':
    default: return getLanguagesAD(text, ver);
  }
}

export function parseBody(body, ver = version) {
  const { selected, i18n } = body;
  const hash = getMask(selected, ver);
  const id = `${i18n}${version}${hash}`;
  const files = getImgUrl(id);
  const valid = selected.every(s => s in lang);
  return {
    id, hash, valid, ...files
  };
}
