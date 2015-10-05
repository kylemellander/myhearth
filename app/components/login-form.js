import Ember from 'ember';

export default Ember.Component.extend({
  signUp: false,
  actions: {
    showSignUp() {
      this.set('signUp', true)
    },
    hideSignUp() {
      this.set('signUp', false)
    },
    addUser() {
      var params = {
        username: this.get('username'),
        email: this.get('email'),
        password: this.get('password')
      };
      this.set('signUp', false);
      this.sendAction('addUser', params);
    },
    login() {
      var params = {
        email: this.get('email'),
        password: this.get('password')
      };
      var context = this;
      this.sendAction('login', params, context);
    }
  }
});
