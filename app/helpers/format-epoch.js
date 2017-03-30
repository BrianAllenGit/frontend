import Ember from 'ember';

export function formatEpoch(params/*, hash*/) {
	var d = new Date(+params);
	var date = "" + ((d.getMonth() + 1)) + "/" + d.getDate() + "/" + d.getFullYear();
  return (date);
}

export default Ember.Helper.helper(formatEpoch);
