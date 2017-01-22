'use strict';

import template from './template.html';

class SearchResultController {
  constructor($scope, $location) {
    this.$scope    = $scope;
    this.$location = $location;
  }

  hasPage(page) {
    return page >= 1 && page <= this.properties.total_pages + 1;
  }
}

export default {
  template:   template,
  controller: [
    '$scope',
    '$location',
    SearchResultController
  ],
  bindings:   {
    properties: '<',
    pagination: '<',
  }
};