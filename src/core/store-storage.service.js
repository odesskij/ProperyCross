'use strict';

import _ from 'lodash';

class SearchStorage {
  constructor($localStorage) {
    this.$storage = $localStorage.$default({ searches: [] });
  }

  get() {
    return this.$storage.searches;
  }

  add(query, response) {
    this.$storage.searches = [
      _.extend({ query: query, total_results: response.total_results }),
      ..._.filter(this.$storage.searches, (s) => s.query.place_name !== query.place_name)
    ];
    return this;
  }
}

export default function (module) {
  return module
    .factory('searchStorage', [
      '$localStorage',
      function ($localStorage) {
        return new SearchStorage($localStorage);
      }
    ]);
};