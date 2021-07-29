import { urlEncodeQuery, getData, getImageUrl } from './helpers';
import {
  INFO_URL,
  ARTWORK_FIELDS,
  RESULTS_LIMIT,
  RESULTS_PER_PAGE,
  DEFAULT_ARTIST_NAME,
  DEFAULT_ARTWORK_NAME,
} from './config';
import { NoResultsReceivedError } from './noResultsReceivedError.js';

export const state = {
  artwork: {},
  results: {
    entries: [],
    page: 1,
    entriesPerPage: RESULTS_PER_PAGE,
    maxAvailable: 0,
  },
  favourites: {
    entries: [],
    page: 1,
    entriesPerPage: RESULTS_PER_PAGE,
  },
};

const createArtworkObject = function (item) {
  return {
    id: item.id,
    artworkTitle: item.title ? item.title : DEFAULT_ARTWORK_NAME,
    artworkStyle: item.style_title,
    typeOfArtwork: item.classification_title,
    createdDate: item.date_display,
    createdPlace: item.place_of_origin,
    artistInfo: item.artist_title ? item.artist_display : DEFAULT_ARTIST_NAME,
    artistName: item.artist_title ? item.artist_title : DEFAULT_ARTIST_NAME,
    materialsUsed: item.medium_display,
    dimensions: item.dimensions,
    inscriptions: item.inscriptions,
    imageId: item.image_id,
    imageUrlLarge: getImageUrl(item.image_id),
    imageUrlSmall: getImageUrl(item.image_id, true),
    isPublicDomain: item.is_public_domain,
    favourite: state.favourites.entries.some(fav => fav.id === item.id),
  };
};

const queryKeywords = function (categoryField, keywords) {
  return {
    query: {
      bool: {
        must: [
          {
            term: {
              is_public_domain: true,
            },
          },
          {
            match: {
              [categoryField]: {
                query: keywords,
              },
            },
          },
        ],
      },
    },
    fields: ARTWORK_FIELDS,
    limit: RESULTS_LIMIT,
  };
};

const queryId = function (artworkId) {
  return {
    query: {
      bool: {
        must: [
          {
            term: {
              is_public_domain: true,
            },
          },
          {
            term: {
              id: artworkId,
            },
          },
        ],
      },
    },
    fields: ARTWORK_FIELDS,
    limit: 1,
  };
};

export const loadSearchResults = async function (field, searchQuery) {
  try {
    const query = queryKeywords(field, searchQuery);
    const url = `${INFO_URL}${urlEncodeQuery(query)}`;
    const data = await getData(url);

    const entries = data.data;

    if (entries.length === 0)
      throw new NoResultsReceivedError('Query produced no results');

    state.results.maxAvailable = +data.pagination.total;
    state.results.entries = entries.map(art => createArtworkObject(art));
    state.results.page = 1;
  } catch (err) {
    throw err;
  }
};

export const loadArtwork = async function (id) {
  try {
    const artwork = findArtworkInState(id);
    if (artwork) {
      state.artwork = artwork;
      return;
    }

    const query = queryId(id);
    const url = `${INFO_URL}${urlEncodeQuery(query)}`;
    const data = await getData(url);

    if (data.data.length === 0)
      throw new Error('Invalid id - no artwork found');

    state.artwork = createArtworkObject(data.data[0]);
  } catch (err) {
    throw err;
  }
};

const findArtworkInState = function (id) {
  const resultsIndex = state.results.entries.findIndex(
    entry => entry.id === id
  );
  if (resultsIndex !== -1) return state.results.entries[resultsIndex];

  const favouritesIndex = state.favourites.entries.findIndex(
    entry => entry.id === id
  );
  if (favouritesIndex !== -1) return state.favourites.entries[favouritesIndex];

  return null;
};

export const getResultsPage = function (page) {
  state.results.page = page;

  return state.results.entries.slice(
    (page - 1) * state.results.entriesPerPage,
    page * state.results.entriesPerPage
  );
};

export const getFavouritesPage = function (page) {
  state.favourites.page = page;

  return state.favourites.entries.slice(
    (page - 1) * state.favourites.entriesPerPage,
    page * state.favourites.entriesPerPage
  );
};

const persistFavourites = function () {
  localStorage.setItem('favourites', JSON.stringify(state.favourites));
};

export const addFavourite = function (artwork) {
  if (state.favourites.entries.some(fav => fav.id === artwork.id))
    throw new Error('Artwork is already added as a favourite');

  artwork.favourite = true;
  state.favourites.entries.push(artwork);

  if (artwork.id === state.artwork.id) state.artwork.favourite = true;

  state.results.entries.forEach(res => {
    if (res.id === artwork.id) {
      res.favourite = true;
    }
  });

  persistFavourites();
};

export const removeFavourite = function (id) {
  const index = state.favourites.entries.findIndex(fav => fav.id === id);

  if (index === -1)
    throw new Error(
      'No favourites with specified id - unable to remove favourite'
    );

  state.favourites.entries.splice(index, 1);

  if (id === state.artwork.id) state.artwork.favourite = false;

  state.results.entries.forEach(res => {
    if (res.id === id) {
      res.favourite = false;
    }
  });

  persistFavourites();
};

const init = function () {
  const savedData = localStorage.getItem('favourites');

  if (savedData) state.favourites = JSON.parse(savedData);
};

init();
