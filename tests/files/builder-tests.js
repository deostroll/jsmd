describe('ModelBuilder unit testing', function() {
  it('should parsePropertyValue correctly', function() {
    var value = {
      type: 'Literal',
      value: "string",
      raw: "'string'"
    };

    var actual = ModelBuilder.parsePropertyValue(value);
    var expected = "string";

    expect(actual).to.equal(expected);
  });
});
