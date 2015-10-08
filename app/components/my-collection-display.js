import Ember from 'ember';

export default Ember.Component.extend({
  showAsTable: false,
  searchParam: "",
  searchTerm: "",
  filteredCards: Ember.computed('searchParam', 'searchTerm', function() {
    if(this.get('searchParam') === "") {
      return this.get('join')
    } else {
      return this.get('join').filter(function(cardUser) {
        if(cardUser.get('card').content.get(this.get('searchParam')) === this.get('searchTerm')) {
          return true;
        } else {
          return false;
        }
      });
    }
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
    },
    test() {
      debugger;
    }
  }
});
