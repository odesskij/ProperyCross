'use strict';

import template from './template.html';
import _ from 'lodash';

class PropertyController {
  constructor($scope, $routeParams, api) {
    this.$scope = $scope;
    api
      .search(_.omit($routeParams, ['index']))
      .then((r) =>
        this.$scope.property = r.data.response.listings[$routeParams.index]);
  }
}

export default {
  template:   template,
  controller: [
    '$scope',
    '$routeParams',
    'nestoriaApi',
    PropertyController
  ]
};