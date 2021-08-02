import MessageView from './MessageView';
import icons from 'url:../../img/sprite.svg';
import { DEFAULT_ARTIST_NAME } from '../config';

class ArtworkDetailsView extends MessageView {
  _messageContainer = document.querySelector('.artwork__details__message');
  _contentContainer = document.querySelector('.artwork-details');
  _isColumn = false;
  _defaultMessage = '';
  _defaultErrorMessage = 'Details of the artwork are unknown or unavailable';

  render(data) {
    if (this.messageIsDisplayed()) this.clearMessage();
    super.render(data);
  }

  _getHtml() {
    return `
        <div class="artwork-details__favourite">
          <svg class="artwork-details__favourite__icon${
            this._data.favourite ? ' favourite' : ''
          }">
              <use xlink:href="${icons}#star"></use>
          </svg>
        </div>
        <h2 class="artwork-details__title">
            ${this._data.artworkTitle}
        </h2>
        <p class="artwork-details__created">
        ${
          this._data.createdPlace && this._data.createdDate
            ? `Created in ${
                this._data.createdPlace
              }, ${this._data.createdDate.toLowerCase()}`
            : this._data.createdPlace
            ? `Created in ${this._data.createdPlace}`
            : this._data.createdDate
            ? this._data.createdDate
            : ''
        }
        </p>
        <div class="artwork-details__divider"></div>
        <div class="artwork-details__artist">
            ${
              this._data.artistName !== DEFAULT_ARTIST_NAME
                ? this._data.artistInfo
                    .split('\n')
                    .map(
                      s =>
                        `<span class="artwork-details__artist--block">${s}</span>`
                    )
                    .join('')
                : DEFAULT_ARTIST_NAME
            }
        </div>
        <div class="artwork-details__divider"></div>
        <div class="artwork-details__info">
            ${this.#generateInfoSection(this._data.inscriptions, 'Notes')}
            ${this.#generateInfoSection(this._data.materialsUsed, 'Medium')}
            ${this.#generateInfoSection(this._data.artworkStyle, 'Style')}
            ${this.#generateInfoSection(this._data.dimensions, 'Size')}
        </div>`;
  }

  #generateInfoSection(info, heading) {
    return info
      ? `<p class="paragraph">
              <span class="paragraph__heading">${heading}: </span>
              ${info}
             </p>`
      : '';
  }
}

export default new ArtworkDetailsView();
