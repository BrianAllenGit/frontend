import Ember from 'ember';

export default Ember.Route.extend({
	activeModel: "",
	model(){    
		return Ember.RSVP.hash({
	      user: this.store.findRecord('user',this.get('session.currentUser.uid')),
	      receipt: this.store.query('receipt', {orderBy: 'userid', equalTo: this.get('session.currentUser.uid') })
	    });
	},
	 setupController(controller, model) {
	    this._super(...arguments);
	    Ember.set(controller, 'user', model.user);
	    Ember.set(controller, 'receipt', model.receipt);

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
