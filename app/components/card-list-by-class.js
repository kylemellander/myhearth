import Ember from 'ember';

export default Ember.Component.extend({
  classSort: "",
  filteredCards: Ember.computed('classSort', function() {
    return this.get('cards').filterBy('playerClass', this.get('classSort'));
  }),
  actions: {
    setClass(str) {
      this.set('classSort', str);
    },
    addCard(card, user, count) {
      this.sendAction('addCard', card, user, count);
    }
  }
});
