import Ember from 'ember';

export default Ember.Route.extend({
	setupController() {
	    this._super(...arguments);
	   	this.controllerFor('business.portal.store.products').set('activeModel', "add");
	  },
});
