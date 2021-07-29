import MessageView from './MessageView';
import artworkDetailsView from './artworkDetailsView';
import artworkImageView from './artworkImageView';

class ArtworkView extends MessageView {
  #artworkDetails = document.querySelector('.artwork-details');
  _messageContainer = document.querySelector('.artwork__message');
  _isColumn = false;
  _defaultMessage = 'Start searching for artworks to view';
  _defaultErrorMessage =
    'Unable to find the artwork. Please try again using the search above';

  render(data) {
    if (!data) return this.renderError();

    artworkImageView.render(data);
    artworkDetailsView.render(data);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerFavourite(handler) {
    this.#artworkDetails.addEventListener('click', function (e) {
      const icon = e.target.closest('.artwork-details__favourite__icon');
      if (!icon) return;

      handler();
    });
  }

  updateFavourite(isFavourite, showtext = true) {
    isFavourite
      ? this.#addFavourite(showtext)
      : this.#removeFavourite(showtext);
  }

  #addFavourite(showtext = true) {
    this.#artworkDetails
      .querySelector('.artwork-details__favourite__icon')
      .classList.add('favourite');

    if (showtext) this.#addFavouriteText('Added!');
  }

  #removeFavourite(showtext = true) {
    this.#artworkDetails
      .querySelector('.artwork-details__favourite__icon')
      .classList.remove('favourite');

    if (showtext) this.#addFavouriteText('Removed!');
  }

  #addFavouriteText(message) {
    const textParent = this.#artworkDetails.querySelector(
      '.artwork-details__favourite'
    );
    const textClass = 'artwork-details__favourite__text';
    textParent.querySelectorAll(`.${textClass}`).forEach(el => el.remove());
    const textEl = document.createElement('span');
    textEl.classList.add(textClass);
    textEl.textContent = message;
    textParent.append(textEl);
  }
}

export default new ArtworkView();
