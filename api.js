var path = require('path');
var request = require('request')
//'005494827447375698070:kljageccrgu', 'AIzaSyBrzh-HsmfFBuMJXycWFKWHhmOTVbMjEdc');




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
        }else offset = req.query.offset*10;
        
      request('https://www.googleapis.com/customsearch/v1?q='+ search +'&cx=005494827447375698070:kljageccrgu&num=10&searchType=image&start='+offset+'&fields=context%2Citems%2Cpromotions&key=AIzaSyBrzh-HsmfFBuMJXycWFKWHhmOTVbMjEdc', function(err, response, data){
          if (err){
              console.log(err);
          }
          res.send(data);
      });
      
      
            
    }
    
    
    
};