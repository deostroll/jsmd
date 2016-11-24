function Entity(name) {
  this.name = name;
  this.field = [];
}

Entity.prototype.add = function(fieldInfo) {
  this.field.push(fieldInfo);
};

var EntityBuilder = {
  walk: function(ast) {
    
  }
}
