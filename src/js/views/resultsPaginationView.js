import PaginationView from './PaginationView';

class resultsPaginationView extends PaginationView {
  _contentContainer = document.querySelector('.pagination-results');
  _classSuffix = '-results';
}

export default new resultsPaginationView();
