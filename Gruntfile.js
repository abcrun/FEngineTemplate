module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');
	var $GRUNTCONFIG = grunt.file.readJSON('GRUNTCONFIG.json');
	var version = pkg.version, name = pkg.name;

	// 构建任务配置
	grunt.initConfig({
		clean: {
			dist: ['dist']
		},
		copy: {
			images: {
				files: [{
					expand: true,
					cwd: 'src/images',
					src: '**',
					dest: 'dist/' + version + '/images'
				},
				{
					expand: true,
					cwd: 'src/css/icons',
					src: '**',
					dest: 'dist/' + version + '/css/icons'
				}]
			}
		},
		cssmin: {
			min: {
				files: [{
					expand: true,
					cwd: 'src/css',
					src: '**.css',
					dest: 'dist/' + version + '/css/'
				}]
			}
		},
		uglify: {
			min: {
				files: [{
					expand: true,
					cwd: 'src/js',
					src: '**.js',
					dest: 'dist/' + version + '/js/'
				}]
			}
		},
		replace: {
			html: {
				src: ['src/html/*.html'],
				dest: 'dist/html/',
				replacements: [{
					from: 'GruntEnvironment',
					to: '<%= grunt.environment %>'
				}]
			},
			inc: {
				src: ['src/html/inc/*.inc'],
				dest: 'dist/html/inc/',
				replacements: [{
					from: /\$GRUNTCONFIG\.environment\.(\w+)/g,
					to: function(matched) {
						var key = arguments[3],
						environment = grunt.environment;
						return $GRUNTCONFIG[environment][key];
					}
				}]
			}
		},
		shell: {
			tar: {
				command: ['mkdir -p dist/archive', 'cd dist/archive', 'zip -r ' + name + '_' + version + '.zip ../html', 'zip -r ' + name + '.zip ../' + version + ' ../build.js', 'tar -cvf' + name + '.tar *.zip'].join('&&')
			},
            scp :{
                command: ''//Move tar to different server
            }
		}
	});

	grunt.registerTask('uat', 'uat环境', function() {
		grunt.environment = 'UAT';
		grunt.task.run(['clean', 'copy', 'cssmin', 'uglify', 'replace', 'shell']);
	});
	grunt.registerTask('production', "灰度/生产环境", function() {
		grunt.environment = 'PRODUCTION';
		grunt.task.run(['clean', 'copy', 'cssmin', 'uglify', 'replace', 'shell']);
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-shell');
}

