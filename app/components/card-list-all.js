import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addCard(card, user, count) {
      this.sendAction('addCard', card, user, count);
    }
  }
});
