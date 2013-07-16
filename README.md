# grunt-jsbint

> Validate files with jsbint.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsbint --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsbint');
```




## Jsbint task
_Run this task with the `grunt jsbint` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

Any specified option will be passed through directly to [jsbint][], thus you can specify any option that jsbint supports. See the [jsbint documentation][] for a list of supported options.

[jsbint]: http://www.jsbint.com/
[jsbint documentation]: http://www.jsbint.com/docs/

A few additional options are supported:

#### globals
Type: `Object`
Default value: `null`

A map of global variables, with keys as names and a boolean value to determine if they are assignable. This is not a standard jsbint option, but is passed into the `jsbint` function as its third argument. See the [jsbint documentation][] for more information.

#### jshintrc
Type: `String`
Default value: `null`

If this filename is specified, options and globals defined therein will be used. The `jshintrc` file must be valid JSON and looks something like this:

```json
{
  "curly": true,
  "eqnull": true,
  "eqeqeq": true,
  "undef": true,
  "globals": {
    "jQuery": true
  }
}
```

### Usage examples

#### Wildcards
In this example, running `grunt jsbint:all` (or `grunt jsbint` because `jsbint` is a [multi task][]) will lint the project's Gruntfile as well as all JavaScript files in the `lib` and `test` directories and their subdirectores, using the default jsbint options.

```js
// Project configuration.
grunt.initConfig({
  jsbint: {
    all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
  }
});
```

#### Linting before and after concatenating
In this example, running `grunt jsbint` will lint both the "beforeconcat" set and "afterconcat" sets of files. This is not ideal, because `dist/output.js` may get linted before it gets created via the [grunt-contrib-concat plugin](https://github.com/gruntjs/grunt-contrib-concat) `concat` task.

In this case, you should lint the "beforeconcat" files first, then concat, then lint the "afterconcat" files, by running `grunt jsbint:beforeconcat concat jsbint:afterconcat`.

```js
// Project configuration.
grunt.initConfig({
  concat: {
    dist: {
      src: ['src/foo.js', 'src/bar.js'],
      dest: 'dist/output.js'
    }
  },
  jsbint: {
    beforeconcat: ['src/foo.js', 'src/bar.js'],
    afterconcat: ['dist/output.js']
  }
});
```

#### Specifying jsbint options and globals

In this example, custom jsbint options are specified. Note that when `grunt jsbint:uses_defaults` is run, those files are linted using the default options, but when `grunt jsbint:with_overrides` is run, those files are linted using _merged_ task/target options.

```js
// Project configuration.
grunt.initConfig({
  jsbint: {
    options: {
      curly: true,
      eqeqeq: true,
      eqnull: true,
      browser: true,
      globals: {
        jQuery: true
      },
    },
    uses_defaults: ['dir1/**/*.js', 'dir2/**/*.js'],
    with_overrides: {
      options: {
        curly: false,
        undef: true,
      },
      files: {
        src: ['dir3/**/*.js', 'dir4/**/*.js']
      },
    }
  },
});
```
