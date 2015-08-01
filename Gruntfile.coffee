gruntFunction = (grunt) ->

  gruntConfig =
    pkg:
      grunt.file.readJSON 'package.json'

    clean:
      build: ["build"]
      release: ["dist"]

    sass:
      build:
        files:
          "build/main.css": "app/sass/main.scss"

    cssmin:
      dist:
        files:
          "dist/bundle.min.css": [
            "bower_components/bootstrap/dist/css/bootstrap.min.css",
            "build/main.css",
          ]

    coffee:
      build:
        options:
          sourceMap: true
        files:
          "build/app.js": "app/scripts/app.coffee"

    coffeelint:
      app:
        src: ["app/scripts/app.coffee", 'Gruntfile.coffee']
        options:
          no_tabs:
            level: "ignore"
          indentation:
            level: "warn"
          no_trailing_whitespace:
            level: "error"
          no_trailing_semicolons:
            level: "error"
          no_plusplus:
            level: "warn"
          no_implicit_parens:
            level: "ignore"
          max_line_length:
            level: "ignore"

    uglify:
      options:
        banner: """/**
                * <%= pkg.name %>
                * Copyright (c) <%= grunt.template.today("yyyy") %>
                * <%= pkg.author.name %> <<%= pkg.author.email %>>
                */"""
        mangle: true
        compress: true
        drop_console: true
      dev:
        options:
          beautify: true
          compress: false
          mangle: false
          drop_console: false
          preserveComments: 'all'

        files:
          "build/bundle.js": [
            "./bower_components/lodash/lodash.js",
            "./bower_components/jquery/dist/jquery.js",
            "./bower_components/bootstrap/dist/js/bootstrap.js",
            "./bower_components/jquery-sticky/jquery.sticky.js",
            "./bower_components/isotope/dist/isotope.pkgd.js",
            "./bower_components/react/react.js",
            "./build/app.js"
            "./build/CompanyBlock.js",
          ]
      dist:
        files:
          "dist/bundle.min.js": "build/bundle.js"

    imagemin:
      static:
        files: [{
          expand: true
          cwd: 'app/img/'
          src: [ '**/*.*' ]
          dest: 'dist/img/'
        }]

    babel:
      options:
        sourceMap: true
      dist:
        files:
          'build/CompanyBlock.js': 'app/scripts/CompanyBlock.jsx'

    watch:
      sass:
        files: ["app/sass/*.scss"]
        tasks: ["sass", "cssmin"]
      coffee:
        files: ["app/scripts/*.coffee"]
        tasks: ["coffee", "uglify"]
      babel:
        files: ["app/scripts/*.jsx"]
        tasks: ['babel']


  grunt.initConfig gruntConfig

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-imagemin'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-babel'

  grunt.registerTask 'default', [
    'clean', 'imagemin', 'sass', 'cssmin', 'coffeelint', 'coffee', 'babel', 'uglify'
  ]

  null

module.exports = gruntFunction
