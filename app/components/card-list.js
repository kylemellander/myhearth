import Ember from 'ember';

export default Ember.Component.extend({
  sortedCardsOrder: ['cost'],
  sortedCards: Ember.computed.sort('cards', 'sortedCardsOrder'),
  allCards: true,
  classCards:false,
  actions: {
    addCard(card, user, join, count) {
      this.sendAction('addCard', card, user, join, count);
    },
    all() {
      this.set('allCards', true);
      this.set('classCards', false);
    },
    class() {
      this.set('allCards', false);
      this.set('classCards', true);
    }
  }
});
