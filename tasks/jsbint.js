/*
 * grunt-jsbint
 * http://gmu.baidu.com/
 *
 * Copyright (c) 2012 GMU Team, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var jsbint = require('./lib/jsbint').init(grunt);

  grunt.registerMultiTask('jsbint', 'Validate files with JSBint.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();

    // Read JSBint options from a specified jshintrc file.
    if (options.jshintrc) {
      options = grunt.file.readJSON(options.jshintrc);
    }
    // If globals weren't specified, initialize them as an empty object.
    if (!options.globals) {
      options.globals = {};
    }
    // Convert deprecated "predef" array into globals.
    if (options.predef) {
      options.predef.forEach(function(key) {
        options.globals[key] = true;
      });
      delete options.predef;
    }
    // Extract globals from options.
    var globals = options.globals;
    delete options.globals;

    grunt.verbose.writeflags(options, 'JSBint options');
    grunt.verbose.writeflags(globals, 'JSBint globals');

    // Lint specified files.
    var files = this.filesSrc;
    files.forEach(function(filepath) {
      jsbint.lint(grunt.file.read(filepath), options, globals, filepath);
    });

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.ok(files.length + ' file' + (files.length === 1 ? '' : 's') + ' lint free.');
  });

};
