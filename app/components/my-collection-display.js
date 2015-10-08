import Ember from 'ember';

export default Ember.Component.extend({
  showAsTable: false,
  cardSearch: "",
  filteredCards: Ember.computed('join', 'cardSearch', function() {
    var userId = this.get('session').content.uid;
    var userCards = this.get('cards').filter(function(card) {
      var included = false;
      card.get('card_users').forEach(function(cardUser){
        if(cardUser.get('user').get('id') === userId) {
          included = true;
        }
      });
      return included;
    });
    var result = [];
    var search = this.get('cardSearch').toLowerCase();
    userCards.forEach(function(card) {
      if(card.get('name').toLowerCase().indexOf(search) > -1) {
        result.push(card);
      }
    })
    return result;
    // .filter(function(card) {
    //   card.get('name').indexOf('F') > -1;
    // })
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
