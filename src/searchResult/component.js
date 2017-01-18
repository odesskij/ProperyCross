'use strict';

import template from './template.html';

class SearchResultController {
  constructor($scope, $routeParams, $location, api) {

    this.$scope    = $scope;
    this.api       = api;
    this.$location = $location;

    this.$scope.query = $routeParams;

    this.load(this.$scope.query);

  }

  load(query) {
    this.$scope.$LOADING = true;
    return this
      .api
      .search(query)
      .then((r) => {
        this.$scope.$LOADING    = false;
        this.$scope.result      = r.data;
        this.$scope.currentPage = r.data.request.page;
        this.$scope.lastpage    = r.data.response.total_pages;
      });
  }

  hasPage(page) {
    return page >= 1 && page <= this.$scope.lastpage + 1;
  }

  goPage(page) {
    this.$location.path(`/search/place/${this.$scope.query.place_name}/${page}`);
  }

  goProperty(index) {
    this.$location.path(`/property/place/${this.$scope.query.place_name}/${this.$scope.query.page}/${index}`);
  }
}

export default {
  template:   template,
  controller: [
    '$scope',
    '$routeParams',
    '$location',
    'nestoriaApi',
    SearchResultController
  ]
};