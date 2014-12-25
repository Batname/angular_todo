module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // здесь будут настроенные нами таски
        watch : {
            jade : {
                files : 'views/**/*.jade',
                tasks : 'jade'
            },
            coffee : {
                files : 'public/javascripts/*.coffee',
                tasks : 'coffee'
            },
            sass : {
                files : 'public/stylesheets/*.scss',
                tasks : 'sass'
            }
        },
        express : {
            dev: {
                options: {
                    script: './bin/www'
                }
            }
        },
        jade : {
            dist: {
                files: {
                    'public/index.html': 'views/index.jade',
                    'public/views/partials/phone-detail.html': 'views/partials/phone-detail.jade',
                    'public/views/partials/phone-list.html': 'views/partials/phone-list.jade'
                }
            }
        },
        sass : {
            dist: {
                files: {
                    'public/stylesheets/style.css': 'public/stylesheets/style.scss'
                }
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: ['public/stylesheets'],
                    cssDir: ['public/stylesheets'],
                    environment: 'development'
                }
            }
        },
        coffee : {
            compile: {
                files: {
                    'public/javascripts/app.js': ['public/javascripts/*.coffee']
                }
            }
        }
    });

    // здесь будут подключаться необходимые модули
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-express-server');

    // а здесь - вызываться таски
    grunt.registerTask('default', ['sass', 'coffee', 'jade', 'express', 'watch']);
};