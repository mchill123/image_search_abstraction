var path = require('path');
var goog = require('google-search');
var soog = new goog({
    key: 'AIzaSyBrzh-HsmfFBuMJXycWFKWHhmOTVbMjEdc',
    cx: '005494827447375698070:kljageccrgu'
});




module.exports= function(app, db){
     app.all('/recent', function(req,res){
        res.send('recent');
    });
   
    app.get('/:query', searchSave);
    
   
    
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
            res.send(sort(data));
        });
        
    }
    
    function sort(data){
        var obj = [];
        for(var i=0;i<10;i++){
            var hit = {
                'url': data.items[i].pagemap
            };
            obj.push(hit);
        }
        return obj;
    }
    
};