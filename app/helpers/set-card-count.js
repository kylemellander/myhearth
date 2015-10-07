import Ember from 'ember';

export function setCardCount(params/*, hash*/) {
  var cardUsers = params[0].get('content').user.get('card_users');
  var cardCount = 0;
  for(var key in cardUsers) {
    if(cardUsers.hasOwnProperty(key)) {
      cardCount += cardUsers[key].get('count');
      debugger;
    }
  }
  debugger;
  return cardCount;
}

export default Ember.Helper.helper(setCardCount);
