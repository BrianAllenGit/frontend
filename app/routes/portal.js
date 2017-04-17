import Ember from 'ember';

export default Ember.Route.extend({
	  	model(){    
	  		 var currentRoute = this;

		 	return this.store.findRecord('user',this.get('session.currentUser.uid')).then(
		 		function(snapshot){
		 			return snapshot;
		 		},
		 		function(error){
		 			if (error.message.includes("no record")){
		     			currentRoute.transitionTo("business.portal");
		     		}
		 		});
		 }

});
