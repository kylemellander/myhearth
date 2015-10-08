import Ember from 'ember';

export function count(params/*, hash*/) {
  if(params[0]===undefined) {
    return 1;
  } else {
    return params[0];
  }
}

export default Ember.Helper.helper(count);
