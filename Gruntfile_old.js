module.exports = function (grunt) {
    /* ---------------------------------------------- TASKS --------------------------------------------------------- */

    // Default task
    grunt.registerTask('default', [
        'setup-project'
    ]);

    // Project setup for development (mainly copy vendor (node_modules) files under PPMClient dir)
    grunt.registerTask("setup-project",
        "Setup project so that the extension can be loaded into the browser",
        function () {
            grunt.task.run('clean:setup_vendor');
            grunt.task.run('copy:setup_vendor');
        });

    // Build the project optimized for production
    grunt.registerTask("build-project",
        "Build Project files",
        function () {
            grunt.task.run('clean:build_before');
            grunt.task.run('copy:build');
            grunt.task.run('requirejs:build_background');
            grunt.task.run('requirejs:build_popup');
            grunt.task.run('replace:build_background');
            grunt.task.run('replace:build_popup');
        });

    // Create .crx package for distribution
    grunt.registerTask("pack-project", "Build Project files", function () {
        //TBD
    });

    /* ---------------------------------------------- CONFIGURATIONS ------------------------------------------------ */
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        manifest: grunt.file.readJSON('PPMClient/manifest.json'),
        clean: {
            setup_vendor: ['PPMClient/vendor/js'],
            build_before: ['build']
        },
        copy: {
            setup_vendor: {
                files: [
                    /* Generic JS */
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'node_modules',
                        src: [
                            /* JS */
                            'bluebird/js/browser/bluebird.js',
                            'jquery/dist/jquery.js',
                            'requirejs/require.js',
                            'requirejs-domready/domReady.js',
                            'underscore/underscore.js',
                            'backbone/backbone.js',
                            'bootstrap/dist/js/bootstrap.bundle.js',
                        ],
                        dest: 'PPMClient/vendor/js'
                    },
                    /* Crypto JS Suite */
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'node_modules',
                        src: [
                            'crypto-js/*.js',
                        ],
                        dest: 'PPMClient/vendor/js/crypto-js'
                    },
                    /* CSS */
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'node_modules',
                        src: [
                            'bootstrap/dist/css/bootstrap.css',
                            'bootstrap/dist/css/bootstrap-grid.css',
                            'bootstrap/dist/css/bootstrap-reboot.css',
                        ],
                        dest: 'PPMClient/vendor/css'
                    },
                    /* FONTAWESOME */
                    // {
                    //     expand: true,
                    //     flatten: false,
                    //     cwd: 'node_modules/@fontawesome/fontawesome-free',
                    //     src: [
                    //         'css/fontawesome.css',
                    //         'css/solid.css',
                    //         'css/brands.css',
                    //         'webfonts/*',
                    //     ],
                    //     dest: 'PPMClient/vendor/css/fontawesome'
                    // },
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'PPMClient',
                        src: ['**/*', '!**/node_modules/**'],
                        dest: 'build/tmp'
                    }
                ]
            }
        },
        requirejs: {
            options: {
                optimize: 'none'
            },
            build_background: {
                options: {
                    baseUrl: 'build/tmp/app/background/',
                    name: 'bootstrap',
                    mainConfigFile: 'build/tmp/app/background/requirejs.config.js',
                    paths: {
                        requireLib: '../..//vendor/requirejs/require'
                    },
                    include: [
                        'requireLib'
                    ],
                    out: 'build/tmp/app/background.min.js',
                    optimize: 'uglify',
                    preserveLicenseComments: false,
                    inlineText: true
                }
            },
            build_popup: {
                options: {
                    baseUrl: 'build/tmp/app/popup/',
                    name: 'bootstrap',
                    mainConfigFile: 'build/tmp/app/popup/requirejs.config.js',
                    paths: {
                        requireLib: '../..//vendor/requirejs/require'
                    },
                    include: [
                        'requireLib'
                    ],
                    out: 'build/tmp/app/popup.min.js',
                    optimize: 'uglify',
                    uglify: {
                        mangle: false /*!this is for angular!*/
                    },
                    preserveLicenseComments: false,
                    inlineText: true
                }
            }
        },
        replace: {
            build_background: {
                options: {
                    patterns: [
                        {
                            match: /<script.*src="\.\.\/vendor\/requirejs\/require\.js".*<\/script>/g,
                            replacement: '<script src="background.min.js"></script>'
                        }
                    ]
                },
                files: [
                    {
                        src: 'build/tmp/app/background.html',
                        dest: 'build/tmp/app/background.html'
                    }
                ]
            },
            build_popup: {
                options: {
                    patterns: [
                        {
                            match: /<script.*src="\.\.\/vendor\/requirejs\/require\.js".*<\/script>/g,
                            replacement: '<script src="popup.min.js"></script>'
                        }
                    ]
                },
                files: [
                    {
                        src: 'build/tmp/app/popup.html',
                        dest: 'build/tmp/app/popup.html'
                    }
                ]
            }
        },
        /*This is only for me - you shouldn't have my key ;)*/
        crx: {
            final: {
                "src": ["build/tmp/"],
                "dest": "build/crx/<%= pkg.name %>-<%= manifest.version %>.crx",
                "privateKey": "~/.ssh/ParanoiaPasswordManager2.pem"
            }
        }
    });


    /* ------------------------------------------- PLUGINS ---------------------------------------------------------- */
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-replace');
    // grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');/*do we need this?*/
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-crx');


    /* ----------------------------------------- SUB TASKS ---------------------------------------------------------- */

};