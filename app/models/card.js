import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  cardSet: DS.attr(),
  rarity: DS.attr(),
  cost: DS.attr('number'),
  playerClass: DS.attr(),
  img: DS.attr(),
});
