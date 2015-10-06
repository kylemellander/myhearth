import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['add-cards'],
  click: function(e) {
    if (e.which === 1) {
      var card = this.get('card');
      var user = this.get('session').get('user');
      var join = this.get('join');
      var count = 1;
      this.sendAction('addCard', card, user, join, count);
    }
  },
  mouseDown: function(e) {
    if (e.which === 3) {
      var card = this.get('card');
      var user = this.get('session').get('user');
      var join = this.get('join');
      var count = -1;
      this.sendAction('addCard', card, user, join, count);
    }
  },
  mouseMove: function(e) {
    this.$('.hover-image img').stop(1,1).show();
    this.$('.hover-image img').offset({
      top: e.pageY - this.$('.hover-image img').outerHeight(),
      left: e.pageX - (this.$('.hover-image img').outerWidth()/2)
    });
  },
  mouseLeave: function() {
    this.$('.hover-image img').hide();
  }
});
