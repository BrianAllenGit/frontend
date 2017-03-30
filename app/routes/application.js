import Ember from 'ember';


export default Ember.Route.extend({
	beforeModel() {
    return this.get('session').fetch().catch(() => {    });
  },  
  actions: {
    accessDenied() {
      this.transitionTo('login');
    }
  }
});
