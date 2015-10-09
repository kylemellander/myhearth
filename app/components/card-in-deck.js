import Ember from 'ember';

export default Ember.Component.extend({
  youHave: Ember.computed('carddeck', function() {
    var self = this;
    var card = this.get('cards').filter(function(card) {return card.get('id') === self.get('carddeck').get('card').get('id')})[0];
    var cardusers = this.get('session').get('user').get('card_users');
    var carduser = cardusers.get('content').filter(function(cardUser) {
      return cardUser.get('card').get('id') === card.get('id');
    });
    if (carduser[0] === undefined) {
      return 0;
    } else {
      return carduser[0].get('count');
    }
  }),
  enough: Ember.computed('carddeck', 'youHave', 'cards', function(){
    return this.get('youHave') >= this.get('carddeck').get('count');
  }),
  actions: {
    test(card) {
      debugger;
    }
  }
});
