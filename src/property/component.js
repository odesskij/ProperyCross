'use strict';

import template from './template.html';

class PropertyController {
  constructor($scope, favStorage) {
    this.$scope     = $scope;
    this.favStorage = favStorage;
  }

  onFavoriteProperty(property) {
    this.favStorage.has(property) ?
      this.favStorage.remove(property) :
      this.favStorage.add(property);
  }
}

export default {
  template:   template,
  controller: [
    '$scope',
    'favoriteStorage',
    PropertyController
  ],
  bindings: {
    property: '<'
  }
};