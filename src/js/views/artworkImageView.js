import MessageView from './MessageView';

class ArtworkDetailsView extends MessageView {
  _contentContainer = document.querySelector('.artwork__img');
  _messageContainer = document.querySelector('.artwork__message');
  _isColumn = false;
  _defaultMessage = '';
  _defaultErrorMessage = 'No image available';

  render(data) {
    if (!data) return this.renderError();

    this.renderLoading();
    this._data = data;
    this.#createImage();
  }

  #createImage() {
    const promise = new Promise((resolve, reject) => {
      if (!this._data.imageId) return reject();

      const img = document.createElement('img');
      img.src = this._data.imageUrlLarge;
      img.alt = this._data.artworkTitle;
      img.crossOrigin = 'Anonymous';
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', reject);
    })
      .then(img => {
        this.clearMessage();
        this._contentContainer.prepend(img);
      })
      .catch(() => this.renderError());
  }
}

export default new ArtworkDetailsView();
