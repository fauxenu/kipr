import teamNames from 'config/teamNames.json';

export default function teamName(code) {
  return teamNames[code] || code;
}
