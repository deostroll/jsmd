var entity = require('./../src/entity');
var ModelBuilder = entity.ModelBuilder;
var esprima = require('esprima');
var minimist = require('minimist');
var fs = require('fs');
var path = require('path');

var args = minimist(process.argv.slice(2));

fs.readFile(args.f, {encoding: 'utf8'}, function(err, contents){
  if (err) {
    console.error(err);
  }
  else {
    var basename = path.basename(args.f, '.json');
    var ast = JSON.parse(contents);
    var model = ModelBuilder.walk(ast);
    var json = JSON.stringify(model, null, 2);
    var dir = path.dirname(args.o);
    var target = path.join(dir, basename + "_model.json" );
    fs.writeFile(target, json, function(err){
      if (err) {
        console.error(err);
      }
      else {
        console.log('Done.');
      }
    })
  }
});
