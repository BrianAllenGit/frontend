"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('frontend/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _emberfireAdaptersFirebase) {
  exports['default'] = _emberfireAdaptersFirebase['default'].extend({});
});
define('frontend/app', ['exports', 'ember', 'frontend/resolver', 'ember-load-initializers', 'frontend/config/environment'], function (exports, _ember, _frontendResolver, _emberLoadInitializers, _frontendConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _frontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _frontendConfigEnvironment['default'].podModulePrefix,
    Resolver: _frontendResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _frontendConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('frontend/components/active-link', ['exports', 'ember-cli-active-link-wrapper/components/active-link'], function (exports, _emberCliActiveLinkWrapperComponentsActiveLink) {
  exports['default'] = _emberCliActiveLinkWrapperComponentsActiveLink['default'];
});
define('frontend/components/business-login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    router: _ember['default'].inject.service('-routing'),
    actions: {
      signIn: function signIn(provider) {
        var controller = this;
        this.get('session').open('firebase', {
          provider: provider,
          email: this.get('email') || '',
          password: this.get('password') || ''
        }).then(function () {
          controller.set('email', null);
          controller.set('password', null);
          controller.get('router').transitionTo('business.portal');
        }, function (error) {
          alert(error);
        });
      },
      googleSignIn: function googleSignIn() {
        var controller = this;
        this.get('session').open('firebase', { provider: 'google' }).then(function (data) {
          data = null;
          controller.transitionToRoute('portal');
        }, function (error) {
          alert(error);
        });
      }
    }
  });
});
define('frontend/components/dashboard-toggle', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		didInsertElement: function didInsertElement() {
			var img = _ember['default'].$("#dashboard-toggle");

			img.click(function () {
				_ember['default'].$('.sidebar').animate({ width: 'toggle' });
			});
		}
	});
});
define('frontend/components/input-mask', ['exports', 'ember-cli-mask/components/input-mask'], function (exports, _emberCliMaskComponentsInputMask) {
  exports['default'] = _emberCliMaskComponentsInputMask['default'];
});
define('frontend/components/navigation-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    router: _ember['default'].inject.service('-routing'),
    didInsertElement: function didInsertElement() {

      var hamburgerIcon = _ember['default'].$("#hamburger");
      var mobileNavigationLinks = _ember['default'].$("#nav-mobile-links");
      mobileNavigationLinks.hide();
      hamburgerIcon.click(function () {
        mobileNavigationLinks.slideToggle();
      });
    },
    actions: {
      signOut: function signOut() {
        this.get('session').close();
        this.get('router').transitionTo('index');
      }
    }
  });
});
define('frontend/components/place-autocomplete-field', ['exports', 'ember-place-autocomplete/components/place-autocomplete-field'], function (exports, _emberPlaceAutocompleteComponentsPlaceAutocompleteField) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPlaceAutocompleteComponentsPlaceAutocompleteField['default'];
    }
  });
});
define("frontend/components/profile-picture", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Component.extend({
		didInsertElement: function didInsertElement() {
			var img = _ember["default"].$("#output");

			img.click(function () {
				if (img.width() < 500) {
					img.animate({ width: "500px", height: "500px" }, 1000);
				} else {
					img.animate({ width: "200px", height: "200px" }, 1000);
				}
			});
		}
	});
});
define('frontend/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiComponentsToriiIframePlaceholder) {
  exports['default'] = _toriiComponentsToriiIframePlaceholder['default'];
});
define('frontend/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('frontend/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      signIn: function signIn(provider) {
        var controller = this;
        this.get('session').open('firebase', {
          provider: provider,
          email: this.get('email') || '',
          password: this.get('password') || ''
        }).then(function () {
          controller.set('email', null);
          controller.set('password', null);
          controller.transitionToRoute('portal');
        }, function (error) {
          alert(error);
        });
      },
      googleSignIn: function googleSignIn() {
        var controller = this;
        this.get('session').open('firebase', { provider: 'google' }).then(function (data) {
          data = null;
          controller.transitionToRoute('portal');
        }, function (error) {
          alert(error);
        });
      }
    }
  });
});
define('frontend/controllers/passwordreset', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		firebaseApp: _ember['default'].inject.service(),
		actions: {
			resetPassword: function resetPassword() {
				var email = this.get('email') || '';
				var auth = this.get('firebaseApp').auth();
				auth.sendPasswordResetEmail(email).then(function () {
					_ember['default'].$('.error').hide();
					_ember['default'].$('.success').show();
					// Email sent.
				}, function (error) {
					if (error.code === "auth/user-not-found") {
						_ember['default'].$('.success').hide();
						_ember['default'].$('.error').show();
					}
				});
			}
		}
	});
});
define('frontend/controllers/portal', ['exports', 'ember'], function (exports, _ember) {
				exports['default'] = _ember['default'].Controller.extend({
								firebaseApp: _ember['default'].inject.service(),

								actions: {
												signOut: function signOut() {
																var _this = this;

																var auth = this.get('firebaseApp').auth();
																auth.signOut().then(function () {
																				return _this.get('session').close();
																}).then(function () {
																				// Clear the ember data store
																				var recordTypes = ['user'];
																				var store = _this.get('store');
																				recordTypes.forEach(function (recordType) {
																								var records = store.peekAll(recordType);
																								records.forEach(function (record) {
																												store.unloadRecord(record);
																								});
																				});
																});
																this.transitionToRoute('index');
												}
								}
				});
});
define('frontend/controllers/portal/about', ['exports', 'ember', 'firebase'], function (exports, _ember, _firebase) {
	exports['default'] = _ember['default'].Controller.extend({
		isGoogleLogin: false,
		restrictions: { country: "US" },

		init: function init() {
			var user = _firebase['default'].auth().currentUser;
			console.log(user.providerData.get(0).providerId);
			if (user.providerData.get(0).providerId.includes("google")) {
				this.isGoogleLogin = true;
			}
		},
		actions: {
			saveInfo: function saveInfo() {
				var user = this.get('model');
				var email = _ember['default'].$('#email');
				var firstname = _ember['default'].$('#firstname');
				var lastname = _ember['default'].$('#lastname');
				var phone = _ember['default'].$('#phone');
				var address = _ember['default'].$('.address-box');
				var nameRegex = /[A-Za-z]+$/i;
				var phoneRegex = /\([2-9][0-9]{2}\) [0-9]{3}-[0-9]{4}/i;
				// var password = Ember.$('#password');
				// var confirmpassword = Ember.$('#confirmpassword');

				if (user.get('email') !== email.val() && email.val().length !== 0) {
					this.store.findRecord('user', this.get('session.currentUser.uid')).then(function (user) {
						var emailBackup = user.get("email");
						user.set("email", email.val());
						user.save().then(function (response) {
							console.log(response);
							_ember['default'].$(".successful-save").show().delay(1000).fadeOut();
						}, function (response) {
							console.log(response.error);
							alert("Error updating email. Rejected!");
							user.set("email", emailBackup);
						});
					});
				}
				if (user.get('firstname') !== firstname.val() && firstname.val().length !== 0) {
					if (nameRegex.test(firstname.val())) {
						this.store.findRecord('user', this.get('session.currentUser.uid')).then(function (user) {
							user.set("firstname", firstname.val());
							user.save();
							_ember['default'].$(".successful-save").show().delay(1000).fadeOut();
						});
					}
				}
				if (user.get('lastname') !== lastname.val() && lastname.val().length !== 0) {
					if (nameRegex.test(firstname.val())) {
						this.store.findRecord('user', this.get('session.currentUser.uid')).then(function (user) {
							user.set("lastname", lastname.val());
							user.save();
							_ember['default'].$(".successful-save").show().delay(1000).fadeOut();
						});
					}
				}
				if (user.get('phone') !== phone.val() && phone.val().length !== 0) {
					if (phoneRegex.test(phone.val())) {
						this.store.findRecord('user', this.get('session.currentUser.uid')).then(function (user) {
							user.set("phone", phone.val());
							user.save();
							_ember['default'].$(".successful-save").show().delay(1000).fadeOut();
						});
					}
				}
				if (user.get('address') !== address.val() && address.val().length !== 0) {
					this.store.findRecord('user', this.get('session.currentUser.uid')).then(function (user) {
						var addressBackup = user.get("address");
						user.set("address", address.val());
						user.save().then(function (response) {
							console.log(response);
							_ember['default'].$(".successful-save").show().delay(1000).fadeOut();
						}, function (response) {
							console.log(response.error);
							alert("Error updating address. Rejected!");
							user.set("address", addressBackup);
						});
					});
				}
			},
			placeChanged: function placeChanged(place) {
				this.set('placeJSON', JSON.stringify(place, undefined, 2));
				if (place.adr_address) {
					var regexp = /(<span(?: \w+="[^"]+")*(?: \w+="[^"]+")*>([^<]*)<\/span>)/g,
					    fullAddress = place.adr_address.replace(regexp, "$2");
					this.set('cleanFullAddress', fullAddress);
				}
				this.set('fullAddress', place.adr_address);
			},
			done: function done() {
				console.log("done");
			}
		}
	});
});
define('frontend/controllers/portal/index', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {
			signOut: function signOut() {
				this.get('session').close();
				this.get('router').transitionTo('index');
			}
		}
	});
});
define('frontend/controllers/portal/pastorders', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {}

	});
});
define('frontend/controllers/portal/pastorders/show', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('frontend/controllers/portal/receipts', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    //  sortProperties: ['receiptid'],
    //  sortAscending: true,
    //  arrangedContent: Ember.computed('model', 'sortProperties', 'sortAscending', function(){
    //    return this.get('model').toArray().sort((a, b)=>{
    //      let sortProperty = this.get('sortProperties')[0];
    //      if(this.get('sortAscending')){
    //        return Ember.compare(a.get(sortProperty), b.get(sortProperty));
    //      } else {
    //        return Ember.compare(b.get(sortProperty), a.get(sortProperty));
    //      }
    //    });
    //  }),
    // actions:{
    // 	sortBy: function(property) {
    //      this.set('sortProperties', [property]);
    //        }
    // }
  });
});
define('frontend/controllers/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    firebaseApp: _ember['default'].inject.service(),
    restrictions: { country: "US" },

    actions: {
      signUp: function signUp() {
        var _this = this;

        var controller = this;
        var auth = this.get('firebaseApp').auth();

        var email = _ember['default'].$('#email');
        var firstName = _ember['default'].$('#firstName');
        var lastName = _ember['default'].$('#lastName');
        var phone = _ember['default'].$('#phone');
        //var address =  Ember.$('.address-box');
        var password = _ember['default'].$('#password');
        var confirm_password = _ember['default'].$('#passwordConfirm');
        var nameRegex = /[A-Za-z]+$/i;
        var phoneRegex = /\([2-9][0-9]{2}\) [0-9]{3}-[0-9]{4}/i;
        var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        //Ensure password and passwordConfirm the same value
        if (password.val() !== confirm_password.val()) {
          document.getElementById('passwordConfirm').setCustomValidity("Passwords Don't Match");
          return;
        }

        //Ensure email address is formatted properly
        if (!emailRegex.test(email.val())) {
          document.getElementById('email').setCustomValidity("Please format email properly");
          return;
        }

        //Ensure firstName address is formatted properly
        if (!nameRegex.test(firstName.val())) {
          document.getElementById('firstName').setCustomValidity("Please only user alphabetic characters");
          return;
        }

        //Ensure lastName address is formatted properly
        if (!nameRegex.test(lastName.val())) {
          document.getElementById('lastName').setCustomValidity("Please only user alphabetic characters");
          return;
        }

        //Ensure phone is formatted properly
        if (!phoneRegex.test(phone.val())) {
          document.getElementById('phone').setCustomValidity("Please format phone number like so (###) ###-####");
          return;
        }

        auth.createUserWithEmailAndPassword(this.get('email'), this.get('password')).then(function (userResponse) {

          var new_user = _this.store.createRecord('user', {
            id: userResponse.uid,
            address: _this.get('address'),
            email: _this.get('email'),
            firstname: _this.get('firstName'),
            lastname: _this.get('lastName'),
            phone: _this.get('phone'),
            profileimage: "https://firebasestorage.googleapis.com/v0/b/Scannly-3e9e2.appspot.com/o/default%2Fdefault.jpg?alt=media&token=cd9ce031-e068-4eca-a2be-7eb0c9aba2ce",
            timestamp: new Date().getTime()
          });

          new_user.save().then(
          //On Success
          function () {
            controller.get('session').open('firebase', {
              provider: 'password',
              email: controller.get('email') || '',
              password: controller.get('password') || ''
            }).then(function () {
              controller.transitionToRoute('portal');
            }, function (error) {
              alert(error);
            });
          },
          //On Failure
          function (response) {
            console.log(response);
          });
        });
      },
      placeChanged: function placeChanged(place) {
        this.set('placeJSON', JSON.stringify(place, undefined, 2));
        if (place.adr_address) {
          var regexp = /(<span(?: \w+="[^"]+")*(?: \w+="[^"]+")*>([^<]*)<\/span>)/g,
              fullAddress = place.adr_address.replace(regexp, "$2");
          this.set('cleanFullAddress', fullAddress);
        }
        this.set('fullAddress', place.adr_address);
      },
      done: function done() {
        console.log("done");
      }
    }
  });
});
define('frontend/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/app-version', ['exports', 'ember', 'frontend/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _frontendConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _frontendConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('frontend/helpers/check-receiptid', ['exports', 'ember'], function (exports, _ember) {
  exports.checkReceiptid = checkReceiptid;

  function checkReceiptid(params /*, hash*/) {
    return params;
  }

  exports['default'] = _ember['default'].Helper.helper(checkReceiptid);
});
define('frontend/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define("frontend/helpers/format-epoch", ["exports", "ember"], function (exports, _ember) {
	exports.formatEpoch = formatEpoch;

	function formatEpoch(params /*, hash*/) {
		var d = new Date(+params);
		var date = "" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
		return date;
	}

	exports["default"] = _ember["default"].Helper.helper(formatEpoch);
});
define('frontend/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _emberTruthHelpersHelpersIsEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual['default'];
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual.isEqual;
    }
  });
});
define('frontend/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('frontend/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('frontend/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('frontend/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'frontend/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _frontendConfigEnvironment) {
  var _config$APP = _frontendConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('frontend/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('frontend/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('frontend/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfireInitializersEmberfire) {
  exports['default'] = _emberfireInitializersEmberfire['default'];
});
define('frontend/initializers/export-application-global', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_frontendConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _frontendConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_frontendConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('frontend/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, _toriiRedirectHandler) {
  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      application.deferReadiness();
      _toriiRedirectHandler['default'].handle(window)['catch'](function () {
        application.advanceReadiness();
      });
    }
  };
});
define('frontend/initializers/initialize-torii-session', ['exports', 'torii/bootstrap/session', 'torii/configuration'], function (exports, _toriiBootstrapSession, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      if (!configuration.sessionServiceName) {
        return;
      }

      (0, _toriiBootstrapSession['default'])(application, configuration.sessionServiceName);

      var sessionFactoryName = 'service:' + configuration.sessionServiceName;
      application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
    }
  };
});
define('frontend/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'frontend/config/environment'], function (exports, _toriiBootstrapTorii, _toriiConfiguration, _frontendConfigEnvironment) {

  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _toriiConfiguration.configure)(_frontendConfigEnvironment['default'].torii || {});
      (0, _toriiBootstrapTorii['default'])(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports['default'] = initializer;
});
define('frontend/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/register-google', ['exports', 'ember-place-autocomplete/initializers/register-google'], function (exports, _emberPlaceAutocompleteInitializersRegisterGoogle) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPlaceAutocompleteInitializersRegisterGoogle['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberPlaceAutocompleteInitializersRegisterGoogle.initialize;
    }
  });
});
define('frontend/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("frontend/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('frontend/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/router-dsl-ext'], function (exports, _toriiBootstrapRouting, _toriiConfiguration, _toriiRouterDslExt) {
  exports['default'] = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      var router = applicationInstance.get('router');
      var setupRoutes = function setupRoutes() {
        var authenticatedRoutes = router.router.authenticatedRoutes;
        var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
        if (hasAuthenticatedRoutes) {
          (0, _toriiBootstrapRouting['default'])(applicationInstance, authenticatedRoutes);
        }
        router.off('willTransition', setupRoutes);
      };
      router.on('willTransition', setupRoutes);
    }
  };
});
define('frontend/instance-initializers/walk-providers', ['exports', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _toriiLibContainerUtils, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-walk-providers',
    initialize: function initialize(applicationInstance) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in configuration.providers) {
        if (configuration.providers.hasOwnProperty(key)) {
          (0, _toriiLibContainerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
define('frontend/mixins/active-link', ['exports', 'ember-cli-active-link-wrapper/mixins/active-link'], function (exports, _emberCliActiveLinkWrapperMixinsActiveLink) {
  exports['default'] = _emberCliActiveLinkWrapperMixinsActiveLink['default'];
});
define('frontend/models/businessuser', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    firstname: _emberData['default'].attr('string'),
    lastname: _emberData['default'].attr('string'),
    storeid: _emberData['default'].attr('string'),
    uid: _emberData['default'].attr('string')
  });
});
define('frontend/models/receipt', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    receiptid: _emberData['default'].attr('string'),
    storeid: _emberData['default'].attr('string'),
    storename: _emberData['default'].attr('string'),
    timestamp: _emberData['default'].attr(),
    total: _emberData['default'].attr('number'),
    userid: _emberData['default'].attr('string')
  });
});
define('frontend/models/receiptdetails', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    productbarcode: _emberData['default'].attr('string'),
    productname: _emberData['default'].attr('string'),
    productprice: _emberData['default'].attr('number'),
    productquantity: _emberData['default'].attr('number'),
    receiptid: _emberData['default'].attr('string')
  });
});
define('frontend/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    address: _emberData['default'].attr('string'),
    email: _emberData['default'].attr('string'),
    firstname: _emberData['default'].attr('string'),
    lastname: _emberData['default'].attr('string'),
    phone: _emberData['default'].attr('string'),
    profileimage: _emberData['default'].attr('string'),
    timestamp: _emberData['default'].attr('number'),
    uid: _emberData['default'].attr('string')
  });
});
define('frontend/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('frontend/router', ['exports', 'ember', 'frontend/config/environment'], function (exports, _ember, _frontendConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _frontendConfigEnvironment['default'].locationType,
    rootURL: _frontendConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('login');
    this.route('sign-up');
    this.route('passwordreset');
    this.authenticatedRoute('portal', function () {
      this.authenticatedRoute('pastorders', function () {
        this.route('show', { path: '/:receipt_id' });
      });
      this.authenticatedRoute('about', function () {
        this.authenticatedRoute('edit');
      });
    });
    this.route('coming-soon');
    this.route('business', function () {
      this.route('login');
      this.route('sign-up');
      this.authenticatedRoute('portal', function () {
        this.authenticatedRoute('pastorders');
      });
    });
  });

  exports['default'] = Router;
});
define('frontend/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.get('session').fetch()['catch'](function () {});
    },
    actions: {
      accessDenied: function accessDenied() {
        this.transitionTo('login');
      }
    }
  });
});
define('frontend/routes/business', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('frontend/routes/business/index', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		beforeModel: function beforeModel() {
			this.transitionTo('business.portal.pastorders');
		}
	});
});
define('frontend/routes/business/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('frontend/routes/business/portal', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('frontend/routes/business/portal/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('frontend/routes/business/portal/pastorders', ['exports', 'ember'], function (exports, _ember) {
		exports['default'] = _ember['default'].Route.extend({
				activeModel: "",
				model: function model() {
						var currentRoute = this;
						return this.store.findRecord('businessuser', this.get('session.currentUser.uid')).then(function (snapshot) {
								console.log(snapshot.get('email'));
								return currentRoute.store.query('receipt', { orderBy: 'storeid', equalTo: snapshot.get('storeid') });
								// .then(
								// 	function(snapshot){
								// 		return snapshot;
								// 	},
								// 	function(error){
								// 		console.log(error);
								// 	});
						},
						//On error
						function (error) {});
				}
		});
});
define('frontend/routes/business/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('frontend/routes/coming-soon', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('frontend/routes/index', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({});
});
define('frontend/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {

      this.get('session').fetch()['catch'](function (error) {
        console.log(error);
      });

      if (this.get('session.isAuthenticated')) {
        this.transitionTo('portal');
      }
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
          check = true;
        }
      })(navigator.userAgent || navigator.vendor || window.opera);
      if (check) {
        this.transitionTo('index');
      }
    }
  });
});
define('frontend/routes/passwordreset', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (this.get('session.isAuthenticated')) {
        this.transitionTo('portal');
      }

      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
          check = true;
        }
      })(navigator.userAgent || navigator.vendor || window.opera);
      if (check) {
        this.transitionTo('index');
      }
    }
  });
});
define('frontend/routes/portal', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.store.findRecord('user', this.get('session.currentUser.uid'));
		}

	});
});
define('frontend/routes/portal/about', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.store.findRecord('user', this.get('session.currentUser.uid'));
		}
	});
});
define('frontend/routes/portal/index', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		beforeModel: function beforeModel() {
			this.transitionTo('portal.pastorders');
		}
	});
});
define('frontend/routes/portal/pastorders', ['exports', 'ember'], function (exports, _ember) {
		exports['default'] = _ember['default'].Route.extend({
				activeModel: "",
				model: function model() {
						return _ember['default'].RSVP.hash({
								user: this.store.findRecord('user', this.get('session.currentUser.uid')),
								receipt: this.store.query('receipt', { orderBy: 'userid', equalTo: this.get('session.currentUser.uid') })
						});
				},
				setupController: function setupController(controller, model) {
						this._super.apply(this, arguments);
						_ember['default'].set(controller, 'user', model.user);
						_ember['default'].set(controller, 'receipt', model.receipt);
				},
				actions: {
						didTransition: function didTransition() {
								if (this.controller.get('activeModel') === this.activeModel) {
										this.controller.set('activeModel', "");
								}
								this.activeModel = this.controller.get('activeModel');
								return true; // Bubble the didTransition event
						}
				}
		});
});
define('frontend/routes/portal/pastorders/show', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model(params) {
			return _ember['default'].RSVP.hash({
				receipt: this.store.query('receipt', { orderBy: 'receiptid', equalTo: params.receipt_id }).then(function (items) {
					return items.get('firstObject');
				}),
				receiptdetails: this.store.query('receiptdetails', { orderBy: 'receiptid', equalTo: params.receipt_id })
			});
		},
		setupController: function setupController(controller, model) {
			this._super.apply(this, arguments);
			_ember['default'].set(controller, 'receipt', model.receipt);
			_ember['default'].set(controller, 'receiptdetails', model.receiptdetails);
			this.controllerFor('portal.pastorders').set('activeModel', model);
		}
	});
});
define('frontend/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (this.get('session.isAuthenticated')) {
        this.transitionTo('portal');
      }

      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
          check = true;
        }
      })(navigator.userAgent || navigator.vendor || window.opera);
      if (check) {
        this.transitionTo('index');
      }
    }
  });
});
define('frontend/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('frontend/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _emberfireServicesFirebaseApp) {
  exports['default'] = _emberfireServicesFirebaseApp['default'];
});
define('frontend/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _emberfireServicesFirebase) {
  exports['default'] = _emberfireServicesFirebase['default'];
});
define('frontend/services/popup', ['exports', 'torii/services/popup'], function (exports, _toriiServicesPopup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesPopup['default'];
    }
  });
});
define('frontend/services/torii-session', ['exports', 'torii/services/session'], function (exports, _toriiServicesSession) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesSession['default'];
    }
  });
});
define('frontend/services/torii', ['exports', 'torii/services/torii'], function (exports, _toriiServicesTorii) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesTorii['default'];
    }
  });
});
define("frontend/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "23S6IOv4", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/application.hbs" } });
});
define("frontend/templates/business", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DdX3L19g", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/business.hbs" } });
});
define("frontend/templates/business/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ygcUQuet", "block": "{\"statements\":[[\"text\",\"\\t                        \"],[\"block\",[\"link-to\"],[\"business.login\"],null,0],[\"text\",\"           \\n\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"hero\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"hero-product-image\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"hero-product-descr\"],[\"flush-element\"],[\"text\",\"\\n\\t    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"hero-product-descr-text\"],[\"flush-element\"],[\"text\",\"\\n\\t        \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"\\n\\t        \\tNo more lines, forever.\\n\\t        \"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\tScannly is self-checkout through your phone. Free for customers and businesses alike. Check into your favorite retailer through the app, scan the items in your cart using your phone, and check out all in one place.\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://goo.gl/forms/N3aCtcfnSDwLJ5AM2\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"button-mobile-download\"],[\"static-attr\",\"src\",\"assets/images/download-android.png\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"subscribe\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"subscribe-container\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"mc_embed_signup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign Up for the Newsletter\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tBe informed about app updates and when Scannly will be available in stores near you!\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"action\",\"//scannly.us15.list-manage.com/subscribe/post?u=62635d5a3bf3273aeeea1ecfd&id=a738ffb70b\"],[\"static-attr\",\"method\",\"post\"],[\"static-attr\",\"id\",\"mc-embedded-subscribe-form\"],[\"static-attr\",\"name\",\"mc-embedded-subscribe-form\"],[\"static-attr\",\"class\",\"validate\"],[\"static-attr\",\"target\",\"_blank\"],[\"static-attr\",\"novalidate\",\"\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"email\"],[\"static-attr\",\"id\",\"mce-EMAIL\"],[\"static-attr\",\"name\",\"EMAIL\"],[\"static-attr\",\"value\",\"\"],[\"static-attr\",\"class\",\"input-gradient-round required email\"],[\"static-attr\",\"placeholder\",\"Email\"],[\"static-attr\",\"required\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"text\"],[\"static-attr\",\"id\",\"mce-NAME\"],[\"static-attr\",\"name\",\"NAME\"],[\"static-attr\",\"value\",\"\"],[\"static-attr\",\"class\",\"input-gradient-round required\"],[\"static-attr\",\"placeholder\",\"Name\"],[\"static-attr\",\"required\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"button-gradient-round button\"],[\"static-attr\",\"value\",\"Subscribe\"],[\"static-attr\",\"name\",\"subscribe\"],[\"static-attr\",\"id\",\"mc-embedded-subscribe\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"main-footer\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"login\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/business/index.hbs" } });
});
define("frontend/templates/business/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "g/LY2tIn", "block": "{\"statements\":[[\"append\",[\"helper\",[\"navigation-bar\"],null,[[\"session\"],[[\"get\",[\"session\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"login\"],[\"static-attr\",\"class\",\"slated-background\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-descr\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert alert-blue\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert-label\"],[\"flush-element\"],[\"text\",\"\\n                Business\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert-message\"],[\"flush-element\"],[\"text\",\"\\n                Scannly is free for business owners. Give your customers the best experience\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"id\",\"tagline\"],[\"flush-element\"],[\"text\",\"No more lines, forever.\"],[\"close-element\"],[\"text\",\"\\n        Never wait in another line. Scan the items in your cart\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        and check out with your phone\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"append\",[\"helper\",[\"business-login\"],null,[[\"session\"],[[\"get\",[\"session\"]]]]],false],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"main-footer\"]],false],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/business/login.hbs" } });
});
define("frontend/templates/business/portal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "LsQBssmN", "block": "{\"statements\":[[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"dashboard\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-top\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-button\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-hamburger\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"unknown\",[\"dashboard-toggle\"]],false],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-hamburger-title\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"hamburger-title\"],[\"flush-element\"],[\"text\",\"Dashboard\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-push\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-user\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-user-info\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"dashboard-hello\"],[\"flush-element\"],[\"text\",\"Hello\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"dashboard-uid\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"firstname\"]],false],[\"text\",\"!\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-user-picture\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"profileimage\"]],null],[\"static-attr\",\"height\",\"80px\"],[\"static-attr\",\"width\",\"80px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-container\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sidebar\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"dashboard-account\"],[\"flush-element\"],[\"text\",\"Account\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-links\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-dot-image\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"id\",\"dashboard-dots\"],[\"static-attr\",\"src\",\"/assets/images/dashboard-line.png\"],[\"static-attr\",\"width\",\"1px\"],[\"static-attr\",\"height\",\"76px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"sidebar-links\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"links\"],[\"flush-element\"],[\"text\",\"\\n                        \"],[\"block\",[\"link-to\"],[\"business.portal.pastorders\"],null,0],[\"text\",\"\\n                        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-content\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Past Orders\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/business/portal.hbs" } });
});
define("frontend/templates/business/portal/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "4EK59e9i", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/business/portal/index.hbs" } });
});
define("frontend/templates/business/portal/pastorders", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rEKtLMlF", "block": "{\"statements\":[[\"append\",[\"helper\",[\"log\"],[[\"get\",[\"model\"]]],null],false],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,6]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-expand\"],[\"flush-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"image-expand\"],[\"static-attr\",\"width\",\"10.5px\"],[\"static-attr\",\"height\",\"6px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"portal.pastorders.show\",[\"get\",[\"receipt\",\"receiptid\"]]],null,0]],\"locals\":[]},{\"statements\":[[\"text\",\"                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-expand\"],[\"flush-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"image-expand\"],[\"static-attr\",\"width\",\"10.5px\"],[\"static-attr\",\"height\",\"6px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"portal.pastorders\"],null,2]],\"locals\":[]},{\"statements\":[[\"text\",\"                                    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"item-list\"],[\"flush-element\"],[\"text\",\"\\n                                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-details-productname\"],[\"flush-element\"],[\"text\",\"\\n                                            \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"receiptdetails\",\"productname\"]],false],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-details-productquantity\"],[\"flush-element\"],[\"text\",\"\\n                                            \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"receiptdetails\",\"productquantity\"]],false],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-details-productprice\"],[\"flush-element\"],[\"text\",\"\\n                                            \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"$\"],[\"append\",[\"unknown\",[\"receiptdetails\",\"productprice\"]],false],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"close-element\"],[\"text\",\"\\n                                    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"receiptdetails\"]},{\"statements\":[[\"text\",\"                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-details-container\"],[\"flush-element\"],[\"text\",\" \\n                            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-detail-items\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"activeModel\",\"receiptdetails\"]]],null,4],[\"text\",\"                            \"],[\"close-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-detail-subtotal\"],[\"flush-element\"],[\"text\",\"\\n                                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-subtotal\"],[\"flush-element\"],[\"text\",\"\\n                                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-title\"],[\"flush-element\"],[\"text\",\"Subtotal\"],[\"close-element\"],[\"text\",\"\\n                                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-total-small\"],[\"flush-element\"],[\"text\",\"$1.50\"],[\"close-element\"],[\"text\",\"\\n                                \"],[\"close-element\"],[\"text\",\"\\n                                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-tax\"],[\"flush-element\"],[\"text\",\"\\n                                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-title\"],[\"flush-element\"],[\"text\",\"Tax\"],[\"close-element\"],[\"text\",\"\\n                                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-total-small\"],[\"flush-element\"],[\"text\",\"$.49\"],[\"close-element\"],[\"text\",\"\\n                                \"],[\"close-element\"],[\"text\",\"\\n                            \"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-info-container\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-store-price\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-store\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"store-name\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"receipt\",\"storename\"]],false],[\"close-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"store-address\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"receipt\",\"storeaddress\"]],false],[\"text\",\"helo\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-price\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-title\"],[\"flush-element\"],[\"text\",\"Order total\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-total\"],[\"flush-element\"],[\"text\",\"$ \"],[\"append\",[\"unknown\",[\"receipt\",\"total\"]],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"receipt-details \",[\"helper\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"activeModel\",\"receipt\"]],[\"get\",[\"receipt\"]]],null],\"active\",\"\"],null],\" \"]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"activeModel\",\"receipt\"]],[\"get\",[\"receipt\"]]],null]],null,5],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/receipt-line.png\"],[\"static-attr\",\"width\",\"100%\"],[\"static-attr\",\"height\",\"1px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-date-expand\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-date\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/dashboard-calendar.png\"],[\"static-attr\",\"width\",\"18px\"],[\"static-attr\",\"height\",\"18px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"format-epoch\"],[[\"get\",[\"receipt\",\"timestamp\"]]],null],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"activeModel\",\"receipt\"]],[\"get\",[\"receipt\"]]],null]],null,3,1],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"receipt\"]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/business/portal/pastorders.hbs" } });
});
define("frontend/templates/business/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "miCVAmf/", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/business/sign-up.hbs" } });
});
define("frontend/templates/coming-soon", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "4rv3QF1m", "block": "{\"statements\":[[\"append\",[\"helper\",[\"navigation-bar\"],null,[[\"session\"],[[\"get\",[\"session\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"coming-soon\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"coming-soon-container\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Coming Soon\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\tWe're still working on getting all of our web pages up and running, and you should see something here soon. \\n\\t\\tIn the meantime, feel free to sign up or sign in through the \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://goo.gl/forms/N3aCtcfnSDwLJ5AM2\"],[\"static-attr\",\"class\",\"mobile-unhide\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"app\"],[\"close-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/login\"],[\"static-attr\",\"class\",\"mobile-hide\"],[\"flush-element\"],[\"text\",\"web portal\"],[\"close-element\"],[\"text\",\". \\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"main-footer\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/coming-soon.hbs" } });
});
define("frontend/templates/components/business-login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ElSuGtfu", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-form\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-box\"],[\"flush-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-box-label\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"block\",[\"link-to\"],[\"sign-up\"],null,1],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button-gradient-square\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"googleSignIn\"]],[\"flush-element\"],[\"text\",\" \\n            Sign in with \"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"Google\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"text\",\"input-box\",[\"get\",[\"email\"]],\"Email\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"password\",\"input-box\",[\"get\",[\"password\"]],\"Password\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-box-form-submit\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"remember-me\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"name\",\"remember-me\"],[\"static-attr\",\"class\",\"checkbox\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"remember-me\"],[\"flush-element\"],[\"text\",\"\\n                        Remember Me\\n                    \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"button-gradient-square\"],[\"static-attr\",\"value\",\"Sign In →\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signIn\",\"password\"]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\\n        \"],[\"block\",[\"link-to\"],[\"passwordreset\"],null,0],[\"text\",\" \\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-box-terms\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Terms & Conditions\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Forgot your password?\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/business-login.hbs" } });
});
define("frontend/templates/components/dashboard-toggle", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "/RVAYXfl", "block": "{\"statements\":[[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/dashboard-hamburger.png\"],[\"static-attr\",\"id\",\"dashboard-toggle\"],[\"static-attr\",\"height\",\"16px\"],[\"static-attr\",\"width\",\"16px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/dashboard-toggle.hbs" } });
});
define("frontend/templates/components/main-footer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "H4AmDGYj", "block": "{\"statements\":[[\"open-element\",\"footer\",[]],[\"static-attr\",\"id\",\"info\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"footer-container\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"footer-logo\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/scannly-logo-dark.png\"],[\"static-attr\",\"class\",\"logo-small\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"footer-logo-tagline\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tSay goodbye to lines, forever.\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://goo.gl/forms/N3aCtcfnSDwLJ5AM2\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/download-android.png\"],[\"static-attr\",\"class\",\"button-mobile-download\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"footer-customers\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Customers\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"mobile-hide\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"login\"],null,1],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/coming-soon\"],[\"flush-element\"],[\"text\",\"Store Locator\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"mobile-hide\"],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-up\"],null,0],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"footer-stores\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Stores\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"mobile-hide\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/coming-soon\"],[\"flush-element\"],[\"text\",\"Store Login\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/coming-soon\"],[\"flush-element\"],[\"text\",\"More Info\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/coming-soon\"],[\"flush-element\"],[\"text\",\"Pricing\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"footer-contact\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Contact\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t(650) 265-1193\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\tsupport@scannly.com\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Customer Login\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/main-footer.hbs" } });
});
define("frontend/templates/components/navigation-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "iWIqr2s8", "block": "{\"statements\":[[\"text\",\" \"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"nav-desktop\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"block\",[\"link-to\"],[\"index\"],null,4],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://goo.gl/forms/N3aCtcfnSDwLJ5AM2\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"\\n                Download the App\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,3,1],[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/coming-soon\"],[\"static-attr\",\"class\",\"nav-link-highlighted\"],[\"flush-element\"],[\"text\",\"\\n                Try Scannly Business\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"nav-mobile-links\"],[\"static-attr\",\"class\",\"nav-links\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"mobile-nav-links\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\" \\n            \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://goo.gl/forms/N3aCtcfnSDwLJ5AM2\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"\\n                Download the App\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"/coming-soon\"],[\"static-attr\",\"class\",\"nav-link-highlighted\"],[\"flush-element\"],[\"text\",\"\\n                Try Scannly Business\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"nav-mobile\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"nav-logo\"],[\"static-attr\",\"src\",\"/assets/images/scannly-logo-white.png\"],[\"static-attr\",\"onclick\",\"location.href='/';\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"id\",\"hamburger\"],[\"static-attr\",\"class\",\"hamburger-icon\"],[\"static-attr\",\"src\",\"/assets/images/hamburger.svg\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\\n\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Sign In\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"        \\n                \"],[\"block\",[\"link-to\"],[\"login\"],null,0],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Go To Account\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"block\",[\"link-to\"],[\"portal\"],null,2],[\"text\",\"           \\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"text\",\"            \\n            \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"nav-logo\"],[\"static-attr\",\"src\",\"/assets/images/scannly-logo-white.png\"],[\"flush-element\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/navigation-bar.hbs" } });
});
define("frontend/templates/components/profile-picture", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gXnNLug5", "block": "{\"statements\":[[\"open-element\",\"img\",[]],[\"static-attr\",\"id\",\"output\"],[\"static-attr\",\"height\",\"200\"],[\"static-attr\",\"width\",\"200\"],[\"dynamic-attr\",\"src\",[\"unknown\",[\"profileimage\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/components/profile-picture.hbs" } });
});
define("frontend/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ubt1mmzp", "block": "{\"statements\":[[\"append\",[\"helper\",[\"navigation-bar\"],null,[[\"session\"],[[\"get\",[\"session\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"hero\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"hero-product-image\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"hero-product-descr\"],[\"flush-element\"],[\"text\",\"\\n\\t    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"hero-product-descr-text\"],[\"flush-element\"],[\"text\",\"\\n\\t        \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"\\n\\t        \\tNo more lines, forever.\\n\\t        \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\tScannly is self-checkout through your phone. Free for customers and businesses alike. Check into your favorite retailer through the app, scan the items in your cart using your phone, and check out all in one place.\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://goo.gl/forms/N3aCtcfnSDwLJ5AM2\"],[\"static-attr\",\"target\",\"_blank\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"button-mobile-download\"],[\"static-attr\",\"src\",\"assets/images/download-android.png\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"subscribe\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"subscribe-container\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"mc_embed_signup\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign Up for the Newsletter\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tBe informed about app updates and when Scannly will be available in stores near you!\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"action\",\"//scannly.us15.list-manage.com/subscribe/post?u=62635d5a3bf3273aeeea1ecfd&id=a738ffb70b\"],[\"static-attr\",\"method\",\"post\"],[\"static-attr\",\"id\",\"mc-embedded-subscribe-form\"],[\"static-attr\",\"name\",\"mc-embedded-subscribe-form\"],[\"static-attr\",\"class\",\"validate\"],[\"static-attr\",\"target\",\"_blank\"],[\"static-attr\",\"novalidate\",\"\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"email\"],[\"static-attr\",\"id\",\"mce-EMAIL\"],[\"static-attr\",\"name\",\"EMAIL\"],[\"static-attr\",\"value\",\"\"],[\"static-attr\",\"class\",\"input-gradient-round required email\"],[\"static-attr\",\"placeholder\",\"Email\"],[\"static-attr\",\"required\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"text\"],[\"static-attr\",\"id\",\"mce-NAME\"],[\"static-attr\",\"name\",\"NAME\"],[\"static-attr\",\"value\",\"\"],[\"static-attr\",\"class\",\"input-gradient-round required\"],[\"static-attr\",\"placeholder\",\"Name\"],[\"static-attr\",\"required\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"button-gradient-round button\"],[\"static-attr\",\"value\",\"Subscribe\"],[\"static-attr\",\"name\",\"subscribe\"],[\"static-attr\",\"id\",\"mc-embedded-subscribe\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"main-footer\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/index.hbs" } });
});
define("frontend/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pFBOEmnr", "block": "{\"statements\":[[\"append\",[\"helper\",[\"navigation-bar\"],null,[[\"session\"],[[\"get\",[\"session\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"login\"],[\"static-attr\",\"class\",\"slated-background\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-descr\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert alert-blue\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert-label\"],[\"flush-element\"],[\"text\",\"\\n                Business\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"alert-message\"],[\"flush-element\"],[\"text\",\"\\n                Scannly is free for business owners. Give your customers the best experience\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\\n        \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"id\",\"tagline\"],[\"flush-element\"],[\"text\",\"No more lines, forever.\"],[\"close-element\"],[\"text\",\"\\n        Never wait in another line. Scan the items in your cart\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        and check out with your phone\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-form\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-box\"],[\"flush-element\"],[\"text\",\"\\n\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-box-label\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"block\",[\"link-to\"],[\"sign-up\"],null,1],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n\\n            \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button-gradient-square\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"googleSignIn\"]],[\"flush-element\"],[\"text\",\" \\n                Sign in with \"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"Google\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n            \"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"text\",\"input-box\",[\"get\",[\"email\"]],\"Email\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"password\",\"input-box\",[\"get\",[\"password\"]],\"Password\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-box-form-submit\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"remember-me\"],[\"flush-element\"],[\"text\",\"\\n                        \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"name\",\"remember-me\"],[\"static-attr\",\"class\",\"checkbox\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"remember-me\"],[\"flush-element\"],[\"text\",\"\\n                            Remember Me\\n                        \"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"button-gradient-square\"],[\"static-attr\",\"value\",\"Sign In →\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signIn\",\"password\"]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n\\n            \"],[\"block\",[\"link-to\"],[\"passwordreset\"],null,0],[\"text\",\" \\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"login-box-terms\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Terms & Conditions\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"main-footer\"]],false],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Forgot your password?\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/login.hbs" } });
});
define("frontend/templates/passwordreset", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7gr6qLWz", "block": "{\"statements\":[[\"append\",[\"helper\",[\"navigation-bar\"],null,[[\"session\"],[[\"get\",[\"session\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"slayed-background password-container\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"password-reset-form\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"success\"],[\"flush-element\"],[\"text\",\"Email sent!\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"error\"],[\"flush-element\"],[\"text\",\"Username not in the database\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Forgot your password?\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"resetPassword\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"email\",\"input-box\",[\"get\",[\"email\"]],\"Email Address\"]]],false],[\"text\",\"\\n\\t\\t    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"submit\",\"input-box button-gradient-square\",\"Reset Password\"]]],false],[\"text\",\"    \\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"main-footer\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/passwordreset.hbs" } });
});
define("frontend/templates/portal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lJDVRW6q", "block": "{\"statements\":[[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"dashboard\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-top\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-button\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-hamburger\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"unknown\",[\"dashboard-toggle\"]],false],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-hamburger-title\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"hamburger-title\"],[\"flush-element\"],[\"text\",\"Dashboard\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-push\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-user\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-user-info\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"dashboard-hello\"],[\"flush-element\"],[\"text\",\"Hello\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"dashboard-uid\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"firstname\"]],false],[\"text\",\"!\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-user-picture\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"profileimage\"]],null],[\"static-attr\",\"height\",\"80px\"],[\"static-attr\",\"width\",\"80px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-container\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"sidebar\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"id\",\"dashboard-account\"],[\"flush-element\"],[\"text\",\"Account\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-links\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dashboard-dot-image\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"id\",\"dashboard-dots\"],[\"static-attr\",\"src\",\"/assets/images/dashboard-line.png\"],[\"static-attr\",\"width\",\"1px\"],[\"static-attr\",\"height\",\"76px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"sidebar-links\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"links\"],[\"flush-element\"],[\"text\",\"\\n                        \"],[\"block\",[\"link-to\"],[\"portal.pastorders\"],null,1],[\"text\",\"\\n                        \"],[\"block\",[\"link-to\"],[\"portal.about\"],null,0],[\"text\",\"\\n                        \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-content\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Settings\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Past Orders\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/portal.hbs" } });
});
define("frontend/templates/portal/about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "yE2f9+et", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"successful-save\"],[\"flush-element\"],[\"text\",\"Save Successful!\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"info-container\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"saveInfo\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"info-row-container\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"info-row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"value\",\"placeholder\",\"disabled\"],[\"email\",\"input-box\",\"email\",[\"get\",[\"email\"]],[\"get\",[\"model\",\"email\"]],[\"get\",[\"isGoogleLogin\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"maxlength\",\"pattern\",\"title\",\"class\",\"id\",\"value\",\"placeholder\"],[\"text\",\"16\",\"[A-Za-z]{1,16}\",\"Alphabet characters only\",\"input-box\",\"firstname\",[\"get\",[\"firstname\"]],[\"get\",[\"model\",\"firstname\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"maxlength\",\"pattern\",\"title\",\"class\",\"id\",\"value\",\"placeholder\"],[\"text\",\"16\",\"[A-Za-z]{1,16}\",\"Alphabet characters only\",\"input-box\",\"lastname\",[\"get\",[\"lastname\"]],[\"get\",[\"model\",\"lastname\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input-mask\"],null,[[\"type\",\"mask\",\"type\",\"pattern\",\"class\",\"id\",\"value\",\"placeholder\"],[\"text\",\"(999) 999-9999\",\"tel\",\"[\\\\(]\\\\d{3}[\\\\)][\\\\s]\\\\d{3}[\\\\-]\\\\d{4}\",\"input-box\",\"phone\",[\"get\",[\"phone\"]],[\"get\",[\"model\",\"phone\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"submit\",\"info-submit\",\"Save Info\"]]],false],[\"text\",\"\\t\\t\\t\\t\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"info-row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"place-autocomplete-field\"],null,[[\"value\",\"placeholder\",\"disable\",\"handlerController\",\"inputClass\",\"focusOutCallback\",\"placeChangedCallback\",\"restrictions\"],[[\"get\",[\"address\"]],[\"get\",[\"model\",\"address\"]],false,[\"get\",[null]],\"input-box address-box\",\"done\",\"placeChanged\",[\"get\",[\"restrictions\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"pattern\",\"title\",\"id\",\"value\",\"placeholder\",\"disabled\"],[\"password\",\"input-box\",\".{6,}\",\"Six or more characters\",\"password\",[\"get\",[\"password\"]],\"Password\",[\"get\",[\"isGoogleLogin\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"pattern\",\"title\",\"id\",\"value\",\"placeholder\",\"disabled\"],[\"password\",\"input-box\",\".{6,}\",\"Six or more characters\",\"confirmpassword\",[\"get\",[\"password\"]],\"Confirm Password\",[\"get\",[\"isGoogleLogin\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"statement\"],[\"flush-element\"],[\"text\",\"We take your privacy very seriously and\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"will never share your information ever\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/portal/about.hbs" } });
});
define("frontend/templates/portal/pastorders", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "WfGG32a2", "block": "{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,6]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-expand\"],[\"flush-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"image-expand\"],[\"static-attr\",\"width\",\"10.5px\"],[\"static-attr\",\"height\",\"6px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"portal.pastorders.show\",[\"get\",[\"receipt\",\"receiptid\"]]],null,0]],\"locals\":[]},{\"statements\":[[\"text\",\"                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-expand\"],[\"flush-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"image-expand\"],[\"static-attr\",\"width\",\"10.5px\"],[\"static-attr\",\"height\",\"6px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"portal.pastorders\"],null,2]],\"locals\":[]},{\"statements\":[[\"text\",\"                                    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"item-list\"],[\"flush-element\"],[\"text\",\"\\n                                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-details-productname\"],[\"flush-element\"],[\"text\",\"\\n                                            \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"receiptdetails\",\"productname\"]],false],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-details-productquantity\"],[\"flush-element\"],[\"text\",\"\\n                                            \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"receiptdetails\",\"productquantity\"]],false],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-details-productprice\"],[\"flush-element\"],[\"text\",\"\\n                                            \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"$\"],[\"append\",[\"unknown\",[\"receiptdetails\",\"productprice\"]],false],[\"close-element\"],[\"text\",\"\\n                                        \"],[\"close-element\"],[\"text\",\"\\n                                    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"receiptdetails\"]},{\"statements\":[[\"text\",\"                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-details-container\"],[\"flush-element\"],[\"text\",\" \\n                            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-detail-items\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"activeModel\",\"receiptdetails\"]]],null,4],[\"text\",\"                            \"],[\"close-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-detail-subtotal\"],[\"flush-element\"],[\"text\",\"\\n                                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-subtotal\"],[\"flush-element\"],[\"text\",\"\\n                                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-title\"],[\"flush-element\"],[\"text\",\"Subtotal\"],[\"close-element\"],[\"text\",\"\\n                                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-total-small\"],[\"flush-element\"],[\"text\",\"$1.50\"],[\"close-element\"],[\"text\",\"\\n                                \"],[\"close-element\"],[\"text\",\"\\n                                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-tax\"],[\"flush-element\"],[\"text\",\"\\n                                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-title\"],[\"flush-element\"],[\"text\",\"Tax\"],[\"close-element\"],[\"text\",\"\\n                                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-total-small\"],[\"flush-element\"],[\"text\",\"$.49\"],[\"close-element\"],[\"text\",\"\\n                                \"],[\"close-element\"],[\"text\",\"\\n                            \"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-info-container\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-store-price\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-store\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"store-name\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"receipt\",\"storename\"]],false],[\"close-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"store-address\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"receipt\",\"storeaddress\"]],false],[\"text\",\"helo\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-price\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-title\"],[\"flush-element\"],[\"text\",\"Order total\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"price-total\"],[\"flush-element\"],[\"text\",\"$ \"],[\"append\",[\"unknown\",[\"receipt\",\"total\"]],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"receipt-details \",[\"helper\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"activeModel\",\"receipt\"]],[\"get\",[\"receipt\"]]],null],\"active\",\"\"],null],\" \"]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"activeModel\",\"receipt\"]],[\"get\",[\"receipt\"]]],null]],null,5],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/receipt-line.png\"],[\"static-attr\",\"width\",\"100%\"],[\"static-attr\",\"height\",\"1px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-date-expand\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"receipt-date\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/dashboard-calendar.png\"],[\"static-attr\",\"width\",\"18px\"],[\"static-attr\",\"height\",\"18px\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"format-epoch\"],[[\"get\",[\"receipt\",\"timestamp\"]]],null],false],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"activeModel\",\"receipt\"]],[\"get\",[\"receipt\"]]],null]],null,3,1],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"receipt\"]}],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/portal/pastorders.hbs" } });
});
define("frontend/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5MsedX3/", "block": "{\"statements\":[[\"append\",[\"helper\",[\"navigation-bar\"],null,[[\"session\"],[[\"get\",[\"session\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"signup\"],[\"static-attr\",\"class\",\"slanted-background\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"signup-form\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Sign up\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signUp\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"signup-form-fields\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"comment\",\" Email \"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"class\",\"value\",\"placeholder\",\"required\"],[\"email\",\"email\",\"input-box\",[\"get\",[\"email\"]],\"Email\",\"required\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"comment\",\" First name \"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"class\",\"pattern\",\"value\",\"placeholder\",\"required\",\"title\"],[\"text\",\"firstName\",\"input-box\",\"[a-zA-z]+\",[\"get\",[\"firstName\"]],\"First Name\",\"required\",\"Please only use alphabetic characters\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"comment\",\" Last Name \"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"class\",\"pattern\",\"value\",\"placeholder\",\"required\",\"title\"],[\"text\",\"lastName\",\"input-box\",\"[a-zA-z]+\",[\"get\",[\"lastName\"]],\"Last Name\",\"required\",\"Please only use alphabetic characters\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"comment\",\" Phone \"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"input-mask\"],null,[[\"type\",\"id\",\"class\",\"mask\",\"type\",\"pattern\",\"value\",\"placeholder\"],[\"tel\",\"phone\",\"input-box\",\"(999) 999-9999\",\"tel\",\"[\\\\(]\\\\d{3}[\\\\)][\\\\s]\\\\d{3}[\\\\-]\\\\d{4}\",[\"get\",[\"phone\"]],\"Phone\"]]],false],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"comment\",\" Address \"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"place-autocomplete-field\"],null,[[\"value\",\"placeholder\",\"reqjkred\",\"disable\",\"handlerController\",\"inputClass\",\"focusOutCallback\",\"placeChangedCallback\",\"restrictions\"],[[\"get\",[\"address\"]],\"Address\",\"required\",false,[\"get\",[null]],\"input-box address-box\",\"done\",\"placeChanged\",[\"get\",[\"restrictions\"]]]]],false],[\"text\",\"\\n\"],[\"text\",\"                    \"],[\"comment\",\" Password \"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"class\",\"pattern\",\"value\",\"placeholder\",\"required\",\"title\"],[\"password\",\"password\",\"input-box\",\".{6,}\",[\"get\",[\"password\"]],\"Password\",\"required\",\"Please enter a password that's at least 6 characters long\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"comment\",\" Password Confirm \"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"class\",\"pattern\",\"value\",\"placeholder\",\"required\",\"title\"],[\"password\",\"passwordConfirm\",\"input-box\",\".{6,}\",[\"get\",[\"passwordConfirm\"]],\"Password Confirm\",\"required\",\"Please enter a password that's at least 6 characters long\"]]],false],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n                        We take your privacy very seriously and \\n                        will never share you personal information ever. \\n                    \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n                \\n          \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"submit\",\"button-gradient-square\",\"Sign up\",\"Signup\"]]],false],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"signup-form-terms\"],[\"flush-element\"],[\"text\",\"\\n        Terms & Conditions\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"main-footer\"]],false],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "frontend/templates/sign-up.hbs" } });
});
define('frontend/torii-adapters/application', ['exports', 'ember', 'emberfire/torii-adapters/firebase'], function (exports, _ember, _emberfireToriiAdaptersFirebase) {
  exports['default'] = _emberfireToriiAdaptersFirebase['default'].extend({
    firebase: _ember['default'].inject.service()
  });
});
define('frontend/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _emberfireToriiProvidersFirebase) {
  exports['default'] = _emberfireToriiProvidersFirebase['default'];
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('frontend/config/environment', ['ember'], function(Ember) {
  var prefix = 'frontend';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+63d1d439"});
}

/* jshint ignore:end */
//# sourceMappingURL=frontend.map
