import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'tr',
	store: Ember.inject.service(),
	actions: {
		submit(){
			console.log('click');
	          var store = this.get('store');
			var name = Ember.$('#name');
			var sku = Ember.$('#sku');
			var price = Ember.$('#price');
			var quantity = Ember.$('#quantity');			
			var tax = Ember.$('#tax');
			var barcode = Ember.$('#barcode');
			var storeId = this.get('storeId');
        	var new_product = store.createRecord('product', {
              name: name.val(),
              price: price.val(),
              quantity: quantity.val(),
              barcode: barcode.val(),
              sku: sku.val(),
              storeid: storeId,
              tax: tax.val()
            	}
          	);
          	new_product.save();
		}
	}
});
