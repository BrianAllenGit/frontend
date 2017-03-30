import Ember from 'ember';



export default Ember.Controller.extend({  
  firebaseApp: Ember.inject.service(),
  restrictions : { country: "US" }, 

  actions: {
      signUp() {
      	  let controller = this;
          const auth = this.get('firebaseApp').auth();

          var email = Ember.$('#email');
          var firstName =  Ember.$('#firstName');
          var lastName = Ember.$('#lastName');
          var phone =  Ember.$('#phone');
          //var address =  Ember.$('.address-box');
          var password =  Ember.$('#password');
          var confirm_password =  Ember.$('#passwordConfirm');
          var nameRegex = /[A-Za-z]+$/i;
          var phoneRegex = /\([2-9][0-9]{2}\) [0-9]{3}-[0-9]{4}/i;
          var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

          //Ensure password and passwordConfirm the same value
          if (password.val() !== confirm_password.val()) {
            document.getElementById('passwordConfirm').setCustomValidity("Passwords Don't Match");
            return;
          }

          //Ensure email address is formatted properly
          if (!emailRegex.test(email.val())){
            document.getElementById('email').setCustomValidity("Please format email properly");
            return;
          }

          //Ensure firstName address is formatted properly
          if (!nameRegex.test(firstName.val())){
            document.getElementById('firstName').setCustomValidity("Please only user alphabetic characters");
            return;
          }

          //Ensure lastName address is formatted properly
          if (!nameRegex.test(lastName.val())){
            document.getElementById('lastName').setCustomValidity("Please only user alphabetic characters");
            return;
          }

          //Ensure phone is formatted properly
          if (!phoneRegex.test(phone.val())){
            document.getElementById('phone').setCustomValidity("Please format phone number like so (###) ###-####");
            return;
          }

          auth.createUserWithEmailAndPassword(
            this.get('email'), 
            this.get('password')).then((userResponse) => {

              var new_user = this.store.createRecord('user', {
                  id: userResponse.uid,
                  address: this.get('address'),
                  email: this.get('email'),
                  firstname: this.get('firstName'),
                  lastname: this.get('lastName'),
                  phone: this.get('phone'),
                  profileimage: "https://firebasestorage.googleapis.com/v0/b/Scannly-3e9e2.appspot.com/o/default%2Fdefault.jpg?alt=media&token=cd9ce031-e068-4eca-a2be-7eb0c9aba2ce",
                  timestamp: new Date().getTime()
                }
              );

              new_user.save().then(
                //On Success
                function(){
                  controller.get('session').open('firebase', {
                    provider: 'password',
                    email: controller.get('email') || '',
                    password: controller.get('password') || '',
                  }).then(() => {
                    controller.transitionToRoute('portal');
                  }, (error) => {
                    alert(error);
                  });
                
                }, 
                //On Failure
                function(response){
                  console.log(response);
                });
        });
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
        console.log("done");
      }
  }
});