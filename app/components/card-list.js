import Ember from 'ember';

export default Ember.Component.extend({
  sortedCardsOrder: ['cost', 'type:desc', 'name'],
  sortedCards: Ember.computed.sort('cards', 'sortedCardsOrder'),
  allCards: true,
  classCards: false,
  rarityCards: false,
  setCards: false,
  costCards: false,
  actions: {
    showDropdown: function() {
      $('.dropdown-toggle').dropdown();
    },
    addCard(card, user, count) {
      this.sendAction('addCard', card, user, count);
    },
    all() {
      this.set('allCards', true);
      this.set('classCards', false);
    },
    class() {
      this.set('allCards', false);
      this.set('classCards', true);
    },
    rarity() {
      this.set('allCards', false);
      this.set('classCards', false);
      this.set('rarityCards', true);
    },
    set() {
      this.set('allCards', false);
      this.set('classCards', false);
      this.set('rarityCards', false);
      this.set('setCards', true);
    },
    cost() {
      this.set('allCards', false);
      this.set('classCards', false);
      this.set('rarityCards', false);
      this.set('setCards', false);
      this.set('costCards', true);
    },
    selectOption() {
      $(".dropdown-menu li a").click(function(){
        debugger;
        $(this).parents('.dropdown').find('.dropdown-menu li a').text($(this).text());
        $(this).parents(".dropdown").find('.dropdown-menu li a').val($(this).text());
      });
    }
  }
});
