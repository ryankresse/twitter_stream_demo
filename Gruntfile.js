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
 
        watch: {
            scripts: {
                files: [
                    'public/stylesheets/scss/*.scss'
                ],
                tasks: ['sass']
            }
        }
 
    });
 
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    // Default task.
    grunt.registerTask('default', ['sass']);
 
};