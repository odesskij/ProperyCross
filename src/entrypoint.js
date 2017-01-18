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

import searchStorageService from './core/store-storage.service';
import nestoriaApiService from './core/nestoria-api.service';
import wordsFilter from './core/words.filter';

const app = angular
  .module('App', [ngMaterial, ngRoute, ngStorage.name])
  .component('searchPage', searchPageComponent)
  .component('searchResult', searchResultComponent)
  .component('property', propertyComponent)

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
          template: '<search-result></search-result>',
        })
        .when('/property/place/:place_name/:page/:index', {
          template: '<property></property>',
        })
        .otherwise('/')
    }]);

_.each([
    nestoriaApiService,
    searchStorageService,
    wordsFilter
  ],
  (def) => def(app));