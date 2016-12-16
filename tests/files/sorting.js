describe('sorting tests', function() {
  it('should create the graph structure', function(done){
    $.ajax({
      url:'sample10.js'
    }).done(function(code){
      expect(code).to.be.defined;
      var ast = esprima.parse(code);
      var model = new Builder().walk(ast);
      var graph = new Graph(model.entities);
      expect(graph).to.be.defined;
      // _log(graph);
      console.log(graph);
      done();
    })
  });
});
