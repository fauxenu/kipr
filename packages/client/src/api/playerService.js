export default {
  async getAllPlayers() {
    const response = await fetch('/data/players.json');
    if (response.ok) {
      const json = await response.json();
      return json.map(item => Object.assign({ onRoster: false, drafted: false }, item));
    }
    return [];
  },
};
