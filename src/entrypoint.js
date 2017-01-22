'use strict';

import angular from 'angular';
import _ from 'lodash';

import ngMaterial from 'angular-material';
import ngStorage from 'ngstorage';
import ngRoute from 'angular-route';
import 'angular-material/angular-material.css'

import searchPageComponent  from './searchPage/component';
import searchResultComponent  from './searchResult/component';
import propertyComponent  from './property/component';

import searchStorageService from './core/search-storage.service';
import favoriteStorageService from './core/fav-storage.service';
import nestoriaApiService from './core/nestoria-api.service';
import wordsFilter from './core/words.filter';

function loadingAware(template) {
  return `<div>
            <loader ng-if="$LOADING"></loader>
            <div ng-if="!$LOADING">${template}</div>
          </div>`
}
const app = angular
  .module('App', [ngMaterial, ngRoute, ngStorage.name])
  .component('searchPage', searchPageComponent)
  .component('searchResultView', searchResultComponent)
  .component('propertyView', propertyComponent)
  .component('loader', {
    template: `<div flex layout-padding style="margin: 5em;">
                  <div layout="row" layout-sm="column" layout-align="space-around">
                      <md-progress-circular md-diameter="100"><md-progress-circular>
                  </div>
                </div>`
  })

  .config([
    '$locationProvider',
    '$routeProvider',
    '$mdAriaProvider',
    ($locationProvider, $routeProvider, $mdAriaProvider) => {
      $mdAriaProvider.disableWarnings();

      $routeProvider
        .when('/', {
          template: '<search-page></search-page>'
        })
        .when('/search/place/:place_name/:page', {
          template: loadingAware('<search-result-view properties="$resolve.properties" pagination="true">'),
          resolve:  {
            properties: ['$rootScope', '$route', 'nestoriaApi', function ($rootScope, $route, api) {
              return api
                .search($route.current.params)
                .then((r) => ({
                  getPageLink(page) {
                    return `/search/place/${$route.current.params.place_name}/${page}`;
                  },
                  total:       +r.data.response.total_results,
                  total_pages: +r.data.response.total_pages,
                  page:        +$route.current.params.page,
                  listings:    _.map(r.data.response.listings, (property, i) => ({
                    property: property,
                    link:     `/property/place/${$route.current.params.place_name}/${r.data.response.page}/${i}`
                  }))
                }))

            }]
          }
        })
        .when('/property/place/:place_name/:page/:index', {
          template: loadingAware('<property-view property="$resolve.property"></property-view>'),
          resolve:  {
            property: ['$route', 'nestoriaApi', function ($route, api) {
              return api
                .search(_.omit($route.current.params, ['index']))
                .then((r) =>
                  r.data.response.listings[$route.current.params.index]);

            }]
          }
        })
        .when('/favorites', {
          template: '<search-result-view properties="$resolve.properties" pagination="false"></search-result-view>',
          resolve:  {
            properties: ['favoriteStorage', function (favoriteStorage) {
              const favs = favoriteStorage.getAll();

              return Promise
                .resolve()
                .then(() => ({
                  listings: _.map(favs, (property, id) => ({
                    property: property,
                    link:     `/favorites/${id}`
                  }))
                } ))
            }]
          }
        })
        .when('/favorites/:id', {
          template: '<property-view property="$resolve.property"></property-view>',
          resolve:  {
            property: ['$route', 'favoriteStorage', function ($route, favoriteStorage) {
              return Promise
                .resolve()
                .then(() =>
                  favoriteStorage
                    .get($route.current.params.id));
            }]
          }
        })
        .otherwise('/')
    }])
  .run(['$rootScope', function ($root) {
    $root.$on('$routeChangeStart', function (e, curr, prev) {
      if (curr.$$route && curr.$$route.resolve) {
        // Show a loading message until promises aren't resolved
        $root.$LOADING = true;
      }
    });
    $root.$on('$routeChangeSuccess', function (e, curr, prev) {
      // Hide loading message
      $root.$LOADING = false;
    });
  }]);


_.each([
    nestoriaApiService,
    searchStorageService,
    favoriteStorageService,
    wordsFilter
  ],
  (def) => def(app));