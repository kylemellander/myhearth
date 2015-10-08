import Ember from 'ember';

export function setCardCount(params/*, hash*/) {
  var cardUsers = params[0].get('content').user.get('card_users');
  var counts = cardUsers.getEach('count');
  var sum = counts.reduce(add, 0);
  function add(a, b) {
      return a + b;
  }
  return sum;
}

export default Ember.Helper.helper(setCardCount);
