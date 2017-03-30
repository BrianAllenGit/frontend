import DS from 'ember-data';

export default DS.Model.extend({
  productbarcode: DS.attr('string'),
  productname: DS.attr('string'),
  productprice: DS.attr('number'),
  productquantity: DS.attr('number'),
  receiptid: DS.attr('string')
});
