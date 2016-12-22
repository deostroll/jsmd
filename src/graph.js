(function(window) {

  function Graph() {
    this.nodes = [];
    this.index = {};
  }

  Graph.prototype.add = function(entity) {
    var node = new Node(entity);
    var idx = this.nodes.push(node) - 1;
    this.index[entity.name] = idx;
  };

  Graph.prototype.indexOf = function(obj) {
    if (obj instanceof Node) {
      return this.nodes.indexOf(obj);
    } else if (typeof obj === 'string') {
      return this._findIndexByName(obj);
    } else {
      throw new TypeError('expected string/Node object as argument');
    }
  };

  Graph.prototype._findIndexByName = function(name) {
    var res = this.index[name];
    return typeof res !== 'undefined' ? res : -1;
  };

  Graph.prototype.build = function() {
    var self = this;
    var nodes = this.nodes;
    var edges = [];
    nodes.forEach(function(node, idx) {
      var entity = node.entity;
      entity.fields.forEach(function(field) {
        if (field.def.type === 'reference') {
          var targetIndex = self.indexOf(field.def.entityName);
          var target = self.nodes[targetIndex];
          edges.push(new Edge(idx, targetIndex));
          node.edgeTo(target);
        }
      })
    });
    return edges;
  };

  Graph.prototype.toString = function() {
    return this.nodes.map(function(n, i) {
      var s = "(" + i + ", " + n.entity.name + ")";
      return s;
    }).join(',');
  }

  function Node(value) {
    this.entity = value;
    this.in = [];
    this.out = [];
  }

  Node.prototype.toString = function() {
    return this.entity.name;
  };

  Node.prototype.edgeTo = function(node) {
    this.out.push(node);
    node.in.push(this);
  };

  function Edge(from, to) {
    this.toString = function() {
      return "(" + from + "," + to + ")";
    };
  }

  if (typeof module === 'object' && module && typeof module.exports) {
    module.exports = {
      Graph: Graph
    }
  } else {
    window.Graph = Graph;
  }
})(this);
