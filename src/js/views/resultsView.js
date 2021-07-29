import MessageView from './MessageView';
import { ArtworkListingView } from './artworkListingView';

class ResultsView extends MessageView {
  #artworkListingView;
  _messageContainer = document.querySelector('.results__message');
  _contentContainer = document.querySelector('.results__listing');
  _isColumn = true;
  _defaultErrorMessage = 'Search produced no results to display';

  constructor() {
    super();
    this.#artworkListingView = new ArtworkListingView(
      this._contentContainer,
      'star'
    );
  }

  updateSelected() {
    this.#artworkListingView.updateSelected();
  }

  updateFavourite(favourites) {
    const elementClass = 'artwork-listing__link';
    this._contentContainer.querySelectorAll(`.${elementClass}`).forEach(el => {
      const icon = el.querySelector('.artwork-listing__favourite-icon');
      if (favourites.some(fav => fav.id === +el.hash.slice(1)))
        icon.classList.remove('hidden');
      else if (!icon.classList.contains('hidden')) icon.classList.add('hidden');
    });
  }

  clearLoading() {
    if (this.loadingMessageIsDisplayed()) this.clearMessage();
  }

  _getHtml() {
    return this._data
      .map(entry => this.#artworkListingView.render(entry, false))
      .join('');
  }
}

export default new ResultsView();
