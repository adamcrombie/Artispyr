import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import artworkView from './views/artworkView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import resultsSummaryView from './views/resultsSummaryView';
import favouritesPaginationView from './views/favouritesPaginationView';
import resultsPaginationView from './views/resultsPaginationView';
import favouritesView from './views/favouritesView';
import { NoResultsReceivedError } from './noResultsReceivedError';
import { UserInputError } from './userInputError';
import { MIN_LETTERS_IN_WORD, MAX_CHARACTERS_IN_QUERY } from './config';

const controlArtwork = async function () {
  try {
    const id = +window.location.hash.slice(1);
    if (!id) return;

    if (artworkView.messageIsDisplayed()) artworkView.clearMessage();
    resultsView.updateSelected();
    favouritesView.updateSelected();

    await model.loadArtwork(id);

    artworkView.render(model.state.artwork);
  } catch (err) {
    artworkView.renderError();
  }
};

const controlSearch = async function () {
  try {
    searchView.disable();
    resultsPaginationView.remove();
    resultsSummaryView.clearContent();
    resultsView.renderLoading();
    if (artworkView.messageIsDisplayed()) artworkView.clearMessage();

    const query = searchView.getInput();
    const category = searchView.getCategory();

    checkInput(query, category);

    await model.loadSearchResults(category, query);

    renderResults();
    noFavouritesMessage();
  } catch (err) {
    if (err instanceof UserInputError) {
      artworkView.renderError(err.message);
    } else if (err instanceof NoResultsReceivedError) resultsView.renderError();
    else resultsView.renderError('An error occurr - please retry your search');
  } finally {
    searchView.enable();
    resultsView.clearLoading();
  }
};

const controlResultsPagination = function (page) {
  renderResults(page);
};

const controlFavouritesPagination = function (page) {
  favouritesView.render(model.getFavouritesPage(page));
  favouritesView.updateSelected();
  favouritesPaginationView.render(model.state.favourites);
};

const controlFavouritesDeleteFavourite = function (id) {
  model.removeFavourite(id);
  favouritesView.removeFavourite(id);
  noFavouritesMessage();
  resultsView.updateFavourite(model.state.favourites.entries);
  artworkView.updateFavourite(
    model.state.artwork.favourite,
    id === model.state.artwork.id
  );
  favouritesView.updateSelected();
};

const controlToggleFavourite = function () {
  if (model.state.artwork.favourite) {
    model.removeFavourite(model.state.artwork.id);
    favouritesView.removeFavourite(model.state.artwork.id);
    noFavouritesMessage();
  } else {
    model.addFavourite(model.state.artwork);
    if (favouritesReachesPageThreshold())
      favouritesPaginationView.render(model.state.favourites);
    else
      favouritesView.addFavourite(
        model.state.artwork,
        model.state.favourites.entriesPerPage
      );
    if (favouritesView.messageIsDisplayed()) favouritesView.clearMessage();
  }
  resultsView.updateFavourite(model.state.favourites.entries);
  artworkView.updateFavourite(model.state.artwork.favourite);
  favouritesView.updateSelected();
};

const queryIsValid = function (q) {
  return new RegExp(`[a-z]{${MIN_LETTERS_IN_WORD},}`, 'i').test(q);
};

const checkInput = function (query, category) {
  if (!query || !category || !queryIsValid(query))
    throw new UserInputError(
      `Search parameters do not seem quite right. Please ensure a word of at least 3 characters is entered and either 'Artwork' or 'Artist' is selected`
    );

  if (query.length > MAX_CHARACTERS_IN_QUERY)
    throw new UserInputError(
      'Search query exceeded the maximum number of characters allowed, which is 50. Please try again.'
    );
};

const noFavouritesMessage = function () {
  if (model.state.favourites.entries.length === 0)
    favouritesView.renderMessage();
};

const favouritesReachesPageThreshold = function () {
  const pageLimit = model.state.favourites.entriesPerPage;
  const totalFavourites = model.state.favourites.entries.length;
  if (totalFavourites > 1 && totalFavourites % pageLimit === 1) return true;
  return false;
};

const renderResults = function (page = 1) {
  resultsView.render(model.getResultsPage(page));
  resultsView.updateSelected();
  resultsSummaryView.render(model.state.results.maxAvailable);
  resultsPaginationView.render(model.state.results);
};

const init = function () {
  if (searchView.isDisabled()) searchView.enable();
  artworkView.renderMessage();
  favouritesView.render(model.state.favourites.entries);
  searchView.addHandlerSearch(controlSearch);
  artworkView.addHandlerFavourite(controlToggleFavourite);
  artworkView.addHandlerRender(controlArtwork);
  resultsPaginationView.addHandlerClick(controlResultsPagination);
  favouritesPaginationView.addHandlerClick(controlFavouritesPagination);
  favouritesView.addHandlerDeleteFavourite(controlFavouritesDeleteFavourite);
};

init();
