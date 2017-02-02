var api = require('./api');
var express = require('express');
var app = express();
var mongo = require('mongodb');
var mongoC= mongo.MongoClient;
var mLab = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/image_search';
var port = process.env.PORT || 3000;


mongoC.connect(mLab, function(err,db){
    if (err){
        console.log(err);
    }
    console.log('mongo connected on ' + mLab);

    app.listen(port, function(err){
         if(err){ 
             console.log(err);
         }
         console.log('node connected on '+ port);
    });
    db.createCollection('recent');
    
    api(app, db);

});