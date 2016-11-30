const esprima = require('esprima');
const fs = require('fs');
const miminist = require('minimist');

var args = miminist(process.argv.slice(2));
var inFile = args.f;
var outFile = args.o;

fs.readFile(inFile, {encoding: 'utf8'}, function(err, contents){
  if (err) {
    console.error(err);
  }
  else {
    var ast = esprima.parse(contents);
    var json = JSON.stringify(ast, null, 2);
    fs.writeFile(outFile, json, function(err){
      if (err) {
        console.error(err);
      }
      else {
        console.log('Done.');
      }
    });
  }
});
