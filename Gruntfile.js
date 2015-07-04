//Gruntfile
module.exports = function(grunt) {

  //Initializing the configuration object
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Paths variables
    paths: {
      // Development where put LESS files, etc
      assets: {
        css: './src/less/',
        js: './src/js/',
        font: './src/font/',
        bower: './bower_components/'
      },
      // Production where Grunt output the files
      css: './public/css/',
      js: './public/js/',
      font: './public/font/'
    },

    // Task configuration
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['Grunfile.js', "<%= paths.assets.js %>*.js"]
    },
    less: {
      development: {
          options: {
            compress: false,
          },
          files: {
            //Bootstrap
            "<%= paths.css %>bootstrap.css":"<%= paths.assets.css %>bootstrap.less",
            //compiling wordpress.less into wordpress.css
            "<%= paths.css %>wordpress.css":"<%= paths.assets.css %>wordpress.less",
          }
      },
      production: {
          options: {
            compress: true,
          },
          files: {
            //Bootstrap
            "<%= paths.css %>bootstrap.min.css":"<%= paths.assets.css %>bootstrap.less",
            //compiling wordpress.less into wordpress.min.css
            "<%= paths.css %>wordpress.min.css":"<%= paths.assets.css %>wordpress.less",
          }
      }
    },
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      development: {
      },
      production: {
        files: {
          "<%= paths.js %>wordpress_index.js":"<%= paths.assets.js %>wordpress_index.js",
        }
      },
    },
    copy: {
      js: {
        files: [
          {
            cwd: "<%= paths.assets.js %>", src: "*.js", dest: "<%= paths.js %>", expand: true,
          },
        ],
      },
      development: {
        files: [
          {
            src: "<%= paths.assets.bower %>bootstrap/dist/js/bootstrap.js", dest: "<%= paths.js %>bootstrap.js",
          },
          {
            src: "<%= paths.assets.bower %>jquery/dist/jquery.js", dest: "<%= paths.js %>jquery.js",
          },
        ],
      },
      production: {
        files: [
          {
            src: "<%= paths.assets.bower %>bootstrap/dist/js/bootstrap.min.js", dest: "<%= paths.js %>bootstrap.min.js",
          },
          {
            src: "<%= paths.assets.bower %>jquery/dist/jquery.min.js", dest: "<%= paths.js %>jquery.min.js",
          },
        ],
      },
    },
    clean: {
      development: {
        src: ["<%= paths.js %>*.js", "<%= paths.css %>*.css"]
      },
      production: {
        src: ["<%= paths.js %>*.min.js", "<%= paths.css %>*.min.js"]
      }
    },
    watch: {
      less: {
        files: ['<%= paths.assets.css %>*.less'],
        tasks: ['less:development'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= paths.assets.js %>*.js'],
        tasks: ['jshint:all', 'copy:js'],
      }
    }
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Task definition
  grunt.registerTask('default', ['watch']);

  // this task will only run the dev configuration
  grunt.registerTask('dev', ['jshint:all', 'uglify:development', 'less:development', 'copy:development']);

  // only run production configuration
  grunt.registerTask('prod', ['jshint:all', 'uglify:production', 'less:production', 'copy:production']);

};
