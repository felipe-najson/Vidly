import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // First we convert the array of items to a lodash container to use the methods
  // Second we slice the array on the startElement of the current page
  // Finally we take maximum items we can have in a page (pageSize)
  return _(items).slice(startIndex).take(pageSize).value();
}
