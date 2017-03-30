import Ember from 'ember';

export default Ember.Controller.extend({  
		 firebaseApp: Ember.inject.service(),

	actions: {
	   signOut() {

            let auth = this.get('firebaseApp').auth();
            auth.signOut().then(() => {
                return this.get('session').close();
            }).then(() => {
                // Clear the ember data store
                let recordTypes = ['user'];
		        let store = this.get('store');
		        recordTypes.forEach(recordType => {
		            let records = store.peekAll(recordType);
		            records.forEach(record => {
		                store.unloadRecord(record);
		            });
		        });
        	});
         	this.transitionToRoute('index');
	 	}	
	  }
});