import Ember from 'ember';

export default Ember.Component.extend({
  showAsTable: false,
  filteredCards: Ember.computed(function() {
    return this.get('cards'); 
  }),
  actions: {
    addCard(card, user, join, count) {
      this.sendAction('addCard', card, user, join, count);
    },
    toggleDisplay() {
      if(this.get('showAsTable')) {
        this.set('showAsTable', false);
      } else {
        this.set('showAsTable', true);
      }
    }
  }
});
