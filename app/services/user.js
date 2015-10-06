import Ember from 'ember';

export default Ember.Service.extend({
  sessionId: this.get("session").content.uid,
  user: this.store.findRecord('user', sessionId),
});
