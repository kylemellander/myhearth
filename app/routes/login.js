import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    addUser(params) {
      var ref = new Firebase("https://my-hearth.firebaseio.com");
      var context = this;
      ref.createUser({
        email    : params.email,
        password : params.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          ref.child("users").child(userData.uid).set({
            username: params.username,
            email: params.email,
            uid: userData.uid,
            cards: []
          });
        }
      });
      this.transitionTo('login');
    },
    login(params, context) {
      var ref = new Firebase("https://my-hearth.firebaseio.com");
      ref.authWithPassword({
        email    : params.email,
        password : params.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          window.location.reload();
        }
      });
    }
  }
});
