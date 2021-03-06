import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
		var scrollMe = Ember.$(".business-portal-contents-no");
		var that = this;
		var userScrolled = false;

		scrollMe.scroll(function() {
			if (scrollMe.scrollTop() + scrollMe.innerHeight() +1 >=scrollMe[0].scrollHeight) {
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
		var scrollMe = Ember.$(".business-portal-content-no");
		scrollMe.unbind('scroll');
	}
});
