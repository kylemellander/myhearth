import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['collection-card'],
  click: function() {
    var card = this.get('card');
    var user = this.get('session').get('user');
    var count = 1;
    this.sendAction('addCard', card, user, count);
  },
  contextMenu: function() {
    var card = this.get('card');
    var user = this.get('session').get('user');
    var count = -1;
    this.sendAction('addCard', card, user, count);
    return false;
  },
});
