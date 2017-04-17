import Ember from 'ember';

export default Ember.Component.extend({
	  router: Ember.inject.service('-routing'), 
	  	store: Ember.inject.service(),


	actions:{
		save(){
			console.log(this.get("activeModel.id"));
			var store = this.get('store');
			var name = Ember.$('#name');
			var sku = Ember.$('#sku');
			var price = Ember.$('#price');
			var quantity = Ember.$('#quantity');			
			var tax = Ember.$('#tax');
			var barcode = Ember.$('#barcode');
			var storeId = this.get('storeId');
			store.findRecord('product', this.get("activeModel.id")).then(function(product){
				product.set("name", name.val());
				product.set("sku", sku.val());
				product.set("price", price.val());
				product.set("quantity", quantity.val());
				product.set("tax", tax.val());
				product.set("barcode", barcode.val());
				product.set("storeId", storeId);
				product.save();
			});	
	 	 	this.get('router').transitionTo('business.portal.store.products');  

		},
		cancel(){
			this.get('router').transitionTo('business.portal.store.products');  

		}
	}
});
