suite('Inline StylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.element.style.opacity = '0.5';
  });
  teardown(function() {
    document.body.removeChild(this.element);
  });

  test('The Element.styleMap method returns a StylePropertyMap object for that element', function() {
    var inlineStyleMap = this.element.styleMap();
    assert.instanceOf(inlineStyleMap, StylePropertyMap);
  });

  test('Set successfully sets the CSS string of the StyleValue on an element', function() {
    var inlineStyleMap = this.element.styleMap();
    var simpleLength = new SimpleLength(9.2, 'percent');
    inlineStyleMap.set('height', simpleLength);

    assert.strictEqual(this.element.style['height'], simpleLength.cssString);
  });

  test('Set successfully sets the style string for the list of StyleValues on a property that supports sequences', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueArray = [new NumberValue(4), new NumberValue(5), new KeywordValue('infinite')];
    this.element.style['animation-iteration-count'] = 'infinite, 2, 5';
    inlineStyleMap.set('animation-iteration-count', valueArray);

    assert.strictEqual(this.element.style['animation-iteration-count'], '4, 5, infinite');
  });

  test('Set should throw a TypeError for properties that do not support sequences of style values', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueSequence = [new SimpleLength(3, 'px'), new SimpleLength(6, 'px')];

    assert.throw(function() {inlineStyleMap.set('height', valueSequence)}, TypeError, 'height does not support sequences of styleValues');
  });

  test('Set should throw a TypeError if a non KeywordValue StyleValue unsupported by the CSS style property is set', function() {
    var inlineStyleMap = this.element.styleMap();
    var numberValue = new NumberValue(42);

    assert.throw(function() {inlineStyleMap.set('height', numberValue)}, TypeError);
  });

  test('Set should throw a TypeError if a KeywordValue unsupported by the CSS style property is set ', function() {
    var inlineStyleMap = this.element.styleMap();
    var keyword = new KeywordValue('lemon');

    assert.throw(function() {inlineStyleMap.set('height', keyword)}, 'height does not take the keyword lemon');
  });

  test('Set should throw a TypeError if a non StyleValue is inputed into the function', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.set('height', 4)}, TypeError);
  });

  test('Set should throw a TypeError if an unsupported property is inputed into the function', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.set('lemons', new SimpleLength(3, 'px'))}, TypeError);
  });

  test('The delete method clears a given property', function() {
    var inlineStyleMap = this.element.styleMap();
    this.element.style.height = '10px';
    inlineStyleMap.delete('height');

    assert.strictEqual(this.element.style['height'], '');
  });

  test('The delete method should throw a TypeError if an unsupported property', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.delete('lemons')}, TypeError);
  });

  test('The has method will return true if the valid CSS property input has been assigned a value' +
    'or false if it has not been assigned a value', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.isTrue(inlineStyleMap.has('opacity'));
    assert.isFalse(inlineStyleMap.has('height'));
  });

  test('The has method should throw a TypeError if an unsupported property', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.has('lemons')}, TypeError);
  });

  test('The append method should successfully append a supported StyleValue to a property ' +
      'that supports sequences of StyleValues', function() {
    this.element.style['animation-iteration-count'] = 'infinite, 2, 5';
    var inlineStyleMap = this.element.styleMap();
    inlineStyleMap.append('animation-iteration-count', new NumberValue(4));

    assert.strictEqual(this.element.style['animation-iteration-count'], 'infinite, 2, 5, 4');
  });

  test('The append method should successfully append a sequence of StyleValues to a property ' +
      'that supports sequences of StyleValues', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueSequence = [new NumberValue(4), new NumberValue(5), new KeywordValue('infinite')];
    this.element.style['animation-iteration-count'] = 'infinite, 2, 5';
    inlineStyleMap.append('animation-iteration-count', valueSequence);

    assert.strictEqual(this.element.style['animation-iteration-count'], 'infinite, 2, 5, 4, 5, infinite');
  });

  test('The append method should successfully append a sequence of StyleValues even when the CSS property ' +
    'is not currently set', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueSequence = [new NumberValue(4), new NumberValue(5), new KeywordValue('infinite')];
    this.element.style['animation-iteration-count'] = '';
    inlineStyleMap.append('animation-iteration-count', valueSequence);

    assert.strictEqual(this.element.style['animation-iteration-count'], '4, 5, infinite');
  });

  test('The append method should throw a TypeError if the StyleValue at any index in the values array ' +
    'is not supported by the property', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueSequence = [new NumberValue(4), new NumberValue(5), new SimpleLength(3, 'px'), new KeywordValue('infinite')];
    this.element.style['animation-iteration-count'] = 'infinite, 2, 5';

    assert.throw(function() {inlineStyleMap.append('animation-iteration-count', valueSequence)}, TypeError,
      'animation-iteration-count does not take values of type SimpleLength');
  });

  test('The append method should throw a TypeError when an unsupported CSS property is entered', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.append('lemon', new NumberValue(4))}, TypeError,
      'lemon is not a supported CSS property');
  });

  test('The append method should throw a TypeError when a CSS property that does not support list values is entered', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.append('height', new NumberValue(4))}, TypeError,
      'height does not support sequences of styleValues');
  });

  test('The append method should throw a TypeError when null is entered as the value', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.append('animation-iteration-count', null)}, TypeError,
      'null cannot be appended to CSS properties');
  });

  test('getProperties returns an ordered list of properties that have been set on an element', function() {
    var inlineStyleMap = this.element.styleMap();
    this.element.style['opacity'] = '0.5';
    this.element.style['height'] = '5px';
    this.element.style['border-top-color'] = 'initial';
    this.element.style['border-top-width'] = 'initial';

    assert.deepEqual(inlineStyleMap.getProperties(), ['opacity', 'height', 'border-top-color', 'border-top-width']);
  });
});
