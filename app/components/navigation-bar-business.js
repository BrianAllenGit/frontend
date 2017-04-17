import Ember from 'ember';

export default Ember.Component.extend({
  router: Ember.inject.service('-routing'), 
  didInsertElement: function(){

  	var hamburgerIcon = Ember.$("#hamburger");
  	var mobileNavigationLinks = Ember.$("#nav-mobile-links");
  	mobileNavigationLinks.hide();
  	hamburgerIcon.click(function(){
  		mobileNavigationLinks.slideToggle();
  	});
  },
  actions: {
   signOut() {
    	this.get('session').close();
 		this.get('router').transitionTo('index');  
 	}	
  }
});



