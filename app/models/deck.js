import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  url: DS.attr(),
  class: DS.attr(),
  carddecks: DS.hasMany('carddeck', {async:true}),
  created: DS.attr()
});
