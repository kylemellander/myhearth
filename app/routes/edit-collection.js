import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var user = this.get('session').get('content').user;
    return Ember.RSVP.hash({
      cards: this.store.findAll('card'),
      user: user,
      cardusers: this.get('cardusers'),
      session: this.get('session')
    });
  },
  actions: {
    addCard(card, user, count) {
      var newCardUser;
      var found = false;
      user.get('card_users').forEach(function(userJoin) {
        card.get('card_users').forEach(function(cardJoin) {
          if(userJoin === cardJoin) {
            newCardUser = userJoin;
            var newCount = newCardUser.get('count') + count;
            if(card.get('rarity') === "Legendary" && newCount > 1) {} else if(newCount <= 2) {
              newCardUser.set('count', newCount);
            }
            found = true;
          }
        });
      });
      if (found === false) {
        var cardUserParams = {card: card, user: user, count: count};
        newCardUser = this.store.createRecord('carduser', cardUserParams);
      }
      if (newCardUser.get('count') < 3 && newCardUser.get('count') > 0) {
        newCardUser.save().then(function() {
          user.get('card_users').addObject(newCardUser);
          user.save().then(function() {
            card.get('card_users').addObject(newCardUser);
            card.save();
          })
        });
      } else {
        card.get('card_users').removeObject(newCardUser);
        card.save().then(function() {
          user.get('card_users').removeObject(newCardUser);
          user.save();
        }).then(function() {
          newCardUser.destroyRecord();
        });
      }
    }
  }
});
