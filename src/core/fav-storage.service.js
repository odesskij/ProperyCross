'use strict';

import SHA256 from 'crypto-js/sha256'

function prop2hash(prop) {
  return SHA256(`${prop.title}${prop.lister_url}`);
}

class FavoriteStorage {
  constructor($localStorage) {
    this.$storage = $localStorage.$default({ favorites: {} });
  }

  getAll() {
    return this.$storage.favorites;
  }

  get(id) {
    return this.$storage.favorites[id];
  }

  has(property) {
    return !!this.$storage.favorites[prop2hash(property)];
  }

  add(property) {
    this.$storage.favorites[prop2hash(property)] = property;
    return this;
  }

  remove(property) {
    delete this.$storage.favorites[prop2hash(property)];
    return this;
  }
}

export default function (module) {
  return module
    .factory('favoriteStorage', [
      '$localStorage',
      function ($localStorage) {
        return new FavoriteStorage($localStorage);
      }
    ]);
};