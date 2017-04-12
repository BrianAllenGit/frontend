import DS from 'ember-data';

export default DS.Model.extend({
  barcode: DS.attr('string'),
  name: DS.attr('string'),
  price: DS.attr(),
  quantity: DS.attr(),
  sku: DS.attr('string'),
  storeid: DS.attr('string'),
  tax: DS.attr(),

});
