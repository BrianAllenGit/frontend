import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function(){
		var scrollMe = Ember.$(".receipt-content");
		var that = this;
		var userScrolled = false;

		scrollMe.scroll(function() {
			if ($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight) {
				userScrolled = true;
		  	}   
		});

		setInterval(function() {
		  if (userScrolled) {
			that.sendAction("loadMore");
		    userScrolled = false;
		  }
		}, 50);
	}
});
