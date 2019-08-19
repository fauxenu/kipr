import slugify from 'slugify';
import storageService from './storageService';

const DRAFT_KEY = 'kipr-drafts';
const generateDraft = name => ({
  name,
  slug: slugify(name, { lower: true }),
  created: Date.now(),
  roster: [],
  draftedPlayers: [],
  favorites: [],
  active: true,
});

const appendUnique = (array, item) => {
  if (!array.includes(item)) {
    return [...array, item];
  }
  return array;
};

const getDrafts = () => storageService.getItem(DRAFT_KEY) || [];

export default {
  async getAllDrafts() {
    return getDrafts();
  },

  async getDraft(slug) {
    const drafts = getDrafts();
    return drafts.find(draft => slug === draft.slug);
  },

  async createDraft(name) {
    const drafts = getDrafts();
    const newDraft = generateDraft(name);

    drafts.push(newDraft);
    storageService.setItem(DRAFT_KEY, drafts);
    return newDraft;
  },

  async deleteDraft(slug) {
    const drafts = getDrafts();
    storageService.setItem(DRAFT_KEY, drafts.filter(draft => draft.slug !== slug));
    return true;
  },

  async addToRoster(slug, playerId) {
    const drafts = getDrafts();
    const draft = drafts.find(item => slug === item.slug);

    draft.roster = appendUnique(draft.roster, playerId);
    draft.draftedPlayers = appendUnique(draft.draftedPlayers, playerId);
    storageService.setItem(DRAFT_KEY, drafts);
    return draft;
  },

  async removeFromRoster(slug, playerId) {
    const drafts = getDrafts();
    const draft = drafts.find(item => slug === item.slug);

    draft.roster = draft.roster.filter(id => id !== playerId);
    draft.draftedPlayers = draft.draftedPlayers.filter(id => id !== playerId);
    storageService.setItem(DRAFT_KEY, drafts);
    return draft;
  },

  async addPlayer(slug, playerId) {
    const drafts = getDrafts();
    const draft = drafts.find(item => slug === item.slug);

    draft.draftedPlayers = appendUnique(draft.draftedPlayers, playerId);
    storageService.setItem(DRAFT_KEY, drafts);
    return draft;
  },

  async removePlayer(slug, playerId) {
    const drafts = getDrafts();
    const draft = drafts.find(item => slug === item.slug);

    draft.draftedPlayers = draft.draftedPlayers.filter(id => id !== playerId);
    storageService.setItem(DRAFT_KEY, drafts);
    return draft;
  },

  async addToFavorites(slug, playerId) {
    const drafts = getDrafts();
    const draft = drafts.find(item => slug === item.slug);

    draft.favorites = appendUnique(draft.favorites, playerId);
    storageService.setItem(DRAFT_KEY, drafts);
    return draft;
  },

  async removeFromFavorites(slug, playerId) {
    const drafts = getDrafts();
    const draft = drafts.find(item => slug === item.slug);

    draft.favorites = draft.favorites.filter(id => id !== playerId);
    storageService.setItem(DRAFT_KEY, drafts);
    return draft;
  },
};
