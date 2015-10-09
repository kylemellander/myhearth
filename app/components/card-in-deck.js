import Ember from 'ember';

export default Ember.Component.extend({
  youHave: Ember.computed('carddeck', function() {
    var self = this;
    var card = this.get('cards').filter(function(card) {return card.get('id') === self.get('carddeck').get('card').get('id')})[0];
    var cardusers = this.get('session').get('user').get('card_users');
    var carduser = cardusers.get('content').filter(function(cardUser) {
      return cardUser.get('card').get('id') === card.get('id');
    });
    return carduser[0].get('count');
  }),
  actions: {
    test(card) {
      debugger;
    }
  }
});
