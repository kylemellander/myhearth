import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.get('session').get('content').user;
    return Ember.RSVP.hash({
      cards: this.store.findAll('card'),
      user: user
    });
  },
  actions: {
    addCard(card, user, join, count) {
      var found = false;
      var newCardUser;
      var self = this;
      this.store.findAll('carduser').then(function(join) {
        join.forEach(function(joinItem) {
          if(joinItem.get('card').get('id') === card.id) {
            newCardUser = joinItem;
            var newCount = newCardUser.get('count') + count;
            if(newCount <= 2) {
              newCardUser.set('count', newCount);
            }
            found = true;
          }
        });
        if (found === false) {
          var cardUserParams = {card: card, user: user, count: count};
          newCardUser = self.store.createRecord('carduser', cardUserParams);
        }
        if (newCardUser.get('count') < 3 && newCardUser.get('count') > 0) {
          newCardUser.save().then(function() {
            card.get('card_users').addObject(newCardUser);
            user.get('card_users').addObject(newCardUser);
            card.save().then(function() {
              user.save();
            });
          });
        } else {
          newCardUser.destroyRecord();
        }
      });
    }
  }
});
