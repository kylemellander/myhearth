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
      top: e.pageY + 20,
      left: e.pageX + 10
    });
  },
  mouseLeave: function() {
    this.$('.hover-image img').hide();
  }
});

// To Be Worked in
// $(document).ready(function() {
//     $('.hover-text').mousemove(function(e) {
//         $img = $("#" + $(this).data('image-id'))
//         $img.stop(1, 1).show();
//         $img.offset({
//             top: e.pageY + 20,
//             left: e.pageX + 10
//         });
//     }).mouseleave(function() {
//         $img = $("#" + $(this).data('image-id'))
//         $img.hide();
//     });
// });

// <img id="cursor" src="http://i.imgur.com/6BfvqZd.jpg" class="mouse-hovered">
// <span class="hover-text" data-image-id="cursor">hover me</a>
// img.mouse-hovered {
//     display:none;
//     position: absolute;
// }
