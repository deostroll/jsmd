var expect = chai.expect;
var assert = chai.assert;
var stringify = function(obj) {
  return JSON.stringify(obj, null, 2);
};
var load = function(url) {

  return $.ajax({
    url: url,
    dataType: 'json'
  });
};

describe('parsing tests', function() {
  it('should parse data2.json file correctly', function(done) {

    load('data2.json').done(function(data) {
      expect(data).to.not.be.undefined;

      var model = ModelBuilder.walk(data);
      // console.log(stringify(model));
      expect(model).to.not.be.undefined;
      expect(model.name).to.equal('model');
      expect(model.entities.length).to.equal(1);
      var entity = model.entities[0];
      expect(entity.name).to.equal('customer');
      expect(entity.fields.length).to.equal(1);
      expect(entity.fields[0].name).to.equal('customerId');
      // console.log(JSON.stringify(model, null, 2));
      done();

    });
  });

  it('should parse sample3 correctly', function(done) {
    load('sample3.json')
      .then(function(ast) {
        // console.log(ast.type);
        var expected = 'northWind';
        var model = ModelBuilder.walk(ast);
        expect(model.name).to.equal(expected);
        // console.log(model.name);
        done();
      }, function(e) {
        done(e);
      });
  });

  it('should parse sample4 correctly', function(done) {
    load('sample4.json').then(function(ast) {
      var model = ModelBuilder.walk(ast);
      // console.log(JSON.stringify(model, null, 2));
      expect(model.entities.length).to.equal(2);
      done();
    }, done);
  });

  it('should detect the primary key', function(done) {
    load('sample5.json').then(function(ast) {
      // console.log(ast.type);
      var model = ModelBuilder.walk(ast);
      // console.log(stringify(model));
      expect(model.entities.length).to.equal(1);

      var entity = model.entities[0];
      // console.log(stringify(entity));
      expect(entity.name).to.equal('student');
      expect(entity.$key).to.be.not.undefined;
      expect(Array.isArray(entity.$key)).to.equal(true);
      done();
    }, done);
  }).timeout(5000);

  it('should detect the foreign key reference', function(done) {
    load('sample6.json').done(function(ast) {
      expect(ast.type).to.equal('Program');
      var model = ModelBuilder.walk(ast);
      var entity = model.getEntity('personalInfo');
      expect(entity.name).to.equal('personalInfo');
      var field = entity.fields[0];
      expect(field.name).to.equal('studentId');
      expect(field.type).to.equal('field');
      expect(field.def).to.be.defined;
      expect(field.def.type).to.be.equal('reference');
      // console.log(stringify(model));
      done();
    });
  });

  it('should have the property field schema definition in entity', function(
    done) {
    var samples = [
      'sample3.json',
      'sample6.json'
    ];
    var assets = $.when.apply($, samples.map(function(s) {
      return load(s);
    }));

    assets.done(function(a, b) {
      var sample3 = a[0],
        sample6 = b[0];
      // console.log(arguments);
      expect(sample3.type).to.equal('Program');
      expect(sample6.type).to.equal('Program');

      var model1 = ModelBuilder.walk(sample3);
      expect(model1.entities.length).to.equal(1);
      var entity = model1.entities[0];
      expect(entity.name).to.equal('customer');
      expect(entity.fields.length).to.equal(1);

      var field = entity.fields[0];
      // console.log(stringify(field));
      expect(field.def).to.eql({
        type: 'string',
        size: 10
      });

      var model2 = ModelBuilder.walk(sample6);
      var field = model2.getEntity('personalInfo').fields[0];
      // console.log(field);
      expect(field.type).to.equal('field');
      expect(field.def.type).to.equal('reference');
      expect(field.def.entityName).to.be.defined;
      expect(field.def.fieldName).to.be.defined;
      expect(field.def).to.deep.equal({
        entityName: 'student',
        fieldName: 'studentId',
        type: 'reference'
      });

      done();
    });

  });

});
