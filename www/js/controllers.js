//登录
timetrip.controller('indexCtrl', function($scope, $http) {
    $scope.$on('login', function(d, data) {
        console.log('收到通知');
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
                $scope.name = ''
            }
        })
    }
})

timetrip.controller('login', function($scope,$http) {
    $scope.errorBye = function() {
        $scope.word = ''
    }
    // 登录
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
                // 给同级发送通知
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
    $scope.add = function() {
        alert('主页')
    }
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
})
