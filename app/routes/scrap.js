import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    scrape() {
      var context = this;
      $.ajax({
        beforeSend: function(request) {
          request.setRequestHeader("X-Mashape-Key", 'J5KEJHfdbymsh8nfjXGgbwooeaaNp1hPQEdjsn363la5ffVLkn');
        },
        dataType: 'json',
        url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1&locale=enUS',
      }).then(function(response) {
        var newData = [];
        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            for (var prop in response[key]) {
              if (response[key].hasOwnProperty(prop)) {
                if (response[key][prop].type !== "Hero") {
                  var params = {
                    id: response[key][prop].cardId,
                    name: response[key][prop].name,
                    cardSet: response[key][prop].cardSet,
                    rarity: response[key][prop].rarity,
                    cost: response[key][prop].cost,
                    playerClass: response[key][prop].playerClass || "",
                    img: response[key][prop].img
                  };
                  var newCard = context.store.createRecord('card', params);
                  newCard.save();
                }
              }
            }
          }
        };
      });
    }
  }
});
