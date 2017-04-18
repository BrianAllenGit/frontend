import Ember from 'ember';
 import Firebase from 'firebase';


export default Ember.Controller.extend({
	isGoogleLogin : false,
	restrictions : { country: "US" }, 

	init(){
			var user = Firebase.auth().currentUser;
			if (user.providerData.get(0).providerId.includes("google")){
				this.isGoogleLogin = true;
			}
	},
		actions : {
		saveInfo (){
			var user = this.get('model');
			var email = Ember.$('#email');
			var firstname = Ember.$('#firstname');
			var lastname = Ember.$('#lastname');
			var phone = Ember.$('#phone');
			var address = Ember.$('.address-box');
			var nameRegex = /[A-Za-z]+$/i;
			var phoneRegex = /\([2-9][0-9]{2}\) [0-9]{3}-[0-9]{4}/i;
			// var password = Ember.$('#password');
			// var confirmpassword = Ember.$('#confirmpassword');

			if (user.get('email') !== email.val() && email.val().length !== 0){
				this.store.findRecord('user',this.get('session.currentUser.uid')).then(function(user){
					var emailBackup = user.get("email");
					user.set("email", email.val());
					user.save().then(function(response) {
						console.log(response);
						Ember.$(".successful-save").show().delay(1000).fadeOut();

					},function(response) {
						console.log(response.error);
						alert("Error updating email. Rejected!");
					    user.set("email", emailBackup);
					});					    
				});	
			}
			if (user.get('firstname') !== firstname.val() && firstname.val().length !== 0){
				if (nameRegex.test(firstname.val())){
					this.store.findRecord('user',this.get('session.currentUser.uid')).then(function(user){
						user.set("firstname", firstname.val());
						user.save();
						Ember.$(".successful-save").show().delay(1000).fadeOut();

					});	
				}
			}
			if (user.get('lastname') !== lastname.val() && lastname.val().length !== 0){
				if (nameRegex.test(firstname.val())){
					this.store.findRecord('user',this.get('session.currentUser.uid')).then(function(user){
						user.set("lastname", lastname.val());
						user.save();		
						Ember.$(".successful-save").show().delay(1000).fadeOut();
					});	
				}
			}
			if (user.get('phone') !== phone.val() && phone.val().length !== 0){
				if (phoneRegex.test(phone.val())){
					this.store.findRecord('user',this.get('session.currentUser.uid')).then(function(user){
						user.set("phone", phone.val());
						user.save();
						Ember.$(".successful-save").show().delay(1000).fadeOut();					    
					});	
				}
			}
			if (user.get('address') !== address.val() && address.val().length !== 0){
				this.store.findRecord('user',this.get('session.currentUser.uid')).then(function(user){
					var addressBackup = user.get("address");
					user.set("address", address.val());
					user.save().then(function(response) {
						console.log(response);
						Ember.$(".successful-save").show().delay(1000).fadeOut();
					},function(response) {
						console.log(response.error);
						alert("Error updating address. Rejected!");
					    user.set("address", addressBackup);
					});						    
				});	
			}
		},
		placeChanged: function(place){
	      this.set('placeJSON', JSON.stringify(place, undefined, 2));
	      if (place.adr_address) {
	        let regexp = /(<span(?: \w+="[^"]+")*(?: \w+="[^"]+")*>([^<]*)<\/span>)/g,
	            fullAddress = place.adr_address.replace(regexp, "$2");
	        this.set('cleanFullAddress', fullAddress);
	      }
	      this.set('fullAddress', place.adr_address);

	    },
	    done: function(){
	    }
	}
});
