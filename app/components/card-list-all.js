import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addCard(card, user, join, count) {
      this.sendAction('addCard', card, user, join, count);
    }
  }
});
