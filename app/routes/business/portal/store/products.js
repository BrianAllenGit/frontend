import Ember from 'ember';

export default Ember.Route.extend({
	activeModel: "",
	loaded: "0",
	productList: "",
	storeId: "",
	referenceId: 10,
	beforeModel(){
		console.log('beforemodel');
	},
	model(params, transition){   
			this.get('store').unloadAll('product');
			var store_id = transition.params["business.portal.store"].store_id;
			this.storeId=store_id;
			 return this.get('firebaseUtil').query('product', this.get('referenceId'), "products/", {orderBy: 'storeid', equalTo: store_id, limitToFirst: 25 });

			 // this.store.query('product', {orderBy: 'storeid', equalTo: store_id, limitToLast: 25 }).then((product) => { 
			 // 	this.controller.set('product', product); 
			 // });

			 //return this.store.findRecord('store', store_id);//.then((store) => { this.controller.set('store', store); });
			// return Ember.RSVP.hash({
			// 	receipt: this.store.query('product', {orderBy: 'storeid', equalTo: store_id, limitToLast: 50 }),

			// 	// this.store.findRecord('businessuser', this.get('session.currentUser.uid')).then(
			//  //      	function(snapshot){
			//  //      		return currentRoute.store.query('receipt', {orderBy: 'storeid', equalTo: snapshot.get('storeid') });
			//  //      		// .then(
			//  //      		// 	function(snapshot){
			//  //      		// 		return snapshot;
			//  //      		// 	},
			//  //      		// 	function(error){
			//  //      		// 		console.log(error);
			//  //      		// 	});
			//  //     	},
			//  //     	//On error
			//  //     	function(error){
			//  //     		console.log(error);
		 //  //    	}),
		 //     	 store: this.store.findRecord('store', store_id)
			// });

	},
	setupController(controller,model) {
		this._super(...arguments);
		  Ember.set(controller, 'storeId', this.storeId);

	  },
	  actions: {
    didTransition() {
    	if (this.controller.get('activeModel') === this.activeModel){
      		this.controller.set('activeModel', "");
    	}
    	this.activeModel = this.controller.get('activeModel');
      return true; // Bubble the didTransition event
    },
    loadMore(){
    	this.get('firebaseUtil').next(this.get('referenceId'), 25);

    	// this.store.query('product', {orderBy: 'storeid', equalTo: store_id, limitToLast: 25 }).then((product) => { 
    	// 	this.get('productList').pushObjects(product);
    	// 	this.controller.set('product', productList); 
    	// });

    }
  }
});
