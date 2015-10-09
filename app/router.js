import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('edit-collection');
  this.route('scrap');
  this.route('view-decks', {});
  this.route('deck', {path: '/deck/:deck_id'});
  this.route('view-deck', {path: '/view-deck/:deck_id'});
});

export default Router;
