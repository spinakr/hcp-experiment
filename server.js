var PORT = 8081;
var express  = require('express');
var app      = express();                       
var mongoose = require('mongoose');            
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 

mongoose.connect('mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT + '/hcp-experiment', function(err){
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
    hcpId: String,
    age : Number,
    occupation: String,
    technique: String,
    calcTimes: Array,
    results: Array

});

//returns avrage calc time grouped by user 
app.get("/api/useravg", function(req,res){
    Data.aggregate([
        {"$unwind": "$calcTimes"},
        {
        $group : {
            _id: "$hcpId",
            "avgCalc": {$avg: "$calcTimes"},
            total : {$sum : 1 }}
    }], function(err, data){
        if(err){
            res.send(err)
        }
        res.json(data);
    });
});

//returns all the calculation times and corresponding results.
app.get("/api/userdata", function(req,res){
    Data.aggregate([
        {"$unwind": "$calcTimes"},
        {"$unwind": "$results"},
        {
        $group : {
            _id: "all",
            "calcTimes": {$push: "$calcTimes"},
            "results": {$push: "$results"},
            total : {$sum : 1 }}
    }], function(err, data){
        if(err){
            res.send(err)
        }
        res.json(data);
    });
});



app.get("/api/data", function(req, res){
    Data.find(function(err, data){
        if(err){
            res.send(err)
        }
        res.json(data);
    });
})

app.post("/api/data", function(req, res){
    Data.create({
        hcpId: req.body.hcp_id,
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
app.listen(PORT);
