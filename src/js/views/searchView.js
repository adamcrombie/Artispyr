import { CATEGORY_FIELD } from '../config.js';

class SearchView {
  #form = document.querySelector('.search');
  #input = document.querySelector('.search__input');
  #radioArtwork = document.getElementById('artwork-radio');
  #radioArtist = document.getElementById('artist-radio');
  #button = document.querySelector('.search__btn');

  getInput() {
    const input = this.#input.value.trim();
    this.#clearInput();
    return input;
  }

  getCategory() {
    if (this.#radioArtwork.checked) return CATEGORY_FIELD.ARTWORK;
    if (this.#radioArtist.checked) return CATEGORY_FIELD.ARTIST;

    throw new Error('Invalid state for radio buttons');
  }

  addHandlerSearch(handler) {
    this.#form.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  disable() {
    this.#button.disabled = true;
  }

  enable() {
    this.#button.disabled = false;
  }

  isDisabled() {
    return this.#button.disabled;
  }

  #clearInput() {
    this.#input.value = '';
  }
}

export default new SearchView();
