/* eslint-disable @typescript-eslint/no-var-requires */
const webpackConfigDev = require('./webpack.config.dev.js')
const webpackConfigProd = require('./webpack.config.js')

module.exports = function (grunt) {
  /* ---------------------------------------------- TASKS --------------------------------------------------------- */

  // Default task
  grunt.registerTask('default', [
    'build-dev'
  ])

  // Build the project optimized for production
  grunt.registerTask('build-dev',
    'Build the development version of the project.',
    function () {
      grunt.task.run('clean:dev')
      grunt.task.run('copy:dev')
      grunt.task.run('webpack:dev')

      // grunt.task.run('requirejs:build_background');
      // grunt.task.run('requirejs:build_popup');
      // grunt.task.run('replace:build_background');
      // grunt.task.run('replace:build_popup');
    })

  /* ---------------------------------------------- CONFIGURATIONS ------------------------------------------------ */
  // Project configuration.
  grunt.initConfig({
    package_json: grunt.file.readJSON('package.json'),
    manifest_json: grunt.file.readJSON('src/manifest.json'),
    clean: {
      dev: ['build-dev/*']
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: 'src',
            src: [
              'manifest.json',
              'background.html',
              'settings.html',
              'popup.html'
            ],
            dest: 'build-dev'
          },
          {
            expand: true,
            flatten: false,
            cwd: 'src',
            src: [
              'images/**/*.png',
              'css/**/*.css',
              '_locales/**/*.json'
            ],
            dest: 'build-dev'
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
  grunt.loadNpmTasks('grunt-webpack')
  // grunt.loadNpmTasks('grunt-replace');
  // grunt.loadNpmTasks('grunt-ngmin');
  // grunt.loadNpmTasks('grunt-contrib-uglify');/*do we need this?*/
  // grunt.loadNpmTasks('grunt-contrib-requirejs');
  // grunt.loadNpmTasks('grunt-crx');

  /* ----------------------------------------- SUB TASKS ---------------------------------------------------------- */
}
