import Ember from 'ember';

export default Ember.Component.extend({
  class: "",
  filteredCards: Ember.computed('class', function() {
    return this.get('cards').filterBy('playerClass', this.get('class'));
  }),
  actions: {
    setClass(str) {
      this.set('class', str);
    },
    addCard(card, user, join, count) {
      this.sendAction('addCard', card, user, join, count);
    }
  }
});
