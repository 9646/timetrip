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
    $scope.rootname = '邓志阳'
    $http({
        method:'GET',
        url: '/home'
    }).success(function(data) {
        if(data.success) {
            $scope.name = data.data.name;
        }else{
            $scope.name = ''
        }
    });

    // 查询所有的心情
    function load() {
        $http({
            method: 'GET',
            url:'/moods/allMood'
        }).success(function(data) {
            if(data.success) {
                $scope.moods = data.data;
            }
        })
    }
    load();

    // 发表心情
    $scope.postMood = function() {
        var data = {};
        data.mood = $scope.mood;
        data.name = $scope.name;
        data.type = 'mood';
        $http({
            method:'POST',
            url: '/moods/addMood',
            data: data
        }).success(function(data) {
            if(data.success){
                $scope.mood = '';
                load();
            }
        })
    }

    // 评论
    $scope.reply = function(id) {
        var data = {}
        data.id = id;
        var comment = document.querySelector('.a' + id).value;
        data.comment = comment;
        $http({
            method: 'POST',
            url:'/blogs/addComment',
            data: data
        }).success(function(data) {
            if(data.success) {
                load();
            }
            console.log(data);
        })
    }
    // 删除心情
    $scope.deleteMood = function(id) {
        var data = {
            id : id
        }
        $http({
            method:'POST',
            url:'/moods/deleteMood',
            data: data
        }).success(function(data) {
            if(data.success) {
                load();
            }
        })
    }
    // 删除评论
    $scope.deleteComment = function(id, commentId) {
        var data = {};
        data.id = id;
        data.commentId = commentId;
        $http({
            method:'POST',
            url:'/moods/deleteComment',
            data: data
        }).success(function(data) {
            if(data.success) {
                load();
            }
        })
    }

})

timetrip.controller('checkin', function($scope,$http) {
    console.log('签到')
})

timetrip.controller('blogs', function($scope, $http) {
    console.log('博客s');
    $http({
        method: 'GET',
        url: '/blogs/allBlogs'
    }).success(function(data) {
        if(data.success) {
            console.log(data);
            $scope.blogs = data.data;
            console.log($scope.blogs);
        }
    })
    $scope.toBlog = function(id) {
        console.log(id);
        // $state.go('blog', {id: id});
        // console.log('#/blog/' + id);
        window.location.href='#/blog/' + id;
    }
})

timetrip.controller('blog', function($scope,$http, $stateParams) {
    $scope.rootname = '邓志阳';
    console.log('博客详情');
    console.log($stateParams);
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
    function load() {
        $http({
            method: 'POST',
            url: '/blogs/getBlog',
            data: $stateParams
        }).success(function(data) {
            if(data.success) {
                $scope.blogInfo = data.data[0];
            }
            console.log($scope.blogInfo)
            document.querySelector('.blog article').innerHTML = data.data[0].blog.content;
        })
    }
    load();
    // 删除
    $scope.deleteBlog = function(id) {
        if($scope.name != $scope.rootname) {
            console.log('没有权限删除')
            return;
        }
        console.log(id);
        var data = {};
        data.id = id;
        $http({
            method: 'POST',
            url: '/blogs/deleteBlog',
            data: data
        }).success(function(data) {
            console.log(data);
            if(data.success)  {
                window.location.href = '#/blogs';
            }
        })
    }

    $scope.addComment = function(id) {
        var data = {};
        data.id = id;
        data.comment = $scope.message;
        data.name = $scope.name;
        console.log(data);
        $http({
            method:'POST',
            url:'/blogs/addComment',
            data: data
        }).success(function(data) {
            console.log(data);
            if(data.success) {
                load();
                $scope.message = ''
            }
        })
    }
    // 删除评论
    $scope.delComment = function(id, answerId) {
        var data = {}
        data.id = id;
        data.answerId = answerId;
        console.log(data);
        $http({
            method: 'POST',
            url:'/blogs/delComment',
            data: data
        }).success(function(data) {
            if(data.success) {
                load();
            }
            console.log(data);
        })
    }
    // 跳转到修改博客页面
    $scope.amendBlog = function(id) {
        console.log(id);
        // $state.go('blog', {id: id});
        // console.log('#/blog/' + id);
        window.location.href='#/amendblog/' + id;
    }
})
// 修改博客
timetrip.controller('amendblog', function($scope, $http, $stateParams) {
    $scope.rootname = '邓志阳';
    function load() {
        $http({
            method:'GET',
            url: '/home'
        }).success(function(data) {
            if(data.success) {
                // $scope.name = data.data.name;
            }
            if($scope.name != $scope.name){
                window.location.href = '#/blogs';
            }

        });
    }
    load();
    $http({
        method:'POST',
        url:'/blogs/getBlog',
        data: $stateParams
    }).success(function(data) {
        console.log(data);        
        console.log(data.data[0])
        $scope.data = data.data[0]
        if(data.success) {
            editor.appendHtml($scope.data.blog.content)
        }
    })
    $scope.amendBlog = function() {
        console.log($scope.data);    
        var data = {};
        data.title = $scope.data.blog.title;
        data.content = editor.html();
        data.id = $scope.data._id;
        $http({
            method: 'POST',
            url:'/blogs/amendBlog',
            data: data
        }).success(function(data) {
            if(data) {

            }
            console.log(data);
        })
    }
})


timetrip.controller('addblog', function($scope,$http) {
    console.log('添加博客')
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
    
    $scope.addblog = function() {
        var data = {};
        data.name = $scope.name;
        data.type = 'blog';
        data.blog = {};
        data.blog.content = editor.html();
        data.blog.title = $scope.title
        $http({
            method: 'POST',
            url:'/blogs/addblog',
            data: data
        }).success(function(data) {
            if(data.success) {
                console.log(data);
            }
        })
    }
})

// 留言功能 
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
    $scope.postMessage = function() {
        var data = {};
        data.name = $scope.name;
        data.message = $scope.message;
        $http({
            method:'POST',
            url:'/mess', 
            data: data
        }).success(function(data) {
            load();
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
                load();
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
