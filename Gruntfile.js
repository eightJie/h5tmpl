module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {

      common: {
        files: [
          {
            expand: true,
            src: ['common/**', '!common/.git'],
            dest: 'apps/shadow/theme/'
          },
          {
            expand: true,
            src: ['common/**', '!common/.git'],
            dest: 'apps/car/theme/'
          },
          {
            expand: true,
            src: ['common/**', '!common/.git'],
            dest: 'apps/gf/theme/'
          },
          {
            expand: true,
            src: ['common/**', '!common/.git'],
            dest: 'apps/tuya/theme/'
          },
          {
            expand: true,
            src: ['common/**', '!common/.git'],
            dest: 'apps/youth/theme/'
          },
        ]
      }

    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min'
      },
      // build: {
      //   src: 'src/**/*.js',
      //   dest: 'build/<%= pkg.name %>.min.js'
      // },
      my_target: {
        files: [{
          expand: true,
          cwd: 'build/<%= pkg.version %>/src',
          src: '**/*.js',
          dest: 'build/<%= pkg.version %>/src'
        }]
      }
    },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: [{
          expand: true,
          ext: '.css',
          src: ['apps/youth/theme/*.less', 'apps/youth/theme/less/*.less']
        }]
      }
    },

    watch: {
      styles: {
        files: ['apps/**/theme/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },

  });

  // 加载任务插件。
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // 默认被执行的任务列表。
  grunt.registerTask('build', ['copy', 'uglify']);

};