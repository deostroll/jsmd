var expect = chai.expect;

describe('parsing tests', function(){
  it('should parse code correctly', function(done){
    $.ajax({
      url: 'ast.json',
      dataType: 'json'
    }).then(function(ast){
      expect(typeof ast).to.equal('object');
      var entities = EntityBuilder.walk(ast);
      expect(entities).to.not.be.undefined;
      done();
    });
  });
})
