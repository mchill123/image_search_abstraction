var path = require('path');
var goog = require('google-images');
var soog = new goog('AIzaSyBrzh-HsmfFBuMJXycWFKWHhmOTVbMjEdc','005494827447375698070:kljageccrgu');




module.exports= function(app, db){
     app.all('/', function(req,res){
         res.send('landing page');
     });
     app.all('/recent', function(req,res){
        res.send('recent');
    });
   
    app.get('/:query', searchSave);
    
   
    
    function searchSave(req, res){
        var search = req.params.query.split(' ').join(' ');
        var offset;
        if ((req.query.offset >=1) === false){
            offset = 1;
        }else offset = req.query.offset;
        
      var data = soog.search(search, {page: offset})
      
      res.send(data);
            
    }
    
    
    
};