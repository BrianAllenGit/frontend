import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('sign-up');
  this.route('passwordreset');
  this.authenticatedRoute('portal', function() {
    this.authenticatedRoute('pastorders', function() {
      this.authenticatedRoute('show', {path : '/:receipt_id'});
    });
  	this.authenticatedRoute('about', function (){
      this.authenticatedRoute('edit');
    });
  });
  this.route('coming-soon');
  this.route('business', function() {
    this.route('login');
    this.route('sign-up');
    this.authenticatedRoute('portal', function() {
      this.authenticatedRoute('createstore');
      this.authenticatedRoute('store', { path : '/:store_id' }, function (){
        this.authenticatedRoute('pastorders', function() {
            this.authenticatedRoute('show', {path : '/:receipt_id'});
          });
        this.authenticatedRoute('products', function() {
            this.authenticatedRoute('show', {path : '/:product_id'});
            this.authenticatedRoute('add');
        });
      });
    });
  });
});

export default Router;
