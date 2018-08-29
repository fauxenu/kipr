/* eslint-disable no-console, no-restricted-syntax, no-await-in-loop */
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const data = require('../data/players.json');

const logoPath = path.resolve(process.cwd(), 'assets/img/teams');
const profilePath = path.resolve(process.cwd(), 'assets/img/players');

const download = (url, output) => (
  axios({ url, responseType: 'stream' })
    .then((response) => {
      response.data.pipe(fs.createWriteStream(output));
      return { ok: true, error: null };
    })
    .catch(({ message }) => ({ ok: false, error: message }))
);

const downloadLogo = (id) => {
  const url = `http://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/${id}.png&h=150&w=150`;
  return download(url, `${logoPath}/${id}.png`);
};

const downloadProfileImg = (id) => {
  const url = `http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${id}.png&w=350&h=254`;
  return download(url, `${profilePath}/${id}.png`);
};

(async () => {
  const teams = data.filter(player => player.type === 'team');
  const players = data.filter(player => player.type === 'player');
  const errors = [];
  let added = 0;

  for (const { id } of teams) {
    const result = await downloadLogo(id);
    if (result.ok) {
      added += 1;
    } else {
      errors.push(result.error);
    }
  }

  for (const { id } of players) {
    const result = await downloadProfileImg(id);
    if (result.ok) {
      added += 1;
    } else {
      errors.push(result.error);
    }
  }

  console.log(`Downloaded ${added} images`);
  if (errors.length) {
    console.error(errors);
  }
})();
