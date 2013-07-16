/*
 * grunt-contrib-jshint
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jsbint: {
      all_files: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      individual_files: {
        files: [
          {src: 'Gruntfile.js'},
          {src: 'tasks/*.js'},
          {src: '<%= nodeunit.tests %>'},
        ]
      },
      options: {
        jshintrc: '.jshintrc',
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jsbint']);

};
