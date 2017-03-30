import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function () {
		var img = Ember.$("#dashboard-toggle");

  		img.click(function(){    
		    Ember.$('.sidebar').animate({width: 'toggle'});
    	});
	}
});
