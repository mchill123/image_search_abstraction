var api = require('./api');
var express = require('express');
var app = express();
var mongo = require('mongodb');
var mongoC= mongo.MongoClient;
var mLab = process.env.MONGODB_URI || 'mongodb://localhost:27017/image_search';
var port = process.env.PORT || 3000;


mongoC.connect(mLab, function(err, db){
    if(err){
        console.log(err);
    }
    else{
        console.log("mongoDB connnected on port "+ mLab);
    }
    
    app.listen(port, function(){
        console.log("node connected on port " + port);
    });
    
  
    
    api(app,db);
    
});