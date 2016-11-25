var expect = chai.expect;
var assert = chai.assert;

describe('parsing tests', function(){
  it('should parse code correctly', function(done){
    $.ajax({
      url: 'ast.json',
      dataType: 'json',
      success: function(data) {
        // console.log(data);
        var model = ModelBuilder.walk(data);
        expect(model).to.not.be.undefined;
        done();
      }
    })
  });
})
