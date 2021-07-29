import PaginationView from './PaginationView';

class favouritesPaginationView extends PaginationView {
  _contentContainer = document.querySelector('.pagination-favourites');
  _classSuffix = '-favourites';
}

export default new favouritesPaginationView();
