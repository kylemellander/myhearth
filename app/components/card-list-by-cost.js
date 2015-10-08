import Ember from 'ember';

export default Ember.Component.extend({
  cost: 0,
  filteredCards: Ember.computed('cost', function() {
    if(this.get('cost') === 7) {
      return this.get('cards').filter(function(card) {
        if(card.get('cost') >= 7) {
          return true;
        }
      });
    } else {
      return this.get('cards').filterBy('cost', this.get('cost'));
    }
  }),
  actions: {
    setCost(str) {
      this.set('cost', str);
    },
    addCard(card, user, count) {
      this.sendAction('addCard', card, user, count);
    }
  }
});
