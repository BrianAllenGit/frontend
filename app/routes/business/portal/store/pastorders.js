import Ember from 'ember';

export default Ember.Route.extend({
		activeModel: "",
		storeId: "",

	model(params, transition){    
			let currentRoute = this;
			console.log(params);
			var store_id = transition.params["business.portal.store"].store_id;
			return Ember.RSVP.hash({
				receipt: this.store.findRecord('businessuser', this.get('session.currentUser.uid')).then(
			      	function(snapshot){
			      		return currentRoute.store.query('receipt', {orderBy: 'storeid', equalTo: snapshot.get('storeid') });
			      		// .then(
			      		// 	function(snapshot){
			      		// 		return snapshot;
			      		// 	},
			      		// 	function(error){
			      		// 		console.log(error);
			      		// 	});
			     	},
			     	//On error
			     	function(error){
		     	}),
		     	 store: this.store.findRecord('store', store_id)
			});

	},
	setupController(controller, model) {
	    this._super(...arguments);
	    Ember.set(controller, 'receipt', model.receipt);
	   	Ember.set(controller, 'store', model.store);

	  },
	  actions: {
    didTransition() {
    	if (this.controller.get('activeModel') === this.activeModel){
      		this.controller.set('activeModel', "");
    	}
    	this.activeModel = this.controller.get('activeModel');
      return true; // Bubble the didTransition event
    }
  }
});
