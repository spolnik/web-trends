gruntFunction = (grunt) ->

  gruntConfig =
    pkg:
      grunt.file.readJSON 'package.json'

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
          join: true,
          sourceMap: true
        files:
          "build/app.js": ["app/scripts/*.coffee"]

    coffeelint:
      app:
        src: "app/scripts/*.coffee"
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
            "build/app.js"
          ]
      dist:
        files:
          "dist/bundle.min.js": "build/bundle.js"

    watch:
      sass:
        files: ["app/sass/*.scss"]
        tasks: ["sass", "cssmin"]
      coffee:
        files: ["app/scripts/*.coffee"]
        tasks: ["coffee", "uglify"]


  grunt.initConfig gruntConfig

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-coffeelint'
  #  grunt.loadNpmTasks 'grunt-concat-css'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  #  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['sass', 'cssmin', 'coffee', 'uglify']
  grunt.registerTask 'lint', 'coffeelint'

  null

module.exports = gruntFunction
