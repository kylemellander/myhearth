import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr(),
  email: DS.attr(),
  uid: DS.attr(),
  card_users: DS.hasMany('carduser', {async: true})
});
