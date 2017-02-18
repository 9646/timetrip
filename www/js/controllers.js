timetrip.controller('login', function($scope,$http) {
    $scope.login = function() {
        alert('登录');
    }
})

timetrip.controller('signin', function($scope,$http) {
    $scope.formData = {};
    $scope.signin = function() {
        console.log($scope.formData);
        var data = JSON.stringify($scope.formData);
        console.log(data);

        $http({
            method:"POST",
            url:'signin',
            data: data,
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function(data){
            console.log(data);
            if(!data.success){
                //当前登录失败
                if(!data.errors){
                    //用户名密码错误
                    $scope.message = data.message;
                }else{
                    //用户名，密码为空的错误
                    $scope.errorUsername = data.errors.username;
                    $scope.errorPassword = data.errors.password;
                }
            }else{
                console.log('sssssss')
                //当前登录成功
                window.location.href='#/home';
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
