import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function () {
		var img = Ember.$("#output");

  		img.click(function(){    
		    if (img.width() < 500)
		    {
		        img.animate({width: "500px", height: "500px"}, 1000);
		    }
		    else 
		    {
		        img.animate({width: "200px", height: "200px"}, 1000);
		    }
    	});
	}
});
