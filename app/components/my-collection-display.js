import Ember from 'ember';

export default Ember.Component.extend({
  showAsTable: false,
  cardSearch: "",
  cardSet: "",
  cardClass: "All",
  filteredCards: Ember.computed('join', 'cardSearch', 'cardSet', 'cardClass', function() {
    var userId = this.get('session').content.uid;
    var count;
    var userCards = this.get('cards').filter(function(card) {
      var included = false;
      card.get('card_users').forEach(function(cardUser){
        if(cardUser.get('user').get('id') === userId) {
          count = cardUser.get('count');
          cardUser.get('card').set('count', count);
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
    var result2 = [];
    var self = this;
    if(this.get('cardSet') !== "") {
      result.forEach(function(card) {
        if(card.get('cardSet') === self.get('cardSet')) {
          result2.push(card);
        }
      })
    } else {
      result2 = result;
    }

    var result3 = [];
    if(this.get('cardClass') !== "All") {
      result2.forEach(function(card) {
        if(card.get('playerClass') === self.get('cardClass')) {
          result3.push(card);
        }
      })
    } else {
      result3 = result2;
    }
    return result3;
  }),
  actions: {
    addCard(card, user, count) {
      this.sendAction('addCard', card, user, count);
    },
    toggleDisplay() {
      if(this.get('showAsTable')) {
        this.set('showAsTable', false);
      } else {
        this.set('showAsTable', true);
      }
    },
    setCardSet(str) {
      this.set('cardSet', str);
    },
    setCardClass(str2) {
      this.set('cardClass', str2);
    }
  }
});
