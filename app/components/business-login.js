import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['login-form'],
	router: Ember.inject.service('-routing'), 
    actions: {
    signIn(provider) {
      let controller = this;
      this.get('session').open('firebase', {
        provider: provider,
        email: this.get('email') || '',
        password: this.get('password') || '',
      }).then(() => {

        controller.get('router').transitionTo('business.portal');
      }, (error) => {
        alert(error);
      });
    },
    googleSignIn(){
      let controller=this;
            this.get('session').open('firebase', { provider: 'google'}).then(function(data) {
              data = null;
            controller.transitionToRoute('portal');
            }, (error) => {
        alert(error);
      });
    }
  } 
});
