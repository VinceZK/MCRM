/**
 * Created by kai_zhang on 20/11/2014.
 */
module.exports = function(grunt){

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: true,
                compress: true,
                report: 'gzip',
                banner: '/*! <%= pkg.name %>-v<%= pkg.version %>-<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/scripts',
                        src: '**/*.js',
                        dest: 'app/build'
                    }
                ]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'app/build/**/*.js',
                dest: 'app/build/<%= pkg.name %>.min.js'
            }
//            dependency: {
//                src: 'app/bower_components/**/*.min.js',
//                dest: 'app/build/dependency.min.js'
//            }
        }
    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // 默认任务
    grunt.registerTask('default', ['uglify','concat']);
};