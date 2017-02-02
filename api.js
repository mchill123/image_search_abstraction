var path = require('path');

module.exports= function(app, db){
    
    app.all('/', function(req, res){
        var filename = path.join(__dirname, 'index.html');
        res.sendFile(filename);
    });
};