var express  = require('express');
var app      = express();                       
var mongoose = require('mongoose');            
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 

mongoose.connect('mongodb://localhost/hcp-experiment', function(err){
    if(err){
        console.log('connection error', err);
    } else {
        console.log("connected!");
    }
});     // connect to mongoDB database 

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



var Test = mongoose.model('Test',{
    name : String,
    occupation: String
});


app.get("/api/tests", function(req, res){
    Test.find(function(err, tests){
        if(err){
            res.send(err)
        }
        res.json(tests);
    })
})

app.post("/api/tests", function(req, res){
    Test.create({
        name: req.body.name,
        occupation: req.body.occupation
    }, function(err, test){
        if(err){
            res.send(err);
        }
        Test.find(function(err, tests){
            if(err){
                res.send(err);
            }
            res.json(tests);
        });
    });
});

app.get('*', function(req, res){
    res.sendfile('./index.html')
})


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
