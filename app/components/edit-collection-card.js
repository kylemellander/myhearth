import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    user: Ember.inject.service('user'),
    addCard(user, join) {
      var card = this.get('card');
      this.sendAction('addCard', card, user, join);
    }
  }
});
