module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
 
        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),
 
        // Task configuration.
        sass: {
            dist: {
                files: {
                    'public/stylesheets/style.css': 'public/stylesheets/scss/style.scss'
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'public/stylesheets/style.css': 'public/stylesheets/style.css'  
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'public/stylesheets/scss/*.scss'

                ],
                tasks: ['sass', 'autoprefixer']
            }
        },
        concat: {
      options: {
        separator: '; \n',
      },
     /* dist: {
        src: ['public/javascripts/lib/angular.min.js', 'public/javascripts/lib/*.js'],
        dest: 'public/build/libraries.js',
      },
      files: {
        src: ['public/javascripts/indexpage/homepage_mod.js', 'public/javascripts/indexpage/login/login_toggle_anim.js', 'public/javascripts/indexpage/login/attemptlogin.service.js',
        'public/javascripts/indexpage/createaccount/createaccount.service.js',
        'public/javascripts/indexpage/login/angular_login.js',
        'public/javascripts/indexpage/createaccount/angular_create_account.js' ],
        dest: 'public/build/indexpag.js',
      },*/
      files: {
        src: ['public/javascripts/lib/angular.min.js', 'public/javascripts/lib/*.js',
        'public/javascripts/app.js',  'public/javascripts/StreamService.js', 'public/javascripts/UnLoadService.js', 'public/javascripts/streamController.js', 'public/javascripts/map.Directive.js'],
        dest: 'public/javascripts/main.js',
      }

  },

  uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/javascripts/main.js',
        dest: 'public/javascripts/main.min.js'
      }
    }
 
    });
 
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-usemin');
    // Default task.
    grunt.registerTask('default', ['sass', 'autoprefixer','concat', 'uglify',]);
 
};