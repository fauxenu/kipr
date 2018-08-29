export default function capitalize(value) {
  if (value) {
    const str = value.toString();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return '';
}
