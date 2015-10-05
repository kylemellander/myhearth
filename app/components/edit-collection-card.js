import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    user: Ember.inject.service('user'),
    addCard(card, user) {
      var cards = user.cards;
    }
  }
});
