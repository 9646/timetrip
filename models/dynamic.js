var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;
var dynamic = {};

module.exports = dynamic;

dynamic.addDynamic = function(data, callback) {
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('dynamics', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.insert(data, {safe: true}, function(err, message) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null, message);
            })
        })
    })
}

dynamic.gitDynamic = function(data, id, callback) {
    if(id) {
        data._id = new ObjectID(id);
    }
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('dynamics', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.find(data).sort({time:-1}).toArray(function(err, dynamics) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                return callback(null, dynamics);
            })
        })
    })
}
// 更新数据
dynamic.update = function(data, id, callback) {
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('dynamics', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.update({_id: new ObjectID(id)}, {$set: { dynamic: data}}, function(err) {
                mongodb.close()
                if(err){
                    return callback(err);
                }
                return callback(null);
            }) 

        })
    })
}

dynamic.addComment = function(id,data, callback) {
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('dynamics', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.update({id: new ObjectID(id)}, {$push: {'answers': data}}, {}, function(err) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                return callback(null);
            })
        })
    })
}

dynamic.deleteDynamic = function(id, callback) {
    console.log(2);
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('dynamics', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.remove({_id: new ObjectID(id)}, function(err) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                return callback(null);
            })
        })
    })
}