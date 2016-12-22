describe('sorting tests', function() {
  it('should create the graph structure', function(done) {
    $.ajax({
      url: 'sample10.js'
    }).done(function(code) {
      expect(code).to.be.defined;
      var ast = esprima.parse(code);
      var model = new Builder().walk(ast);
      var graph = new Graph();
      expect(graph).to.be.defined;
      model.entities.forEach(function(entity) {
        graph.add(entity);
      });
      var edges = graph.build();
      console.log(graph.toString());
      console.log(edges.toString());
      var clone = graph.nodes.slice();
      clone.sort(function(a, b) {
        if (a.in.length > b.in.length) {
          return -1;
        } else if (a.in.length < b.in.length) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log(clone.map(function(n) {
        return n.entity.name + ":" + n.in.length;
      }).toString());
      console.log(graph);
      done();
    })
  });
});
