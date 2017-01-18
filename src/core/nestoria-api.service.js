'use strict';

import _ from 'lodash';

class NestoriaAPI {
  constructor($http) {
    this.$http = $http;

    this.search = _.bind(_.memoize(this.search, (r) => `${r.place_name}${r.page}`), this)
  }

  toQueryString(query) {
    return Object
      .keys(query)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
      .join('&');
  }

  search(request) {
    const query = _.extend({
      country:      'uk',
      pretty:       1,
      action:       'search_listings',
      encoding:     'json',
      listing_type: 'buy',
      page:         1,
      place_name:   '',
    }, _.pick(request, ['page', 'place_name']));

    return this
      .$http
      .get(`/api?${this.toQueryString(query)}`)
  }
}

export default function (module) {
  return module
    .factory('nestoriaApi', [
      '$http',
      function ($http) {
        return new NestoriaAPI($http);
      }
    ]);
};