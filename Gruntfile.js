var path = require('path');

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
        ]
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
    }
  };

  var copyConfig = {
    dev: {
      files: [
        {
          expand: true,
          flatten: true,
          src: 'src/*',
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
      tasks: ['concat:dev', 'copy:dev', 'copy:vendor']
    }
  };

  var connectConfig = {
    dev: {
      options: {
        livereload: true,
        port: 4582,
        base: 'web',
        hostname: 'localhost'
      },

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

};
