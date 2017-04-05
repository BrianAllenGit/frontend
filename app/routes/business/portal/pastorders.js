import Ember from 'ember';

export default Ember.Route.extend({
		activeModel: "",
	model(){    
			let currentRoute = this;
	      	return this.store.findRecord('businessuser', this.get('session.currentUser.uid')).then(
	      	function(snapshot){
	      		console.log(snapshot.get('email'));
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
	     	}); 
	},
});
