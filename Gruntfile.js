/* eslint-disable @typescript-eslint/no-var-requires */
const webpackConfigDev = require('./webpack.config.dev.js')
const webpackConfigProd = require('./webpack.config.js')
const privateSecrets = require('./private/secrets.json')

module.exports = function (grunt) {
  /* ---------------------------------------------- TASKS --------------------------------------------------------- */

  // Default task
  grunt.registerTask('default', ['build_dev'])

  // Development build
  grunt.registerTask('build_dev',
    'Build the development version of the project.',
    function () {
      grunt.task.run('build_dev.clean_up')
      grunt.task.run('build_dev.copy_static')
      grunt.task.run('build_dev.sass_compile')
      grunt.task.run('build_dev.webpack')
    })

  grunt.registerTask('build_dev.clean_up',
    'Clean up the build-dev folder.',
    function () {
      grunt.task.run('clean:dev')
    })

  grunt.registerTask('build_dev.copy_static',
    'Copy the static files.',
    function () {
      grunt.task.run('copy:dev_static')
    })

  grunt.registerTask('build_dev.sass_compile',
    'Compile the scss files into css.',
    function () {
      grunt.task.run('sass:dev')
    })

  grunt.registerTask('build_dev.webpack', [
    'webpack:dev'
  ])

  // Production build
  grunt.registerTask('build_prod',
    'Build the production version of the project.',
    function () {
      grunt.task.run('clean:prod')
      grunt.task.run('copy:prod_static')
      grunt.task.run('sass:prod')
      grunt.task.run('webpack:prod')
    })

  /* ---------------------------------------------- CONFIGURATIONS ------------------------------------------------ */
  // Project configuration.
  grunt.initConfig({
    package_json: grunt.file.readJSON('package.json'),
    manifest_json: grunt.file.readJSON('src/manifest.json'),
    clean: {
      dev: ['build-dev/*'],
      prod: ['build-prod/*']
    },
    copy: {
      /** DEV: Copy resources */
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
      /** PROD: Copy resources */
      prod_static: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              'manifest.json'
            ],
            dest: 'build-prod'
          },
          {
            expand: true,
            flatten: false,
            cwd: 'src',
            src: [
              'images/**/*.png',
              '_locales/**/*.json'
            ],
            dest: 'build-prod'
          }
        ]
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          update: true
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
      },
      prod: {
        options: {
          style: 'compressed',
          update: false,
          noCache: true,
          sourcemap: 'none'
        },
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['css/**/*.scss'],
            dest: 'build-prod',
            ext: '.css'
          }
        ]
      }
    },
    webpack: {
      dev: webpackConfigDev,
      prod: webpackConfigProd
    },
    version: {
      project: {
        options: {
          prefix: '"version": "'
        },
        src: ['package.json', 'src/manifest.json']
      }
    }
  })

  /* ------------------------------------------- PLUGINS ---------------------------------------------------------- */
  grunt.loadNpmTasks('grunt-version')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-webpack')
  // grunt.loadNpmTasks('grunt-replace');
}
