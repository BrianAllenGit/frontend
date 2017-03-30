import DS from 'ember-data';

export default DS.Model.extend({
  address: DS.attr('string'),
  email: DS.attr('string'),
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  phone: DS.attr('string'),
  profileimage: DS.attr('string'),
  timestamp: DS.attr('number'),
  uid: DS.attr('string')
});
