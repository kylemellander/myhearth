import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['add-cards'],
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
  mouseMove: function(e) {
    this.$('.img-container').append('<img src="'+this.get('card').get('img')+'">')
    this.$('.hover-image img').stop(1,1).fadeIn();
    this.$('.hover-image img').offset({
      top: e.pageY + 10,
      left: e.pageX + 10
    });
  },
  mouseLeave: function() {
    this.$('.img-container').empty();
  }
});
