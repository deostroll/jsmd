function Entity(name) {
  this.name = name;
  this.fields = [];
}

Entity.prototype.add = function(fieldInfo) {
  this.fields.push(fieldInfo);
};

var ModelBuilder = {
  walk: function(ast) {
    var model = {
      name: null,
      entities: null
    };

    this.entities = [];

    model.getEntity = function(name) {
      var entities = this.entities;
      return entities.filter(function(e) { return e.name === name; })[0]
    };

    model.name = 'model';
    if(ast.type === 'Program') {
      this.parseProgramBody(ast.body);
      model.name = this.name;
      model.entities = this.entities;
      return model;
    }
  }
};

function _throw(msg) {
  throw new Error(msg);
};

function _stringify(obj) { return JSON.stringify(obj); }

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
    // var entity = self.parseVariableDeclarator(dec);
    // // console.log(JSON.stringify(entity));
    // self.entities.push(entity);
    self.parseVariableDeclarator(dec);
  });
};

ModelBuilder.parseVariableDeclarator = function parseVariableDeclarator(ast) {
  var self = this;
  console.assert(ast.type === 'VariableDeclarator');

  if (ast.init) {
    if (ast.init.type === 'ObjectExpression') {
      var entity = new Entity(ast.id.name);
      var fInfo = this.parseObjectExpression(ast.init);
      var fields = [];
      var $key = [];
      fInfo.forEach(function(item){
        if (item.type === 'field') {
          fields.push(item);
        }
        else if (item.type === 'IdentityConstraint') {
          $key = item.value;
        }
      });
      entity.fields = fields;
      entity.$key = $key;
      self.entities.push(entity);
    }
    else if (ast.init.type === 'ArrayExpression') {
      self.name = ast.id.name;
    }
    else {
      throw new Error('VariableDeclarator parsing: Unknown init type: ' + ast.init.type);
    }
  }
  else {
    throw new Error('VariableDeclarator has no init')
  }
};

ModelBuilder.parseObjectExpression = function parseObjectExpression(ast, firstLevel) {
  var self = this;

  if (typeof firstLevel === 'undefined') {
    firstLevel = true;
  }
  console.assert(ast.type === 'ObjectExpression');

  if (firstLevel) {
    var fields = [];
    ast.properties.forEach(function(prop){
      if (prop.type === 'Property' && prop.key.type === 'Identifier') {
        fields.push({
          type: 'field',
          name: prop.key.name,
          def: self.parseDef(prop.value)
        })
      }
      else if(prop.type === 'Property' && prop.key.type === 'Literal' && prop.value.type === 'ArrayExpression') {
        fields.push({
          type: 'IdentityConstraint',
          value: self.parseArrayExpression(prop.value)
        });
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
  else if (ast.type === 'MemberExpression') {
    var result = self.parseMemberExpression(ast);
    return result;
  }
  else {

    _throw('parseDef: Unknown type: ' + ast.type);
  }
};

ModelBuilder.parsePropertyValue = function parsePropertyValue(ast) {
  var self = this;
  // debugger;
  if (ast.type === 'ObjectExpression') {
    return self.parseObjectExpression(ast, false);
  }
  else if(ast.type === 'Literal') {
    return ast.value;
  }
  else {
    _throw('parsePropertyValue: Unknown type: ' + ast.type);
  }
};

ModelBuilder.parseArrayExpression = function parseArrayExpression(ast) {
  console.assert(ast.type === 'ArrayExpression');
  var elements = [];
  ast.elements.forEach(function(el){
    if (el.type === 'Literal') {
      elements.push(el.value)
    }
    else {
      _throw('parseArrayExpression: Unknown type: ', el.type);
    }
  });
  return elements;
};

ModelBuilder.parseMemberExpression = function parseMemberExpression(ast) {
  console.assert(ast.type === 'MemberExpression');
  var result = {};
  if (ast.object && ast.object.type === 'Identifier') {
    result.entityName = ast.object.name;
  }
  else {
    _throw('parseMemberExpression: Unknown object: ' + _stringify(ast.object));
  }

  if (ast.property && ast.property.type === 'Identifier') {
    result.fieldName = ast.property.name;
  }
  else {
    _throw('parseMemberExpression: Unknown property: ' + stringify(ast.property));
  }
  result.type = 'reference';
  return result;
};
