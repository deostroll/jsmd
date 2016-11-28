var expect = chai.expect;
var assert = chai.assert;
var stringify = function(obj) { return JSON.stringify(obj, null, 2 ); };
var load = function(url) {

  return $.ajax({
    url: url,
    dataType: 'json'
  });
};

describe('parsing tests', function(){
  it('should parse data2.json file correctly', function(done){

    load('data2.json').then(function(data){
      expect(data).to.not.be.undefined;
      // console.log(data.type);
      var model = ModelBuilder.walk(data);
      expect(model).to.not.be.undefined;
      expect(model.name).to.equal('model');
      expect(model.entities.length).to.equal(1);
      var entity = model.entities[0];
      expect(entity.name).to.equal('customer');
      expect(entity.fields.length).to.equal(1);
      expect(entity.fields[0].name).to.equal('customerId');
      // console.log(JSON.stringify(model, null, 2));
      done();

    }, done);
  });

  it('should parse sample3 correctly', function(done){
    load('sample3.json')
    .then(function(ast){
      // console.log(ast.type);
      var expected = 'northWind';
      var model = ModelBuilder.walk(ast);
      expect(model.name).to.equal(expected);
      // console.log(model.name);
      done();
    }, done);
  });

  it('should parse sample4 correctly', function(done) {
    load('sample4.json').then(function(ast){
      var model = ModelBuilder.walk(ast);
      // console.log(JSON.stringify(model, null, 2));
      expect(model.entities.length).to.equal(2);
      done();
    }, done);
  });

  it('should detect the primary key', function(done){
    load('sample5.json').then(function(ast) {
      var model = ModelBuilder.walk(ast);
      expect(model.entities.length).to.equal(1);
      var entity = model.entities[0];
      console.log(stringify(entity));
      expect(entity.name).to.equal('student');
      expect(entity.$key).to.be.not.undefined;
      expect(Array.isArray(entity.$key)).to.equal(true);
      done();
    }, done);
  });
});
