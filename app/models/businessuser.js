import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  storeid: DS.attr('string'),
  uid: DS.attr('string')
});
