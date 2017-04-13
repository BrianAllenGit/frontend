import Ember from 'ember';

export default Ember.Route.extend({
	model(){    
		return this.store.query('store', {orderBy: 'owner', equalTo: this.get('session.currentUser.uid')} );
	}
});
