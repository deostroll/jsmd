var expect = chai.expect;
var assert = chai.assert;

describe('parsing tests', function(){
  it('should parse data2.json file correctly', function(done){
    $.ajax({
      url: 'data2.json',
      dataType: 'json',
      success: function(data) {
        console.log(data.type);
        var model = ModelBuilder.walk(data);
        expect(model).to.not.be.undefined;
        expect(model.name).to.equal('model');
        expect(model.entities.length).to.equal(1);
        var entity = model.entities[0];
        expect(entity.name).to.equal('customer');
        expect(entity.fields.length).to.equal(1);
        expect(entity.fields[0].name).to.equal('customerId');
        done();
      }
    })
  });
});
