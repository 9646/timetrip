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