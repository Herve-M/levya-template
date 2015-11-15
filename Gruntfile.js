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
        font: './src/fonts/',
        bower: './bower_components/'
      },
      // Production where Grunt output the files
      css: './public/css/',
      js: './public/js/',
      font: './public/fonts/'
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
            "<%= paths.css %>bootstrap.css":"<%= paths.assets.css %>bootstrap.less",
            "<%= paths.css %>font-awesome.css":"<%= paths.assets.css %>font-awesome.less",
            //"<%= paths.css %>flexslider.css":"<%= paths.assets.css %>flexslider.less",
            "<%= paths.css %>theme-about-us.css":"<%= paths.assets.css %>theme-about-us.less",
            "<%= paths.css %>theme-base.css":"<%= paths.assets.css %>theme-base.less",
            "<%= paths.css %>theme-index.css":"<%= paths.assets.css %>theme-index.less",
            "<%= paths.css %>theme-blog.css":"<%= paths.assets.css %>theme-blog.less",
            "<%= paths.css %>theme-blog-item.css":"<%= paths.assets.css %>theme-blog-item.less",
            "<%= paths.css %>theme-faq.css":"<%= paths.assets.css %>theme-faq.less",
            "<%= paths.css %>theme-service.css":"<%= paths.assets.css %>theme-service.less",
          }
      },
      production: {
          options: {
            compress: true,
          },
          files: {
            "<%= paths.css %>bootstrap.min.css":"<%= paths.assets.css %>bootstrap.less",
            "<%= paths.css %>font-awesome.min.css":"<%= paths.assets.css %>font-awesome.less",
            //"<%= paths.css %>flexslider.min.css":"<%= paths.assets.css %>flexslider.less",
            "<%= paths.css %>theme-about-us.min.css":"<%= paths.assets.css %>theme-about-us.less",
            "<%= paths.css %>theme-base.min.css":"<%= paths.assets.css %>theme-base.less",
            "<%= paths.css %>theme-index.min.css":"<%= paths.assets.css %>theme-index.less",
            "<%= paths.css %>theme-blog.min.css":"<%= paths.assets.css %>theme-blog.less",
            "<%= paths.css %>theme-blog-item.min.css":"<%= paths.assets.css %>theme-blog-item.less",
            "<%= paths.css %>theme-faq.min.css":"<%= paths.assets.css %>theme-faq.less",
            "<%= paths.css %>theme-service.min.css":"<%= paths.assets.css %>theme-service.less",
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
          {
            src: "<%= paths.assets.bower %>flexslider/jquery.flexslider.js", dest: "<%= paths.js %>jquery.flexslider.js",
          },
          {
            cwd: "<%= paths.assets.bower %>bootstrap/fonts/", src: "*.*", dest: "<%= paths.font %>", expand: true,
          },
          {
            cwd: "<%= paths.assets.bower %>font-awesome/fonts/", src: "*.*", dest: "<%= paths.font %>", expand: true,
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
          {
            src: "<%= paths.assets.bower %>flexslider/jquery.flexslider-min.js", dest: "<%= paths.js %>jquery.flexslider-min.js",
          },
          {
            cwd: "<%= paths.assets.bower %>bootstrap/fonts/", src: "*.*", dest: "<%= paths.font %>", expand: true,
          },
          {
            cwd: "<%= paths.assets.bower %>font-awesome/fonts/", src: "*.*", dest: "<%= paths.font %>", expand: true,
          },
        ],
      },
    },
    clean: {
      development: {
        src: ["<%= paths.js %>*.js", "<%= paths.css %>*.css", "<%= paths.font %>*"]
      },
      production: {
        src: ["<%= paths.js %>*.min.js", "<%= paths.css %>*.min.js", "<%= paths.font %>*"]
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
