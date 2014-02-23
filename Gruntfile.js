module.exports = function (grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		meta: {
			banner: '<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %> | Author: <%= pkg.author %>, <%= grunt.template.today("yyyy") %> | License: <%= pkg.license %>',
			defaultBanner: '/* <%= meta.banner %> */\n',
			unstrippedBanner: '/*! <%= meta.banner %> */'
		},

		concat: {
			options: {
				stripBanners: true,
				banner: '<%= meta.defaultBanner %>'
			},
			js: {
				src: ['src/kist-redraw.js'],
				dest: 'dist/kist-redraw.js'
			},
			css: {
				src: ['src/kist-redraw.css'],
				dest: 'dist/kist-redraw.css'
			},
		},

		uglify: {
			dist: {
				options: {
					banner: '<%= meta.unstrippedBanner %>\n'
				},
				files: {
					'dist/kist-redraw.min.js': ['src/kist-redraw.js']
				}
			}
		},

		cssmin: {
			dist: {
				options: {
					banner: '<%= meta.unstrippedBanner %>'
				},
				files: {
					'dist/kist-redraw.min.css': ['src/kist-redraw.css']
				}
			}
		},

		jscs: {
			main: {
				options: {
					config: '.jscs',
					'requireCurlyBraces': ['if', 'else', 'for', 'do', 'try', 'catch', 'case', 'default']
				},
				files: {
					src: [
						'src/kist-redraw.js'
					]
				}
			}
		},

		jshint: {
			main: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'src/kist-redraw.js'
				]
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: ['pkg'],
				commit: true,
				commitMessage: 'Release %VERSION%',
				commitFiles: ['-a'],
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false
			}
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-jscs-checker' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-bump' );

	grunt.registerTask( 'stylecheck', ['jshint:main', 'jscs:main'] );
	grunt.registerTask( 'default', ['concat:js', 'concat:css', 'uglify:dist', 'cssmin:dist'] );
	grunt.registerTask( 'releasePatch', ['bump-only:patch', 'default', 'bump-commit'] );
	grunt.registerTask( 'releaseMinor', ['bump-only:minor', 'default', 'bump-commit'] );
	grunt.registerTask( 'releaseMajor', ['bump-only:major', 'default', 'bump-commit'] );


};
