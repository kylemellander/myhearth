import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-collection-by-class', 'Integration | Component | my collection by class', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{my-collection-by-class}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#my-collection-by-class}}
      template block text
    {{/my-collection-by-class}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
