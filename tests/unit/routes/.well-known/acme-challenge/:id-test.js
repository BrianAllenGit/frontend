import { moduleFor, test } from 'ember-qunit';

moduleFor('route:/.well-known/acme-challenge/:id', 'Unit | Route | /.well known/acme challenge/:id', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
