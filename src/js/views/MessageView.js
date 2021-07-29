import View from './View.js';
import icons from 'url:../../img/sprite.svg';
import logo from 'url:../../img/logo.svg';

export default class MessageView extends View {
  render(data, preventErrorMessage = false) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      if (!preventErrorMessage) this.renderMessage();
      return;
    }

    super.render(data);
  }

  renderLoading() {
    const html = `<div class="message-loading">
                    <svg class="message-loading__icon message-loading__icon--${this.#getMessageClassSuffix()}">
                        <use xlink:href="${icons}#medical-outline"></use>
                    </svg>
                </div>`;
    this.clearContent();
    this.replaceHtml(html, this._messageContainer);
  }

  renderMessage(message = this._defaultMessage) {
    const classSuffix = this.#getMessageClassSuffix();

    const html = `<div class="message-${classSuffix}">
                    <img src="${logo}" alt="Artispyr logo" class="message-${classSuffix}__icon" />
                    <p class="message-${classSuffix}__paragraph">${message}</p>
                  </div>`;
    this.replaceHtml(html, this._messageContainer);
  }

  renderError(message = this._defaultErrorMessage) {
    const classSuffix = this.#getMessageClassSuffix();

    const html = `<div class="message-${classSuffix}">
                    <svg class="message-${classSuffix}__icon--error">
                        <use xlink:href="${icons}#alert-circle-outline"></use>
                    </svg>
                    <p class="message-${classSuffix}__paragraph">${message}</p>
                  </div>`;
    this.replaceHtml(html, this._messageContainer);
  }

  messageIsDisplayed() {
    return (
      this._messageContainer.querySelector(
        '.message-main, .message-column, .message-loading'
      ) !== null
    );
  }

  loadingMessageIsDisplayed() {
    return this._messageContainer.querySelector('.message-loading') !== null;
  }

  clearMessage() {
    this.clearContainer(this._messageContainer);
  }

  #getMessageClassSuffix() {
    return this._isColumn ? 'column' : 'main';
  }
}
