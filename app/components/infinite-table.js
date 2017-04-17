import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		var scrollMe = Ember.$(".business-portal-contents");
		var that = this;
		var userScrolled = false;

		scrollMe.scroll(function() {
			if (scrollMe.scrollTop() + scrollMe.innerHeight()>=scrollMe[0].scrollHeight) {
				userScrolled = true;
		  	}   
		});

		setInterval(function() {
		  if (userScrolled) {
			that.sendAction("loadMore");
		    userScrolled = false;
		  }
		}, 50);
	},
	willDestroyElement() {
		console.log('called');
		var scrollMe = Ember.$(".receipt-content");
		scrollMe.unbind('scroll');
	},
	actions: {
		updateInfo(){
			console.log('balls');
		}
	}
});
