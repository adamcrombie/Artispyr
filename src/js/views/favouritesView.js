import MessageView from './MessageView';
import { ArtworkListingView } from './artworkListingView';

class FavouritesView extends MessageView {
  #artworkListingView;
  _messageContainer = document.querySelector('.favourites__message');
  _contentContainer = document.querySelector('.favourites__listing');
  _isColumn = true;
  _defaultMessage = 'Find an artwork you like to add!';

  constructor() {
    super();
    this.#artworkListingView = new ArtworkListingView(
      this._contentContainer,
      'trash-outline'
    );
  }

  render(data) {
    super.render(data, true);
  }

  updateSelected() {
    this.#artworkListingView.updateSelected();
  }

  addHandlerDeleteFavourite(handler) {
    this._contentContainer.addEventListener('click', function (e) {
      const icon = e.target.closest('.artwork-listing__favourite-icon');
      if (!icon) return;

      e.preventDefault();
      const id = +icon.closest('.artwork-listing__link').hash.slice(1);
      handler(id);
    });
  }

  addFavourite(artwork, displayLimit) {
    const displayedEntries =
      this._contentContainer.querySelectorAll('.artwork-listing').length;
    if (displayedEntries < displayLimit) {
      const html = this.#artworkListingView.render(artwork, false);
      this._contentContainer.insertAdjacentHTML('beforeend', html);
    }
  }

  removeFavourite(id) {
    this._contentContainer
      .querySelector(`a[href="#${id}"]`)
      .closest('.artwork-listing')
      .remove();
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

export default new FavouritesView();
