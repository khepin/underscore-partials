/**
 * To use grunt, refer to http://gruntjs.com/
 */
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['underscore-partials.js', 'specs/**/*.js']
    },
    clean: {
      build: ['build/']
    },
    uglify: {
      build: {
        src: ['underscore-partials.js'],
        dest: './build/underscore-partials.min.js'
      }
    },
    jasmine: {
      specs: {
        src : 'underscore-partials.js',
        options: {
          specs: 'specs/specs.js',
          vendor: 'bower_components/underscore/underscore.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', 'jshint');
  grunt.registerTask('test', 'jasmine');
  grunt.registerTask('build', ['jshint', 'clean', 'uglify']);
};
