var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;
var message = {}
module.exports = message;

message.save = function(data, callback) {
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('messages', function(err, collection) {
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insert(data, {safe: true}, function(err, message) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null, message[0]);
            })
        })
    })
}

message.getAll = function(callback) {
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('messages', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.find().sort({time: -1}).toArray(function (err, messages){
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null, messages);
            })
        })
    })
}

message.addReply = function(data, callback) {

    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('messages', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.update({_id: new ObjectID(data.messageId)}, {$push:{'answers': data}}, {}, function(err) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                return callback(null);
            })
        })
    })
}

message.delMessage = function(messageId, callback) {
    mongodb.open(function(err,db) {
        if(err) {
            return callback(err);
        }
        db.collection('messages', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.remove({_id: new ObjectID(messageId)}, function(err) {
                if(err) {
                    return callback(err);
                }
                return callback(null);
            })
        })
    })
}

message.delAnswer = function(data, callback) {
    mongodb.open(function(err,db) {
        if(err) {
            return callback(err);
        }
        db.collection('messages', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.update({_id: new ObjectID(data.id)},{$pull:{'answers': {replyId: data.answerId}}}, {},  function(err) {
                if(err) {
                    return callback(err);
                }
                return callback(null);
            })
        })
    })
}