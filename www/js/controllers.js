//上面登录注册的控制器
timetrip.controller('indexCtrl', function($scope, $http) {
    $scope.$on('login', function(d, data) {
        $scope.name = data.name;
    })
    $http({
        method:'GET',
        url: '/home'
    }).success(function(data) {
        if(data.success) {
            $scope.name = data.data.name;
        }else{
            $scope.name = ''
        }
        console.log($scope.name);
    });
    $scope.logout = function() {
        // $scope.name = ''
        $http({
            method:'GET',
            url:'/users/logout'
        }).success(function(data) {

            if(data.success) {
                console.log('登出成功');
                $scope.name = '';
                window.location.href = '#/home';
            }
        })
    }
})

// 登录
timetrip.controller('login', function($scope,$http) {
    $http({
        message:'GET',
        url:'home'
    }).success(function(data) {
        if(data.success) {
           window.location.href = '#/home' 
        }
    })
    $scope.errorBye = function() {
        $scope.word = ''
    }
    $scope.login = function() {
        $http({
            method:'POST',
            url:'/users/login',
            data: $scope.formData
        }).success(function(data) {
            if(!data.success) {
                console.log('登录失败');
                $scope.word = data.message;
            }else{
                console.log('登录成功');
                // 给子级发送通知
                // $scope.$broadcast('login', data.data);
                // 给父级发送通知
                $scope.$emit('login', data.data);

                console.log(data.data)
                window.location.href = '#/home'
            }
        })
    }
})
// 注册
timetrip.controller('signin', function($scope,$http) {
    $http({
        message:'GET',
        url:'home'
    }).success(function(data) {
        if(data.success) {
           window.location.href = '#/home' 
        }
    })
    $scope.errorBye = function() {
        $scope.word = ''
    }
    $scope.formData = {};
    $scope.signin = function() {
        $http({
            method:"POST",
            url:'/users/signin',
            data: $scope.formData
            // headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function(data){
            console.log(data);
            if(!data.success){
                console.log('失败')
                $scope.word = data.message;
            }else{
                console.log(data)
                //注册成功
                window.location.href='#/login';
            }
        })
    }
    $scope.change = function() {
        $http({
            method:'POST',
            url:'/users/name/',
            data: $scope.formData
        }).success(function(data) {
            console.log(data);
            if(!data.success) {
                console.log(data.message);
            }
        })
    }
})

timetrip.controller('home', function($scope,$http) {
    console.log('主页')
    
})

timetrip.controller('mood', function($scope,$http) {
    console.log('心情')
})

timetrip.controller('checkin', function($scope,$http) {
    console.log('签到')
})

timetrip.controller('blogs', function($scope,$http) {
    console.log('博客详情')
})

timetrip.controller('blog', function($scope,$http) {
    console.log('博客')
})

timetrip.controller('addblog', function($scope,$http) {
    console.log('添加博客')
})

timetrip.controller('message', function($scope,$http) {
    console.log('留言板')
    function load() {
        $http({
            method: 'GET',
            url: '/messages'
        }).success(function(data) {
            if(!data.success) {
                console.log(data.message);
            }else{
                console.log(data.data)
                $scope.messages = data.data;
            }
        })
    }
    load()

        $http({
            method:'GET',
            url: '/home'
        }).success(function(data) {
            if(data.success) {
                $scope.name = data.data.name;
            }else{
                $scope.name = ''
            }
            console.log($scope.name);
        });

    $http({
        method: 'GET',
        url: '/messages'
    }).success(function(data) {
        if(!data.success) {
            console.log(data.message);
        }else{
            console.log(data.data)
            $scope.messages = data.data;
        }
    })

    $scope.postMessage = function() {
        var data = {};
        data.name = $scope.name;
        data.message = $scope.message;
        $http({
            method:'POST',
            url:'/mess', 
            data: data
        }).success(function(data) {
            $http({
                method: 'GET',
                url: '/messages'
            }).success(function(data) {
                if(!data.success) {
                    console.log(data.message);
                }else{
                    console.log(data.data)
                    $scope.messages = data.data;
                }
            })
        })
        $scope.message = ''
    }

    // 回复
    $scope.reply = function(id) {
        var data = {};
        data.messageId = id;
        data.reply = document.querySelector('.a' + id).value;
        data.name = $scope.name;
        $http({
            method:'POST',
            url: '/addReply',
            data: data
        }).success(function(data) {
            if(data.success) {
                $http({
                    method: 'GET',
                    url: '/messages'
                }).success(function(data) {
                    if(!data.success) {
                    }else{
                        $scope.messages = data.data;
                    }
                })
            }
        })
        document.querySelector('.a' + id).value = ''
    }

    $scope.delMessage = function(id) {
        var messageId = id;
        var data = {};
        data.messageId = id;
        $http({
            method: 'POST',
            url: '/delMessage',
            data: data
        }).success(function(data) {
            if(data.success) {
                load();
            }
        })
    }
    
    $scope.delAnswer = function(id, answerId) {
        var data = {}
        data.id = id;
        data.answerId = answerId;
        $http({
            method: 'POST',
            url:'/delAnswer',
            data: data
        }).success(function(data) {
            if(data.success) {
                load();
            }
        })
    }
})
