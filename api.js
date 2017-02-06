var path = require('path');
var goog = require('google-search');
var soog = new goog({
    key: 'AIzaSyBrzh-HsmfFBuMJXycWFKWHhmOTVbMjEdc',
    cx: '005494827447375698070:kljageccrgu'
});




module.exports= function(app, db){
    
   
    app.get('/:query', searchSave);
    
    app.all('/recent', function(req,res){
        res.send('recent');
    });
    
    function searchSave(req, res){
        var search = req.params.query.split(' ').join('+');
        var offset;
        if ((req.query.offset >=1) === false){
            offset = 1;
        }else offset = req.query.offset*10;
        
        soog.build({
            q: search,
            start: offset,
            filetype: 'jpg',
            num: 10
        }, function(err, data){
            if (err){
                console.log(err);
            }
            res.send(data);
        });
    }
    
};