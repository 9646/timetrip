var timetrip = angular.module('timetrip', ['ui.router']);

timetrip.run(function($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
})

timetrip.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
    // 主页
    .state('home',{
        url:'/home',
        views:{
            '':{
                templateUrl:'tpls/navigation.html'
            },
            'nav@home':{
                templateUrl:'tpls/home.html'
            }
        }
    })
    // 心情
    .state('mood',{
        url:'/mood',
        views:{
            '':{
                templateUrl:'tpls/navigation.html'
            },
            'nav@mood':{
                templateUrl:'tpls/mood.html'
            }
        }
    })
    // 签到
    .state('checkin',{
        url:'/checkin',
        views:{
            '':{
                templateUrl:'tpls/navigation.html'
            },
            'nav@checkin':{
                templateUrl:'tpls/checkin.html'
            }
        }
    })
    // 博客s
    .state('blogs',{
        url:'/blogs',
        views:{
            '':{
                templateUrl:'tpls/navigation.html'
            },
            'nav@blogs':{
                templateUrl:'tpls/blogs.html'
            }
        }
    })    
    // 博客
    .state('blog',{
        url:'/blog/:blogId',
        views:{
            '':{
                templateUrl:'tpls/navigation.html'
            },
            'nav@blog':{
                templateUrl:'tpls/blog.html'
            }
        }
    })    
    // add博客
    .state('addblog',{
        url:'/addblog',
        views:{
            '':{
                templateUrl:'tpls/navigation.html'
            },
            'nav@addblog':{
                templateUrl:'tpls/addblog.html'
            }
        }
    })
    // 留言板
    .state('message',{
        url:'/message',
        views:{
            '':{
                templateUrl:'tpls/navigation.html'
            },
            'nav@message':{
                templateUrl:'tpls/message.html'
            }
        }
    })

    // 登录
    .state('login',{
        url:'/login',
        views:{
            '':{
                templateUrl:'tpls/login.html'
            }
        }
    })
    // 注册
    .state('signin',{
        url:'/signin',
        views:{
            '':{
                templateUrl:'tpls/signin.html'
            }
        }
    })

    $urlRouterProvider.otherwise('/home');
})