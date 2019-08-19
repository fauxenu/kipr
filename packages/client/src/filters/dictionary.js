import dictionaryJson from '@/config/dictionary';

export default function dictionary(key) {
  return dictionaryJson[key] || '';
}
