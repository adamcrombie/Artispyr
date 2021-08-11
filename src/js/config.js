export const INFO_URL = 'https://api.artic.edu/api/v1/artworks/search?params=';
export const IMAGE_URL = 'https://www.artic.edu/iiif/2/';
export const LARGE_IMAGE_PART_URL = '/full/843,/0/default.jpg';
export const SMALL_IMAGE_PART_URL = '/full/200,/0/default.jpg';
export const ARTWORK_FIELDS = `
  id,
  title,
  date_display,
  artist_display,
  artist_title,
  place_of_origin,
  dimensions,
  medium_display,
  inscriptions,
  is_public_domain,
  style_title,
  classification_title,
  image_id,
  config
`;

export const CATEGORY_FIELD = {
  ARTWORK: 'title',
  ARTIST: 'artist_title',
};

export const DEFAULT_ARTIST_NAME = 'Unknown artist';
export const DEFAULT_ARTWORK_NAME = 'Unknown title';

export const RESULTS_PER_PAGE = 10;
export const RESULTS_LIMIT = 50;

export const QUERY_TIMEOUT_SECONDS = 5;

export const MIN_LETTERS_IN_WORD = 3;
export const MAX_CHARACTERS_IN_QUERY = 50;
export const RESULT_LISTING_ENTRY_MAX_CHARACTERS = 37;

export const REQUEST_HEADER_IDENTIFY_FIELD = 'AIC-User-Agent';
export const REQUEST_HEADER_PROJECT_INFO = 'Artispyr (artispyr@gmail.com)';
