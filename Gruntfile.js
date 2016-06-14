// Generated on 2014-06-29 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths
	var config = {
		app: 'app',
		dist: 'dist'
	};

	var nightwatch = require('nightwatch');
	nightwatch.initGrunt(grunt);
 
	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		config: config,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['bowerInstall']
			},
			js: {
				files: ['<%= config.app %>/scripts/{,*/}*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			jstest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['test:watch']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['sass:server', 'autoprefixer']
			},
			styles: {
				files: ['<%= config.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= config.app %>/images/{,*/}*'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect.static(config.app)
						];
					}
				}
			},
			test: {
				options: {
					port: 9000,
					hostname: '127.0.0.1.xip.io',
					keepalive: true,
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect.static(config.app)
						];
					}
				}
			},
			dist: {
				options: {
					base: '<%= config.dist %>',
					livereload: false
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= config.app %>/scripts/{,*/}*.js',
				'!<%= config.app %>/scripts/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},

		// Jasmine testing framework configuration options
		jasmine: {
			all: {
				options: {
					specs: 'test/jasmine/spec/{,*/}*.js'
				}
			}
		},

		nightwatch: {
			options: {
				cwd: './test/e2e',
				keepAlive: true
			},

			'default': {
				argv: {
					env: 'default'
				},
				settings: {
					configPath: 'test/e2e/nightwatch.json'
				}
			},


			// 'all': {
			//     argv: {
			//         env: 'chrome,firefox,safari'
			//     },
			//     settings: {
			//         config_path: 'test/e2e/nightwatch.json'
			//     }
			// }
		},

		shell: {
			pythonFullRun: {
				options: {
					stdout: true
				},
				command: 'python test/python-selenium/full_runner.py'
			},
			pythonSmoke: {
				options: {
					stdout: true
				},
				command: 'python test/python-selenium/smoke_suite.py'
			}
		},
		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				includePaths: [
					'bower_components'
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/styles',
					src: ['*.scss'],
					dest: '.tmp/styles',
					ext: '.css'
				}]
			},
			server: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/styles',
					src: ['*.scss'],
					dest: '.tmp/styles',
					ext: '.css'
				}]
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Automatically inject Bower components into the HTML file
		bowerInstall: {
			app: {
				src: ['<%= config.app %>/index.html'],
				exclude: ['bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap.js']
			},
			sass: {
				src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}']
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= config.dist %>/scripts/{,*/}*.js',
						'<%= config.dist %>/styles/{,*/}*.css',
						'<%= config.dist %>/images/{,*/}*.*',
						'<%= config.dist %>/styles/fonts/{,*/}*.*',
						'<%= config.dist %>/*.{ico,png}'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: '<%= config.dist %>'
			},
			html: '<%= config.app %>/index.html'
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/styles/{,*/}*.css']
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.{jpeg,jpg,png}',
					dest: '<%= config.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: '{,*/}*.html',
					dest: '<%= config.dist %>'
				}]
			}
		},

		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//     dist: {
		//         files: {
		//             '<%= config.dist %>/styles/main.css': [
		//                 '.tmp/styles/{,*/}*.css',
		//                 '<%= config.app %>/styles/{,*/}*.css'
		//             ]
		//         }
		//     }
		// },
		// uglify: {
		//     dist: {
		//         files: {
		//             '<%= config.dist %>/scripts/scripts.js': [
		//                 '<%= config.dist %>/scripts/scripts.js'
		//             ]
		//         }
		//     }
		// },
		// concat: {
		//     dist: {}
		// },

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.app %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'images/{,*/}*.webp',
						'{,*/}*.html',
						'styles/fonts/{,*/}*.*'
					]
				}, {
					expand: true,
					dot: true,
					cwd: '.',
					src: ['bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*.*'],
					dest: '<%= config.dist %>'
				}]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%= config.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		// Generates a custom Modernizr build that includes only the tests you
		// reference in your app
		modernizr: {
			dist: {
				devFile: 'bower_components/modernizr/modernizr.js',
				outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
				files: {
					src: [
						'<%= config.dist %>/scripts/{,*/}*.js',
						'<%= config.dist %>/styles/{,*/}*.css',
						'!<%= config.dist %>/scripts/vendor/*'
					]
				},
				uglify: true
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
				'sass:server',
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'sass',
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		}
	});


	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'build',
			'clean:server',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run([target ? ('serve:' + target) : 'serve']);
	});

	grunt.registerTask('test', function (target) {
		if (target !== 'watch') {
			grunt.task.run([
				'clean:server',
				'concurrent:test',
				'autoprefixer'
			]);
		}

		grunt.task.run([
			'connect:test',
			'jasmine',
			'nightwatch'
		]);
	});

	// This task will kick off the unit tests 1 time
	grunt.registerTask('test:unit', [
		'jasmine'
	]);

	// This task will kick off the "End to End" tests 1 time, requires 'grunt serve' to be running
	grunt.registerTask('test:e2e', [
		'nightwatch'
	]);

	// This task will kick off the "End to End" tests 1 time, requires 'grunt serve' to be running
	grunt.registerTask('test:pyfull', [
		'shell:pythonFullRun'
	]);

	grunt.registerTask('test:pysmoke', [
		'shell:pythonSmoke'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		'modernizr',
		'rev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);
};
