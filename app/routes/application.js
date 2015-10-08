import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },
  model() {
    var sessionId = this.get("session").content.uid;
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', sessionId),
      cards: this.store.findAll('card'),
      decks: this.store.findAll('deck'),
      carddecks: this.store.findAll('carddeck')
    });
  },
  afterModel(model) {
    return this.get('session').get('content').user = model.user;
  },
  actions: {
    signIn: function(provider) {
      this.get("session").open("firebase", { provider: provider}).then(function(data) {
        console.log(data.currentUser);
      });
    },

    signOut: function() {
      this.get("session").close();
    }
  }
});
