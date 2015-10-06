import Ember from 'ember';

export default Ember.Component.extend({
  sortedCardsOrder: ['cost'],
  sortedCards: Ember.computed.sort('cards', 'sortedCardsOrder'),
  allCards: true,
  classCards: false,
  rarityCards: false,
  setCards: false,
  actions: {
    addCard(card, user, join, count) {
      this.sendAction('addCard', card, user, join, count);
    },
    all() {
      this.set('allCards', true);
    },
    class() {
      this.set('allCards', false);
      this.set('classCards', true);
    },
    rarity() {
      this.set('allCards', false);
      this.set('classCards', false);
      this.set('rarityCards', true);
    },
    set() {
      this.set('allCards', false);
      this.set('classCards', false);
      this.set('rarityCards', false);
      this.set('setCards', true);
    }
  }
});
