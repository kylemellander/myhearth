import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      deck: this.store.findRecord('deck', params.deck_id),
      cards: this.store.findAll('card')
    });
  },
  afterModel(hash) {
    if(hash.deck.get('carddecks').get('length') === 0) {
      var yql = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect" +
      "%20WHERE%20url%3D'http%3A%2F%2Fwww.hearthpwn.com" +
      hash.deck.get('url').replace("http://www.hearthpwn.com/decks/", "%2Fdecks%2F") +
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
          var count = tr[k].td[1].content;
          var cardName = tr[k].td[0].b.a.content.replace("&#27;", "'");
          var card = hash.cards.findBy('name', cardName);
          var cardDeckParams = {card: card, deck: hash.deck, count: count};
          var newCardDeck = this.store.createRecord('carddeck', cardDeckParams);
          newCardDeck.save().then(function() {
            hash.deck.get('carddecks').addObject(newCardDeck);
            card.get('carddecks').addObject(newCardDeck);
            hash.deck.save().then(function() {
              card.save();
            });
          });
        }
      }
    }
  },
  actions: {
    test(model) {
      debugger;
    }
  }
});
