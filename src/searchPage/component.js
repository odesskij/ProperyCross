'use strict';

import template from './template.html';

class SearchPageController {
  constructor($scope, $http, $location, searchStorage, api) {

    this.$scope        = $scope;
    this.$http         = $http;
    this.$location     = $location;
    this.searchStorage = searchStorage;
    this.api           = api;


    this.$scope.searchQuery = '';

    $scope.searches = searchStorage.get().slice(0, 5);
  }


  goSearch(query) {
    this
      .api
      .search(query)
      .then((r) => {
        this
          .searchStorage
          .add(query, r.data.response);

        this.$location.path(`/search/place/${query.place_name}/${query.page || 1}`);
      })
  }
}

export default {
  template:   template,
  controller: [
    '$scope',
    '$http',
    '$location',
    'searchStorage',
    'nestoriaApi',
    SearchPageController
  ],
};