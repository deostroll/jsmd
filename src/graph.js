function Graph(input) {
  var cache = input.reduce(function(obj, item, idx){
    obj.indices[item.name] = idx;
    obj.nodes.push(new Node(item.name));
    return obj;
  }, {
    indices: {},
    nodes: []
  });
  var edges = [];

  input.forEach(function(ent, index){
    ent.fields.reduce(function(edgarr, field){
      if (field.type === 'reference') {
        var entityName = field.entityName;
        var targetIndex = cache.indices[entityName];
        edgarr.push([index, targetIndex]);
      }
      return edgearr;
    }, edges);
  });

  edges.forEach(function(edg){
    // cache.nodes[edg[0]].out.push(edg[1]);
    cache.nodes[edg[0]].edgeTo(cache.nodes[edg[1]]);
  });
}

function Node(value) {
  var self = this;
  this.value = value;
  // this.visited = false;
  // this.marked = false;
  Object.defineProperty(this, 'visited', {
    value: false,
    writable: true
  });

  Object.defineProperty(this, 'marked', {
    value: false,
    writable: true
  });

  Object.defineProperty(this, 'out', {
    enumerable: true,
    value: []
  });

  this.edgeTo = function(node) {
    self.out.push(node);
  }
}
