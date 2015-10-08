import Ember from 'ember';

var percentage = function(number,total) {
  return Math.round(number/total*10000)/100;
};
var totalUniqueCalc = function(join, searchParam, searchValue) {
  var sum = 0;
  join.forEach(function(joinItem) {
    if (joinItem.get('card').get(searchParam) === searchValue) {
      sum += joinItem.get('count');
    }
  });
  return sum;
}

export default Ember.Component.extend({
  totalPlayable: Ember.computed('join', 'cards', 'filteredCards', 'cardusers', function() {
    var counts = this.get('join').getEach('count');
    var sum = counts.reduce(add, 0);
    function add(a, b) { return a + b; }
    return sum;
  }),
  totalPlayablePercentage: Ember.computed('totalPlayable', function() {
    return percentage(this.get('totalPlayable'), 1123);
  }),
  totalUnique: Ember.computed('join', function() {
    return this.get('join').get('length');
  }),
  totalUniquePercentage: Ember.computed('totalUnique', 'cards', function() {
    return percentage(this.get('totalUnique'), 605);
  }),
  totalBasic: Ember.computed('join', 'cards', function() {
    return totalUniqueCalc(this.get('join'), "rarity", "Free");
  }),
  totalBasicPercentage: Ember.computed('totalBasic', function() {
    return percentage(this.get('totalBasic'), 266);
  }),
  totalCommon: Ember.computed('join', function() {
    return totalUniqueCalc(this.get('join'), "rarity", "Common");
  }),
  totalCommonPercentage: Ember.computed('totalCommon', function() {
    return percentage(this.get('totalCommon'), 425);
  }),
  totalRare: Ember.computed('join', function() {
    return totalUniqueCalc(this.get('join'), "rarity", "Rare");
  }),
  totalRarePercentage: Ember.computed('totalRare', function() {
    return percentage(this.get('totalRare'), 338);
  }),
  totalEpic: Ember.computed('join', function() {
    return totalUniqueCalc(this.get('join'), "rarity", "Epic");
  }),
  totalEpicPercentage: Ember.computed('totalEpic', function() {
    return percentage(this.get('totalEpic'), 186);
  }),
  totalLegendary: Ember.computed('join', function() {
    return totalUniqueCalc(this.get('join'), "rarity", "Legendary");
  }),
  totalLegendaryPercentage: Ember.computed('totalLegendary', function() {
    return percentage(this.get('totalLegendary'), 87);
  }),
});
