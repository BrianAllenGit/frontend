import DS from 'ember-data';

export default DS.Model.extend({
  address: DS.attr('string'),
  name: DS.attr('string'),
  owner: DS.attr('string'),
  phone: DS.attr('string'),
  tax: DS.attr(),
  uid: DS.attr('string')
});
