import Ember from 'ember';

export default Ember.Component.extend({
  showAsTable: false,
  // searchParam: "name",
  // searchTerm: "Backstab",
  // filteredCards: Ember.computed('searchParam', 'searchTerm', function() {
  //   var self = this;
  //   if(this.get('searchParam') === "") {
  //     return this.get('join');
  //   } else {
  //     return this.get('join').filter(function(cardUser) {
  //       if(cardUser.get('card').content.get(self.get('searchParam')) === self.get('searchTerm')) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  // }),
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
