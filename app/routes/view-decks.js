import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(data) {
    var user = data.resolvedModels.application.user
    this.store.set('user', user);
    var cardusers = data.resolvedModels.application.cardusers.filter(function(carduser) {
      return carduser.get('user').get('id') === user.id;
    });
    var carddecks = data.resolvedModels.application.carddecks;
    this.set('carddecks', carddecks);
    var decks = data.resolvedModels.application.decks;
    this.set('decks', decks);
    var cards = data.resolvedModels.application.cards;
    this.set('cards', cards);
    var context = this;
    var jsonDecks = $.ajax({
      async: false,
      dataType: 'json',
      url: "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect%20WHERE%20url%3D'http%3A%2F%2Fwww.hearthpwn.com%2Fdecks'%20AND%20css%3D'table.listing-decks%20tbody%20tr'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
    });
    var remoteDecks = jsonDecks.responseJSON.query.results.results.tr;
    remoteDecks.forEach(function(deck) {
      var partialUrl = deck.td[0].div.span.a.href;
      var id = partialUrl.replace("/decks/", "").split("-")[0];
      if(decks.filter(function(deck){return deck.id === id}).length === 0) {
        var url = "http://www.hearthpwn.com" + partialUrl;
        var params = {
          name: deck.td[0].div.span.a.content,
          url: url,
          class: deck.td[3].content,
          id: id,
          created: new Date()
        }
        var newDeck = context.store.createRecord('deck', params);
        newDeck.save();
      };
    });
  },
  model() {
    var sessionId = this.get("session").content.uid;
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', sessionId),
      cards: this.store.findAll('card'),
      decks: this.store.findAll('deck'),
      carddecks: this.store.findAll('carddeck'),
      cardusers: this.store.findAll('carduser')
    });
  },
  afterModel(hash) {
    var context = this;
    hash.decks.forEach(function(deck) {
      if(deck.get('carddecks').get('length') === 0) {
        var yql = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect" +
        "%20WHERE%20url%3D'http%3A%2F%2Fwww.hearthpwn.com" +
        deck.get('url').replace("http://www.hearthpwn.com/decks/", "%2Fdecks%2F") +
        "'%20AND%20css%3D'table.listing-cards-tabular%20tbody%20tr'" +
        "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        $.ajax({
          dataType: 'json',
          url: yql,
        }).then(function(remoteDeck) {
          var tr = remoteDeck.query.results.results.tr;
          for(var k in tr) {
            if(tr.hasOwnProperty(k)) {
              var count = tr[k].td[0].content.replace(/[ ↵×]/gi, '');
              var cardName = tr[k].td[0].b.a.content.replace("&#27;", "'");
              var card = hash.cards.findBy('name', cardName);
              var cardDeckParams = {card: card, deck: deck, count: count};
              var newCardDeck = context.store.createRecord('carddeck', cardDeckParams);
              newCardDeck.save().then(function() {
                deck.get('carddecks').addObject(newCardDeck);
                deck.save().then(function() {
                  card.get('carddecks').addObject(newCardDeck);
                  card.save();
                });
              });
            }
          }
        });
      }
    });
  },
  actions: {
    test(model) {
      debugger;
    }
  }
});
