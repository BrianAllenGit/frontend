import Ember from 'ember';

export default Ember.Component.extend({
	activeModel: "",
	didInsertElement: function () {
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
	model(params, transition){    
			console.log(params);
			var store_id = transition.params["business.portal.store"].store_id;
			console.log(store_id);
			return Ember.RSVP.hash({
				receipt: this.store.query('receipt', {orderBy: 'storeid', equalTo: store_id }),
		     	store: this.store.findRecord('store', store_id),
		     	receiptdetails: this.store.query('receiptdetails', {orderBy: 'receiptid', equalTo: params.receipt_id})
			});

	},
	setupController(controller, model) {
	    this._super(...arguments);
	    Ember.set(controller, 'receipt', model.receipt);
	   	Ember.set(controller, 'store', model.store);
	  },
	actions: {
		pressed: function() {
		  //this.$("#test").fadeOut("slow");
		  alert("hi!");
		  return Ember.RSVP.hash({
	 	      receipt: this.store.query('receipt', {orderBy: 'receiptid', equalTo: params.receipt_id} ).then(function(items) {
		      	return items.get('firstObject');
		      }),
	  	      receiptdetails: this.store.query('receiptdetails', {orderBy: 'receiptid', equalTo: params.receipt_id})
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
