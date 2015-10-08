import Ember from 'ember';

export default Ember.Component.extend({
  showAsTable: false,
  cardSearch: "",
  userCards: Ember.computed('join', function() {
    var userId = this.get('session').id;
    return this.get('cards').filter(function(card) {
      var included = false;
      card.get('card_users').forEach(function(cardUser){
        if(cardUser.get('user').id === userId) {
          included = true;
        }
      });
      return included;
      // return card.get('name') === "Backstab";
    });
  }),
  filteredCards: Ember.computed('userCards', 'cardSearch', function() {
    var result = [];
    var search = this.get('cardSearch').toLowerCase();
    this.get('userCards').forEach(function(card) {
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
