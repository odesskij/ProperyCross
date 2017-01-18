'use strict';

import _ from 'lodash';

export default function (module) {
  return module
    .filter('words', [
      function ($http) {
        return function (input, words = 5) {
          if (!_.isString(input)) {
            return input;
          }
          if (input.length < words) {
            return input;
          }
          return input.split(/\s+/).slice(0, words).join(' ') + '...';
        };
      }
    ]);
};