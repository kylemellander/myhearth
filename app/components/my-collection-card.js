import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['collection-card'],
  click: function(e) {
    if (e.which === 1) {
      var card = this.get('joinItem').get('card');
      var user = this.get('session').get('user');
      var join = this.get('join');
      var count = 1;
      this.sendAction('addCard', card, user, join, count);
    }
  },
  mouseDown: function(e) {
    if (e.which === 3) {
      var card = this.get('joinItem').get('card');
      var user = this.get('session').get('user');
      var join = this.get('join');
      var count = -1;
      this.sendAction('addCard', card, user, join, count);
    }
  },
});
