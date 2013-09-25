module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        component: {
            build:{
            options: {
                args: {
                    out: 'dist',
                    name: '<%= pkg.name %>',
                    //"no-require":true,
                    standalone:'liar'
                }
            }}
        },
        uglify: {
            options: {
                report: 'gzip',
                mangle: {
                    except: ['Promise']
                }
            },
            all: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                jshintrc: "./.jshintrc"
            },
            all: ['lib/*.js']
        }

    });
    grunt.loadNpmTasks('grunt-component');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.registerTask('test',function(){
         var done = this.async();
         test(function(err){
             if(err){
                 grunt.log.error(err);
             }
             done();
         });
     });
    grunt.registerTask('default', ['jshint','component','uglify']);
};