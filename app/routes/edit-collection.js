import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      cards: this.store.findAll('card'),
      join: this.store.find('carduser', {user: this.get('session').get('user')})
    });
  },
  actions: {
    addCard(card, user, join) {
      var found = false;
      var newCardUser;
      join.forEach(function(joinItem) {
        if(joinItem.get('card').get('id') === card.id) {
          newCardUser = joinItem;
          var newCount = newCardUser.get('count') + 1;
          newCardUser.set('count', newCount);
          found = true;
        }
      });
      if (found === false) {
        var cardUserParams = {card: card, user: user, count: 1};
        newCardUser = this.store.createRecord('carduser', cardUserParams);
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
    }
  }
});
