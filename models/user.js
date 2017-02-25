var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

//注册
User.prototype.save = function(callback) {
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    }
    // 打开数据库
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('users', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            // 插入数据
            collection.insert(user, {safe: true}, function(err, user) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                // 插入成功
                callback(null, user[0]);
            })
        })
    })
}
//查询用户
User.get = function(name, callback) {
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('users', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name: name}, function(err, user) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null, user);
            })
        })
    })
}
// 修改数据
User.update = function(id, data, callback) {
    console.log(data);
    mongodb.open(function(err, db) {
        if(err){
            return callback(err);
        }
        db.collection('users', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.update({_id: new ObjectID(id)}, {$set: data}, function(err) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                return callback(null);
            })
        })
    })
}
