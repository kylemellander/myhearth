import Ember from 'ember';

export default Ember.Component.extend({
  cardSet: "Classic",
  filteredCards: Ember.computed('cardSet', function() {
    return this.get('cards').filterBy('cardSet', this.get('cardSet'));
  }),
  actions: {
    setSet(str) {
      this.set('cardSet', str);
    },
    addCard(card, user, count) {
      this.sendAction('addCard', card, user, count);
    }
  }
});
