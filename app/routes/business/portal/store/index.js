import Ember from 'ember';

export default Ember.Route.extend({
		actions : {
		saveInfo (model){

			var name = Ember.$('#name');
			var phone = Ember.$('#phone');
			var address = Ember.$('.address-box');
			var tax = Ember.$('#tax');
			var nameRegex = /[A-Za-z]+$/i;
			var phoneRegex = /\([2-9][0-9]{2}\) [0-9]{3}-[0-9]{4}/i;

			if (model.get('name') !== name.val() && name.val().length !== 0){
				if (nameRegex.test(name.val())){
					this.store.findRecord('store', model.id).then(function(store){
						store.set("name", name.val());
						store.save();
						Ember.$(".successful-save").show().delay(1000).fadeOut();

					});	
				}
			}
			if (model.get('tax') !== tax.val() && tax.val().length !== 0){
				//if (nameRegex.test(name.val())){
					this.store.findRecord('store', model.id).then(function(store){
						store.set("tax", tax.val());
						store.save();
						Ember.$(".successful-save").show().delay(1000).fadeOut();

					});	
				//}
			}
			if (model.get('phone') !== phone.val() && phone.val().length !== 0){
				if (phoneRegex.test(phone.val())){
					this.store.findRecord('store', model.id).then(function(store){
						store.set("phone", phone.val());
						store.save();
						Ember.$(".successful-save").show().delay(1000).fadeOut();					    
					});	
				}
			}
			if (model.get('address') !== address.val() && address.val().length !== 0){
					this.store.findRecord('store', model.id).then(function(store){
					var addressBackup = model.get("address");
					store.set("address", address.val());
					store.save().then(function(response) {
						console.log(response);
						Ember.$(".successful-save").show().delay(1000).fadeOut();
					},function(response) {
						console.log(response.error);
						alert("Error updating address. Rejected!");
					    store.set("address", addressBackup);
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
