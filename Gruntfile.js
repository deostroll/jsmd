var path = require('path');
var fs = require('fs');
// var bodyParser = require('body-parser');
var qs = require('qs');

var enableREST = function(req, res, next){
  if (req.method === 'POST') {
    var body = '';
    req.on('data', d => body += d );
    req.on('end', () => {
      // fs.writeFile('ast.json', JSON.stringify(qs.parse(body), null, 2), () => res.end());
      var obj = qs.parse(body);
      var car = JSON.parse(obj.ast);
      var json = JSON.stringify(car, null, 2);
      fs.writeFile('ast.json', json, () => res.end());
    });
  }
  else {
    next();
  }
};

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var concatConfig = {
    dev: {
      files: {
        'web/vendor.js' : [
          'node_modules/esprima/dist/esprima.js',
          'node_modules/knockout/build/output/knockout-latest.js',
          'node_modules/konva/konva.js',
          'node_modules/jquery/dist/jquery.js',
          'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        'web/vendor.css' : [
          'node_modules/bootstrap/dist/css/bootstrap.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.css'
        ],
        'web/main.js' : [
          'src/*.js',
          'src/main.js',
          '!src/sample.js'
        ]
      },
      options: {
        sourceMap: true
      }
    },
    build: {
      files: {
        'build/vendor.js' : [
          'node_modules/esprima/dist/esprima.js',
          'node_modules/knockout/build/output/knockout-latest.js',
          'node_modules/konva/konva.js',
          'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        'build/vendor.css' : [
          'node_modules/bootstrap/dist/css/bootstrap.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.css'
        ]
      }
    },
    test: {
      files: {
        'tests/web/vendor.js' : [
          'node_modules/mocha/mocha.js',
          'node_modules/chai/chai.js',
          'node_modules/jquery/dist/jquery.js'
        ],
        'tests/web/main.js' : [
          'src/*.js',
          '!src/main.js',
          '!src/sample.js'
        ],
        'tests/web/vendor.css' : [
          'node_modules/mocha/mocha.css'
        ],
        'tests/web/all.js' : [
          'tests/files/*.js'
        ]
      }
    },
    // 'test-main' : {
    //   files: [
    //     'src/*.js',
    //     'src/main.js',
    //     '!src/sample.js'
    //   ]
    // }
  };

  var copyConfig = {
    dev: {
      files: [
        {
          expand: true,
          flatten: true,
          src: ['src/*', '!src/*.js', 'src/sample.js'],
          dest: 'web'
        }
      ]
    },
    vendor: {
      files: [
        {
          expand: true,
          flatten: true,
          src: 'node_modules/bootstrap/dist/fonts/*',
          dest: 'web/fonts'
        }
      ]
    },
    build: {
      files: [
        {
          expand: true,
          flatten: true,
          src: 'src/*',
          dest: 'build'
        }
      ]
    },
    test: {
      files: [
        {
          expand: true,
          flatten: true,
          src: 'tests/index.html',
          dest:'tests/web'
        }
      ]
    }
  };

  var watchConfig = {
    dev: {
      files: ['src/*'],
      tasks: ['copy:dev'],
      options: {
        livereload: '<%= connect.dev.options.livereload %>'
      }
    },
    gruntfile: {
      files: ['Gruntfile.js'],
      tasks: ['concat', 'copy']
    },
    test: {
      files: ['tests/files/*.js', 'src/*.js', '!src/sample.js'],
      tasks: ['concat:test'],
      options: {
        livereload: '<%= connect.test.options.livereload %>'
      }
    }
  };

  var connectConfig = {
    dev: {
      options: {
        livereload: true,
        port: 4582,
        base: 'web',
        hostname: 'localhost',
        middleware: function(connect, options, middlewares) {

          // middlewares.unshift(bodyParser.urlencoded({extended: true}));
          // middlewares.push(function(req, res) {
          //   console.log('method:', req.method);
          //   if (req.method === 'POST') {
          //     console.log('Body:', req.body);
          //   }
          // })

          // var postHandler = connect().use('/ast', function(req, res) {
          //   console.log('post handler');
          // });
          // return [middlewares, postHandler];
          middlewares.unshift(enableREST);
          return middlewares;
        }
      }
    },
    test: {
      options: {
        port: 4583,
        livereload: 11236,
        base: ['tests/web', 'tests/data']
      }
    }
  };

  grunt.initConfig({
    concat: concatConfig,
    copy: copyConfig,
    watch: watchConfig,
    connect: connectConfig
  });

  grunt.registerTask('build', ['concat:build', 'copy:build']);
  grunt.registerTask('default', ['concat:dev', 'copy:dev', 'copy:vendor', 'connect', 'watch']);
  grunt.registerTask('test', ['concat:test', 'copy:test', 'watch:test'])
};
