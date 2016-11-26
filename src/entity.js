function Entity(name) {
  this.name = name;
  this.fields = [];
}

Entity.prototype.add = function(fieldInfo) {
  this.fields.push(fieldInfo);
};

var ModelBuilder = {
  walk: function(ast) {
    this.entities = [];
    this.name = 'model'
    if(ast.type === 'Program') {
      this.parseProgramBody(ast.body);
      return {
        name: this.name,
        entities: this.entities
      }
    }
  }
};

function _throw(msg) {
  throw new Error(msg);
};

ModelBuilder.parseProgramBody = function parseProgramBody(statements) {
  var self = this;
  statements.forEach(function(a){
    if (a.type === 'VariableDeclaration') {
      self.parseVariableDeclaration(a);
    }
    else {
      throw new Error('Unknown statement: ' + a.type);
    }
  });
}

ModelBuilder.parseVariableDeclaration = function parseVariableDeclaration(ast) {
  var self = this;

  console.assert(ast.type === 'VariableDeclaration');
  ast.declarations.forEach(function(dec) {
    var entity = self.parseVariableDeclarator(dec);
    console.log(JSON.stringify(entity));
    self.entities.push(entity);
  });
}

ModelBuilder.parseVariableDeclarator = function parseVariableDeclarator(ast) {
  console.assert(ast.type === 'VariableDeclarator');
  var entity = new Entity(ast.id.name);
  if (ast.init) {
    if (ast.init.type === 'ObjectExpression') {
      var fields = this.parseObjectExpression(ast.init);
      entity.fields = fields;
      return entity;
    }
    else {
      throw new Error('VariableDeclarator parsing: Unknown init type: ' + ast.init.type);
    }
  }
  else {
    throw new Error('VariableDeclarator has no init')
  }
}

ModelBuilder.parseObjectExpression = function parseObjectExpression(ast, firstLevel) {
  var self = this;

  if (typeof firstLevel === 'undefined') {
    firstLevel = true;
  }
  console.assert(ast.type === 'ObjectExpression');

  if (firstLevel) {
    var fields = [];
    ast.properties.forEach(function(prop){
      if (prop.type === 'Property') {
        fields.push({
          type: 'field',
          name: prop.key.name,
          def: self.parseDef(prop.value)
        })
      }
      else {
        _throw('ObjectExpression: Unknown property type: ' + prop.type);
      }
    });
    return fields;
  }
  else {
    var obj = {};
    ast.properties.forEach(function(prop) {
      obj[prop.key.name] = self.parsePropertyValue(prop.value);
    });
    return obj;
  }

}

ModelBuilder.parseDef = function parseDef(ast) {
  var self = this;
  if (ast.type === 'ObjectExpression') {
    var def = self.parseObjectExpression(ast, false);
    return def;
  }
  else {
    _throw('parseDef: Unknown type: ' + ast.type);
  }
};

ModelBuilder.parsePropertyValue = function parsePropertyValue(ast) {
  var self = this;
  if (ast.type === 'ObjectExpression') {
    return self.parseObjectExpression(ast, false);
  }
  else if(ast.type === 'Literal') {
    return ast.value;
  }
  else {
    _throw('parsePropertyValue: Unknown type: ' + ast.type);
  }
}
