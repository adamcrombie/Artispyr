import icons from 'url:../../img/sprite.svg';

class sectionHeadingsView {
  #parent = document.querySelector('.section__headings');
  #results = document.querySelector('.results');
  #favourites = document.querySelector('.favourites');

  addHandlerClick(handler) {
    this.#parent.addEventListener('click', function (e) {
      const btn = e.target.closest('.section__btn');
      if (!btn) return;
      e.preventDefault();
      handler(btn.dataset.action, btn.dataset.section);
    });
  }

  updateResults(action) {
    this.#updateButton(action, 'results');
    if (action === 'show') {
      this.#results.classList.remove('results-hide');
      this.#results.classList.add('results-show');
    } else if (action === 'hide') {
      this.#results.classList.remove('results-show');
      this.#results.classList.add('results-hide');
    }
  }

  updateFavourites(action) {
    this.#updateButton(action, 'favourites');
    if (action === 'show') {
      this.#favourites.classList.remove('favourites-hide');
      this.#favourites.classList.add('favourites-show');
    } else if (action === 'hide') {
      this.#favourites.classList.remove('favourites-show');
      this.#favourites.classList.add('favourites-hide');
    }
  }

  showResults() {
    this.updateResults('show');
  }

  hideResults() {
    this.updateResults('hide');
  }

  hideFavourites() {
    this.updateFavourites('hide');
  }

  showFavourites() {
    this.updateFavourites('show');
  }

  resultsIsHidden() {
    return this.#results.classList.contains('results-hide');
  }

  #updateButton(action, section) {
    const btn = this.#parent.querySelector(`.section__btn--${section}`);
    btn.setAttribute('data-action', action === 'hide' ? 'show' : 'hide');
    const iconDefinition = btn.querySelector('.section__btn__icon > use');
    iconDefinition.setAttribute(
      'href',
      `${icons}#caret-${
        (action === 'hide' && section === 'results') ||
        (action === 'show' && section === 'favourites')
          ? 'forward'
          : 'back'
      }`
    );
  }
}

export default new sectionHeadingsView();
