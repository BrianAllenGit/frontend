import Ember from 'ember';

export default Ember.Component.extend({
	model(params){
		return Ember.RSVP.hash({
 	      receipt: this.store.query('receipt', {orderBy: 'receiptid', equalTo: params.receipt_id} ).then(function(items) {
	      	return items.get('firstObject');
	      }),
  	      receiptdetails: this.store.query('receiptdetails', {orderBy: 'receiptid', equalTo: params.receipt_id})
  	    });
	},
	setupController(controller, model) {
	    this._super(...arguments);
	    Ember.set(controller, 'receipt', model.receipt);
	    Ember.set(controller, 'receiptdetails', model.receiptdetails);
	    //this.controllerFor('business.portal.store.pastorders').set('activeModel', model);
	 }
});
