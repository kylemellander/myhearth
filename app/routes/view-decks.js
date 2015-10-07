import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    var jsonDecks = $.ajax({
      async: false,
      dataType: 'json',
      url: "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect%20WHERE%20url%3D'http%3A%2F%2Fwww.hearthpwn.com%2Fdecks'%20AND%20css%3D'table.listing-decks%20tbody%20tr'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    });
    var decks = jsonDecks.responseJSON.query.results.results.tr;

    for(var key in decks) {
      if(decks.hasOwnProperty(key)) {
        var partialUrl = decks[key].td[0].div.span.a.href;
        var id = partialUrl.replace("/decks/", "").split("-")[0];
        var deck = false;
        var deckId = context.store.findRecord('deck', id).then(function(d) {
          return d;
        });
        debugger;
        if(deck.id !== id){
          var url = "http://www.hearthpwn.com" + partialUrl;
          debugger;
          var params = {
            name: decks[key].td[0].div.span.a.content,
            url: url,
            class: decks[key].td[3].content,
            id: id,
            created: new Date(),
            card_decks: []
          };
          var yql = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect" +
          "%20WHERE%20url%3D'http%3A%2F%2Fwww.hearthpwn.com" +
          partialUrl.replace("/decks/", "%2Fdecks%2F") +
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
                return cards.filterBy('name', cardName);
              });
              debugger;
              link.relationships.cards.data.push({"type": "cards", "id": card.get('id')});
            }
          }
          var newDeck = context.store.createRecord('deck', params);
          newDeck.save();
        }
      }
    }
  },
  model() {
    return this.store.findAll('deck');
  },
  actions: {
    test(model) {
      debugger;
    }
  }
});
