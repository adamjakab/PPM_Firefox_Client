/* eslint-disable @typescript-eslint/no-var-requires */
const webpackConfigDev = require('./webpack.config.dev.js')
const webpackConfigProd = require('./webpack.config.js')

module.exports = function (grunt) {
  /* ---------------------------------------------- TASKS --------------------------------------------------------- */

  // Default task
  grunt.registerTask('default', [
    'build_dev'
  ])

  grunt.registerTask('build_dev',
    'Build the development version of the project.',
    function () {
      grunt.task.run('clean:dev')
      grunt.task.run('build_dev.copy_static')
      grunt.task.run('build_dev.copy_devel')
      grunt.task.run('build_dev.sass_compile')
      grunt.task.run('build_dev.webpack')
    })

  grunt.registerTask('build_dev.copy_static',
    'Copy the static files which don\'t change very often.',
    function () {
      grunt.task.run('copy:dev_static')
    })

  grunt.registerTask('build_dev.copy_devel',
    'Copy the development files which change often.',
    function () {
      grunt.task.run('copy:dev_devel')
    })

  grunt.registerTask('build_dev.sass_compile',
    'Compile the scss files into css.',
    function () {
      grunt.task.run('sass:dev')
    })

  grunt.registerTask('build_dev.webpack', [
    'webpack:dev'
  ])

  /* ---------------------------------------------- CONFIGURATIONS ------------------------------------------------ */
  // Project configuration.
  grunt.initConfig({
    package_json: grunt.file.readJSON('package.json'),
    manifest_json: grunt.file.readJSON('src/manifest.json'),
    clean: {
      dev: ['build-dev/*']
    },
    copy: {
      /** Copy resources which are not (often) changed during the development process */
      dev_static: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              'manifest.json'
            ],
            dest: 'build-dev'
          },
          {
            expand: true,
            flatten: false,
            cwd: 'src',
            src: [
              'images/**/*.png',
              '_locales/**/*.json'
            ],
            dest: 'build-dev'
          }
        ]
      },
      dev_devel: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              'background.html',
              'settings.html',
              'popup.html'
            ],
            dest: 'build-dev'
          }
        ]
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          update: true /* only compile changed files */
        },
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['css/**/*.scss'],
            dest: 'build-dev',
            ext: '.css'
          }
        ]
      }
    },
    webpack: {
      dev: webpackConfigDev,
      prod: webpackConfigProd
    }
  })

  /* ------------------------------------------- PLUGINS ---------------------------------------------------------- */
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-webpack')
  // grunt.loadNpmTasks('grunt-replace');
  // grunt.loadNpmTasks('grunt-ngmin');
  // grunt.loadNpmTasks('grunt-contrib-uglify');/*do we need this?*/
  // grunt.loadNpmTasks('grunt-contrib-requirejs');
  // grunt.loadNpmTasks('grunt-crx');

  /* ----------------------------------------- SUB TASKS ---------------------------------------------------------- */
}
