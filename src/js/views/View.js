export default class View {
  _data;

  render(data, render = true) {
    if (!data) throw new Error('No data received');
    this._data = data;
    const html = this._getHtml();

    if (!render) return html;

    this.replaceHtml(html, this._contentContainer);
  }

  clearContent() {
    this.clearContainer(this._contentContainer);
  }

  clearContainer(container) {
    container.innerHTML = '';
  }

  replaceHtml(html, container) {
    this.clearContainer(container);
    container.insertAdjacentHTML('afterbegin', html);
  }
}
