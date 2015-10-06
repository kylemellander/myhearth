import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card-list-by-rarity', 'Integration | Component | card list by rarity', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card-list-by-rarity}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card-list-by-rarity}}
      template block text
    {{/card-list-by-rarity}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
