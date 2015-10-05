import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var context = this;
    $.ajax({
      beforeSend: function(request) {
        request.setRequestHeader("X-Mashape-Key", 'J5KEJHfdbymsh8nfjXGgbwooeaaNp1hPQEdjsn363la5ffVLkn');
      },
      dataType: 'json',
      url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1&locale=enUS',
    }).then(function(response) {
      var newJson = {
        data: [],
      }
      for (var key in response) {
        if (response.hasOwnProperty(key)) {
          for (var prop in response[key]) {
            if (response[key].hasOwnProperty(prop)) {
              if (response[key][prop].type !== "Hero") {
                var newCard = {
                  id: response[key][prop].cardId,
                  type: "card",
                  attributes: {
                    name: response[key][prop].name,
                    cardSet: response[key][prop].cardSet,
                    rarity: response[key][prop].rarity,
                    cost: response[key][prop].cost,
                    playerClass: response[key][prop].playerClass,
                    img: response[key][prop].img
                  },
                  relationships: {}
                };
                newJson.data.push(newCard);
              }
            }
          }
        }
      }
      context.store.push(newJson);
    });
    return context.store.findAll('card');
  },
});
