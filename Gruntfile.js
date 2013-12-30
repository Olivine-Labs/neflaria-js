module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      production: {
        files: {
          './dist/neflaria.js': './index.js',
          './dist/neflaria.min.js': './index.js'
        }
      }
    },

    uglify: {
      production: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
          dead_code: true
        },

        files: {
          './dist/neflaria.min.js': ['./dist/neflaria.min.js']
        }
      }
    },

    watch: {
      scripts: {
        files: './src/**/*.js',
        tasks: ['browserify:production', 'uglify:production'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('production', ['browserify:production', 'uglify:production']);
};



