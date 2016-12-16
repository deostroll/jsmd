(function(window){

  // Takes input as an array of entities...
  function Graph(input) {
    var cache = input.reduce(function(obj, item, idx){
      obj.indices[item.name] = idx;
      obj.nodes.push(new Node(item));
      return obj;
    }, {
      indices: {},
      nodes: []
    });
    var edges = [];

    input.forEach(function(ent, index) {
      ent.fields.reduce(function(edgarr, field){
        if (field.def.type === 'reference') {
          var entityName = field.def.entityName;
          var targetIndex = cache.indices[entityName];
          edgarr.push([index, targetIndex]);
        }
        return edgarr;
      }, edges);
    });
    console.log('edges:', edges);
    edges.forEach(function(edg){
      // cache.nodes[edg[0]].out.push(edg[1]);
      cache.nodes[edg[0]].edgeTo(cache.nodes[edg[1]]);
    });
    this.cache = cache;

    // do a topological sort...
    this.sort = function() {
      var sorted = [];

      var visit = function(node) {
        if (node.marked) {
          throw new Error('Not a DAG');
        }

        if (!node.visited) {
          node.marked = true;
          node.out.forEach(visit);
          node.visited = true;
          node.marked = false;
          sorted.unshift(node);
        }
      };

      cache.nodes.forEach(function(node){
        if (!node.visited) {
          // console.assert(node.marked);
          visit(node);
        }
      });

      return sorted;
    };

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
    };

    this.toString = function() {
      return this.value.name;
    };
  }

  if (typeof module === 'object' && module && typeof module.exports) {
    module.exports = {
      Graph: Graph
    }
  }
  else {
    window.Graph = Graph;
  }
})(this);
