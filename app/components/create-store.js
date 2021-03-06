import Ember from 'ember';

export default Ember.Component.extend({
	restrictions : { country: "US" }, 
	  router: Ember.inject.service('-routing'), 
	  store: Ember.inject.service(),

		actions : {
		createStore (){
			var controller = this;
			var name = Ember.$('#name');
			var phone = Ember.$('#phone');
			var tax = Ember.$('#tax');
			var address = Ember.$('.address-box');
			var nameRegex = /[A-Za-z]+$/i;
			var phoneRegex = /\([2-9][0-9]{2}\) [0-9]{3}-[0-9]{4}/i;
			var taxRegex = /0\.[0-9]{2}/i;
			//console.log(phone.val());

			if (address.val().length === 0){
				document.getElementById('address').setCustomValidity("Enter an address");
            	return;
			}

          //Ensure firstName address is formatted properly
          if (!nameRegex.test(name.val())){
            document.getElementById('name').setCustomValidity("Please only user alphabetic characters");
            return;
          }

          //Ensure phone is formatted properly
          if (!phoneRegex.test(phone.val())){
            document.getElementById('phone').setCustomValidity("Please format phone number like so (###) ###-####");
            return;
          }

          if (!taxRegex.test(tax.val())){
          	document.getElementById('tax').setCustomValidity("Please format tax 0.##");
          	return;
		}

          var new_store = this.get('store').createRecord('store', {
          	address: address.val(),
          	name: name.val(),
          	phone: phone.val(),
          	owner: this.get('session.currentUser.uid'),
          	tax: tax.val()

          });
          new_store.save().then(function(){
      		controller.get('router').transitionTo('business.portal');  
          });
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
	      	console.log("done");
	    }
	}
});
