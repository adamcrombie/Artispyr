class mediaQueriesView {
  monitorHideFavourites(handler) {
    window
      .matchMedia('only screen and (max-width: 65.75em)')
      .addEventListener('change', handler);
  }

  monitorHideResults(handler) {
    window
      .matchMedia('only screen and (max-width: 45em)')
      .addEventListener('change', handler);
  }
}

export default new mediaQueriesView();
