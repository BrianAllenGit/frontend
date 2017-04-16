import Ember from 'ember';

export default Ember.Route.extend({
	activeModel: "",
	model(params, transition){    
			console.log(params);
			var store_id = transition.params["business.portal.store"].store_id;
			console.log(store_id);
			return Ember.RSVP.hash({
				receipt: this.store.query('receipt', {orderBy: 'storeid', equalTo: store_id }),
		     	store: this.store.findRecord('store', store_id)
			});

	},
	setupController(controller, model) {
	    this._super(...arguments);
	    Ember.set(controller, 'receipt', model.receipt);
	   	Ember.set(controller, 'store', model.store);

	  },
	actions: {
	  didInsertElement() {
	  	Ember.$("tr[colspan=3]").hide();
	    Ember.$("tr[colspan=3]").css("height", "500px");
	    Ember.$("tr[colspan=3]").css("overflow", "auto");
	    Ember.$("table").click(function(event) {
	        event.stopPropagation();
	        var $target = Ember.$(event.target);
	        if ($target.closest("tr").attr("colspan") > 1 ) {
	            $target.slideUp();
	        } else {
	            $target.closest("tr").next().slideToggle();
	        }                     
	    });
	  },
      didTransition() {
    	if (this.controller.get('activeModel') === this.activeModel){
      		this.controller.set('activeModel', "");
    	}
    	this.activeModel = this.controller.get('activeModel');
        return true; // Bubble the didTransition event
      }
    }
});
