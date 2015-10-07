import Ember from 'ember';

export default Ember.Component.extend({
  beforeModel(deck) {
    return Ember.RSVP.hash({
      cards: this.store.findAll('card'),
      deck: deck
    });
  },
  model(deck) {
    debugger;
    if(deck.get('carddecks').get('length') === 0) {
      var yql = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect" +
      "%20WHERE%20url%3D'http%3A%2F%2Fwww.hearthpwn.com" +
      deckStorage[key].get('url').replace("http://www.hearthpwn.com/decks/", "%2Fdecks%2F") +
      "'%20AND%20css%3D'table.listing-cards-tabular%20tbody%20tr'" +
      "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      var remoteDeck = $.ajax({
        dataType: 'json',
        url: yql,
        async: false
      });
      var tr = remoteDeck.responseJSON.query.results.results.tr;
      for(var k in tr) {
        if(tr.hasOwnProperty(k)) {
          var cardName = tr[k].td[0].b.a.content.replace("&#27;", "'");
          var card = this.store.findAll('card').then( function(cards) {
            var filteredCards = cards.filterBy('name', cardName);
            debugger;
          });
        }
      }
    }
  },

});
