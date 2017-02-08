var path = require('path');
var request = require('request');
//'005494827447375698070:kljageccrgu', 'AIzaSyBrzh-HsmfFBuMJXycWFKWHhmOTVbMjEdc');




module.exports= function(app, db){
     app.all('/favicon.ico', function(req, res){
         console.log('favicon');
     });
     app.all('/', function(req,res){
    var filename = path.join(__dirname, 'index.html');
    res.sendFile(filename);
});
     app.all('/recent', recent);
   
    app.get('/:query', searchSave);
    
    
    
   
    
    function searchSave(req, res){
        var search = req.params.query.split(' ').join('+');
        var offset;
        if ((req.query.offset >=1) === false){
            offset = 1;
        }else offset = req.query.offset*10;
        
        
        searchGoog(search, offset, res);
    }
    
    
    
    function searchGoog(search, offset, res){
       request('https://www.googleapis.com/customsearch/v1?q='+ search +'&cx=005494827447375698070:kljageccrgu&num=10&searchType=image&start='+offset+'&fields=items%2Cpromotions&key=AIzaSyBrzh-HsmfFBuMJXycWFKWHhmOTVbMjEdc', function(err, response, data){
          if (err){
              console.log(err);
          }
          var a= JSON.parse(data);
          res.send(buildIt(a, search));
          saveSearch(search.split('+').join(' '), db);
      });
      
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
    
    
    function buildIt(a, search){
        return(a.items.map(function(i){
            var obj = {
                'title': i.title,
                'url': i.link,
                'snippet': i.snippet
            };
            return obj;
        }));
    }
    
    
    function recent(req, res){
        var recent = db.collection('recent');
        recent.find().sort({$natural:-1}).limit(10).toArray(function(err, data){
            if (err){
                console.log(err);
            }
            
            res.send(data.map(function(i){
                var obj = {
                    'term': i.term,
                    'time': i.time
                };
                return obj;
            }));
        });
    }
    
};