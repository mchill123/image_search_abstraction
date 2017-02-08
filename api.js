var path = require('path');
var request = require('request');
//'005494827447375698070:kljageccrgu', 'AIzaSyBrzh-HsmfFBuMJXycWFKWHhmOTVbMjEdc');




module.exports= function(app, db){
     
     app.all('/recent', function(req,res){
        res.send('recent');
    });
   
    app.get('/:query', searchSave);
    
    app.all('/', function(req,res){
         res.send('landing page');
     });
    
   
    
    function searchSave(req, res){
        var search = req.params.query.split(' ').join('+');
        var offset;
        if ((req.query.offset >=1) === false){
            offset = 1;
        }else offset = req.query.offset*10;
        
        
        res.send(searchGoog(search, offset));
    }
    
    
    
    function searchGoog(search, offset){
       return(request('https://www.googleapis.com/customsearch/v1?q='+ search +'&cx=005494827447375698070:kljageccrgu&num=10&searchType=image&start='+offset+'&fields=items%2Cpromotions&key=AIzaSyBrzh-HsmfFBuMJXycWFKWHhmOTVbMjEdc', function(err, response, data){
          if (err){
              console.log(err);
          }
          var a= JSON.parse(data);
       var b = a.items.map(function(i){
            var obj = {
                'title': i.title,
                'url': i.link,
                'snippet': i.snippet
            };
            saveSearch(search.split('+').join(' '), db);
            return obj;
        });
        return b;
      }));
    }
    
    function saveSearch(search, db){
        var date = new Date();
        var sObj = {
            'term': search,
            'time': date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        };
        var recent = db.collection('recent');
        recent.save(sObj, function(err, result){
            if (err){
                console.log(err);
            }console.log('saved' + result);
        });
    }
    
    
    
};