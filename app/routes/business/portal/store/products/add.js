import Ember from 'ember';

export default Ember.Route.extend({
	storeId: "",
	model(params, transition){    
		var store_id = transition.params["business.portal.store"].store_id;
		this.storeId=store_id;
	},
	setupController(controller) {
	    this._super(...arguments);
	   	//Ember.set(controller, 'storeId', this.storeId);
	   		    this.controllerFor('business.portal.store.products').set('activeModel', "add");

	  },
});
