import Ember from 'ember';

export default Ember.Component.extend({
  rarity: "Free",
  filteredCards: Ember.computed('rarity', function() {
    return this.get('cards').filterBy('rarity', this.get('rarity'));
  }),
  actions: {
    setRarity(str) {
      this.set('rarity', str);
    },
    addCard(card, user, count) {
      this.sendAction('addCard', card, user, count);
    }
  }
});
