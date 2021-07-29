import View from './View';
import { RESULTS_LIMIT } from '../config.js';

class ResultsSummaryView extends View {
  _contentContainer = document.querySelector('.header__results-summary');

  _getHtml() {
    const total = this._data;
    return `<span class="header__results-summary--block">
      Available results: ${total}</span>
      ${
        total > RESULTS_LIMIT
          ? `
        <span class="header__results-summary--block"> Listing first ${RESULTS_LIMIT}</span>`
          : ''
      }`;
  }
}

export default new ResultsSummaryView();
