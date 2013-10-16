module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            all: {
				files: {
					'dist/<%= pkg.name %>.js': ['lib/index.js'],
				},
				options: {
					standalone: '<%= pkg.name %>'
				}
			}
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
    grunt.loadNpmTasks('grunt-browserify');
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
    grunt.registerTask('default', ['jshint','browserify','uglify']);
};