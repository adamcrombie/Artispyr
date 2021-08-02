import View from './View';
import icons from 'url:../../img/sprite.svg';

export default class PaginationView extends View {
  addHandlerClick(handler) {
    const _self = this;
    this._contentContainer.addEventListener('click', function (e) {
      const btn = e.target.closest(`.pagination${_self._classSuffix}__btn`);
      if (!btn) return;
      handler(+btn.dataset.page);
    });
  }

  remove() {
    this.clearContent();
    this.#paginationHide();
  }

  totalPages() {
    return Math.ceil(this._data.entries.length / this._data.entriesPerPage);
  }

  _getHtml() {
    const totalPages = this.totalPages();
    const currentPage = this._data.page;

    if (currentPage === 1 && totalPages > currentPage) {
      this.#paginationVisible();
      return this.#forwardButtonHtml(currentPage);
    }

    if (currentPage === totalPages && totalPages > 1) {
      this.#paginationVisible();
      return this.#backButtonHtml(currentPage);
    }

    if (currentPage < totalPages) {
      this.#paginationVisible();
      return `${this.#backButtonHtml(currentPage)}${this.#forwardButtonHtml(
        currentPage
      )}`;
    }

    this.#paginationHide();
  }

  #paginationVisible() {
    this._contentContainer.classList.add(
      `pagination${this._classSuffix}--active`
    );
  }

  #paginationHide() {
    this._contentContainer.classList.remove(
      `pagination${this._classSuffix}--active`
    );
  }

  #backButtonHtml(page) {
    return `
        <div class="pagination${this._classSuffix}__backward">
            <button class="pagination${this._classSuffix}__btn" data-page="${
      page - 1
    }">
                <svg class="pagination${this._classSuffix}__icon">
                    <use
                        xlink:href="${icons}#arrow-back-circle-outline"
                    ></use>
                </svg>
            </button>
            <span class="pagination${this._classSuffix}__text">Page ${
      page - 1
    }</span>
        </div>`;
  }

  #forwardButtonHtml(page) {
    return `
        <div class="pagination${this._classSuffix}__forward">
            <button class="pagination${this._classSuffix}__btn" data-page="${
      page + 1
    }">
                <svg class="pagination${this._classSuffix}__icon">
                    <use
                    xlink:href="${icons}#arrow-forward-circle-outline"
                    ></use>
                </svg>
            </button>
            <span class="pagination${this._classSuffix}__text">Page ${
      page + 1
    }</span>
        </div>`;
  }
}
