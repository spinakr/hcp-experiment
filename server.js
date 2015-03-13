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



var Data = mongoose.model('data',{
    age : Number,
    occupation: String,
    technique: String,
    calcTimes: Array,
    results: Array
});


app.get("/api/data", function(req, res){
    Data.find(function(err, data){
        if(err){
            res.send(err)
        }
        res.json(data);
    })
})

app.post("/api/data", function(req, res){
    Data.create({
        age: req.body.age,
        occupation: req.body.occupation,
        technique: req.body.technique,
        calcTimes: req.body.data.calcTimes,
        results: req.body.data.results
    }, function(err, test){
        if(err){
            res.send(err);
        }
        Data.find(function(err, tests){
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
