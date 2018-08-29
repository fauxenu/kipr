/* eslint-disable no-console, no-restricted-syntax, no-await-in-loop */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const pages = require('./pages.json');
const coaches = require('./coaches.json');

const selectors = {
  name: 'td.tal',
  nameLink: 'td.tal a',
  rank: 'td:last-child',
  byeWeeK: 'td:nth-child(2)',
  positionRankTable: '.rankings-table tbody',
  positionTableRows: '.rankings-table:first-child tbody tr',
  overallRankTable: 'aside.inline-table:nth-of-type(2) table tbody',
  overallRankTableLinks: 'aside.inline-table:nth-of-type(2) table tbody tr a',
};

const output = path.resolve(process.cwd(), 'data/players.json');
const players = [...coaches];

const parseIdFromUrl = (url) => {
  const playerRegEx = /id\/\d+(?=\/)/;
  const teamRegEx = /name\/\w+$/;

  if (playerRegEx.test(url)) {
    return (url.match(playerRegEx) || [''])[0].replace(/^id\//, '');
  }
  return (url.match(teamRegEx) || [''])[0].replace(/^name\//, '');
};

const parsePlayerInfo = async ($el) => {
  const text = await $el.$eval(selectors.name, el => el.innerText);
  const fragments = text.split(',');
  const info = fragments[1].trim().split(/\s+/);
  const name = fragments[0].replace(/^\d+./, '').trim();
  const team = info[0].toLowerCase();
  const status = info.length > 1 ? info[1] : '';

  return { name, team, status };
};

const parsePlayerLink = async ($el) => {
  const href = await $el.$eval(selectors.nameLink, el => el.href);
  const id = parseIdFromUrl(href);
  return { href, id };
};

const parseTeamName = async ($el) => {
  const text = await $el.$eval(selectors.name, el => el.innerText);
  const name = text.replace(/^\d+./, '');
  return name.trim();
};

const parseTeamLink = async ($el) => {
  const href = await $el.$eval(selectors.nameLink, el => el.href);
  const id = parseIdFromUrl(href);
  return { href, id: id.toLowerCase() };
};

const parseRank = async $el => $el.$eval(selectors.rank, el => parseFloat(el.innerText));

const parseByeWeek = async $el => (
  $el.$eval(selectors.byeWeeK, el => parseInt(el.innerText, 10))
);

const parsePlayer = async ($el, position) => {
  const info = await parsePlayerInfo($el);
  const rank = await parseRank($el);
  const link = await parsePlayerLink($el);
  const bye = await parseByeWeek($el);

  return Object.assign({
    type: 'player',
    position,
    rank,
    overallRank: null,
    bye,
  }, info, link);
};

const parseTeam = async ($el, position) => {
  const name = await parseTeamName($el);
  const rank = await parseRank($el);
  const bye = await parseByeWeek($el);
  const link = await parseTeamLink($el);

  return Object.assign({
    type: 'team',
    position,
    name,
    rank,
    overallRank: null,
    bye,
    team: link.id,
    status: '',
  }, link);
};

const fetchPlayers = async (page) => {
  for (const { position, url } of pages.positionRanks) {
    try {
      await page.goto(url);
      await page.waitForSelector(selectors.positionRankTable);
      const rows = await page.$$(selectors.positionTableRows);

      for (const row of rows) {
        let player;
        if (position === 'd/st') {
          player = await parseTeam(row, position);
        } else {
          player = await parsePlayer(row, position);
        }
        players.push(player);
      }
    } catch (err) {
      console.error(err);
    }
  }
};

const setOverallRanks = async (page) => {
  try {
    await page.goto(pages.overallRanks);
    await page.waitForSelector(selectors.overallRankTable);
    const table = await page.$(selectors.overallRankTable);
    const links = await table.$$eval('td a', nodes => nodes.map(n => n.href));

    links.forEach((url, index) => {
      const id = parseIdFromUrl(url);
      const player = players.find(p => p.id === id);
      if (player) {
        player.overallRank = index + 1;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

try {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // gets all players
    await fetchPlayers(page);

    // gets overall player rankings
    await setOverallRanks(page);

    browser.close();
    fs.writeFile(output, JSON.stringify(players, null, 2), (err) => {
      if (err) {
        throw err;
      }
      console.log(`Imported ${players.length} players!`);
    });
  })();
} catch (err) {
  console.error(err);
}
