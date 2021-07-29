import View from './View';
import { RESULT_LISTING_ENTRY_MAX_CHARACTERS } from '../config';
import icons from 'url:../../img/sprite.svg';
import noImage from 'url:../../img/no_image.svg';

export class ArtworkListingView extends View {
  #contentContainer;
  #iconName;

  constructor(contentContainer, iconName) {
    super();
    this.#contentContainer = contentContainer;
    this.#iconName = iconName;
  }

  updateSelected() {
    const idHash = window.location.hash;
    const elementClass = 'artwork-listing__link';
    const selectedClass = 'selected';
    this.#contentContainer.querySelectorAll(`.${elementClass}`).forEach(el => {
      if (el.hash === idHash && !el.classList.contains(selectedClass))
        el.classList.add(selectedClass);
      else if (el.hash !== idHash && el.classList.contains(selectedClass))
        el.classList.remove(selectedClass);
    });
  }

  _getHtml() {
    return `<div class="artwork-listing">
                <a href="#${this._data.id}" class="artwork-listing__link">
                    <img src="${
                      this._data.imageId ? this._data.imageUrlSmall : noImage
                    }" 
                    alt="${
                      this._data.imageId
                        ? this._data.artworkTitle
                        : 'No image available'
                    }"
                    onerror="this.onerror=null;this.src='${noImage}';"
                    crossorigin="Anonymous"
                    class="artwork-listing__img"
                    />
                    <span class="artwork-listing__info artwork-listing__info--artwork">
                    ${this.#restrictEntryLength(this._data.artworkTitle)}
                    </span>
                    <span class="artwork-listing__info artwork-listing__info--artist">
                    ${this.#restrictEntryLength(this._data.artistName)}
                    </span>
                    <svg class="artwork-listing__favourite-icon artwork-listing__favourite-icon--${
                      this.#iconName === 'star' && this._data.favourite
                        ? 'fill'
                        : this.#iconName === 'star' && !this._data.favourite
                        ? 'fill hidden'
                        : 'stroke'
                    }"><use xlink:href="${icons}#${this.#iconName}"></use>
                    </svg>
                </a>
             </div>`;
  }

  #restrictEntryLength(s) {
    return s.length > RESULT_LISTING_ENTRY_MAX_CHARACTERS
      ? s.slice(0, RESULT_LISTING_ENTRY_MAX_CHARACTERS).concat('...')
      : s;
  }
}
