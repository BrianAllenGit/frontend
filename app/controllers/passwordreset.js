import Ember from 'ember';

export default Ember.Controller.extend({
	 firebaseApp: Ember.inject.service(),
		actions: {
			resetPassword(){
				var email = this.get('email') || '';
				const auth = this.get('firebaseApp').auth();
				auth.sendPasswordResetEmail(email).then(function() {
					Ember.$('.error').hide();
					Ember.$('.success').show();
				  // Email sent.
				}, function(error) {
					if (error.code === "auth/user-not-found"){
						Ember.$('.success').hide();
						Ember.$('.error').show();
					}
				});		
			}
	}
});
